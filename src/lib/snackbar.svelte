<script lang="ts">
	import { fly } from 'svelte/transition';
	import XIcon from 'icons/XIcon.svelte';

	import store from '$store';
	const snackBar = store.g('snackbar');
</script>

{#key $snackBar}
	<div
		in:fly={{ delay: 10, y: 48, duration: 500 }}
		out:fly={{ delay: 10, y: 48, duration: 500 }}
		id="snackbar"
		class:show={$snackBar}
		class="snackbar"
	>
		<div class="message">
			<span class={$snackBar?.color == 'danger' ? 'bg-red-400' : ''}>{$snackBar?.message}</span>
			<button class="active:scale-75" on:click={snackBar.close}><XIcon size="1x" /></button>
		</div>
	</div>
{/key}

<style>
	.snackbar {
		display: none;
		background-color: transparent;
		color: transparent;
		text-align: start;
		position: fixed;
		z-index: 9999;
		width: 100%;
		max-width: 60vw;
		padding-left: 2.5rem;
		/* left: 50%; */
		bottom: 2rem;
		-webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
		animation: fadein 0.5s, fadeout 0.5s 2.5s;
		font-size: 17px;
	}
	.message {
		background-color: #333;
		color: #fff;
		border-radius: 2px;
		padding: 1rem;
		align-items: flex-start;
		display: flex !important;
		justify-content: space-between;
	}

	.show {
		display: flex !important;
	}
</style>
