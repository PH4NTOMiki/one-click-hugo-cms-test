import { createServerClient } from "@supabase/ssr";
const NEXT_PUBLIC_SUPABASE_URL = "https://ypuslxpsigjznuemoptf.supabase.co";
const NEXT_PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwdXNseHBzaWdqem51ZW1vcHRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNDUzODUsImV4cCI6MjA5NzcyMTM4NX0.ifxXs4tdySPpjhlZpjqChRcX5gVaCCcpRh9Q2McsWyA";
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
