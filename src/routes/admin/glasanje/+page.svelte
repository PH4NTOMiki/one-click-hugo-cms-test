<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let search = $state('');
	let nomineeSort = $state<'votes' | 'name' | 'newest'>('votes');
	let editingNominee = $state<string | null>(null);

	function matches(...fields: (string | null | undefined)[]) {
		const q = search.trim().toLowerCase();
		if (!q) return true;
		return fields.some((f) => (f ?? '').toLowerCase().includes(q));
	}

	const filteredNominees = $derived(
		[...data.nominees]
			.filter((n) => matches(n.name, n.workplace, n.city))
			.sort((a, b) => {
				if (nomineeSort === 'name') return a.name.localeCompare(b.name, 'hr');
				if (nomineeSort === 'newest')
					return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
				return (b.vote_count ?? 0) - (a.vote_count ?? 0);
			})
	);
</script>

<svelte:head>
	<title>Glasanje — Uredništvo</title>
</svelte:head>

<h1 class="text-2xl font-semibold">Glasanje</h1>

{#if form?.error}
	<p class="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{form.error}</p>
{/if}

<!-- Toolbar -->
<div class="mt-6 flex flex-wrap items-center gap-3">
	<div class="relative flex-1 min-w-[200px]">
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
		<input
			bind:value={search}
			placeholder="Pretraži po imenu, ustanovi ili gradu…"
			class="w-full rounded-xl border border-input bg-card py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-primary"
		/>
	</div>
	<label class="flex items-center gap-2 text-sm text-muted-foreground">
		Sortiraj
		<select bind:value={nomineeSort} class="rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground">
			<option value="votes">Najviše glasova</option>
			<option value="name">Ime (A–Ž)</option>
			<option value="newest">Najnovije</option>
		</select>
	</label>
	<a href="/admin/export?type=nominees" download
		class="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-muted">
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
		Izvezi CSV
	</a>
</div>

<!-- Nominees list -->
<div class="mt-4 grid gap-3">
	{#each filteredNominees as n, i (n.id)}
		<div class="rounded-xl border border-border bg-card p-4">
			{#if editingNominee === n.id}
				<form method="POST" action="?/updateNominee" use:enhance={() => async ({ update }) => { await update(); editingNominee = null; }} class="grid gap-3">
					<input type="hidden" name="id" value={n.id} />
					<div class="grid gap-3 sm:grid-cols-2">
						<input name="first_name" value={n.first_name ?? ''} placeholder="Ime" class="rounded-lg border border-input bg-background px-3 py-2" />
						<input name="last_name" value={n.last_name ?? ''} placeholder="Prezime" class="rounded-lg border border-input bg-background px-3 py-2" />
					</div>
					<div class="grid gap-3 sm:grid-cols-2">
						<input name="workplace" value={n.workplace ?? ''} placeholder="Ustanova" class="rounded-lg border border-input bg-background px-3 py-2" />
						<input name="city" value={n.city ?? ''} placeholder="Grad" class="rounded-lg border border-input bg-background px-3 py-2" />
					</div>
					<label class="flex items-center gap-2 text-sm">
						<input type="checkbox" name="approved" checked={n.approved} class="h-4 w-4" /> Vidljivo na stranici
					</label>
					<div class="flex gap-2">
						<button class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Spremi</button>
						<button type="button" onclick={() => (editingNominee = null)} class="rounded-lg border border-border px-4 py-2 text-sm">Odustani</button>
					</div>
				</form>
			{:else}
				<div class="flex items-center justify-between gap-4">
					<div class="flex items-center gap-3">
						<span class="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">{i + 1}</span>
						<div>
							<div class="flex items-center gap-2">
								<h3 class="font-semibold">{n.name}</h3>
								{#if n.is_winner}<span class="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary">Pobjednik</span>{/if}
								{#if !n.approved}<span class="rounded-full bg-destructive/10 px-2 py-0.5 text-xs text-destructive">Skriveno</span>{/if}
							</div>
							<p class="text-sm text-muted-foreground">{[n.workplace, n.city].filter(Boolean).join(' · ') || '—'}</p>
						</div>
					</div>
					<div class="flex items-center gap-3">
						<span class="text-right"><span class="block font-semibold">{n.vote_count}</span><span class="block text-xs text-muted-foreground">glasova</span></span>
						<button onclick={() => (editingNominee = n.id)} class="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted">Uredi</button>
						<form method="POST" action="?/deleteNominee" use:enhance>
							<input type="hidden" name="id" value={n.id} />
							<button class="rounded-lg border border-border px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10">Obriši</button>
						</form>
					</div>
				</div>
				<div class="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
					{#if n.is_winner}
						<form method="POST" action="?/clearVoteWinner" use:enhance>
							<input type="hidden" name="id" value={n.id} />
							<button class="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted">Ukloni pobjednika</button>
						</form>
					{:else}
						<form method="POST" action="?/setVoteWinner" use:enhance>
							<input type="hidden" name="id" value={n.id} />
							<button class="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90">Proglasi pobjednikom</button>
						</form>
					{/if}
				</div>
			{/if}
		</div>
	{:else}
		<p class="rounded-xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">Nema rezultata.</p>
	{/each}
</div>
