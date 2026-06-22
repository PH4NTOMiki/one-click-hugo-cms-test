import { createServerClient } from "@supabase/ssr";
const NEXT_PUBLIC_SUPABASE_URL = "https://dwssavtekecfbfzkzsxh.supabase.co";
const NEXT_PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3c3NhdnRla2VjZmJmemt6c3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNDE3NjksImV4cCI6MjA5NzcxNzc2OX0.-3l_PydEig8E84vbQ7Tg1l8eae2d0mYHBy1NMf5hVJw";
const PUBLIC_SUPABASE_URL = NEXT_PUBLIC_SUPABASE_URL;
const PUBLIC_SUPABASE_ANON_KEY = NEXT_PUBLIC_SUPABASE_ANON_KEY;
const handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: "/" });
        });
      }
    }
  });
  event.locals.getSession = async () => {
    const {
      data: { user }
    } = await event.locals.supabase.auth.getUser();
    if (!user) return null;
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession();
    return session;
  };
  return resolve(event, {
    filterSerializedResponseHeaders: (name) => name === "content-range" || name === "x-supabase-api-version"
  });
};
export {
  handle
};
