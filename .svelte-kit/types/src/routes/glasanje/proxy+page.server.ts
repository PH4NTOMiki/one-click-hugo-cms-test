// @ts-nocheck
import { fail } from '@sveltejs/kit';
import { randomUUID } from 'crypto';
import type { Actions, PageServerLoad } from './$types';

const VOTER_COOKIE = 'najsestra_voter';

export const load = async ({ locals, cookies }: Parameters<PageServerLoad>[0]) => {
	const { data: nominees } = await locals.supabase
		.from('nominees')
		.select('id, name, workplace, city, created_at')
		.eq('approved', true);

	const { data: votes } = await locals.supabase.from('votes').select('nominee_id');

	const counts = new Map<string, number>();
	for (const v of votes ?? []) {
		counts.set(v.nominee_id, (counts.get(v.nominee_id) ?? 0) + 1);
	}

	const list = (nominees ?? [])
		.map((n) => ({ ...n, vote_count: counts.get(n.id) ?? 0 }))
		.sort((a, b) => b.vote_count - a.vote_count || a.name.localeCompare(b.name));

	const voterId = cookies.get(VOTER_COOKIE);
	let votedNomineeId: string | null = null;
	if (voterId) {
		const { data: existing } = await locals.supabase
			.from('votes')
			.select('nominee_id')
			.eq('voter_id', voterId)
			.maybeSingle();
		votedNomineeId = existing?.nominee_id ?? null;
	}

	return { nominees: list, votedNomineeId, totalVotes: votes?.length ?? 0 };
};

export const actions = {
	nominate: async ({ request, locals }: import('./$types').RequestEvent) => {
		const form = await request.formData();
		const name = String(form.get('name') ?? '').trim();
		const workplace = String(form.get('workplace') ?? '').trim();
		const city = String(form.get('city') ?? '').trim();

		if (name.length < 2) {
			return fail(400, { nominateError: 'Unesite ime i prezime sestre.' });
		}

		const { error } = await locals.supabase.from('nominees').insert({
			name,
			workplace: workplace || null,
			city: city || null
		});

		if (error) {
			return fail(500, { nominateError: 'Došlo je do pogreške. Pokušajte ponovno.' });
		}
		return { nominateSuccess: true };
	},

	vote: async ({ request, locals, cookies }: import('./$types').RequestEvent) => {
		const form = await request.formData();
		const nomineeId = String(form.get('nominee_id') ?? '');
		if (!nomineeId) return fail(400, { voteError: 'Nedostaje sestra za glasanje.' });

		let voterId = cookies.get(VOTER_COOKIE);

		// Already voted? Block (one vote per browser).
		if (voterId) {
			const { data: existing } = await locals.supabase
				.from('votes')
				.select('id')
				.eq('voter_id', voterId)
				.maybeSingle();
			if (existing) {
				return fail(400, { voteError: 'Već ste glasali. Hvala!' });
			}
		} else {
			voterId = randomUUID();
			cookies.set(VOTER_COOKIE, voterId, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365,
				httpOnly: true,
				sameSite: 'lax'
			});
		}

		const { error } = await locals.supabase
			.from('votes')
			.insert({ nominee_id: nomineeId, voter_id: voterId });

		if (error) {
			return fail(500, { voteError: 'Glasanje nije uspjelo. Pokušajte ponovno.' });
		}
		return { voteSuccess: true };
	}
};
;null as any as Actions;