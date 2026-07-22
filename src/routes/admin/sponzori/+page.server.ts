import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { supabaseAdmin } from '$lib/server/supabaseAdmin';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: sponsors, error } = await locals.supabase
		.from('sponsors')
		.select('*')
		.order('sort_order', { ascending: true })
		.order('created_at', { ascending: true });

	if (error) throw error;

	return { sponsors: sponsors ?? [] };
};

export const actions: Actions = {
	logout: async ({ locals }) => {
		await locals.supabase.auth.signOut();
		throw redirect(303, '/admin/login');
	},

	addSponsor: async ({ request }) => {
		const f = await request.formData();
		const name = String(f.get('name') ?? '').trim();
		const websiteUrl = String(f.get('website_url') ?? '').trim();
		const sortOrder = Number.parseInt(String(f.get('sort_order') ?? '0'), 10);
		const image = f.get('image');

		if (!name) {
			return fail(400, { error: 'Unesite naziv sponzora.' });
		}

		let imageUrl: string | null = null;
		if (image instanceof File && image.size > 0) {
			const extension = (image.name.split('.').pop() ?? 'png').toLowerCase();
			const filePath = `sponsors/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
			const uploadBuffer = Buffer.from(await image.arrayBuffer());

			const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
				.from('sponsors')
				.upload(filePath, uploadBuffer, {
					upsert: true,
					contentType: image.type || 'application/octet-stream'
				});

			if (uploadError || !uploadData?.path) {
				return fail(500, { error: 'Nije moguće prenijeti sliku u Supabase Storage.' });
			}

			const { data: publicData } = supabaseAdmin.storage.from('sponsors').getPublicUrl(uploadData.path);
			imageUrl = publicData.publicUrl ?? null;
		}

		const { error } = await supabaseAdmin.from('sponsors').insert({
			name,
			website_url: websiteUrl || null,
			image_url: imageUrl,
			is_active: true,
			sort_order: Number.isFinite(sortOrder) ? sortOrder : 0
		});

		if (error) {
			return fail(500, { error: 'Spremanje sponzora nije uspjelo.' });
		}

		return { success: true, addedSponsor: true };
	},

	toggleSponsor: async ({ request }) => {
		const f = await request.formData();
		const id = String(f.get('id') ?? '').trim();
		if (!id) return fail(400, { error: 'Nedostaje ID sponzora.' });

		const { data: sponsor, error: fetchError } = await supabaseAdmin
			.from('sponsors')
			.select('is_active')
			.eq('id', id)
			.maybeSingle();

		if (fetchError || !sponsor) {
			return fail(500, { error: 'Nije moguće pronaći sponzora.' });
		}

		const { error } = await supabaseAdmin.from('sponsors').update({ is_active: !sponsor.is_active }).eq('id', id);
		if (error) return fail(500, { error: 'Ažuriranje sponzora nije uspjelo.' });

		return { success: true, toggledSponsor: true };
	},

	deleteSponsor: async ({ request }) => {
		const f = await request.formData();
		const id = String(f.get('id') ?? '').trim();
		if (!id) return fail(400, { error: 'Nedostaje ID sponzora.' });

		const { error } = await supabaseAdmin.from('sponsors').delete().eq('id', id);
		if (error) return fail(500, { error: 'Brisanje sponzora nije uspjelo.' });

		return { success: true, deletedSponsor: true };
	}
};
