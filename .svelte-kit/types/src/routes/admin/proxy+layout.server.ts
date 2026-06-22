// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = async ({ locals, url }: Parameters<LayoutServerLoad>[0]) => {
	const session = await locals.getSession();

	if (!session && url.pathname !== '/admin/login') {
		throw redirect(303, '/admin/login');
	}
	if (session && url.pathname === '/admin/login') {
		throw redirect(303, '/admin');
	}

	return { session };
};
