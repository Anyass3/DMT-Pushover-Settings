<script lang="ts">
	import TextField from '$smui/textfield/dist/Textfield.svelte';
	import Button from '$smui/button/dist/Button.svelte';
	import Select from '$lib/select.svelte';
	import store from '$store';
	import { dev } from '$app/environment';

	const pushover = store.g('pushover');
	const snackbar = store.g('snackbar');
	const connector = store.g('connector');

	let selected: { id: any; token: string };

	let app = { id: '', token: '' };

	$: updating = store.commit('updating', app);

	$: if(dev) console.log({ app, updating });

</script>

<div class="flex flex-col gap-3">
	<h1 class="text-4xl">DMT Pushover Settings</h1>
	<h3 class="capitalize text-lg mb-2">Select pushover account to edit</h3>

	<Select
		id="select-pushover"
		bind:selected
		items={$pushover.app}
		on:change={() => {
			if (selected?.id && selected?.token.match(/[a-z0-9]{30}/)) {
				app = {...selected};
			} else snackbar.show('Please cross-check selected');
		}}
	/>
</div>
<hr/>
<div class="mt-16 flex flex-col gap-3">
	<h3 class="capitalize text-lg">Or edit/add pushover app</h3>
	<TextField bind:value={app.id} label="Name" />
	<TextField bind:value={app.token} label="API Token" />
	<div>
		{#if !updating?.noDiff}
		<Button
			on:click={() => {
				if (app.id && app.token.match(/[a-z0-9]{30}/)) {
					connector.signal('set-pushover-app', { app, update: updating });
					app.id = '';
					app.token = '';
				} else snackbar.show('Please cross-check inputs');
			}}>{updating ? 'Update' : 'Add'} Pushover</Button
		>
		{/if}
		{#if updating}
		<p style="color: var({updating?.noDiff?'--dmt-red':'--dmt-dark-red'});" class="text-sm">
			{updating?.noDiff?'Cannot submit as a pushover app with exact info already exists. Edit to be able to update!':`Note: this will update the ${updating.key=='id'?'Name/id':'Token/key'} of this pushover app`}
		</p>
		{/if}
	</div>
</div>

<style>
</style>
