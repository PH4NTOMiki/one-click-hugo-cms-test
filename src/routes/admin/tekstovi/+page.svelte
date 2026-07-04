<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	// Local copy of content so inputs never flash empty during the brief
	// re-invalidation window that use:enhance triggers after a save.
	let localContent: Record<string, string> = $state({ ...data.content });

	// Sync from server whenever data.content changes (e.g. after page load or
	// navigation), but don't overwrite what the user is currently typing.
	$effect(() => {
		for (const key of Object.keys(data.content)) {
			if (!(key in localContent)) localContent[key] = data.content[key];
		}
	});

	const contentByGroup = $derived.by(() => {
		const groups = new Map<string, typeof data.contentFields>();
		for (const field of data.contentFields) {
			const list = groups.get(field.group) ?? [];
			list.push(field);
			groups.set(field.group, list);
		}
		return [...groups.entries()];
	});
</script>

<svelte:head>
	<title>Tekstovi — Uredništvo</title>
</svelte:head>

<h1 class="text-2xl font-semibold">Tekstovi</h1>

{#if form?.savedContent}
	<div class="mt-6 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
		Tekstovi su spremljeni. Kliknite „Objavi promjene" kako bi postali vidljivi posjetiteljima.
	</div>
{/if}
{#if form?.published}
	<div class="mt-6 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700">
		Objava je pokrenuta. Nove izmjene bit će vidljive za nekoliko minuta, kada Vercel dovrši objavu.
	</div>
{/if}
{#if form?.publishError}
	<div class="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
		{form.publishError}
	</div>
{/if}

<div class="mt-6 flex items-start gap-3 rounded-xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
	<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
	<p>
		Ovdje uređujete tekstove i natpise na gumbima. Prvo <strong class="text-foreground">spremite</strong> izmjene,
		a zatim kliknite <strong class="text-foreground">„Objavi promjene"</strong> kako bi postale vidljive posjetiteljima.
		Objava traje nekoliko minuta.
	</p>
</div>

<form method="POST" action="?/saveContent" use:enhance class="mt-6 grid gap-8">
	{#each contentByGroup as [group, fields] (group)}
		<section class="rounded-xl border border-border bg-card p-5">
			<h2 class="text-lg font-semibold">{group}</h2>
			<div class="mt-4 grid gap-5">
				{#each fields as field (field.key)}
					<div class="grid gap-1.5">
						<label for={field.key} class="text-sm font-medium">{field.label}</label>
						{#if field.multiline}
							<textarea id={field.key} name={field.key} rows="3"
								class="resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
								bind:value={localContent[field.key]}
							></textarea>
						{:else}
							<input id={field.key} name={field.key}
								bind:value={localContent[field.key]}
								class="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary" />
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/each}

	<div class="sticky bottom-4 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card/95 p-3 backdrop-blur">
		<button class="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
			1. Spremi tekstove
		</button>
		<span class="text-xs text-muted-foreground">Zatim objavite promjene &rarr;</span>
	</div>
</form>

<!-- Publish (separate form so it doesn't submit the text fields) -->
<form method="POST" action="?/publish" use:enhance class="mt-3 flex flex-wrap items-center gap-3">
	<button
		disabled={!data.publishConfigured}
		class="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-11 11"/><path d="M22 2 15 22l-4-9-9-4Z"/></svg>
		2. Objavi promjene
	</button>
	{#if data.publishConfigured}
		<span class="text-xs text-muted-foreground">Pokreće novu objavu stranice na Vercelu.</span>
	{:else}
		<span class="text-xs text-muted-foreground">Objava nije podešena — dodajte VERCEL_DEPLOY_HOOK_URL u postavkama projekta.</span>
	{/if}
</form>
