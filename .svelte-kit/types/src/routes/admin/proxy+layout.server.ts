// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

// Routes inside /admin that are intentionally public (no login required).
const PUBLIC_ADMIN_PATHS = ['/admin/login', '/admin/import'];

export const load = async ({ locals, url }: Parameters<LayoutServerLoad>[0]) => {
	const session = await locals.getSession();
	const isPublicPath = PUBLIC_ADMIN_PATHS.includes(url.pathname);

	if (!session && !isPublicPath) {
		throw redirect(303, '/admin/login');
	}
	if (session && url.pathname === '/admin/login') {
		throw redirect(303, '/admin');
	}

	return { session };
};
