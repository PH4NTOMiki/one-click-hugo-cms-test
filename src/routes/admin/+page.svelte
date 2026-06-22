<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let tab = $state<'votes' | 'stories'>('votes');
	let editingNominee = $state<string | null>(null);
	let editingStory = $state<string | null>(null);

	const statusLabel: Record<string, string> = {
		pending: 'Na čekanju',
		approved: 'Odobreno',
		rejected: 'Odbijeno'
	};
</script>

<svelte:head>
	<title>Uredništvo — NajSestra</title>
</svelte:head>

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
				<form method="POST" action="?/logout" use:enhance>
					<button class="rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted">Odjava</button>
				</form>
			</div>
		</div>
	</header>

	<main class="mx-auto max-w-5xl px-4 py-8">
		<h1 class="text-2xl font-semibold">Rezultati</h1>

		<!-- Tabs -->
		<div class="mt-6 inline-flex rounded-xl border border-border bg-card p-1">
			<button onclick={() => (tab = 'votes')}
				class="rounded-lg px-4 py-2 text-sm font-medium transition-colors {tab === 'votes' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}">
				Glasanje ({data.nominees.length})
			</button>
			<button onclick={() => (tab = 'stories')}
				class="rounded-lg px-4 py-2 text-sm font-medium transition-colors {tab === 'stories' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}">
				Priče ({data.stories.length})
			</button>
		</div>

		{#if form?.error}
			<p class="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{form.error}</p>
		{/if}

		<!-- VOTES TAB -->
		{#if tab === 'votes'}
			<div class="mt-6 grid gap-3">
				{#each data.nominees as n, i (n.id)}
					<div class="rounded-xl border border-border bg-card p-4">
						{#if editingNominee === n.id}
							<form method="POST" action="?/updateNominee" use:enhance={() => async ({ update }) => { await update(); editingNominee = null; }} class="grid gap-3">
								<input type="hidden" name="id" value={n.id} />
								<div class="grid gap-3 sm:grid-cols-3">
									<input name="name" value={n.name} placeholder="Ime" class="rounded-lg border border-input bg-background px-3 py-2" />
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
						{/if}
					</div>
				{:else}
					<p class="rounded-xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">Nema prijedloga.</p>
				{/each}
			</div>
		{/if}

		<!-- STORIES TAB -->
		{#if tab === 'stories'}
			<div class="mt-6 grid gap-3">
				{#each data.stories as s (s.id)}
					<div class="rounded-xl border border-border bg-card p-4 {s.is_winner ? 'border-accent ring-1 ring-accent' : ''}">
						{#if editingStory === s.id}
							<form method="POST" action="?/updateStory" use:enhance={() => async ({ update }) => { await update(); editingStory = null; }} class="grid gap-3">
								<input type="hidden" name="id" value={s.id} />
								<div class="grid gap-3 sm:grid-cols-3">
									<input name="nurse_name" value={s.nurse_name} placeholder="Ime sestre" class="rounded-lg border border-input bg-background px-3 py-2" />
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
									<p class="mt-2 leading-relaxed text-pretty">{s.message}</p>
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
					<p class="rounded-xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">Nema poslanih priča.</p>
				{/each}
			</div>
		{/if}
	</main>
</div>
