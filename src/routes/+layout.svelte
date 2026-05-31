<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/img/win/my-computer.png" />
</svelte:head>

{@render children()}
