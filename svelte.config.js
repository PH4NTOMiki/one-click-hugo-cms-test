import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    // Pin the serverless runtime so the build doesn't try to default to the
    // (unsupported) Node version of the build machine.
    adapter: adapter({ runtime: 'nodejs20.x' }),
    env: {
      // The Supabase integration exposes browser vars with this prefix
      publicPrefix: 'NEXT_PUBLIC_'
    }
  }
};

export default config;
