import { fail } from "@sveltejs/kit";
const actions = {
  submit: async ({ request, locals }) => {
    const form = await request.formData();
    const firstName = String(form.get("first_name") ?? "").trim();
    const lastName = String(form.get("last_name") ?? "").trim();
    const nurseName = [firstName, lastName].filter(Boolean).join(" ").trim();
    const workplace = String(form.get("workplace") ?? "").trim();
    const city = String(form.get("city") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const confirmPatient = form.get("confirm_patient") === "on";
    const acceptRules = form.get("accept_rules") === "on";
    const values = { firstName, lastName, workplace, city, message };
    if (firstName.length < 2) {
      return fail(400, { error: "Unesite ime medicinske sestre.", values });
    }
    if (lastName.length < 2) {
      return fail(400, { error: "Unesite prezime medicinske sestre.", values });
    }
    if (workplace.length < 2) {
      return fail(400, { error: "Unesite ustanovu u kojoj sestra radi.", values });
    }
    if (message.length < 20) {
      return fail(400, { error: "Priča treba imati barem 20 znakova.", values });
    }
    if (message.length > 1e3) {
      return fail(400, { error: "Priča može imati najviše 1000 znakova.", values });
    }
    if (!confirmPatient || !acceptRules) {
      return fail(400, { error: "Molimo potvrdite oba uvjeta za sudjelovanje.", values });
    }
    const { error } = await locals.supabase.from("stories").insert({
      nurse_name: nurseName,
      first_name: firstName,
      last_name: lastName,
      workplace: workplace || null,
      city: city || null,
      message
    });
    if (error) {
      return fail(500, { error: "Došlo je do pogreške. Pokušajte ponovno.", values });
    }
    return { success: true };
  }
};
export {
  actions
};
