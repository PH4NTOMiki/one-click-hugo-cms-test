import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

// Routes inside /admin that are intentionally public (no login required).
const PUBLIC_ADMIN_PATHS = ['/admin/login', '/admin/import'];

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const session = await locals.getSession();
	const isPublicPath = PUBLIC_ADMIN_PATHS.includes(url.pathname);

	if (!session && !isPublicPath) {
		throw redirect(303, '/admin/login');
	}
	if (session && url.pathname === '/admin/login') {
		throw redirect(303, '/admin/glasanje');
	}

	// Fetch counts for nav badges (only when logged in).
	let nomineeCount = 0;
	let storyCount = 0;

	if (session) {
		const [{ count: nc }, { count: sc }] = await Promise.all([
			locals.supabase.from('nominees').select('id', { count: 'exact', head: true }),
			locals.supabase.from('stories').select('id', { count: 'exact', head: true })
		]);
		nomineeCount = nc ?? 0;
		storyCount = sc ?? 0;
	}

	return { session, nomineeCount, storyCount };
};
