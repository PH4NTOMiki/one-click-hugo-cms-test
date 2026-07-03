import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import { defaultContent } from './src/lib/content/defaults';

/** Read env vars from the v0 shared env file so the Vite plugin can reach Supabase at dev-server start. */
function loadSharedEnv(): Record<string, string> {
	const sharedPath = '/vercel/share/.env.project';
	if (!existsSync(sharedPath)) return {};
	const result: Record<string, string> = {};
	const lines = readFileSync(sharedPath, 'utf-8').split('\n');
	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const eqIdx = trimmed.indexOf('=');
		if (eqIdx < 0) continue;
		const key = trimmed.slice(0, eqIdx).trim();
		let val = trimmed.slice(eqIdx + 1).trim();
		if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"'))) {
			val = val.slice(1, -1);
		}
		result[key] = val;
	}
	return result;
}

// Runs at build start (every `vite build`, i.e. every Vercel deploy/redeploy)
// and on dev-server start. It reads the editable strings from the Supabase
// `site_content` table and bakes them into `src/lib/content/generated.json`.
// The running app never queries the database for this text — it only refreshes
// when the site is rebuilt. If Supabase is unreachable, defaults are used so
// the build can never fail because of content.
function contentPlugin(env: Record<string, string>): Plugin {
	return {
		name: 'najsestra-content-generator',
		async buildStart() {
			const url = env.NEXT_PUBLIC_SUPABASE_URL;
			const key = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
			const merged: Record<string, string> = { ...defaultContent };

			if (url && key) {
				try {
					const supabase = createClient(url, key, { auth: { persistSession: false } });
					const { data, error } = await supabase.from('site_content').select('key, value');
					if (error) {
						console.warn('[content] Supabase fetch failed, using defaults:', error.message);
					} else if (data) {
						for (const row of data) {
							if (row.key in merged && typeof row.value === 'string') {
								merged[row.key] = row.value;
							}
						}
						console.log(`[content] Loaded ${data.length} string(s) from Supabase`);
					}
				} catch (e) {
					console.warn('[content] Could not reach Supabase, using defaults:', (e as Error).message);
				}
			} else {
				console.warn('[content] Supabase env not set — using default content');
			}

			const outPath = fileURLToPath(new URL('./src/lib/content/generated.json', import.meta.url));
			writeFileSync(outPath, JSON.stringify(merged, null, 2) + '\n');
		}
	};
}

export default defineConfig(({ mode }) => {
	// Load every env var (no prefix filter) so we can reach Supabase at build time.
	// Merge with the shared v0 env file so the Vite plugin can reach Supabase at dev-server start.
	const env = { ...loadSharedEnv(), ...loadEnv(mode, process.cwd(), '') };
	return {
		plugins: [contentPlugin(env), tailwindcss(), sveltekit()],
		server: {
			allowedHosts: true
		}
	};
});
