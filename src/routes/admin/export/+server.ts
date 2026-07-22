import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';
import { SCHEMA_DDL, DB_VERSION } from '$lib/server/db-setup';

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

// All valid JSON-exportable sections.
const ALL_SECTIONS = ['nominees', 'votes', 'stories', 'site_content', 'sponsors', 'auth'] as const;
type Section = (typeof ALL_SECTIONS)[number];

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

		// Which sections to include — defaults to all if not specified.
		const tablesParam = url.searchParams.get('tables'); // e.g. "nominees,votes"
		const selectedSections: Set<Section> = tablesParam
			? new Set(
					tablesParam
						.split(',')
						.map((s) => s.trim())
						.filter((s): s is Section => (ALL_SECTIONS as readonly string[]).includes(s))
				)
			: new Set(ALL_SECTIONS);

		// Fetch only the requested tables in parallel.
		const [nomineesRes, votesRes, storiesRes, contentRes, sponsorsRes, usersRes] = await Promise.all([
			selectedSections.has('nominees')
				? supabaseAdmin.from('nominees').select('*').order('created_at', { ascending: true })
				: Promise.resolve({ data: null }),
			selectedSections.has('votes')
				? supabaseAdmin.from('votes').select('*').order('created_at', { ascending: true })
				: Promise.resolve({ data: null }),
			selectedSections.has('stories')
				? supabaseAdmin.from('stories').select('*').order('created_at', { ascending: true })
				: Promise.resolve({ data: null }),
			selectedSections.has('site_content')
				? supabaseAdmin.from('site_content').select('*')
				: Promise.resolve({ data: null }),
			selectedSections.has('sponsors')
				? supabaseAdmin.from('sponsors').select('*').order('sort_order', { ascending: true })
				: Promise.resolve({ data: null }),
			selectedSections.has('auth')
				? supabaseAdmin.auth.admin.listUsers({ perPage: 1000 })
				: Promise.resolve({ data: null })
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

		// Build tables object — only include keys that were requested.
		const tables: Record<string, unknown> = {};
		if (selectedSections.has('nominees')) tables.nominees = nomineesRes.data ?? [];
		if (selectedSections.has('votes')) tables.votes = votesRes.data ?? [];
		if (selectedSections.has('stories')) tables.stories = storiesRes.data ?? [];
		if (selectedSections.has('site_content')) tables.site_content = contentRes.data ?? [];
		if (selectedSections.has('sponsors')) tables.sponsors = sponsorsRes.data ?? [];

		const bundle: Record<string, unknown> = {
			exported_at: new Date().toISOString(),
			format: includeSchema ? 'schema+data' : 'data-only',
			db_version: DB_VERSION,
			sections: [...selectedSections],
			tables
		};

		if (selectedSections.has('auth')) {
			bundle.auth = { users: safeUsers };
		}

		if (includeSchema) {
			bundle.schema_ddl = SCHEMA_DDL.replace('{timestamp}', new Date().toISOString());
		}

		const suffix = includeSchema ? 'schema-data' : 'data';
		const sectionSuffix =
			selectedSections.size < ALL_SECTIONS.length
				? `-${[...selectedSections].join('-')}`
				: '';
		return new Response(JSON.stringify(bundle, null, 2), {
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Content-Disposition': `attachment; filename="najsestra-${suffix}${sectionSuffix}-${stamp}.json"`
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
