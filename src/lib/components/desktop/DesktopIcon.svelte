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

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      windows.open(appId);
    }
  }
</script>

<button
  class="desktop-icon"
  class:selected
  data-icon-id={id}
  onclick={handleClick}
  ondblclick={handleDblClick}
  onkeydown={handleKeyDown}
  aria-label="{label} - double-click or press Enter to open"
  aria-pressed={selected}
>
  <div class="icon-wrapper">
    <img src={icon} alt="" aria-hidden="true" />
    {#if selected}
      <div class="dithered-overlay" aria-hidden="true"></div>
    {/if}
  </div>
  <span class="label" aria-hidden="true">{label}</span>
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
  .desktop-icon:active {
    background: transparent;
    border: none;
    box-shadow: none;
    outline: none;
  }

  /* Focus state: 1px dotted black border around entire icon */
  .desktop-icon:focus {
    background: transparent;
    box-shadow: none;
    outline: 1px dotted black;
    outline-offset: 0px;
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
