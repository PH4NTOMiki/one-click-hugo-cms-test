<script lang="ts">
	import type { PageData } from "./$types";

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
	<div
		class="mx-auto grid max-w-5xl items-center gap-4 px-4 py-4 md:grid-cols-2 md:gap-8 md:py-8"
	>
		<div class="order-2 md:order-1">
			<h1
				class="text-3xl font-extrabold leading-tight text-balance text-foreground sm:text-4xl md:text-5xl"
			>
				Zahvalimo sestrama koje čine razliku.
				<span class="text-accent">♥</span>
			</h1>
			<p
				class="mt-3 max-w-md leading-relaxed text-muted-foreground text-pretty md:mt-5 md:text-lg"
			>
				Predložite medicinsku sestru koja vam je svojim znanjem i ljudskošću
				ostavila trag; a mi ćemo dvije odvesti u Pariz na konferenciju o
				dijabetesu!
			</p>
		</div>
		<div class="order-1 overflow-hidden rounded-2xl md:order-2 md:rounded-3xl">
			<img
				src="/nurse-hero.png"
				alt="Nasmiješena medicinska sestra u plavoj uniformi prekriženih ruku"
				class="h-44 w-full object-cover object-top sm:h-56 md:h-72 lg:h-80"
				width="640"
				height="520"
			/>
		</div>
	</div>
</section>

<!-- Two action cards -->
<section
	class="mx-auto grid max-w-5xl gap-4 px-4 py-6 md:grid-cols-2 md:gap-6 md:pb-12 md:pt-2"
>
	<article class="flex flex-col rounded-2xl bg-blue-soft p-5 md:p-8">
		<h2 class="flex items-center gap-2 text-xl font-bold text-primary md:text-2xl">
			Priznanje pacijenata
		</h2>
		<p
			class="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground text-pretty md:mt-3 md:text-base"
		>
			Nominirajte medicinsku sestru koja je svojim radom i podrškom ostavila
			poseban trag u vašem životu.
		</p>
		<a
			href="/glasanje"
			class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 md:mt-6 md:py-3.5"
		>
			Predloži sestru
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
			>
		</a>
	</article>

	<article class="flex flex-col rounded-2xl bg-red-soft p-5 md:p-8">
		<h2 class="flex items-center gap-2 text-xl font-bold text-accent md:text-2xl">
			Priča koja inspirira
		</h2>
		<p
			class="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground text-pretty md:mt-3 md:text-base"
		>
			Podijelite svoju osobnu priču o medicinskoj sestri koja je pokazala
			iznimnu predanost, stručnost i ljudskost.
		</p>
		<a
			href="/price"
			class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-accent-foreground transition-opacity hover:opacity-90 md:mt-6 md:py-3.5"
		>
			Napiši svoju priču
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
			>
		</a>
	</article>
</section>

<!-- Winners announcement -->
{#if hasWinners}
	<section class="mx-auto max-w-5xl px-4 pb-12">
		<div class="text-center">
			<span
				class="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1 text-sm font-semibold text-accent"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path
						d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"
					/><path d="M4 22h16" /><path
						d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"
					/><path
						d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"
					/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg
				>
				Pobjednice
			</span>
			<h2 class="mt-3 text-3xl font-extrabold">Čestitamo našim pobjednicama</h2>
			<p class="mx-auto mt-2 max-w-xl leading-relaxed text-muted-foreground">
				Hvala svima koji su glasali i podijelili svoje priče. Ovo su sestre koje
				su ostavile najveći trag.
			</p>
		</div>

		<div class="mt-8 grid gap-6 md:grid-cols-2">
			{#if data.voteWinner}
				<div class="rounded-2xl border-2 border-primary bg-card p-7">
					<span
						class="text-xs font-semibold uppercase tracking-wider text-primary"
						>Nagrada pacijenata</span
					>
					<h3 class="mt-2 text-2xl font-bold">{data.voteWinner.name}</h3>
					<p class="mt-1 text-sm text-muted-foreground">
						{[data.voteWinner.workplace, data.voteWinner.city]
							.filter(Boolean)
							.join(" · ") || "Medicinska sestra"}
					</p>
					<p class="mt-4 leading-relaxed text-pretty">
						Sestra s najviše glasova pacijenata i njihovih obitelji.
					</p>
				</div>
			{/if}

			{#if data.storyWinner}
				<div class="rounded-2xl border-2 border-accent bg-card p-7">
					<span
						class="text-xs font-semibold uppercase tracking-wider text-accent"
						>Priča koja inspirira</span
					>
					<h3 class="mt-2 text-2xl font-bold">{data.storyWinner.nurse_name}</h3>
					<p class="mt-1 text-sm text-muted-foreground">
						{[data.storyWinner.workplace, data.storyWinner.city]
							.filter(Boolean)
							.join(" · ") || "Medicinska sestra"}
					</p>
					<p class="mt-4 leading-relaxed text-pretty text-muted-foreground">
						{data.storyWinner.message}
					</p>
				</div>
			{/if}
		</div>
	</section>
{/if}

<!-- Privacy note -->
<section class="mx-auto max-w-5xl px-4 pb-12">
	<div
		class="flex items-center justify-center gap-3 rounded-2xl bg-muted px-5 py-4 text-center text-sm text-muted-foreground"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="shrink-0"
			><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path
				d="M7 11V7a5 5 0 0 1 10 0v4"
			/></svg
		>
		<p>
			Vaši podaci su sigurni i koristimo ih isključivo u svrhu ovog projekta.
		</p>
	</div>
</section>
