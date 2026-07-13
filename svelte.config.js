import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    // Pin the serverless runtime to Node 22, which has native WebSocket
    // support required by @supabase/realtime-js (Node 20 lacks it).
    adapter: adapter({ runtime: 'nodejs22.x' }),
    env: {
      // The Supabase integration exposes browser vars with this prefix
      publicPrefix: 'NEXT_PUBLIC_'
    }
  }
};

export default config;
