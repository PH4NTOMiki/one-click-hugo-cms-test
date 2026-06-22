import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    env: {
      // The Supabase integration exposes browser vars with this prefix
      publicPrefix: 'NEXT_PUBLIC_'
    }
  }
};

export default config;
