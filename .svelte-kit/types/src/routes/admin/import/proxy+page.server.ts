// @ts-nocheck
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';
import { POSTGRES_URL_NON_POOLING } from '$env/static/private';
import pg from 'pg';

// This page is intentionally PUBLIC — no auth guard — so you can restore data
// immediately after connecting a fresh Supabase project, before any admin user
// exists. Treat it with care: deploy behind a firewall or remove it after use.

export const load = async () => {
	return {};
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface ImportBundle {
	format?: string;
	schema_ddl?: string;
	tables?: {
		nominees?: Record<string, unknown>[];
		votes?: Record<string, unknown>[];
		stories?: Record<string, unknown>[];
		site_content?: Record<string, unknown>[];
	};
	auth?: {
		users?: {
			id: string;
			email?: string;
			email_confirmed_at?: string | null;
			user_metadata?: Record<string, unknown>;
		}[];
	};
}

function isBundle(v: unknown): v is ImportBundle {
	return typeof v === 'object' && v !== null && 'tables' in v;
}

/**
 * Execute raw DDL by opening a direct Postgres connection.
 * Uses POSTGRES_URL_NON_POOLING so it works on a completely blank database
 * with no pre-existing functions or tables required.
 */
async function runDDL(sql: string): Promise<{ error: string | null }> {
	const client = new pg.Client({ connectionString: POSTGRES_URL_NON_POOLING, ssl: { rejectUnauthorized: false } });
	try {
		await client.connect();
		await client.query(sql);
		return { error: null };
	} catch (e) {
		return { error: e instanceof Error ? e.message : String(e) };
	} finally {
		await client.end();
	}
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
export const actions = {
	import: async ({ request }: import('./$types').RequestEvent) => {
		const formData = await request.formData();
		const file = formData.get('file');
		const mode = String(formData.get('mode') ?? 'append'); // append | replace

		if (!file || typeof file === 'string') {
			return fail(400, { error: 'Nije odabrana datoteka.' });
		}

		let bundle: ImportBundle;
		try {
			const text = await file.text();
			const parsed: unknown = JSON.parse(text);
			if (!isBundle(parsed)) throw new Error('Neispravan format datoteke.');
			bundle = parsed;
		} catch (e) {
			const msg = e instanceof Error ? e.message : 'Greška pri čitanju datoteke.';
			return fail(400, { error: msg });
		}

		const tables = bundle.tables ?? {};
		const summary: Record<string, number> = {};
		const errors: string[] = [];

		// ------------------------------------------------------------------
		// Schema mode: run the DDL first so all tables exist before upsert
		// ------------------------------------------------------------------
		if (bundle.format === 'schema+data' && bundle.schema_ddl) {
			const { error: ddlErr } = await runDDL(bundle.schema_ddl);
			if (ddlErr) {
				return fail(500, { error: `Greška pri postavljanju sheme:\n${ddlErr}` });
			}
			summary.schema = 1;
		}

		// ------------------------------------------------------------------
		// Replace mode: delete existing rows first (order matters for FKs)
		// ------------------------------------------------------------------
		if (mode === 'replace') {
			// votes first (FK to nominees), then nominees
			await supabaseAdmin.from('votes').delete().neq('id', '00000000-0000-0000-0000-000000000000');
			await supabaseAdmin.from('nominees').delete().neq('id', '00000000-0000-0000-0000-000000000000');
			await supabaseAdmin.from('stories').delete().neq('id', '00000000-0000-0000-0000-000000000000');
			await supabaseAdmin.from('site_content').delete().neq('key', '__never__');
		}

		// ------------------------------------------------------------------
		// nominees
		// ------------------------------------------------------------------
		if (tables.nominees?.length) {
			const { error: err, count } = await supabaseAdmin
				.from('nominees')
				.upsert(tables.nominees as never[], { onConflict: 'id', count: 'exact' });
			if (err) errors.push(`nominees: ${err.message}`);
			else summary.nominees = count ?? tables.nominees.length;
		}

		// ------------------------------------------------------------------
		// votes (nominees must exist first because of the FK)
		// ------------------------------------------------------------------
		if (tables.votes?.length) {
			const { error: err, count } = await supabaseAdmin
				.from('votes')
				.upsert(tables.votes as never[], { onConflict: 'id', count: 'exact' });
			if (err) errors.push(`votes: ${err.message}`);
			else summary.votes = count ?? tables.votes.length;
		}

		// ------------------------------------------------------------------
		// stories
		// ------------------------------------------------------------------
		if (tables.stories?.length) {
			const { error: err, count } = await supabaseAdmin
				.from('stories')
				.upsert(tables.stories as never[], { onConflict: 'id', count: 'exact' });
			if (err) errors.push(`stories: ${err.message}`);
			else summary.stories = count ?? tables.stories.length;
		}

		// ------------------------------------------------------------------
		// site_content
		// ------------------------------------------------------------------
		if (tables.site_content?.length) {
			const { error: err, count } = await supabaseAdmin
				.from('site_content')
				.upsert(tables.site_content as never[], { onConflict: 'key', count: 'exact' });
			if (err) errors.push(`site_content: ${err.message}`);
			else summary.site_content = count ?? tables.site_content.length;
		}

		// ------------------------------------------------------------------
		// auth users — recreate with admin API (password reset required after)
		// ------------------------------------------------------------------
		if (bundle.auth?.users?.length) {
			let created = 0;
			for (const u of bundle.auth.users) {
				if (!u.email) continue;
				// Check if user already exists by email.
				const { data: existing } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
				const alreadyExists = existing?.users?.some((eu) => eu.email === u.email);
				if (alreadyExists) { created++; continue; }
				const { error: err } = await supabaseAdmin.auth.admin.createUser({
					email: u.email,
					email_confirm: true,
					user_metadata: u.user_metadata ?? {}
				});
				if (err) errors.push(`auth user ${u.email}: ${err.message}`);
				else created++;
			}
			summary.auth_users = created;
		}

		if (errors.length > 0) {
			return fail(500, {
				error: `Uvoz djelomično neuspješan:\n${errors.join('\n')}`,
				summary
			});
		}

		return { success: true, summary };
	}
};
;null as any as PageServerLoad;;null as any as Actions;