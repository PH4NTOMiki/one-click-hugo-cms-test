<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let tab = $state<'votes' | 'stories' | 'content' | 'backup'>('votes');

	// Group the editable content fields by their section for the editor UI.
	const contentByGroup = $derived.by(() => {
		const groups = new Map<string, typeof data.contentFields>();
		for (const field of data.contentFields) {
			const list = groups.get(field.group) ?? [];
			list.push(field);
			groups.set(field.group, list);
		}
		return [...groups.entries()];
	});
	let editingNominee = $state<string | null>(null);
	let editingStory = $state<string | null>(null);

	// Search / sort / filter state
	let search = $state('');
	let nomineeSort = $state<'votes' | 'name' | 'newest'>('votes');
	let storySort = $state<'newest' | 'name' | 'status'>('newest');
	let statusFilter = $state<'all' | 'pending' | 'approved' | 'rejected'>('all');

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
			<button onclick={() => (tab = 'content')}
				class="rounded-lg px-4 py-2 text-sm font-medium transition-colors {tab === 'content' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}">
				Tekstovi
			</button>
			<button onclick={() => (tab = 'backup')}
				class="rounded-lg px-4 py-2 text-sm font-medium transition-colors {tab === 'backup' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}">
				Izvoz / Uvoz
			</button>
		</div>

		{#if form?.error}
			<p class="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{form.error}</p>
		{/if}

		<!-- Toolbar: search, sort, filter, export -->
		{#if tab !== 'content'}
		<div class="mt-6 flex flex-wrap items-center gap-3">
			<div class="relative flex-1 min-w-[200px]">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
				<input
					bind:value={search}
					placeholder="Pretraži po imenu, ustanovi ili gradu…"
					class="w-full rounded-xl border border-input bg-card py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-primary"
				/>
			</div>

			{#if tab === 'votes'}
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
			{:else}
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
			{/if}
		</div>
		{/if}

		<!-- VOTES TAB -->
		{#if tab === 'votes'}
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
		{/if}

		<!-- STORIES TAB -->
		{#if tab === 'stories'}
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
		{/if}

		<!-- CONTENT (TEXTS) TAB -->
			{#if tab === 'content'}
				{#if form?.savedContent}
					<div class="mt-6 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
						Tekstovi su spremljeni. Kliknite „Objavi promjene” kako bi postali vidljivi posjetiteljima.
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
						a zatim kliknite <strong class="text-foreground">„Objavi promjene”</strong> kako bi postale vidljive posjetiteljima.
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
										>{data.content[field.key]}</textarea>
									{:else}
										<input id={field.key} name={field.key} value={data.content[field.key]}
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
				<form
					method="POST"
					action="?/publish"
					use:enhance
					class="mt-3 flex flex-wrap items-center gap-3"
				>
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
		{/if}

		<!-- BACKUP TAB -->
		{#if tab === 'backup'}
			<div class="mt-6 grid gap-6">

				<!-- Export section -->
				<section class="rounded-xl border border-border bg-card p-6">
					<h2 class="text-lg font-semibold">Izvoz podataka</h2>
					<p class="mt-1 text-sm text-muted-foreground leading-relaxed">
						Preuzmite sve podatke iz baze (kandidati, glasovi, priče, tekstovi, korisnici) u jednoj JSON datoteci.
						Odaberite format koji vam odgovara.
					</p>

					<div class="mt-5 grid gap-4 sm:grid-cols-2">
						<!-- Data-only export -->
						<div class="rounded-xl border border-border bg-background p-4">
							<div class="flex items-center gap-2">
								<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
								</div>
								<h3 class="font-semibold text-sm">Samo podaci</h3>
							</div>
							<p class="mt-2 text-xs text-muted-foreground leading-relaxed">
								JSON s redovima iz svih tablica i popisom korisnika. Bez SQL sheme.
								Koristite za rutinsku sigurnosnu kopiju.
							</p>
							<a
								href="/admin/export?format=json"
								download
								class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
								Preuzmi JSON (podaci)
							</a>
						</div>

						<!-- Schema + data export -->
						<div class="rounded-xl border border-border bg-background p-4">
							<div class="flex items-center gap-2">
								<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-foreground">
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
								</div>
								<h3 class="font-semibold text-sm">Podaci + shema</h3>
							</div>
							<p class="mt-2 text-xs text-muted-foreground leading-relaxed">
								JSON s redovima iz svih tablica, popisom korisnika <strong class="text-foreground">i SQL DDL skriptom</strong> za kreiranje tablica.
								Koristite za migraciju na novu bazu.
							</p>
							<a
								href="/admin/export?format=schema"
								download
								class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
								Preuzmi JSON (podaci + shema)
							</a>
						</div>
					</div>

					<!-- CSV quick exports -->
					<div class="mt-4 rounded-xl border border-dashed border-border p-4">
						<p class="text-xs font-medium text-muted-foreground mb-3">Brzi CSV izvoz (za Excel)</p>
						<div class="flex flex-wrap gap-2">
							<a href="/admin/export?type=nominees" download
								class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted">
								<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
								Glasanje (CSV)
							</a>
							<a href="/admin/export?type=stories" download
								class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted">
								<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
								Priče (CSV)
							</a>
						</div>
					</div>
				</section>

				<!-- Import section -->
				<section class="rounded-xl border border-border bg-card p-6">
					<h2 class="text-lg font-semibold">Uvoz podataka</h2>
					<p class="mt-1 text-sm text-muted-foreground leading-relaxed">
						Obnovite podatke iz prethodno izvezene JSON datoteke. Stranica za uvoz je dostupna i bez prijave —
						koristite je za inicijalno postavljanje nove baze podataka.
					</p>
					<div class="mt-4 flex flex-wrap gap-3">
						<a
							href="/admin/import"
							class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
							Otvori stranicu za uvoz
						</a>
					</div>
					<div class="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800 dark:border-amber-800/40 dark:bg-amber-900/20 dark:text-amber-200">
						<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
						<p>Stranica za uvoz je javno dostupna bez lozinke. Uklonite je ili zaštitite u produkcijskom okruženju.</p>
					</div>
				</section>

			</div>
		{/if}

	</main>
</div>
