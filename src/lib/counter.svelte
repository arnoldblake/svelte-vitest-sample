<script lang="ts">
	import { createCounter } from '$lib/counter.svelte.ts';

	const counter = createCounter();
</script>

<button on:click={counter.increment}>
	clicks: {counter.count}
</button>
