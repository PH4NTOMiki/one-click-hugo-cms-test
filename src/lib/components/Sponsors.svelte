<script lang="ts">
	// Placeholder sponsor slots. Replace the labels/logos when partners are confirmed.
	const sponsors = [
		'Vaš logo ovdje',
		'Vaš logo ovdje',
		'Vaš logo ovdje',
		'Vaš logo ovdje'
	];
</script>

<section class="border-t border-border bg-card">
	<div class="mx-auto max-w-5xl px-4 py-10">
		<div class="text-center">
			<p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sponzori i partneri</p>
			<h2 class="mt-1 text-xl font-bold">Projekt podržavaju</h2>
		</div>
		<div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
			{#each sponsors as sponsor, i (i)}
				<div
					class="flex h-20 items-center justify-center rounded-xl border border-dashed border-border bg-background px-4 text-center text-sm font-medium text-muted-foreground"
				>
					{sponsor}
				</div>
			{/each}
		</div>
		<p class="mt-4 text-center text-xs text-muted-foreground">
			Želite postati sponzor? Javite nam se i podržite priznanje medicinskim sestrama.
		</p>
	</div>
</section>
