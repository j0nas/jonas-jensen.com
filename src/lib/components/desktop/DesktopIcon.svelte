<script lang="ts">
  import { windows } from '$lib/stores/windows';
  import { desktopSelection } from '$lib/stores/desktop.svelte';

  interface Props {
    icon: string;
    label: string;
    appId: string;
    id: string;
  }

  let { icon, label, appId, id }: Props = $props();

  // Reactive check for selection state - access the Set directly to trigger reactivity
  let selected = $derived(desktopSelection.selected.has(id));

  function handleClick(event: MouseEvent) {
    event.stopPropagation();
    desktopSelection.select(id, event.ctrlKey || event.metaKey);
  }

  function handleDblClick() {
    windows.open(appId);
  }
</script>

<button
  class="desktop-icon"
  class:selected
  onclick={handleClick}
  ondblclick={handleDblClick}
>
  <div class="icon-wrapper">
    <img src={icon} alt="" />
    {#if selected}
      <div class="dithered-overlay"></div>
    {/if}
  </div>
  <span class="label">{label}</span>
</button>

<style>
  .desktop-icon {
    /* Reset all 98.css button styles */
    all: unset;

    /* Desktop icon layout */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 4px;
    cursor: pointer;
    width: 64px;
    box-sizing: border-box;
  }

  /* Explicitly ensure no button styling remains */
  .desktop-icon,
  .desktop-icon:hover,
  .desktop-icon:active,
  .desktop-icon:focus {
    background: transparent;
    border: none;
    box-shadow: none;
    outline: none;
  }

  .icon-wrapper {
    position: relative;
    width: 32px;
    height: 32px;
  }

  .desktop-icon img {
    width: 32px;
    height: 32px;
    pointer-events: none;
  }

  /* Dithered blue overlay for selected state - 2x2 checkerboard pattern */
  .dithered-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    /* 2x2 pixel checkerboard: alternating navy blue and transparent */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23000080'/%3E%3Crect x='1' y='1' width='1' height='1' fill='%23000080'/%3E%3C/svg%3E");
    background-size: 2px 2px;
    image-rendering: pixelated;
  }

  .label {
    color: white;
    text-shadow: 1px 1px 1px black;
    font-size: 11px;
    text-align: center;
    pointer-events: none;
    padding: 1px 2px;
  }

  /* Selected state: navy blue background with white text */
  .desktop-icon.selected .label {
    background-color: #000080;
    color: white;
    text-shadow: none;
  }
</style>
