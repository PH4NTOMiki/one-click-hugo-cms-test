<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showForm = $state(false);
	const hasVoted = $derived(!!data.votedNomineeId);
	const maxVotes = $derived(Math.max(1, ...data.nominees.map((n) => n.vote_count ?? 0)));
</script>

<svelte:head>
	<title>Glasanje — NajSestra</title>
	<meta name="description" content="Glasajte za najbolju dijabetičku sestru u Hrvatskoj." />
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-12">
	<a href="/" class="text-sm text-muted-foreground transition-colors hover:text-foreground">← Naslovnica</a>
	<div class="mt-4 flex flex-wrap items-end justify-between gap-4">
		<div>
			<h1 class="text-3xl font-semibold sm:text-4xl">Glasanje</h1>
			<p class="mt-2 leading-relaxed text-muted-foreground">
				Predložite sestru ili glasajte za jednu od predloženih. Svaki posjetitelj ima jedan glas.
			</p>
		</div>
		<p class="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
			Ukupno glasova: <strong class="text-foreground">{data.totalVotes}</strong>
		</p>
	</div>

	<!-- Nominate -->
	<div class="mt-8 rounded-2xl border border-border bg-card p-6">
		<div class="flex items-center justify-between">
			<h2 class="text-lg font-semibold">Predloži sestru</h2>
			<button
				type="button"
				onclick={() => (showForm = !showForm)}
				class="text-sm font-medium text-primary hover:underline"
			>
				{showForm ? 'Zatvori' : 'Dodaj novu'}
			</button>
		</div>

		{#if form?.nominateSuccess}
			<p class="mt-4 rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary">
				Hvala! Prijedlog je zabilježen.
			</p>
		{/if}

		{#if showForm}
			<form
				method="POST"
				action="?/nominate"
				use:enhance={() => {
					return async ({ update }) => {
						await update();
						showForm = false;
					};
				}}
				class="mt-4 grid gap-3"
			>
				<div class="grid gap-1">
					<label for="name" class="text-sm font-medium">Ime i prezime *</label>
					<input
						id="name"
						name="name"
						required
						class="rounded-lg border border-input bg-background px-3 py-2 outline-none focus:border-primary"
						placeholder="npr. Ana Horvat"
					/>
				</div>
				<div class="grid gap-3 sm:grid-cols-2">
					<div class="grid gap-1">
						<label for="workplace" class="text-sm font-medium">Ustanova</label>
						<input
							id="workplace"
							name="workplace"
							class="rounded-lg border border-input bg-background px-3 py-2 outline-none focus:border-primary"
							placeholder="npr. KBC Zagreb"
						/>
					</div>
					<div class="grid gap-1">
						<label for="city" class="text-sm font-medium">Grad</label>
						<input
							id="city"
							name="city"
							class="rounded-lg border border-input bg-background px-3 py-2 outline-none focus:border-primary"
							placeholder="npr. Zagreb"
						/>
					</div>
				</div>
				{#if form?.nominateError}
					<p class="text-sm text-destructive">{form.nominateError}</p>
				{/if}
				<button
					type="submit"
					class="mt-1 justify-self-start rounded-xl bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-opacity hover:opacity-90"
				>
					Spremi prijedlog
				</button>
			</form>
		{/if}
	</div>

	<!-- Vote feedback -->
	{#if form?.voteError}
		<p class="mt-6 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{form.voteError}</p>
	{/if}
	{#if hasVoted}
		<p class="mt-6 rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary">
			Vaš glas je zabilježen. Hvala što ste sudjelovali!
		</p>
	{/if}

	<!-- Nominees list -->
	<div class="mt-6 grid gap-3">
		{#each data.nominees as nominee, i (nominee.id)}
			<div class="rounded-2xl border border-border bg-card p-5">
				<div class="flex items-center justify-between gap-4">
					<div class="min-w-0">
						<div class="flex items-center gap-2">
							{#if i === 0 && nominee.vote_count > 0}
								<span class="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent-foreground">Vodi</span>
							{/if}
							<h3 class="truncate text-lg font-semibold">{nominee.name}</h3>
						</div>
						<p class="mt-0.5 text-sm text-muted-foreground">
							{[nominee.workplace, nominee.city].filter(Boolean).join(' · ') || 'Dijabetička sestra'}
						</p>
					</div>
					<div class="flex shrink-0 items-center gap-3">
						<span class="text-right">
							<span class="block text-xl font-semibold">{nominee.vote_count}</span>
							<span class="block text-xs text-muted-foreground">glasova</span>
						</span>
						<form method="POST" action="?/vote" use:enhance>
							<input type="hidden" name="nominee_id" value={nominee.id} />
							<button
								type="submit"
								disabled={hasVoted}
								class="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
							>
								Glasaj
							</button>
						</form>
					</div>
				</div>
				<div class="mt-3 h-2 overflow-hidden rounded-full bg-muted">
					<div class="h-full rounded-full bg-primary" style="width: {((nominee.vote_count ?? 0) / maxVotes) * 100}%"></div>
				</div>
			</div>
		{:else}
			<p class="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
				Još nema predloženih sestara. Budite prvi koji će nekoga predložiti!
			</p>
		{/each}
	</div>
</section>
