<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Sponsors from '$lib/components/Sponsors.svelte';

	let { children } = $props();

	const isAdmin = $derived($page.url.pathname.startsWith('/admin'));
	let menuOpen = $state(false);
</script>

<div class="flex min-h-screen flex-col">
	{#if !isAdmin}
		<header class="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur">
			<div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
				<a href="/" class="flex items-center gap-2" onclick={() => (menuOpen = false)}>
					<span class="relative flex h-9 w-9 items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="var(--color-accent)" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>
						<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="var(--color-primary)" aria-hidden="true" class="absolute -right-0.5 -top-0.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>
					</span>
					<span class="leading-none">
						<span class="block text-sm font-semibold text-primary">najMedicinska</span>
						<span class="block text-lg font-extrabold tracking-tight" style="font-family: var(--font-display)">SESTRA</span>
					</span>
				</a>

				<nav class="hidden items-center gap-2 sm:flex">
					<a href="/glasanje" class="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">Glasaj za sestru</a>
					<a href="/price" class="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">Napiši priču</a>
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
					<a href="/glasanje" onclick={() => (menuOpen = false)} class="block rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">Glasaj za sestru</a>
					<a href="/price" onclick={() => (menuOpen = false)} class="block rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">Napiši priču</a>
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
				<p>najMedicinska SESTRA — priznanje sestrama za dijabetes</p>
				<a href="/admin" class="transition-colors hover:text-foreground">Uredništvo</a>
			</div>
		</footer>
	{/if}
</div>
