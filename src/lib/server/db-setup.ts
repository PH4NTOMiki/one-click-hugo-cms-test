/**
 * db-setup.ts
 *
 * Single source of truth for:
 *   - The current schema version (DB_VERSION)
 *   - The full schema DDL (SCHEMA_DDL)
 *   - ensureDb() — called once at server boot to create/migrate the DB
 *
 * The `version_check` table stores one row { version }. If the table is
 * missing, or the version row doesn't match DB_VERSION, the full DDL is
 * re-applied and site_content default values are seeded.
 */

import pg from 'pg';
import { POSTGRES_URL_NON_POOLING } from '$env/static/private';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';
import { contentFields } from '$lib/content/defaults';

// ---------------------------------------------------------------------------
// Bump this whenever the schema or default content changes.
// ---------------------------------------------------------------------------
export const DB_VERSION = '2';

// ---------------------------------------------------------------------------
// Full schema DDL — also exported so the export endpoint can embed it.
// ---------------------------------------------------------------------------
export const SCHEMA_DDL = `-- ============================================================
-- NajSestra — Full schema  (version ${DB_VERSION})
-- ============================================================

-- version_check: single-row table that tracks the applied schema version.
CREATE TABLE IF NOT EXISTS public.version_check (
  version text PRIMARY KEY
);

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

-- RLS: version_check (read-only for everyone, write only for service_role)
ALTER TABLE public.version_check ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='version_check' AND policyname='version_check_public_select') THEN
    CREATE POLICY "version_check_public_select" ON public.version_check FOR SELECT USING (true);
  END IF;
END $$;

-- RLS: nominees
ALTER TABLE public.nominees ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='nominees' AND policyname='nominees_public_select') THEN
    CREATE POLICY "nominees_public_select" ON public.nominees FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='nominees' AND policyname='nominees_auth_all') THEN
    CREATE POLICY "nominees_auth_all" ON public.nominees FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

-- RLS: votes
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='votes' AND policyname='votes_public_insert') THEN
    CREATE POLICY "votes_public_insert" ON public.votes FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='votes' AND policyname='votes_auth_select') THEN
    CREATE POLICY "votes_auth_select" ON public.votes FOR SELECT TO authenticated USING (true);
  END IF;
END $$;

-- RLS: stories
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='stories' AND policyname='stories_public_insert') THEN
    CREATE POLICY "stories_public_insert" ON public.stories FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='stories' AND policyname='stories_auth_all') THEN
    CREATE POLICY "stories_auth_all" ON public.stories FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

-- RLS: site_content
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='site_content' AND policyname='site_content_public_select') THEN
    CREATE POLICY "site_content_public_select" ON public.site_content FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='site_content' AND policyname='site_content_auth_all') THEN
    CREATE POLICY "site_content_auth_all" ON public.site_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;
`;

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

async function pgQuery(sql: string): Promise<void> {
	const client = new pg.Client({
		connectionString: POSTGRES_URL_NON_POOLING,
		ssl: { rejectUnauthorized: false }
	});
	await client.connect();
	try {
		await client.query(sql);
	} finally {
		await client.end();
	}
}

async function seedDefaults(): Promise<void> {
	const rows = contentFields.map((f) => ({ key: f.key, value: f.default }));
	// Insert defaults but do NOT overwrite values that already exist.
	await supabaseAdmin
		.from('site_content')
		.upsert(rows, { onConflict: 'key', ignoreDuplicates: true });
}

// ---------------------------------------------------------------------------
// Boot check — called once per server start from hooks.server.ts
// ---------------------------------------------------------------------------

let checked = false;

export async function ensureDb(): Promise<void> {
	// Only run once per server process lifetime.
	if (checked) return;
	checked = true;

	try {
		// 1. Check version_check table and version row.
		const { data, error } = await supabaseAdmin
			.from('version_check')
			.select('version')
			.maybeSingle();

		const currentVersion = error ? null : (data?.version ?? null);

		if (currentVersion === DB_VERSION) {
			// DB is up to date — nothing to do.
			return;
		}

		console.log(
			`[db-setup] Schema version mismatch (have: ${currentVersion ?? 'none'}, need: ${DB_VERSION}). Applying DDL…`
		);

		// 2. Apply the full DDL (all statements are idempotent: IF NOT EXISTS).
		await pgQuery(SCHEMA_DDL);

		// 3. Upsert the version row.
		await pgQuery(
			`INSERT INTO public.version_check (version) VALUES ('${DB_VERSION}')
       ON CONFLICT (version) DO UPDATE SET version = EXCLUDED.version;`
		);

		// 4. Seed site_content defaults (ignores rows that already exist).
		await seedDefaults();

		console.log(`[db-setup] DB setup complete — version ${DB_VERSION}`);
	} catch (err) {
		// Log but don't crash the server — the app will show DB errors on
		// affected pages rather than failing to start entirely.
		console.error('[db-setup] Boot check failed:', err);
	}
}
