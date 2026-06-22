import { fail, redirect } from "@sveltejs/kit";
const actions = {
  default: async ({ request, locals }) => {
    const form = await request.formData();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    if (!email || !password) {
      return fail(400, { error: "Unesite e-mail i lozinku.", email });
    }
    const { error } = await locals.supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return fail(400, { error: "Neispravan e-mail ili lozinka.", email });
    }
    throw redirect(303, "/admin");
  }
};
export {
  actions
};
