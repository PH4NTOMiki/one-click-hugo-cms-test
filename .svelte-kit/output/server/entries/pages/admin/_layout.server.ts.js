import { redirect } from "@sveltejs/kit";
const load = async ({ locals, url }) => {
  const session = await locals.getSession();
  if (!session && url.pathname !== "/admin/login") {
    throw redirect(303, "/admin/login");
  }
  if (session && url.pathname === "/admin/login") {
    throw redirect(303, "/admin");
  }
  return { session };
};
export {
  load
};
