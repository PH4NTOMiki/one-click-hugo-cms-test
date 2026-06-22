import { h as head, f as attr, e as escape_html, c as ensure_array_like, d as derived } from "../../../chunks/index.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    const winner = derived(() => data.stories.find((s) => s.is_winner));
    const others = derived(() => data.stories.filter((s) => !s.is_winner));
    head("o3avsm", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Priče — NajSestra</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Podijelite motivacijsku priču o najboljoj dijabetičkoj sestri. Uredništvo bira pobjednicu."/>`);
    });
    $$renderer2.push(`<section class="mx-auto max-w-3xl px-4 py-12"><a href="/" class="text-sm text-muted-foreground transition-colors hover:text-foreground">← Naslovnica</a> <h1 class="mt-4 text-3xl font-semibold sm:text-4xl">Priče</h1> <p class="mt-2 leading-relaxed text-muted-foreground">Napišite zašto je baš ta sestra najbolja. Naše uredništvo pažljivo čita svaku priču i bira onu
		koja nas najviše dirne.</p> <div class="mt-8 rounded-2xl border border-border bg-card p-6"><h2 class="text-lg font-semibold">Podijeli svoju priču</h2> `);
    if (form?.success) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="mt-4 rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary">Hvala! Vaša priča je poslana uredništvu na pregled.</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<form method="POST" action="?/submit" class="mt-4 grid gap-3"><div class="grid gap-3 sm:grid-cols-2"><div class="grid gap-1"><label for="nurse_name" class="text-sm font-medium">Ime sestre *</label> <input id="nurse_name" name="nurse_name" required=""${attr("value", form?.values?.nurseName ?? "")} class="rounded-lg border border-input bg-background px-3 py-2 outline-none focus:border-primary" placeholder="npr. Ana Horvat"/></div> <div class="grid gap-1"><label for="city" class="text-sm font-medium">Grad</label> <input id="city" name="city"${attr("value", form?.values?.city ?? "")} class="rounded-lg border border-input bg-background px-3 py-2 outline-none focus:border-primary" placeholder="npr. Split"/></div></div> <div class="grid gap-1"><label for="workplace" class="text-sm font-medium">Ustanova</label> <input id="workplace" name="workplace"${attr("value", form?.values?.workplace ?? "")} class="rounded-lg border border-input bg-background px-3 py-2 outline-none focus:border-primary" placeholder="npr. KBC Split"/></div> <div class="grid gap-1"><label for="message" class="text-sm font-medium">Vaša priča *</label> <textarea id="message" name="message" required="" rows="5" class="resize-y rounded-lg border border-input bg-background px-3 py-2 outline-none focus:border-primary" placeholder="Opišite zašto je ova sestra posebna...">`);
      const $$body = escape_html(form?.values?.message ?? "");
      if ($$body) {
        $$renderer2.push(`${$$body}`);
      }
      $$renderer2.push(`</textarea></div> <div class="grid gap-3 sm:grid-cols-2"><div class="grid gap-1"><label for="author_name" class="text-sm font-medium">Vaše ime</label> <input id="author_name" name="author_name"${attr("value", form?.values?.authorName ?? "")} class="rounded-lg border border-input bg-background px-3 py-2 outline-none focus:border-primary" placeholder="neobavezno"/></div> <div class="grid gap-1"><label for="author_email" class="text-sm font-medium">E-mail</label> <input id="author_email" name="author_email" type="email"${attr("value", form?.values?.authorEmail ?? "")} class="rounded-lg border border-input bg-background px-3 py-2 outline-none focus:border-primary" placeholder="neobavezno"/></div></div> `);
      if (form?.error) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<p class="text-sm text-destructive">${escape_html(form.error)}</p>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <button type="submit" class="mt-1 justify-self-start rounded-xl bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-opacity hover:opacity-90">Pošalji priču</button></form>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (winner()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="mt-10 rounded-2xl border-2 border-accent bg-card p-6"><span class="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-sm font-semibold text-accent-foreground"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg> Izbor uredništva</span> <h3 class="mt-3 text-2xl font-semibold">${escape_html(winner().nurse_name)}</h3> <p class="text-sm text-muted-foreground">${escape_html([winner().workplace, winner().city].filter(Boolean).join(" · "))}</p> <p class="mt-3 leading-relaxed text-pretty">${escape_html(winner().message)}</p></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (others().length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<h2 class="mt-10 text-xl font-semibold">Objavljene priče</h2> <div class="mt-4 grid gap-3"><!--[-->`);
      const each_array = ensure_array_like(others());
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let story = each_array[$$index];
        $$renderer2.push(`<article class="rounded-2xl border border-border bg-card p-5"><h3 class="font-semibold">${escape_html(story.nurse_name)}</h3> <p class="text-sm text-muted-foreground">${escape_html([story.workplace, story.city].filter(Boolean).join(" · "))}</p> <p class="mt-2 leading-relaxed text-muted-foreground text-pretty">${escape_html(story.message)}</p></article>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else if (!winner()) {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<p class="mt-10 rounded-2xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">Još nema objavljenih priča. Vaša bi mogla biti prva!</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></section>`);
  });
}
export {
  _page as default
};
