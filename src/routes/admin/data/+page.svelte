<script lang="ts">
	// Section definitions for JSON export selector
	const SECTIONS = [
		{ id: 'nominees', label: 'Kandidati' },
		{ id: 'votes', label: 'Glasovi' },
		{ id: 'stories', label: 'Priče' },
		{ id: 'site_content', label: 'Tekstovi' },
		{ id: 'auth', label: 'Korisnici' }
	] as const;

	type SectionId = (typeof SECTIONS)[number]['id'];

	let selected = $state<Set<SectionId>>(new Set(SECTIONS.map((s) => s.id)));

	function toggleAll() {
		if (selected.size === SECTIONS.length) {
			selected = new Set();
		} else {
			selected = new Set(SECTIONS.map((s) => s.id));
		}
	}

	function toggle(id: SectionId) {
		const next = new Set(selected);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		selected = next;
	}

	function buildUrl(format: 'json' | 'schema') {
		const params = new URLSearchParams({ format });
		if (selected.size < SECTIONS.length) {
			params.set('tables', [...selected].join(','));
		}
		return `/admin/export?${params}`;
	}

	const allChecked = $derived(selected.size === SECTIONS.length);
	const noneChecked = $derived(selected.size === 0);
	const exportUrlJson = $derived(buildUrl('json'));
	const exportUrlSchema = $derived(buildUrl('schema'));
</script>

<svelte:head>
	<title>Podaci — Uredništvo</title>
</svelte:head>

<h1 class="text-2xl font-semibold">Podaci</h1>

<div class="mt-6 grid gap-6">

	<!-- Export section -->
	<section class="rounded-xl border border-border bg-card p-6">
		<h2 class="text-lg font-semibold">Izvoz podataka</h2>
		<p class="mt-1 text-sm text-muted-foreground leading-relaxed">
			Preuzmite odabrane dijelove baze u JSON datoteci ili kao CSV za Excel.
		</p>

		<!-- Section selector -->
		<div class="mt-5 rounded-xl border border-border bg-background p-4">
			<div class="flex items-center justify-between mb-3">
				<p class="text-xs font-medium text-muted-foreground">Odaberi što izvesti (JSON)</p>
				<button
					type="button"
					onclick={toggleAll}
					class="text-xs text-primary hover:underline"
				>
					{allChecked ? 'Odznači sve' : 'Označi sve'}
				</button>
			</div>
			<div class="flex flex-wrap gap-2">
				{#each SECTIONS as section (section.id)}
					<button
						type="button"
						onclick={() => toggle(section.id)}
						class="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors {selected.has(section.id)
							? 'border-primary bg-primary/10 text-primary'
							: 'border-border bg-background text-muted-foreground hover:bg-muted'}"
					>
						<span class="flex h-3.5 w-3.5 items-center justify-center rounded-sm border {selected.has(section.id) ? 'border-primary bg-primary' : 'border-muted-foreground'}">
							{#if selected.has(section.id)}
								<svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
							{/if}
						</span>
						{section.label}
					</button>
				{/each}
			</div>
		</div>

		<div class="mt-4 grid gap-4 sm:grid-cols-2">
			<!-- Data-only export -->
			<div class="rounded-xl border border-border bg-background p-4">
				<div class="flex items-center gap-2">
					<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
					</div>
					<h3 class="font-semibold text-sm">Samo podaci</h3>
				</div>
				<p class="mt-2 text-xs text-muted-foreground leading-relaxed">
					JSON s redovima iz odabranih tablica. Bez SQL sheme.
					Koristite za rutinsku sigurnosnu kopiju.
				</p>
				<a
					href={exportUrlJson}
					download
					aria-disabled={noneChecked}
					class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors {noneChecked ? 'pointer-events-none opacity-40' : 'hover:bg-muted'}"
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
					JSON s redovima iz odabranih tablica <strong class="text-foreground">i SQL DDL skriptom</strong> za kreiranje tablica od nule.
					Koristite za migraciju na novu bazu.
				</p>
				<a
					href={exportUrlSchema}
					download
					aria-disabled={noneChecked}
					class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity {noneChecked ? 'pointer-events-none opacity-40' : 'hover:opacity-90'}"
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
			Datoteka formata <strong class="text-foreground">schema+data</strong> automatski kreira sve tablice na praznoj bazi.
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
