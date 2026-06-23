<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const hasWinners = $derived(!!data.voteWinner || !!data.storyWinner);
</script>

<svelte:head>
	<title>najMedicinska SESTRA — izbor najbolje sestre za dijabetes</title>
	<meta
		name="description"
		content="Pomozite nam pronaći medicinske sestre koje pacijentima s dijabetesom znače najviše. Glasajte i podijelite svoju priču."
	/>
</svelte:head>

<!-- Hero -->
<section class="bg-card">
	<div class="mx-auto grid max-w-5xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
		<div>
			<h1 class="text-4xl font-extrabold leading-tight text-balance text-foreground sm:text-5xl">
				Naj medicinska sestra za dijabetes
				<span class="text-accent">♥</span>
			</h1>
			<p class="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
				Pomozite nam pronaći sestre koje pacijentima znače najviše.
			</p>
			<div class="mt-7 flex flex-wrap gap-3">
				<a
					href="/glasanje"
					class="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
				>
					Glasaj za sestru
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
				</a>
				<a
					href="/price"
					class="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-accent-foreground transition-opacity hover:opacity-90"
				>
					Napiši priču
				</a>
			</div>
		</div>
		<div class="overflow-hidden rounded-3xl">
			<img
				src="/nurse-hero.png"
				alt="Medicinska sestra drži ruke starije pacijentice"
				class="h-full w-full object-cover"
				width="640"
				height="520"
			/>
		</div>
	</div>
</section>

<!-- Two action cards -->
<section class="mx-auto grid max-w-5xl gap-6 px-4 py-12 md:grid-cols-2">
	<article class="flex flex-col rounded-2xl bg-blue-soft p-8">
		<span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
			<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
		</span>
		<h2 class="mt-5 flex items-center gap-2 text-2xl font-bold text-primary">
			Priznanje pacijenata
			<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>
		</h2>
		<p class="mt-3 flex-1 leading-relaxed text-muted-foreground text-pretty">
			Nominirajte medicinsku sestru koja je svojim radom i podrškom ostavila poseban trag u vašem životu.
		</p>
		<a
			href="/glasanje"
			class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
		>
			Predloži sestru
			<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
		</a>
	</article>

	<article class="flex flex-col rounded-2xl bg-red-soft p-8">
		<span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
			<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>
		</span>
		<h2 class="mt-5 flex items-center gap-2 text-2xl font-bold text-accent">
			Priča koja inspirira
			<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>
		</h2>
		<p class="mt-3 flex-1 leading-relaxed text-muted-foreground text-pretty">
			Podijelite svoju osobnu priču o medicinskoj sestri koja je pokazala iznimnu predanost, stručnost i ljudskost.
		</p>
		<a
			href="/price"
			class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 font-semibold text-accent-foreground transition-opacity hover:opacity-90"
		>
			Napiši svoju priču
			<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
		</a>
	</article>
</section>

<!-- Winners announcement -->
{#if hasWinners}
	<section class="mx-auto max-w-5xl px-4 pb-12">
		<div class="text-center">
			<span class="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1 text-sm font-semibold text-accent">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
				Pobjednice
			</span>
			<h2 class="mt-3 text-3xl font-extrabold">Čestitamo našim pobjednicama</h2>
			<p class="mx-auto mt-2 max-w-xl leading-relaxed text-muted-foreground">
				Hvala svima koji su glasali i podijelili svoje priče. Ovo su sestre koje su ostavile najveći trag.
			</p>
		</div>

		<div class="mt-8 grid gap-6 md:grid-cols-2">
			{#if data.voteWinner}
				<div class="rounded-2xl border-2 border-primary bg-card p-7">
					<span class="text-xs font-semibold uppercase tracking-wider text-primary">Nagrada pacijenata</span>
					<h3 class="mt-2 text-2xl font-bold">{data.voteWinner.name}</h3>
					<p class="mt-1 text-sm text-muted-foreground">
						{[data.voteWinner.workplace, data.voteWinner.city].filter(Boolean).join(' · ') || 'Medicinska sestra'}
					</p>
					<p class="mt-4 leading-relaxed text-pretty">
						Sestra s najviše glasova pacijenata i njihovih obitelji.
					</p>
				</div>
			{/if}

			{#if data.storyWinner}
				<div class="rounded-2xl border-2 border-accent bg-card p-7">
					<span class="text-xs font-semibold uppercase tracking-wider text-accent">Priča koja inspirira</span>
					<h3 class="mt-2 text-2xl font-bold">{data.storyWinner.nurse_name}</h3>
					<p class="mt-1 text-sm text-muted-foreground">
						{[data.storyWinner.workplace, data.storyWinner.city].filter(Boolean).join(' · ') || 'Medicinska sestra'}
					</p>
					<p class="mt-4 leading-relaxed text-pretty text-muted-foreground">{data.storyWinner.message}</p>
				</div>
			{/if}
		</div>
	</section>
{/if}

<!-- Privacy note -->
<section class="mx-auto max-w-5xl px-4 pb-12">
	<div class="flex items-center justify-center gap-3 rounded-2xl bg-muted px-5 py-4 text-center text-sm text-muted-foreground">
		<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
		<p>Vaši podaci su sigurni i koristimo ih isključivo u svrhu ovog projekta.</p>
	</div>
</section>
