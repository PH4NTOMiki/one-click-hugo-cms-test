// Runtime access to site text. Values come from `generated.json`, which is
// (re)written at build time from the Supabase `site_content` table by the Vite
// plugin in vite.config.ts. This means text only refreshes on a new deploy or
// redeploy — never on a per-request database read.

import generated from './generated.json';
import { defaultContent } from './defaults';

const merged: Record<string, string> = { ...defaultContent, ...(generated as Record<string, string>) };

/** Get an editable string by key, falling back to the built-in default. */
export function t(key: string): string {
	return merged[key] ?? defaultContent[key] ?? '';
}

export const content = merged;
