// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
	const { data: stories } = await locals.supabase
		.from('stories')
		.select('*')
		.order('created_at', { ascending: false });

	return { stories: stories ?? [] };
};

export const actions = {
	logout: async ({ locals }: import('./$types').RequestEvent) => {
		await locals.supabase.auth.signOut();
		throw redirect(303, '/admin/login');
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