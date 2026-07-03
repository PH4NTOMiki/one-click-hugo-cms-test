import { redirect, error } from "@sveltejs/kit";
function csvCell(value) {
  const s = value === null || value === void 0 ? "" : String(value);
  if (/[";\n\r]/.test(s)) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}
function toCsv(headers, rows) {
  const lines = [headers.map(csvCell).join(";")];
  for (const row of rows) lines.push(row.map(csvCell).join(";"));
  return "\uFEFF" + lines.join("\r\n");
}
function fmtDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleString("hr-HR");
}
const GET = async ({ url, locals }) => {
  const session = await locals.getSession();
  if (!session) throw redirect(303, "/admin/login");
  const type = url.searchParams.get("type") ?? "nominees";
  const stamp = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  if (type === "nominees") {
    const { data: nominees } = await locals.supabase.from("nominees").select("first_name, last_name, name, workplace, city, approved, is_winner, created_at").order("created_at", { ascending: false });
    const { data: votes } = await locals.supabase.from("votes").select("nominee_id");
    const { data: withIds } = await locals.supabase.from("nominees").select("id, first_name, last_name, name, workplace, city, approved, is_winner, created_at").order("created_at", { ascending: false });
    const counts = /* @__PURE__ */ new Map();
    for (const v of votes ?? []) counts.set(v.nominee_id, (counts.get(v.nominee_id) ?? 0) + 1);
    const rows = (withIds ?? []).map((n) => ({ ...n, vote_count: counts.get(n.id) ?? 0 })).sort((a, b) => b.vote_count - a.vote_count).map((n) => [
      n.first_name ?? "",
      n.last_name ?? "",
      n.workplace ?? "",
      n.city ?? "",
      n.vote_count,
      n.approved ? "Da" : "Ne",
      n.is_winner ? "Da" : "Ne",
      fmtDate(n.created_at)
    ]);
    const csv = toCsv(
      ["Ime", "Prezime", "Ustanova", "Grad", "Broj glasova", "Vidljivo", "Pobjednik", "Datum"],
      rows
    );
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="glasanje-${stamp}.csv"`
      }
    });
  }
  if (type === "stories") {
    const { data: stories } = await locals.supabase.from("stories").select("first_name, last_name, workplace, city, message, status, is_winner, created_at").order("created_at", { ascending: false });
    const statusLabel = {
      pending: "Na čekanju",
      approved: "Odobreno",
      rejected: "Odbijeno"
    };
    const rows = (stories ?? []).map((s) => [
      s.first_name ?? "",
      s.last_name ?? "",
      s.workplace ?? "",
      s.city ?? "",
      s.message ?? "",
      statusLabel[s.status] ?? s.status,
      s.is_winner ? "Da" : "Ne",
      fmtDate(s.created_at)
    ]);
    const csv = toCsv(
      ["Ime", "Prezime", "Ustanova", "Grad", "Priča", "Status", "Pobjednik", "Datum"],
      rows
    );
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="price-${stamp}.csv"`
      }
    });
  }
  throw error(400, "Nepoznata vrsta izvoza.");
};
export {
  GET
};
