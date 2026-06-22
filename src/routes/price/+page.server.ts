import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: stories } = await locals.supabase
		.from('stories')
		.select('id, nurse_name, workplace, city, message, is_winner, created_at')
		.or('status.eq.approved,is_winner.eq.true')
		.order('is_winner', { ascending: false })
		.order('created_at', { ascending: false });

	return { stories: stories ?? [] };
};

export const actions: Actions = {
	submit: async ({ request, locals }) => {
		const form = await request.formData();
		const nurseName = String(form.get('nurse_name') ?? '').trim();
		const workplace = String(form.get('workplace') ?? '').trim();
		const city = String(form.get('city') ?? '').trim();
		const authorName = String(form.get('author_name') ?? '').trim();
		const authorEmail = String(form.get('author_email') ?? '').trim();
		const message = String(form.get('message') ?? '').trim();

		const values = { nurseName, workplace, city, authorName, authorEmail, message };

		if (nurseName.length < 2) {
			return fail(400, { error: 'Unesite ime sestre.', values });
		}
		if (message.length < 20) {
			return fail(400, { error: 'Priča treba imati barem 20 znakova.', values });
		}

		const { error } = await locals.supabase.from('stories').insert({
			nurse_name: nurseName,
			workplace: workplace || null,
			city: city || null,
			author_name: authorName || null,
			author_email: authorEmail || null,
			message
		});

		if (error) {
			return fail(500, { error: 'Došlo je do pogreške. Pokušajte ponovno.', values });
		}
		return { success: true };
	}
};
