import { h as head, f as attr_class, e as escape_html, b as attr, a as ensure_array_like, d as derived } from "../../../chunks/index.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    let editingNominee = null;
    let search = "";
    let nomineeSort = "votes";
    function matches(...fields) {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return fields.some((f) => (f ?? "").toLowerCase().includes(q));
    }
    const filteredNominees = derived(() => [...data.nominees].filter((n) => matches(n.name, n.workplace, n.city)).sort((a, b) => {
      return (b.vote_count ?? 0) - (a.vote_count ?? 0);
    }));
    head("1jef3w8", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Uredništvo — NajSestra</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-background"><header class="border-b border-border bg-card"><div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4"><div class="flex items-center gap-2"><span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"></path></svg></span> <span class="font-semibold">Uredništvo</span></div> <div class="flex items-center gap-4"><a href="/" class="text-sm text-muted-foreground hover:text-foreground">Pogledaj stranicu</a> <form method="POST" action="?/logout"><button class="rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted">Odjava</button></form></div></div></header> <main class="mx-auto max-w-5xl px-4 py-8"><h1 class="text-2xl font-semibold">Rezultati</h1> <div class="mt-6 inline-flex rounded-xl border border-border bg-card p-1"><button${attr_class(`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${"bg-primary text-primary-foreground"}`)}>Glasanje (${escape_html(data.nominees.length)})</button> <button${attr_class(`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${"text-muted-foreground hover:text-foreground"}`)}>Priče (${escape_html(data.stories.length)})</button> <button${attr_class(`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${"text-muted-foreground hover:text-foreground"}`)}>Tekstovi</button></div> `);
    if (form?.error) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">${escape_html(form.error)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="mt-6 flex flex-wrap items-center gap-3"><div class="relative flex-1 min-w-[200px]"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg> <input${attr("value", search)} placeholder="Pretraži po imenu, ustanovi ili gradu…" class="w-full rounded-xl border border-input bg-card py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-primary"/></div> `);
      {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<label class="flex items-center gap-2 text-sm text-muted-foreground">Sortiraj `);
        $$renderer2.select(
          {
            value: nomineeSort,
            class: "rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground"
          },
          ($$renderer3) => {
            $$renderer3.option({ value: "votes" }, ($$renderer4) => {
              $$renderer4.push(`Najviše glasova`);
            });
            $$renderer3.option({ value: "name" }, ($$renderer4) => {
              $$renderer4.push(`Ime (A–Ž)`);
            });
            $$renderer3.option({ value: "newest" }, ($$renderer4) => {
              $$renderer4.push(`Najnovije`);
            });
          }
        );
        $$renderer2.push(`</label> <a href="/admin/export?type=nominees" download="" class="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-muted"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg> Izvezi CSV</a>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="mt-4 grid gap-3">`);
      const each_array = ensure_array_like(filteredNominees());
      if (each_array.length !== 0) {
        $$renderer2.push("<!--[-->");
        for (let i = 0, $$length = each_array.length; i < $$length; i++) {
          let n = each_array[i];
          $$renderer2.push(`<div class="rounded-xl border border-border bg-card p-4">`);
          if (editingNominee === n.id) {
            $$renderer2.push("<!--[0-->");
            $$renderer2.push(`<form method="POST" action="?/updateNominee" class="grid gap-3"><input type="hidden" name="id"${attr("value", n.id)}/> <div class="grid gap-3 sm:grid-cols-2"><input name="first_name"${attr("value", n.first_name ?? "")} placeholder="Ime" class="rounded-lg border border-input bg-background px-3 py-2"/> <input name="last_name"${attr("value", n.last_name ?? "")} placeholder="Prezime" class="rounded-lg border border-input bg-background px-3 py-2"/></div> <div class="grid gap-3 sm:grid-cols-2"><input name="workplace"${attr("value", n.workplace ?? "")} placeholder="Ustanova" class="rounded-lg border border-input bg-background px-3 py-2"/> <input name="city"${attr("value", n.city ?? "")} placeholder="Grad" class="rounded-lg border border-input bg-background px-3 py-2"/></div> <label class="flex items-center gap-2 text-sm"><input type="checkbox" name="approved"${attr("checked", n.approved, true)} class="h-4 w-4"/> Vidljivo na stranici</label> <div class="flex gap-2"><button class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Spremi</button> <button type="button" class="rounded-lg border border-border px-4 py-2 text-sm">Odustani</button></div></form>`);
          } else {
            $$renderer2.push("<!--[-1-->");
            $$renderer2.push(`<div class="flex items-center justify-between gap-4"><div class="flex items-center gap-3"><span class="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">${escape_html(i + 1)}</span> <div><div class="flex items-center gap-2"><h3 class="font-semibold">${escape_html(n.name)}</h3> `);
            if (n.is_winner) {
              $$renderer2.push("<!--[0-->");
              $$renderer2.push(`<span class="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary">Pobjednik</span>`);
            } else {
              $$renderer2.push("<!--[-1-->");
            }
            $$renderer2.push(`<!--]--> `);
            if (!n.approved) {
              $$renderer2.push("<!--[0-->");
              $$renderer2.push(`<span class="rounded-full bg-destructive/10 px-2 py-0.5 text-xs text-destructive">Skriveno</span>`);
            } else {
              $$renderer2.push("<!--[-1-->");
            }
            $$renderer2.push(`<!--]--></div> <p class="text-sm text-muted-foreground">${escape_html([n.workplace, n.city].filter(Boolean).join(" · ") || "—")}</p></div></div> <div class="flex items-center gap-3"><span class="text-right"><span class="block font-semibold">${escape_html(n.vote_count)}</span><span class="block text-xs text-muted-foreground">glasova</span></span> <button class="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted">Uredi</button> <form method="POST" action="?/deleteNominee"><input type="hidden" name="id"${attr("value", n.id)}/> <button class="rounded-lg border border-border px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10">Obriši</button></form></div></div> <div class="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">`);
            if (n.is_winner) {
              $$renderer2.push("<!--[0-->");
              $$renderer2.push(`<form method="POST" action="?/clearVoteWinner"><input type="hidden" name="id"${attr("value", n.id)}/> <button class="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted">Ukloni pobjednika</button></form>`);
            } else {
              $$renderer2.push("<!--[-1-->");
              $$renderer2.push(`<form method="POST" action="?/setVoteWinner"><input type="hidden" name="id"${attr("value", n.id)}/> <button class="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90">Proglasi pobjednikom</button></form>`);
            }
            $$renderer2.push(`<!--]--></div>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        }
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<p class="rounded-xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">Nema rezultata.</p>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></main></div>`);
  });
}
export {
  _page as default
};
