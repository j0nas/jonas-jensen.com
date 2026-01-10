<script lang="ts">
  import { windows } from '$lib/stores/windows';

  export let id: string;
  export let title: string;
  export let icon: string = '';
  export let width: number = 400;
  export let height: number = 300;

  $: state = $windows[id];
  $: isOpen = state?.isOpen ?? false;
  $: zIndex = state?.zIndex ?? 1;

  function handleClose() {
    windows.close(id);
  }

  function handleFocus() {
    windows.focus(id);
  }
</script>

{#if isOpen}
  <div
    class="window"
    style="width: {width}px; height: {height}px; z-index: {zIndex};"
    on:mousedown={handleFocus}
    role="dialog"
  >
    <div class="title-bar">
      <div class="title-bar-text">
        {#if icon}<img src={icon} alt="" width="16" height="16" />{/if}
        {title}
      </div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close" on:click={handleClose}></button>
      </div>
    </div>
    <div class="window-body">
      <slot />
    </div>
  </div>
{/if}

<style>
  .window {
    position: absolute;
    top: 50px;
    left: 50px;
  }
  .title-bar-text {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .window-body {
    height: calc(100% - 40px);
    overflow: auto;
  }
</style>
