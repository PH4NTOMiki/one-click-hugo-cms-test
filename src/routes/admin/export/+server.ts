import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';

// ---------------------------------------------------------------------------
// CSV helpers
// ---------------------------------------------------------------------------

/** Escape a value for CSV (RFC 4180) using semicolon delimiter for Excel/EU locales. */
function csvCell(value: unknown): string {
	const s = value === null || value === undefined ? '' : String(value);
	if (/[";\n\r]/.test(s)) {
		return '"' + s.replace(/"/g, '""') + '"';
	}
	return s;
}

function toCsv(headers: string[], rows: (string | number | null)[][]): string {
	const lines = [headers.map(csvCell).join(';')];
	for (const row of rows) lines.push(row.map(csvCell).join(';'));
	// UTF-8 BOM so Excel renders Croatian diacritics correctly.
	return '\uFEFF' + lines.join('\r\n');
}

function fmtDate(value: string | null): string {
	if (!value) return '';
	return new Date(value).toLocaleString('hr-HR');
}

// ---------------------------------------------------------------------------
// Schema DDL (matches the migration applied in the DB setup)
// ---------------------------------------------------------------------------
const SCHEMA_DDL = `-- ============================================================
-- NajSestra — Full schema export
-- Generated: {timestamp}
-- ============================================================

-- nominees
CREATE TABLE IF NOT EXISTS public.nominees (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  first_name  text,
  last_name   text,
  workplace   text,
  city        text,
  approved    boolean NOT NULL DEFAULT false,
  is_winner   boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- votes
CREATE TABLE IF NOT EXISTS public.votes (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nominee_id  uuid NOT NULL REFERENCES public.nominees(id) ON DELETE CASCADE,
  voter_id    text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE(voter_id)
);

-- stories
CREATE TABLE IF NOT EXISTS public.stories (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nurse_name   text NOT NULL,
  first_name   text,
  last_name    text,
  workplace    text,
  city         text,
  author_name  text,
  author_email text,
  message      text NOT NULL,
  status       text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  is_winner    boolean NOT NULL DEFAULT false,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- site_content
CREATE TABLE IF NOT EXISTS public.site_content (
  key        text PRIMARY KEY,
  value      text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS nominees_approved_idx ON public.nominees(approved);
CREATE INDEX IF NOT EXISTS nominees_is_winner_idx ON public.nominees(is_winner);
CREATE INDEX IF NOT EXISTS votes_nominee_id_idx   ON public.votes(nominee_id);
CREATE INDEX IF NOT EXISTS votes_voter_id_idx     ON public.votes(voter_id);
CREATE INDEX IF NOT EXISTS stories_status_idx     ON public.stories(status);
CREATE INDEX IF NOT EXISTS stories_is_winner_idx  ON public.stories(is_winner);

-- RLS: nominees
ALTER TABLE public.nominees ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "nominees_public_select" ON public.nominees FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "nominees_auth_all" ON public.nominees FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- RLS: votes
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "votes_public_insert" ON public.votes FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "votes_auth_select" ON public.votes FOR SELECT TO authenticated USING (true);

-- RLS: stories
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "stories_public_insert" ON public.stories FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "stories_auth_all" ON public.stories FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- RLS: site_content
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "site_content_public_select" ON public.site_content FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "site_content_auth_all" ON public.site_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
`;

// ---------------------------------------------------------------------------
// GET handler
// ---------------------------------------------------------------------------
export const GET: RequestHandler = async ({ url, locals }) => {
	// Standalone endpoints are not covered by +layout.server guards — check auth here.
	const session = await locals.getSession();
	if (!session) throw redirect(303, '/admin/login');

	const type = url.searchParams.get('type') ?? 'nominees';
	const format = url.searchParams.get('format') ?? 'csv'; // csv | json | schema
	const stamp = new Date().toISOString().slice(0, 10);

	// ------------------------------------------------------------------
	// JSON full export (data-only or data + schema)
	// ------------------------------------------------------------------
	if (format === 'json' || format === 'schema') {
		const includeSchema = format === 'schema';

		// Fetch all tables using the service-role admin client to bypass RLS.
		const [nomineesRes, votesRes, storiesRes, contentRes, usersRes] = await Promise.all([
			supabaseAdmin.from('nominees').select('*').order('created_at', { ascending: true }),
			supabaseAdmin.from('votes').select('*').order('created_at', { ascending: true }),
			supabaseAdmin.from('stories').select('*').order('created_at', { ascending: true }),
			supabaseAdmin.from('site_content').select('*'),
			supabaseAdmin.auth.admin.listUsers({ perPage: 1000 })
		]);

		// Strip sensitive auth fields before export.
		const safeUsers = (usersRes.data?.users ?? []).map((u) => ({
			id: u.id,
			email: u.email,
			email_confirmed_at: u.email_confirmed_at,
			created_at: u.created_at,
			last_sign_in_at: u.last_sign_in_at,
			user_metadata: u.user_metadata,
			role: u.role
		}));

		const bundle: Record<string, unknown> = {
			exported_at: new Date().toISOString(),
			format: includeSchema ? 'schema+data' : 'data-only',
			tables: {
				nominees: nomineesRes.data ?? [],
				votes: votesRes.data ?? [],
				stories: storiesRes.data ?? [],
				site_content: contentRes.data ?? []
			},
			auth: {
				users: safeUsers
			}
		};

		if (includeSchema) {
			bundle.schema_ddl = SCHEMA_DDL.replace('{timestamp}', new Date().toISOString());
		}

		const suffix = includeSchema ? 'schema-data' : 'data';
		return new Response(JSON.stringify(bundle, null, 2), {
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Content-Disposition': `attachment; filename="najsestra-${suffix}-${stamp}.json"`
			}
		});
	}

	// ------------------------------------------------------------------
	// CSV export (original behaviour, kept intact)
	// ------------------------------------------------------------------
	if (type === 'nominees') {
		const { data: withIds } = await locals.supabase
			.from('nominees')
			.select('id, first_name, last_name, name, workplace, city, approved, is_winner, created_at')
			.order('created_at', { ascending: false });

		const { data: votes } = await locals.supabase.from('votes').select('nominee_id');
		const counts = new Map<string, number>();
		for (const v of votes ?? []) counts.set(v.nominee_id, (counts.get(v.nominee_id) ?? 0) + 1);

		const rows = (withIds ?? [])
			.map((n) => ({ ...n, vote_count: counts.get(n.id) ?? 0 }))
			.sort((a, b) => b.vote_count - a.vote_count)
			.map((n) => [
				n.first_name ?? '',
				n.last_name ?? '',
				n.workplace ?? '',
				n.city ?? '',
				n.vote_count,
				n.approved ? 'Da' : 'Ne',
				n.is_winner ? 'Da' : 'Ne',
				fmtDate(n.created_at)
			]);

		const csv = toCsv(
			['Ime', 'Prezime', 'Ustanova', 'Grad', 'Broj glasova', 'Vidljivo', 'Pobjednik', 'Datum'],
			rows
		);
		return new Response(csv, {
			headers: {
				'Content-Type': 'text/csv; charset=utf-8',
				'Content-Disposition': `attachment; filename="glasanje-${stamp}.csv"`
			}
		});
	}

	if (type === 'stories') {
		const { data: stories } = await locals.supabase
			.from('stories')
			.select('first_name, last_name, workplace, city, message, status, is_winner, created_at')
			.order('created_at', { ascending: false });

		const statusLabel: Record<string, string> = {
			pending: 'Na čekanju',
			approved: 'Odobreno',
			rejected: 'Odbijeno'
		};

		const rows = (stories ?? []).map((s) => [
			s.first_name ?? '',
			s.last_name ?? '',
			s.workplace ?? '',
			s.city ?? '',
			s.message ?? '',
			statusLabel[s.status] ?? s.status,
			s.is_winner ? 'Da' : 'Ne',
			fmtDate(s.created_at)
		]);

		const csv = toCsv(
			['Ime', 'Prezime', 'Ustanova', 'Grad', 'Priča', 'Status', 'Pobjednik', 'Datum'],
			rows
		);
		return new Response(csv, {
			headers: {
				'Content-Type': 'text/csv; charset=utf-8',
				'Content-Disposition': `attachment; filename="price-${stamp}.csv"`
			}
		});
	}

	throw error(400, 'Nepoznata vrsta izvoza.');
};
