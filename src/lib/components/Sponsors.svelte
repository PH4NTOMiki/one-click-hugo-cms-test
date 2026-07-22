<script lang="ts">
	let {
		sponsors = [],
		content = {}
	}: {
		sponsors?: Array<{ id: string; name: string; website_url?: string | null; image_url?: string | null }>;
		content?: Record<string, string>;
	} = $props();

	const heading = $derived(content?.sponsors_heading ?? 'Sponzori i partneri');
	const subheading = $derived(content?.sponsors_subheading ?? 'Projekt podržavaju');
	const cta = $derived(content?.sponsors_cta ?? 'Želite postati sponzor? Javite nam se i podržite priznanje medicinskim sestrama.');
</script>

<section class="border-t border-border bg-card">
	<div class="mx-auto max-w-5xl px-4 py-10">
		<div class="text-center">
			<p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{heading}</p>
			<h2 class="mt-1 text-xl font-bold">{subheading}</h2>
		</div>
		<div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
			{#if sponsors.length > 0}
				{#each sponsors as sponsor (sponsor.id)}
					{#if sponsor.website_url}
						<a
							href={sponsor.website_url}
							target="_blank"
							rel="noreferrer"
							class="flex h-24 items-center justify-center overflow-hidden rounded-xl border border-border bg-background p-3 transition-opacity hover:opacity-90"
						>
							{#if sponsor.image_url}
								<img src={sponsor.image_url} alt={sponsor.name} class="max-h-full max-w-full object-contain" />
							{:else}
								<span class="text-center text-sm font-medium text-muted-foreground">{sponsor.name}</span>
							{/if}
						</a>
					{:else}
						<div class="flex h-24 items-center justify-center rounded-xl border border-border bg-background p-3 text-center text-sm font-medium text-muted-foreground">
							{#if sponsor.image_url}
								<img src={sponsor.image_url} alt={sponsor.name} class="max-h-full max-w-full object-contain" />
							{:else}
								{sponsor.name}
							{/if}
						</div>
					{/if}
				{/each}
			{:else}
				<div class="col-span-full flex h-20 items-center justify-center rounded-xl border border-dashed border-border bg-background px-4 text-center text-sm font-medium text-muted-foreground">
					Još nema dodanih sponzora.
				</div>
			{/if}
		</div>
		<p class="mt-4 text-center text-xs text-muted-foreground">{cta}</p>
	</div>
</section>
