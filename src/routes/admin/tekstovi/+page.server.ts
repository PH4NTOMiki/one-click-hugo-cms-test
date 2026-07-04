import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions, PageServerLoad } from './$types';
import { contentFields, defaultContent } from '$lib/content/defaults';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: contentRows } = await locals.supabase.from('site_content').select('key, value');
	const content: Record<string, string> = { ...defaultContent };
	for (const row of contentRows ?? []) {
		if (row.key in content && typeof row.value === 'string') content[row.key] = row.value;
	}

	return { content, contentFields, publishConfigured: Boolean(env.VERCEL_DEPLOY_HOOK_URL) };
};

export const actions: Actions = {
	logout: async ({ locals }) => {
		await locals.supabase.auth.signOut();
		throw redirect(303, '/admin/login');
	},

	saveContent: async ({ request, locals }) => {
		const f = await request.formData();
		const rows = contentFields.map((field) => ({
			key: field.key,
			value: String(f.get(field.key) ?? field.default),
			updated_at: new Date().toISOString()
		}));
		const { error } = await locals.supabase.from('site_content').upsert(rows, { onConflict: 'key' });
		if (error) return fail(500, { error: 'Spremanje tekstova nije uspjelo.' });
		return { success: true, savedContent: true };
	},

	publish: async () => {
		const hook = env.VERCEL_DEPLOY_HOOK_URL;
		if (!hook) {
			return fail(400, {
				publishError: 'Objava nije podešena. Dodajte VERCEL_DEPLOY_HOOK_URL u postavkama projekta.'
			});
		}
		try {
			const res = await fetch(hook, { method: 'POST' });
			if (!res.ok) return fail(502, { publishError: 'Pokretanje objave nije uspjelo.' });
		} catch {
			return fail(502, { publishError: 'Pokretanje objave nije uspjelo.' });
		}
		return { success: true, published: true };
	}
};
