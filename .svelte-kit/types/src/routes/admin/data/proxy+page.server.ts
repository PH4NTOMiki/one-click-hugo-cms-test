// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = async () => {
	return {};
};

export const actions = {
	logout: async ({ locals }: import('./$types').RequestEvent) => {
		await locals.supabase.auth.signOut();
		throw redirect(303, '/admin/login');
	}
};
;null as any as PageServerLoad;;null as any as Actions;