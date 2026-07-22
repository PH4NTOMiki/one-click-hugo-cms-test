<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Sponzori — Uredništvo</title>
</svelte:head>

<h1 class="text-2xl font-semibold">Sponzori</h1>

{#if form?.success}
	<div class="mt-6 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
		Promjene su spremljene.
	</div>
{/if}
{#if form?.error}
	<div class="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
		{form.error}
	</div>
{/if}

<div class="mt-6 rounded-xl border border-border bg-card p-5">
	<h2 class="text-lg font-semibold">Dodaj novog sponzora</h2>
	<form method="POST" action="?/addSponsor" enctype="multipart/form-data" use:enhance class="mt-4 grid gap-4">
		<div class="grid gap-2">
			<label for="name" class="text-sm font-medium">Naziv sponzora</label>
			<input id="name" name="name" required class="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
		</div>
		<div class="grid gap-2">
			<label for="website_url" class="text-sm font-medium">Web stranica</label>
			<input id="website_url" name="website_url" type="url" class="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
		</div>
		<div class="grid gap-2">
			<label for="sort_order" class="text-sm font-medium">Redoslijed</label>
			<input id="sort_order" name="sort_order" type="number" value="0" class="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
		</div>
		<div class="grid gap-2">
			<label for="image" class="text-sm font-medium">Slika sponzora</label>
			<input id="image" name="image" type="file" accept="image/*" class="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
		</div>
		<button class="inline-flex w-fit items-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">Spremi sponzora</button>
	</form>
</div>

<div class="mt-6 rounded-xl border border-border bg-card p-5">
	<h2 class="text-lg font-semibold">Postojeći sponzori</h2>
	<div class="mt-4 grid gap-3">
		{#if data.sponsors.length > 0}
			{#each data.sponsors as sponsor (sponsor.id)}
				<div class="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
					<div class="flex items-center gap-3">
						{#if sponsor.image_url}
							<img src={sponsor.image_url} alt={sponsor.name} class="h-12 w-20 rounded object-contain" />
						{/if}
						<div>
							<p class="font-medium">{sponsor.name}</p>
							{#if sponsor.website_url}
								<a href={sponsor.website_url} target="_blank" rel="noreferrer" class="text-sm text-primary">{sponsor.website_url}</a>
							{/if}
						</div>
					</div>
					<div class="flex items-center gap-2">
						<form method="POST" action="?/toggleSponsor" use:enhance>
							<input type="hidden" name="id" value={sponsor.id} />
							<button class="rounded-lg border border-border px-3 py-2 text-sm">
								{sponsor.is_active ? 'Sakriveni' : 'Aktiviraj'}
							</button>
						</form>
						<form method="POST" action="?/deleteSponsor" use:enhance>
							<input type="hidden" name="id" value={sponsor.id} />
							<button class="rounded-lg border border-destructive/30 px-3 py-2 text-sm text-destructive">Obriši</button>
						</form>
					</div>
				</div>
			{/each}
		{:else}
			<p class="text-sm text-muted-foreground">Još nema sponzora.</p>
		{/if}
	</div>
</div>
