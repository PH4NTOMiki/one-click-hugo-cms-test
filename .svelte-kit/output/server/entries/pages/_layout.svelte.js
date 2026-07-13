import { g as getContext, a as ensure_array_like, e as escape_html, b as attr, u as unsubscribe_stores, d as derived, c as store_get } from "../../chunks/index.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/root.js";
import "../../chunks/state.svelte.js";
import { t } from "../../chunks/index3.js";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function Sponsors($$renderer) {
  const sponsors = [
    "Vaš logo ovdje",
    "Vaš logo ovdje",
    "Vaš logo ovdje",
    "Vaš logo ovdje"
  ];
  $$renderer.push(`<section class="border-t border-border bg-card"><div class="mx-auto max-w-5xl px-4 py-10"><div class="text-center"><p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sponzori i partneri</p> <h2 class="mt-1 text-xl font-bold">Projekt podržavaju</h2></div> <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4"><!--[-->`);
  const each_array = ensure_array_like(sponsors);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let sponsor = each_array[i];
    $$renderer.push(`<div class="flex h-20 items-center justify-center rounded-xl border border-dashed border-border bg-background px-4 text-center text-sm font-medium text-muted-foreground">${escape_html(sponsor)}</div>`);
  }
  $$renderer.push(`<!--]--></div> <p class="mt-4 text-center text-xs text-muted-foreground">Želite postati sponzor? Javite nam se i podržite priznanje medicinskim sestrama.</p></div></section>`);
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { children } = $$props;
    const isAdmin = derived(() => store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/admin"));
    let menuOpen = false;
    $$renderer2.push(`<div class="flex min-h-screen flex-col">`);
    if (!isAdmin()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<header class="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur"><div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3"><a href="/" class="flex items-center gap-2.5"><img src="/najsestra-mark.jpeg" alt="" class="h-11 w-11 md:h-12 md:w-12 object-contain" width="48" height="48"/> <span class="leading-none"><span class="block text-sm font-semibold text-primary">Naj</span> <span class="block text-lg font-extrabold tracking-tight text-foreground" style="font-family: var(--font-display)">SESTRA</span></span></a> <nav class="hidden items-center gap-2 sm:flex"><a href="/glasanje" class="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">${escape_html(t("nav_vote"))}</a> <a href="/price" class="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">${escape_html(t("nav_story"))}</a></nav> <button type="button" class="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted sm:hidden" aria-label="Izbornik"${attr("aria-expanded", menuOpen)}>`);
      {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16"></path><path d="M4 6h16"></path><path d="M4 18h16"></path></svg>`);
      }
      $$renderer2.push(`<!--]--></button></div> `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></header>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <main class="flex-1">`);
    children($$renderer2);
    $$renderer2.push(`<!----></main> `);
    if (!isAdmin()) {
      $$renderer2.push("<!--[0-->");
      Sponsors($$renderer2);
      $$renderer2.push(`<!----> <footer class="border-t border-border bg-card"><div class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row"><p>${escape_html(t("footer_text"))}</p> <a href="/admin" class="transition-colors hover:text-foreground">${escape_html(t("footer_admin"))}</a></div></footer>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
