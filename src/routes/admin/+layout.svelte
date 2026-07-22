<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: any } = $props();

	const navLinks = [
		{ href: '/admin/glasanje', label: 'Glasanje', countKey: 'nomineeCount' },
		{ href: '/admin/price', label: 'Priče', countKey: 'storyCount' },
		{ href: '/admin/sponzori', label: 'Sponzori', countKey: null },
		{ href: '/admin/tekstovi', label: 'Tekstovi', countKey: null },
		{ href: '/admin/data', label: 'Podaci', countKey: null }
	] as const;

	function isActive(href: string) {
		return $page.url.pathname === href || $page.url.pathname.startsWith(href + '/');
	}
</script>

<div class="min-h-screen bg-background">
	<header class="border-b border-border bg-card">
		<div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
			<div class="flex items-center gap-2">
				<span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>
				</span>
				<span class="font-semibold">Uredništvo</span>
			</div>
			<div class="flex items-center gap-4">
				<a href="/" class="text-sm text-muted-foreground hover:text-foreground">Pogledaj stranicu</a>
				{#if data.session}
					<form method="POST" action="?/logout" use:enhance>
						<button class="rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted">Odjava</button>
					</form>
				{/if}
			</div>
		</div>

		{#if data.session}
			<!-- Sub-nav -->
			<div class="mx-auto max-w-5xl px-4">
				<nav class="flex gap-1 pb-0" aria-label="Admin navigacija">
					{#each navLinks as link}
						{@const active = isActive(link.href)}
						<a
							href={link.href}
							class="relative flex items-center gap-1.5 border-b-2 px-4 py-3 text-sm font-medium transition-colors
								{active
									? 'border-primary text-foreground'
									: 'border-transparent text-muted-foreground hover:text-foreground'}"
						>
							{link.label}
							{#if link.countKey && (data[link.countKey] ?? 0) > 0}
								<span class="rounded-full bg-muted px-1.5 py-0.5 text-xs font-semibold leading-none text-muted-foreground">
									{data[link.countKey]}
								</span>
							{/if}
						</a>
					{/each}
				</nav>
			</div>
		{/if}
	</header>

	<main class="mx-auto max-w-5xl px-4 py-8">
		{@render children()}
	</main>
</div>
