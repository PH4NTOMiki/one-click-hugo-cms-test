import { fail } from "@sveltejs/kit";
import { randomUUID } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { P as PUBLIC_SUPABASE_URL } from "../../../chunks/config.js";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjeWV4d2txd2R2cHRjeHNlb3huIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzA5MTMyOSwiZXhwIjoyMDk4NjY3MzI5fQ.q8Hb7QKQmbeDtyAfOAIKOTTPOdg5tUfc3ulBos1HHbs";
const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
});
const VOTER_COOKIE = "najsestra_voter";
const load = async ({ cookies }) => {
  const voterId = cookies.get(VOTER_COOKIE);
  let hasVoted = false;
  if (voterId) {
    const { data: existing } = await supabaseAdmin.from("votes").select("id").eq("voter_id", voterId).maybeSingle();
    hasVoted = !!existing;
  }
  return { hasVoted };
};
const actions = {
  vote: async ({ request, cookies }) => {
    const form = await request.formData();
    const firstName = String(form.get("first_name") ?? "").trim();
    const lastName = String(form.get("last_name") ?? "").trim();
    const name = [firstName, lastName].filter(Boolean).join(" ").trim();
    const workplace = String(form.get("workplace") ?? "").trim();
    const city = String(form.get("city") ?? "").trim();
    const confirmPatient = form.get("confirm_patient") === "on";
    const acceptRules = form.get("accept_rules") === "on";
    const values = { firstName, lastName, workplace, city };
    if (firstName.length < 2) {
      return fail(400, { error: "Unesite ime medicinske sestre.", values });
    }
    if (lastName.length < 2) {
      return fail(400, { error: "Unesite prezime medicinske sestre.", values });
    }
    if (workplace.length < 2) {
      return fail(400, { error: "Unesite ustanovu u kojoj sestra radi.", values });
    }
    if (!confirmPatient || !acceptRules) {
      return fail(400, { error: "Molimo potvrdite oba uvjeta za sudjelovanje.", values });
    }
    let voterId = cookies.get(VOTER_COOKIE);
    if (voterId) {
      const { data: existing } = await supabaseAdmin.from("votes").select("id").eq("voter_id", voterId).maybeSingle();
      if (existing) {
        return fail(400, { error: "Već ste glasali. Hvala što ste sudjelovali!", values });
      }
    } else {
      voterId = randomUUID();
      cookies.set(VOTER_COOKIE, voterId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: "lax"
      });
    }
    const { data: match } = await supabaseAdmin.from("nominees").select("id").ilike("name", name).ilike("workplace", workplace).limit(1).maybeSingle();
    let nomineeId = match?.id;
    if (!nomineeId) {
      const { data: created, error: insertError } = await supabaseAdmin.from("nominees").insert({
        name,
        first_name: firstName,
        last_name: lastName,
        workplace: workplace || null,
        city: city || null
      }).select("id").single();
      if (insertError || !created) {
        return fail(500, { error: "Došlo je do pogreške. Pokušajte ponovno.", values });
      }
      nomineeId = created.id;
    }
    const { error: voteError } = await supabaseAdmin.from("votes").insert({ nominee_id: nomineeId, voter_id: voterId });
    if (voteError) {
      return fail(500, { error: "Glasanje nije uspjelo. Pokušajte ponovno.", values });
    }
    return { success: true };
  }
};
export {
  actions,
  load
};
