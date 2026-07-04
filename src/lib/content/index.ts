// Runtime access to site text.
// Values are fetched from the Supabase `site_content` table on every request
// via the root layout server load and passed down through SvelteKit's data
// system. This means string changes in the admin panel take effect immediately
// on the next page load — no redeploy needed.

import { defaultContent } from './defaults';

export type ContentRecord = Record<string, string>;

/**
 * Create a `t()` lookup bound to a live content record from the server load.
 * Falls back to built-in defaults for any key not found in the record.
 *
 * Usage in a .svelte file:
 *   const t = makeT(data.content);
 */
export function makeT(record: ContentRecord) {
	return function t(key: string): string {
		return record[key] ?? defaultContent[key] ?? '';
	};
}
