<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	const winner = $derived(data.stories.find((s) => s.is_winner));
	const others = $derived(data.stories.filter((s) => !s.is_winner));
</script>

<svelte:head>
	<title>Priče — NajSestra</title>
	<meta
		name="description"
		content="Podijelite motivacijsku priču o najboljoj dijabetičkoj sestri. Uredništvo bira pobjednicu."
	/>
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-12">
	<a href="/" class="text-sm text-muted-foreground transition-colors hover:text-foreground">← Naslovnica</a>
	<h1 class="mt-4 text-3xl font-semibold sm:text-4xl">Priče</h1>
	<p class="mt-2 leading-relaxed text-muted-foreground">
		Napišite zašto je baš ta sestra najbolja. Naše uredništvo pažljivo čita svaku priču i bira onu
		koja nas najviše dirne.
	</p>

	<!-- Submit form -->
	<div class="mt-8 rounded-2xl border border-border bg-card p-6">
		<h2 class="text-lg font-semibold">Podijeli svoju priču</h2>

		{#if form?.success}
			<p class="mt-4 rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary">
				Hvala! Vaša priča je poslana uredništvu na pregled.
			</p>
		{:else}
			<form method="POST" action="?/submit" use:enhance class="mt-4 grid gap-3">
				<div class="grid gap-3 sm:grid-cols-2">
					<div class="grid gap-1">
						<label for="nurse_name" class="text-sm font-medium">Ime sestre *</label>
						<input id="nurse_name" name="nurse_name" required value={form?.values?.nurseName ?? ''}
							class="rounded-lg border border-input bg-background px-3 py-2 outline-none focus:border-primary" placeholder="npr. Ana Horvat" />
					</div>
					<div class="grid gap-1">
						<label for="city" class="text-sm font-medium">Grad</label>
						<input id="city" name="city" value={form?.values?.city ?? ''}
							class="rounded-lg border border-input bg-background px-3 py-2 outline-none focus:border-primary" placeholder="npr. Split" />
					</div>
				</div>
				<div class="grid gap-1">
					<label for="workplace" class="text-sm font-medium">Ustanova</label>
					<input id="workplace" name="workplace" value={form?.values?.workplace ?? ''}
						class="rounded-lg border border-input bg-background px-3 py-2 outline-none focus:border-primary" placeholder="npr. KBC Split" />
				</div>
				<div class="grid gap-1">
					<label for="message" class="text-sm font-medium">Vaša priča *</label>
					<textarea id="message" name="message" required rows="5"
						class="resize-y rounded-lg border border-input bg-background px-3 py-2 outline-none focus:border-primary"
						placeholder="Opišite zašto je ova sestra posebna...">{form?.values?.message ?? ''}</textarea>
				</div>
				<div class="grid gap-3 sm:grid-cols-2">
					<div class="grid gap-1">
						<label for="author_name" class="text-sm font-medium">Vaše ime</label>
						<input id="author_name" name="author_name" value={form?.values?.authorName ?? ''}
							class="rounded-lg border border-input bg-background px-3 py-2 outline-none focus:border-primary" placeholder="neobavezno" />
					</div>
					<div class="grid gap-1">
						<label for="author_email" class="text-sm font-medium">E-mail</label>
						<input id="author_email" name="author_email" type="email" value={form?.values?.authorEmail ?? ''}
							class="rounded-lg border border-input bg-background px-3 py-2 outline-none focus:border-primary" placeholder="neobavezno" />
					</div>
				</div>
				{#if form?.error}
					<p class="text-sm text-destructive">{form.error}</p>
				{/if}
				<button type="submit"
					class="mt-1 justify-self-start rounded-xl bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-opacity hover:opacity-90">
					Pošalji priču
				</button>
			</form>
		{/if}
	</div>

	<!-- Winner -->
	{#if winner}
		<div class="mt-10 rounded-2xl border-2 border-accent bg-card p-6">
			<span class="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-sm font-semibold text-accent-foreground">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
				Izbor uredništva
			</span>
			<h3 class="mt-3 text-2xl font-semibold">{winner.nurse_name}</h3>
			<p class="text-sm text-muted-foreground">{[winner.workplace, winner.city].filter(Boolean).join(' · ')}</p>
			<p class="mt-3 leading-relaxed text-pretty">{winner.message}</p>
		</div>
	{/if}

	<!-- Other approved stories -->
	{#if others.length > 0}
		<h2 class="mt-10 text-xl font-semibold">Objavljene priče</h2>
		<div class="mt-4 grid gap-3">
			{#each others as story (story.id)}
				<article class="rounded-2xl border border-border bg-card p-5">
					<h3 class="font-semibold">{story.nurse_name}</h3>
					<p class="text-sm text-muted-foreground">{[story.workplace, story.city].filter(Boolean).join(' · ')}</p>
					<p class="mt-2 leading-relaxed text-muted-foreground text-pretty">{story.message}</p>
				</article>
			{/each}
		</div>
	{:else if !winner}
		<p class="mt-10 rounded-2xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
			Još nema objavljenih priča. Vaša bi mogla biti prva!
		</p>
	{/if}
</section>
