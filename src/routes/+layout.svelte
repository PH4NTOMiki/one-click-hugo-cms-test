<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Sponsors from '$lib/components/Sponsors.svelte';
	import { makeT } from '$lib/content';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();

	const t = $derived(makeT(data.content));

	const isAdmin = $derived($page.url.pathname.startsWith('/admin'));
	let menuOpen = $state(false);
</script>

<div class="flex min-h-screen flex-col">
	{#if !isAdmin}
		<header class="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur">
			<div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:py-4">
				<a href="/" class="flex shrink-0 items-center gap-3" onclick={() => (menuOpen = false)}>
					<img src="/najsestra-mark.jpeg" alt="" class="h-14 w-14 md:h-16 md:w-16 object-contain" width="64" height="64" />
					<span class="flex flex-col whitespace-nowrap md:flex-row md:items-baseline md:gap-2 leading-none">
						<span class="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground" style="font-family: var(--font-display)">NajSESTRA</span>
						<span class="text-lg md:text-2xl font-bold tracking-wide text-primary">u dijabetesu</span>
					</span>
				</a>

				<nav class="hidden items-center gap-3 sm:flex">
					<a href="/glasanje" class="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">{t('nav_vote')}</a>
					<a href="/price" class="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">{t('nav_story')}</a>
				</nav>

				<button
					type="button"
					class="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted sm:hidden"
					aria-label="Izbornik"
					aria-expanded={menuOpen}
					onclick={() => (menuOpen = !menuOpen)}
				>
					{#if menuOpen}
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16"/><path d="M4 6h16"/><path d="M4 18h16"/></svg>
					{/if}
				</button>
			</div>

			{#if menuOpen}
				<nav class="border-t border-border px-4 py-2 sm:hidden">
					<a href="/glasanje" onclick={() => (menuOpen = false)} class="block rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">{t('nav_vote')}</a>
					<a href="/price" onclick={() => (menuOpen = false)} class="block rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">{t('nav_story')}</a>
				</nav>
			{/if}
		</header>
	{/if}

	<main class="flex-1">
		{@render children()}
	</main>

	{#if !isAdmin}
		<Sponsors />
		<footer class="border-t border-border bg-card">
			<div class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row">
				<p>{t('footer_text')}</p>
				<a href="/admin" class="transition-colors hover:text-foreground">{t('footer_admin')}</a>
			</div>
		</footer>
	{/if}
</div>
