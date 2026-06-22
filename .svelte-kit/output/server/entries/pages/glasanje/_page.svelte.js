import { h as head, e as escape_html, c as ensure_array_like, f as attr, i as attr_style, j as stringify, d as derived } from "../../../chunks/index.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    const hasVoted = derived(() => !!data.votedNomineeId);
    const maxVotes = derived(() => Math.max(1, ...data.nominees.map((n) => n.vote_count ?? 0)));
    head("tl1qz2", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Glasanje — NajSestra</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Glasajte za najbolju dijabetičku sestru u Hrvatskoj."/>`);
    });
    $$renderer2.push(`<section class="mx-auto max-w-3xl px-4 py-12"><a href="/" class="text-sm text-muted-foreground transition-colors hover:text-foreground">← Naslovnica</a> <div class="mt-4 flex flex-wrap items-end justify-between gap-4"><div><h1 class="text-3xl font-semibold sm:text-4xl">Glasanje</h1> <p class="mt-2 leading-relaxed text-muted-foreground">Predložite sestru ili glasajte za jednu od predloženih. Svaki posjetitelj ima jedan glas.</p></div> <p class="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">Ukupno glasova: <strong class="text-foreground">${escape_html(data.totalVotes)}</strong></p></div> <div class="mt-8 rounded-2xl border border-border bg-card p-6"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold">Predloži sestru</h2> <button type="button" class="text-sm font-medium text-primary hover:underline">${escape_html("Dodaj novu")}</button></div> `);
    if (form?.nominateSuccess) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="mt-4 rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary">Hvala! Prijedlog je zabilježen.</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (form?.voteError) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="mt-6 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">${escape_html(form.voteError)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (hasVoted()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="mt-6 rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary">Vaš glas je zabilježen. Hvala što ste sudjelovali!</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="mt-6 grid gap-3">`);
    const each_array = ensure_array_like(data.nominees);
    if (each_array.length !== 0) {
      $$renderer2.push("<!--[-->");
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let nominee = each_array[i];
        $$renderer2.push(`<div class="rounded-2xl border border-border bg-card p-5"><div class="flex items-center justify-between gap-4"><div class="min-w-0"><div class="flex items-center gap-2">`);
        if (i === 0 && nominee.vote_count > 0) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span class="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent-foreground">Vodi</span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> <h3 class="truncate text-lg font-semibold">${escape_html(nominee.name)}</h3></div> <p class="mt-0.5 text-sm text-muted-foreground">${escape_html([nominee.workplace, nominee.city].filter(Boolean).join(" · ") || "Dijabetička sestra")}</p></div> <div class="flex shrink-0 items-center gap-3"><span class="text-right"><span class="block text-xl font-semibold">${escape_html(nominee.vote_count)}</span> <span class="block text-xs text-muted-foreground">glasova</span></span> <form method="POST" action="?/vote"><input type="hidden" name="nominee_id"${attr("value", nominee.id)}/> <button type="submit"${attr("disabled", hasVoted(), true)} class="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">Glasaj</button></form></div></div> <div class="mt-3 h-2 overflow-hidden rounded-full bg-muted"><div class="h-full rounded-full bg-primary"${attr_style(`width: ${stringify((nominee.vote_count ?? 0) / maxVotes() * 100)}%`)}></div></div></div>`);
      }
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<p class="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">Još nema predloženih sestara. Budite prvi koji će nekoga predložiti!</p>`);
    }
    $$renderer2.push(`<!--]--></div></section>`);
  });
}
export {
  _page as default
};
