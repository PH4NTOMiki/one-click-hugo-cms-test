// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions, PageServerLoad } from './$types';
import { contentFields, defaultContent } from '$lib/content/defaults';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
	const { data: nominees } = await locals.supabase
		.from('nominees')
		.select('id, name, first_name, last_name, workplace, city, approved, is_winner, created_at')
		.order('created_at', { ascending: false });

	const { data: votes } = await locals.supabase.from('votes').select('nominee_id');
	const counts = new Map<string, number>();
	for (const v of votes ?? []) counts.set(v.nominee_id, (counts.get(v.nominee_id) ?? 0) + 1);

	const nomineeList = (nominees ?? [])
		.map((n) => ({ ...n, vote_count: counts.get(n.id) ?? 0 }))
		.sort((a, b) => b.vote_count - a.vote_count);

	const { data: stories } = await locals.supabase
		.from('stories')
		.select('*')
		.order('created_at', { ascending: false });

	// Editable site text: start from defaults, overlay any saved values.
	const { data: contentRows } = await locals.supabase.from('site_content').select('key, value');
	const content: Record<string, string> = { ...defaultContent };
	for (const row of contentRows ?? []) {
		if (row.key in content && typeof row.value === 'string') content[row.key] = row.value;
	}

	return {
		nominees: nomineeList,
		stories: stories ?? [],
		content,
		contentFields,
		publishConfigured: Boolean(env.VERCEL_DEPLOY_HOOK_URL)
	};
};

export const actions = {
	logout: async ({ locals }: import('./$types').RequestEvent) => {
		await locals.supabase.auth.signOut();
		throw redirect(303, '/admin/login');
	},

	saveContent: async ({ request, locals }: import('./$types').RequestEvent) => {
		const f = await request.formData();
		// Only accept known keys; ignore anything else submitted.
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
	},

	updateNominee: async ({ request, locals }: import('./$types').RequestEvent) => {
		const f = await request.formData();
		const id = String(f.get('id'));
		const firstName = String(f.get('first_name') ?? '').trim();
		const lastName = String(f.get('last_name') ?? '').trim();
		const name = [firstName, lastName].filter(Boolean).join(' ').trim();
		if (name.length < 2) return fail(400, { error: 'Ime je obavezno.' });
		const { error } = await locals.supabase
			.from('nominees')
			.update({
				name,
				first_name: firstName || null,
				last_name: lastName || null,
				workplace: String(f.get('workplace') ?? '').trim() || null,
				city: String(f.get('city') ?? '').trim() || null,
				approved: f.get('approved') === 'on'
			})
			.eq('id', id);
		if (error) return fail(500, { error: 'Spremanje nije uspjelo.' });
		return { success: true };
	},

	deleteNominee: async ({ request, locals }: import('./$types').RequestEvent) => {
		const f = await request.formData();
		const { error } = await locals.supabase.from('nominees').delete().eq('id', String(f.get('id')));
		if (error) return fail(500, { error: 'Brisanje nije uspjelo.' });
		return { success: true };
	},

	setVoteWinner: async ({ request, locals }: import('./$types').RequestEvent) => {
		const f = await request.formData();
		const id = String(f.get('id'));
		// Only one voting winner at a time; the winner is shown publicly so approve it too.
		await locals.supabase.from('nominees').update({ is_winner: false }).eq('is_winner', true);
		const { error } = await locals.supabase
			.from('nominees')
			.update({ is_winner: true, approved: true })
			.eq('id', id);
		if (error) return fail(500, { error: 'Postavljanje pobjednika nije uspjelo.' });
		return { success: true };
	},

	clearVoteWinner: async ({ request, locals }: import('./$types').RequestEvent) => {
		const f = await request.formData();
		const { error } = await locals.supabase
			.from('nominees')
			.update({ is_winner: false })
			.eq('id', String(f.get('id')));
		if (error) return fail(500, { error: 'Greška.' });
		return { success: true };
	},

	updateStory: async ({ request, locals }: import('./$types').RequestEvent) => {
		const f = await request.formData();
		const id = String(f.get('id'));
		const status = String(f.get('status') ?? 'pending');
		const firstName = String(f.get('first_name') ?? '').trim();
		const lastName = String(f.get('last_name') ?? '').trim();
		const nurseName = [firstName, lastName].filter(Boolean).join(' ').trim();
		const { error } = await locals.supabase
			.from('stories')
			.update({
				nurse_name: nurseName,
				first_name: firstName || null,
				last_name: lastName || null,
				workplace: String(f.get('workplace') ?? '').trim() || null,
				city: String(f.get('city') ?? '').trim() || null,
				message: String(f.get('message') ?? '').trim(),
				status
			})
			.eq('id', id);
		if (error) return fail(500, { error: 'Spremanje nije uspjelo.' });
		return { success: true };
	},

	setWinner: async ({ request, locals }: import('./$types').RequestEvent) => {
		const f = await request.formData();
		const id = String(f.get('id'));
		// Clear previous winner, then set this one as winner + approved.
		await locals.supabase.from('stories').update({ is_winner: false }).eq('is_winner', true);
		const { error } = await locals.supabase
			.from('stories')
			.update({ is_winner: true, status: 'approved' })
			.eq('id', id);
		if (error) return fail(500, { error: 'Postavljanje pobjednika nije uspjelo.' });
		return { success: true };
	},

	clearWinner: async ({ request, locals }: import('./$types').RequestEvent) => {
		const f = await request.formData();
		const { error } = await locals.supabase
			.from('stories')
			.update({ is_winner: false })
			.eq('id', String(f.get('id')));
		if (error) return fail(500, { error: 'Greška.' });
		return { success: true };
	},

	deleteStory: async ({ request, locals }: import('./$types').RequestEvent) => {
		const f = await request.formData();
		const { error } = await locals.supabase.from('stories').delete().eq('id', String(f.get('id')));
		if (error) return fail(500, { error: 'Brisanje nije uspjelo.' });
		return { success: true };
	}
};
;null as any as Actions;