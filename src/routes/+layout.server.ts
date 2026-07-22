import type { LayoutServerLoad } from './$types';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';
import { defaultContent } from '$lib/content/defaults';

export const load: LayoutServerLoad = async ({ locals }) => {
	const [{ data: rows }, { data: sponsorRows }] = await Promise.all([
		supabaseAdmin.from('site_content').select('key, value'),
		locals.supabase
			.from('sponsors')
			.select('id, name, website_url, image_url, sort_order')
			.eq('is_active', true)
			.order('sort_order', { ascending: true })
			.order('created_at', { ascending: true })
	]);

	const content: Record<string, string> = { ...defaultContent };
	for (const row of rows ?? []) {
		content[row.key] = row.value;
	}

	return {
		session: await locals.getSession(),
		content,
		sponsors: sponsorRows ?? []
	};
};
