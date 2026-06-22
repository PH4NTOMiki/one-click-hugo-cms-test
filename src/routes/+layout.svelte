<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

	let { children } = $props();

	const isAdmin = $derived($page.url.pathname.startsWith('/admin'));
</script>

<div class="flex min-h-screen flex-col">
	{#if !isAdmin}
		<header class="border-b border-border bg-card">
			<div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
				<a href="/" class="flex items-center gap-2">
					<span class="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>
					</span>
					<span class="text-xl font-semibold" style="font-family: var(--font-serif)">NajSestra</span>
				</a>
				<nav class="flex items-center gap-4 text-sm">
					<a href="/glasanje" class="text-muted-foreground transition-colors hover:text-foreground">Glasanje</a>
					<a href="/price" class="text-muted-foreground transition-colors hover:text-foreground">Priče</a>
				</nav>
			</div>
		</header>
	{/if}

	<main class="flex-1">
		{@render children()}
	</main>

	{#if !isAdmin}
		<footer class="border-t border-border bg-card">
			<div class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row">
				<p>NajSestra.com — izbor najbolje dijabetičke sestre u Hrvatskoj</p>
				<a href="/admin" class="transition-colors hover:text-foreground">Uredništvo</a>
			</div>
		</footer>
	{/if}
</div>
