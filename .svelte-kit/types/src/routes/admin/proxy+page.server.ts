// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = async () => {
	throw redirect(303, '/admin/glasanje');
};
;null as any as PageServerLoad;