<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	const done = $derived(form?.success || data.hasVoted);
</script>

<svelte:head>
	<title>Glasaj za sestru — najMedicinska SESTRA</title>
	<meta name="description" content="Glasajte za medicinsku sestru koja je pomogla vama ili vašoj obitelji." />
</svelte:head>

<section class="mx-auto max-w-xl px-4 py-10">
	<a href="/" class="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
		Natrag na početnu
	</a>

	<div class="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
		<!-- Blue header -->
		<div class="flex items-start gap-4 bg-primary p-6 text-primary-foreground">
			<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
			</span>
			<div>
				<h1 class="text-xl font-bold">Nominacija – Priznanje pacijenata</h1>
				<p class="mt-1 text-sm text-primary-foreground/85">
					Ispunite obrazac i predložite medicinsku sestru.
				</p>
			</div>
		</div>

		<div class="p-6">
			{#if done}
				<div class="rounded-xl bg-primary/10 px-4 py-4 text-sm text-primary">
					<p class="font-semibold">Hvala! Vaš glas je zabilježen.</p>
					<p class="mt-1">Svaki posjetitelj ima jedan glas. Podijelite stranicu kako bi i drugi glasali.</p>
				</div>
			{:else}
				<form method="POST" action="?/vote" use:enhance class="grid gap-4">
					<div class="grid gap-4 sm:grid-cols-2">
						<div class="grid gap-1.5">
							<label for="first_name" class="text-sm font-medium">Ime sestre *</label>
							<input id="first_name" name="first_name" required value={form?.values?.firstName ?? ''}
								class="rounded-xl border border-input bg-background px-4 py-2.5 outline-none transition-colors focus:border-primary"
								placeholder="Unesite ime" />
						</div>
						<div class="grid gap-1.5">
							<label for="last_name" class="text-sm font-medium">Prezime sestre *</label>
							<input id="last_name" name="last_name" required value={form?.values?.lastName ?? ''}
								class="rounded-xl border border-input bg-background px-4 py-2.5 outline-none transition-colors focus:border-primary"
								placeholder="Unesite prezime" />
						</div>
					</div>

					<div class="grid gap-1.5">
						<label for="workplace" class="text-sm font-medium">Ustanova u kojoj radi *</label>
						<input id="workplace" name="workplace" required value={form?.values?.workplace ?? ''}
							class="rounded-xl border border-input bg-background px-4 py-2.5 outline-none transition-colors focus:border-primary"
							placeholder="Naziv ustanove" />
					</div>

					<div class="grid gap-1.5">
						<label for="city" class="text-sm font-medium">Grad (opcionalno)</label>
						<input id="city" name="city" value={form?.values?.city ?? ''}
							class="rounded-xl border border-input bg-background px-4 py-2.5 outline-none transition-colors focus:border-primary"
							placeholder="Unesite grad" />
					</div>

					<label class="flex items-start gap-3 text-sm text-muted-foreground">
						<input type="checkbox" name="confirm_patient" required class="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-primary)]" />
						<span>Potvrđujem da sam pacijent ili član obitelji osobe s dijabetesom.</span>
					</label>
					<label class="flex items-start gap-3 text-sm text-muted-foreground">
						<input type="checkbox" name="accept_rules" required class="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-primary)]" />
						<span>Slažem se s pravilima projekta i dajem privolu za obradu podataka. <span class="text-primary underline">(više informacija)</span></span>
					</label>

					{#if form?.error}
						<p class="rounded-lg bg-accent/10 px-3 py-2 text-sm text-accent">{form.error}</p>
					{/if}

					<button type="submit"
						class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
						Pošalji nominaciju
					</button>
				</form>
			{/if}
		</div>
	</div>

	<div class="mt-4 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
		<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
		<p>Vaši podaci su sigurni i koristimo ih samo u svrhu projekta.</p>
	</div>
</section>
