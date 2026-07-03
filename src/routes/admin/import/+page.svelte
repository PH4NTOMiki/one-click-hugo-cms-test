<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let mode = $state<'append' | 'replace'>('append');
	let fileName = $state<string | null>(null);
	let dragging = $state(false);
	let submitting = $state(false);

	function onFileChange(e: Event) {
		const input = e.target as HTMLInputElement;
		fileName = input.files?.[0]?.name ?? null;
	}

	function onDrop(e: DragEvent) {
		e.preventDefault();
		dragging = false;
		const file = e.dataTransfer?.files?.[0];
		if (!file) return;
		fileName = file.name;
		// Assign the dropped file to the hidden input so the form picks it up.
		const input = document.getElementById('file-input') as HTMLInputElement;
		if (input) {
			const dt = new DataTransfer();
			dt.items.add(file);
			input.files = dt.files;
		}
	}

	const summaryEntries = $derived(
		form && 'summary' in form && form.summary
			? Object.entries(form.summary as Record<string, number>)
			: []
	);

	const tableLabels: Record<string, string> = {
		nominees: 'Kandidati',
		votes: 'Glasovi',
		stories: 'Priče',
		site_content: 'Tekstovi',
		auth_users: 'Korisnici'
	};
</script>

<svelte:head>
	<title>Uvoz podataka — NajSestra</title>
</svelte:head>

<div class="min-h-screen bg-background">
	<!-- Header -->
	<header class="border-b border-border bg-card">
		<div class="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
			<div class="flex items-center gap-2">
				<span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>
				</span>
				<span class="font-semibold">NajSestra</span>
			</div>
			<div class="flex items-center gap-3">
				<a href="/admin/login" class="text-sm text-muted-foreground hover:text-foreground">Prijava</a>
				<a href="/admin" class="rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted">Uredništvo</a>
			</div>
		</div>
	</header>

	<main class="mx-auto max-w-2xl px-4 py-10">
		<div class="mb-8">
			<h1 class="text-2xl font-semibold">Uvoz podataka</h1>
			<p class="mt-1.5 text-sm text-muted-foreground leading-relaxed">
				Učitajte JSON datoteku izvezenu iz ove aplikacije kako biste obnovili podatke u novoj Supabase bazi.
				Ova stranica je dostupna bez prijave kako biste mogli uvesti podatke odmah nakon spajanja na novu bazu.
			</p>
		</div>

		<!-- Warning banner -->
		<div class="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800/40 dark:bg-amber-900/20 dark:text-amber-200">
			<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
			<p>
				<strong>Napomena:</strong> Ova stranica je javno dostupna. Nakon što završite s uvozom podataka, preporučamo
				da <strong>uklonite ili zaštitite</strong> ovu rutu u produkcijskom okruženju.
			</p>
		</div>

		<!-- Success result -->
		{#if form && 'success' in form && form.success}
			<div class="mb-6 rounded-xl border border-green-200 bg-green-50 p-5 dark:border-green-800/40 dark:bg-green-900/20">
				<div class="flex items-center gap-2 text-green-800 dark:text-green-200">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
					<span class="font-semibold">Uvoz je uspješan!</span>
				</div>
				{#if summaryEntries.length > 0}
					<div class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
						{#each summaryEntries as [key, count] (key)}
							<div class="rounded-lg border border-green-200 bg-white/60 px-3 py-2 dark:border-green-700/40 dark:bg-white/5">
								<div class="text-lg font-bold text-green-700 dark:text-green-300">{count}</div>
								<div class="text-xs text-green-600 dark:text-green-400">{tableLabels[key] ?? key}</div>
							</div>
						{/each}
					</div>
				{/if}
				<p class="mt-3 text-sm text-green-700 dark:text-green-300">
					Uvezeni korisnici nemaju lozinku — prijavite se putem "Zaboravljena lozinka" ili im pošaljite link za postavljanje lozinke.
				</p>
				<div class="mt-4 flex gap-2">
					<a href="/admin" class="inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800">
						Idi u uredništvo
					</a>
					<a href="/admin/login" class="inline-flex items-center gap-2 rounded-lg border border-green-300 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-100 dark:border-green-700 dark:text-green-200 dark:hover:bg-green-900/40">
						Prijava
					</a>
				</div>
			</div>
		{/if}

		<!-- Error result -->
		{#if form && 'error' in form && form.error}
			<div class="mb-6 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
				<div class="flex items-center gap-2 text-destructive">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/></svg>
					<span class="font-semibold text-sm">Greška pri uvozu</span>
				</div>
				<pre class="mt-2 whitespace-pre-wrap text-xs text-destructive/80">{form.error}</pre>
				{#if summaryEntries.length > 0}
					<p class="mt-2 text-xs text-muted-foreground">Djelomično uvezeno:</p>
					<div class="mt-1 flex flex-wrap gap-2">
						{#each summaryEntries as [key, count] (key)}
							<span class="rounded-md bg-muted px-2 py-0.5 text-xs">{tableLabels[key] ?? key}: {count}</span>
						{/each}
					</div>
				{/if}
			</div>
		{/if}

		<!-- Import form -->
		<form
			method="POST"
			action="?/import"
			enctype="multipart/form-data"
			use:enhance={() => {
				submitting = true;
				return async ({ update }) => {
					await update();
					submitting = false;
				};
			}}
			class="grid gap-6"
		>
			<!-- File drop zone -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="relative rounded-xl border-2 border-dashed transition-colors {dragging ? 'border-primary bg-primary/5' : 'border-border bg-card'}"
				role="region"
				aria-label="Zona za datoteku"
				ondragover={(e) => { e.preventDefault(); dragging = true; }}
				ondragleave={() => { dragging = false; }}
				ondrop={onDrop}
			>
				<label for="file-input" class="flex cursor-pointer flex-col items-center gap-3 px-6 py-10">
					<div class="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
					</div>
					{#if fileName}
						<div class="text-center">
							<p class="font-medium text-foreground">{fileName}</p>
							<p class="text-sm text-muted-foreground">Kliknite za promjenu datoteke</p>
						</div>
					{:else}
						<div class="text-center">
							<p class="font-medium">Povucite JSON datoteku ovdje</p>
							<p class="text-sm text-muted-foreground">ili kliknite za odabir</p>
						</div>
					{/if}
					<input
						id="file-input"
						type="file"
						name="file"
						accept=".json,application/json"
						onchange={onFileChange}
						class="sr-only"
						required
					/>
				</label>
			</div>

			<!-- Mode selector -->
			<fieldset class="grid gap-3">
				<legend class="text-sm font-medium">Način uvoza</legend>
				<label class="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors {mode === 'append' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}">
					<input type="radio" name="mode" value="append" bind:group={mode} class="mt-0.5 h-4 w-4 accent-primary" />
					<div>
						<p class="font-medium text-sm">Dodaj uz postojeće</p>
						<p class="text-xs text-muted-foreground leading-relaxed">Upsert — ažurira redove s istim ID-om, dodaje nove. Ne briše ništa.</p>
					</div>
				</label>
				<label class="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors {mode === 'replace' ? 'border-destructive bg-destructive/5' : 'hover:bg-muted/50'}">
					<input type="radio" name="mode" value="replace" bind:group={mode} class="mt-0.5 h-4 w-4 accent-destructive" />
					<div>
						<p class="font-medium text-sm text-destructive">Zamijeni sve podatke</p>
						<p class="text-xs text-muted-foreground leading-relaxed">Briše SVE postojeće retke iz svih tablica, zatim umeće uvezene podatke. Nepovratan!</p>
					</div>
				</label>
			</fieldset>

			<button
				type="submit"
				disabled={submitting || !fileName}
				class="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{#if submitting}
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
					Uvoz u tijeku…
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
					Pokreni uvoz
				{/if}
			</button>
		</form>

		<!-- Format reference -->
		<details class="mt-8 rounded-xl border border-border bg-card">
			<summary class="cursor-pointer select-none px-5 py-4 text-sm font-medium">Format datoteke (referenca)</summary>
			<div class="border-t border-border px-5 pb-5 pt-4">
				<p class="text-xs text-muted-foreground mb-3">Podržani JSON format (izvoz iz uredništva):</p>
				<pre class="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">{`{
  "exported_at": "2024-01-01T00:00:00.000Z",
  "format": "data-only",       // ili "schema+data"
  "tables": {
    "nominees": [...],
    "votes": [...],
    "stories": [...],
    "site_content": [...]
  },
  "auth": {
    "users": [...]
  },
  "schema_ddl": "..."          // samo u "schema+data" formatu
}`}</pre>
			</div>
		</details>
	</main>
</div>
