// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
	const { data: nominees } = await locals.supabase
		.from('nominees')
		.select('id, name, workplace, city, approved, created_at')
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

	return { nominees: nomineeList, stories: stories ?? [] };
};

export const actions = {
	logout: async ({ locals }: import('./$types').RequestEvent) => {
		await locals.supabase.auth.signOut();
		throw redirect(303, '/admin/login');
	},

	updateNominee: async ({ request, locals }: import('./$types').RequestEvent) => {
		const f = await request.formData();
		const id = String(f.get('id'));
		const name = String(f.get('name') ?? '').trim();
		if (name.length < 2) return fail(400, { error: 'Ime je obavezno.' });
		const { error } = await locals.supabase
			.from('nominees')
			.update({
				name,
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

	updateStory: async ({ request, locals }: import('./$types').RequestEvent) => {
		const f = await request.formData();
		const id = String(f.get('id'));
		const status = String(f.get('status') ?? 'pending');
		const { error } = await locals.supabase
			.from('stories')
			.update({
				nurse_name: String(f.get('nurse_name') ?? '').trim(),
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