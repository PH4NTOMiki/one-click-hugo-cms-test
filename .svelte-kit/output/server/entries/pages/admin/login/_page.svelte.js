import { h as head, f as attr, e as escape_html } from "../../../../chunks/index.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/root.js";
import "../../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { form } = $$props;
    let loading = false;
    head("18c6u1m", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Prijava — Uredništvo NajSestra</title>`);
      });
    });
    $$renderer2.push(`<div class="flex min-h-screen items-center justify-center bg-background px-4"><div class="w-full max-w-sm rounded-2xl border border-border bg-card p-8"><a href="/" class="flex items-center gap-2"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"></path></svg></span> <span class="text-lg font-semibold" style="font-family: var(--font-serif)">NajSestra</span></a> <h1 class="mt-6 text-2xl font-semibold">Prijava u uredništvo</h1> <p class="mt-1 text-sm text-muted-foreground">Pristup rezultatima i pričama.</p> <form method="POST" class="mt-6 grid gap-4"><div class="grid gap-1"><label for="email" class="text-sm font-medium">E-mail</label> <input id="email" name="email" type="email" required=""${attr("value", form?.email ?? "")} class="rounded-lg border border-input bg-background px-3 py-2 outline-none focus:border-primary"/></div> <div class="grid gap-1"><label for="password" class="text-sm font-medium">Lozinka</label> <input id="password" name="password" type="password" required="" class="rounded-lg border border-input bg-background px-3 py-2 outline-none focus:border-primary"/></div> `);
    if (form?.error) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="text-sm text-destructive">${escape_html(form.error)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <button type="submit"${attr("disabled", loading, true)} class="rounded-xl bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50">${escape_html("Prijavi se")}</button></form></div></div>`);
  });
}
export {
  _page as default
};
