// @ts-nocheck
import type { LayoutServerLoad } from './$types';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';
import { defaultContent } from '$lib/content/defaults';

export const load = async ({ locals }: Parameters<LayoutServerLoad>[0]) => {
	const { data: rows } = await supabaseAdmin
		.from('site_content')
		.select('key, value');

	const content: Record<string, string> = { ...defaultContent };
	for (const row of rows ?? []) {
		content[row.key] = row.value;
	}

	return {
		session: await locals.getSession(),
		content
	};
};
