<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let search = $state('');
	let storySort = $state<'newest' | 'name' | 'status'>('newest');
	let statusFilter = $state<'all' | 'pending' | 'approved' | 'rejected'>('all');
	let editingStory = $state<string | null>(null);

	const statusLabel: Record<string, string> = {
		pending: 'Na čekanju',
		approved: 'Odobreno',
		rejected: 'Odbijeno'
	};

	function matches(...fields: (string | null | undefined)[]) {
		const q = search.trim().toLowerCase();
		if (!q) return true;
		return fields.some((f) => (f ?? '').toLowerCase().includes(q));
	}

	const filteredStories = $derived(
		[...data.stories]
			.filter((s) => statusFilter === 'all' || s.status === statusFilter)
			.filter((s) => matches(s.nurse_name, s.workplace, s.city, s.message))
			.sort((a, b) => {
				if (storySort === 'name') return a.nurse_name.localeCompare(b.nurse_name, 'hr');
				if (storySort === 'status') return a.status.localeCompare(b.status);
				return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
			})
	);
</script>

<svelte:head>
	<title>Priče — Uredništvo</title>
</svelte:head>

<h1 class="text-2xl font-semibold">Priče</h1>

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
		Status
		<select bind:value={statusFilter} class="rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground">
			<option value="all">Sve</option>
			<option value="pending">Na čekanju</option>
			<option value="approved">Odobreno</option>
			<option value="rejected">Odbijeno</option>
		</select>
	</label>
	<label class="flex items-center gap-2 text-sm text-muted-foreground">
		Sortiraj
		<select bind:value={storySort} class="rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground">
			<option value="newest">Najnovije</option>
			<option value="name">Ime (A–Ž)</option>
			<option value="status">Status</option>
		</select>
	</label>
	<a href="/admin/export?type=stories" download
		class="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-muted">
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
		Izvezi CSV
	</a>
</div>

<!-- Stories list -->
<div class="mt-4 grid gap-3">
	{#each filteredStories as s (s.id)}
		<div class="rounded-xl border border-border bg-card p-4 {s.is_winner ? 'border-accent ring-1 ring-accent' : ''}">
			{#if editingStory === s.id}
				<form method="POST" action="?/updateStory" use:enhance={() => async ({ update }) => { await update(); editingStory = null; }} class="grid gap-3">
					<input type="hidden" name="id" value={s.id} />
					<div class="grid gap-3 sm:grid-cols-2">
						<input name="first_name" value={s.first_name ?? ''} placeholder="Ime sestre" class="rounded-lg border border-input bg-background px-3 py-2" />
						<input name="last_name" value={s.last_name ?? ''} placeholder="Prezime sestre" class="rounded-lg border border-input bg-background px-3 py-2" />
					</div>
					<div class="grid gap-3 sm:grid-cols-2">
						<input name="workplace" value={s.workplace ?? ''} placeholder="Ustanova" class="rounded-lg border border-input bg-background px-3 py-2" />
						<input name="city" value={s.city ?? ''} placeholder="Grad" class="rounded-lg border border-input bg-background px-3 py-2" />
					</div>
					<textarea name="message" rows="4" class="rounded-lg border border-input bg-background px-3 py-2">{s.message}</textarea>
					<select name="status" value={s.status} class="rounded-lg border border-input bg-background px-3 py-2 sm:w-48">
						<option value="pending">Na čekanju</option>
						<option value="approved">Odobreno</option>
						<option value="rejected">Odbijeno</option>
					</select>
					<div class="flex gap-2">
						<button class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Spremi</button>
						<button type="button" onclick={() => (editingStory = null)} class="rounded-lg border border-border px-4 py-2 text-sm">Odustani</button>
					</div>
				</form>
			{:else}
				<div class="flex items-start justify-between gap-4">
					<div class="min-w-0">
						<div class="flex flex-wrap items-center gap-2">
							<h3 class="font-semibold">{s.nurse_name}</h3>
							{#if s.is_winner}<span class="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent-foreground">Pobjednik</span>{/if}
							<span class="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{statusLabel[s.status]}</span>
						</div>
						<p class="text-sm text-muted-foreground">{[s.workplace, s.city].filter(Boolean).join(' · ') || '—'}</p>
						<p class="mt-2 whitespace-pre-wrap break-words leading-relaxed text-pretty">{s.message}</p>
						{#if s.author_name || s.author_email}
							<p class="mt-2 text-xs text-muted-foreground">Autor: {s.author_name ?? '—'} {s.author_email ? `(${s.author_email})` : ''}</p>
						{/if}
					</div>
				</div>
				<div class="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
					{#if s.is_winner}
						<form method="POST" action="?/clearWinner" use:enhance>
							<input type="hidden" name="id" value={s.id} />
							<button class="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted">Ukloni pobjednika</button>
						</form>
					{:else}
						<form method="POST" action="?/setWinner" use:enhance>
							<input type="hidden" name="id" value={s.id} />
							<button class="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground hover:opacity-90">Proglasi pobjednikom</button>
						</form>
					{/if}
					<button onclick={() => (editingStory = s.id)} class="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted">Uredi</button>
					<form method="POST" action="?/deleteStory" use:enhance>
						<input type="hidden" name="id" value={s.id} />
						<button class="rounded-lg border border-border px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10">Obriši</button>
					</form>
				</div>
			{/if}
		</div>
	{:else}
		<p class="rounded-xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">Nema rezultata.</p>
	{/each}
</div>
