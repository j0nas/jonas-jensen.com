<script lang="ts">
  import { windows } from '$lib/stores/windows';
  import StartMenu from './StartMenu.svelte';

  let startMenuOpen = false;

  function toggleStartMenu() {
    startMenuOpen = !startMenuOpen;
  }

  function closeStartMenu() {
    startMenuOpen = false;
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.start-container')) {
      closeStartMenu();
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="taskbar">
  <div class="start-container">
    <button class="start-button" class:active={startMenuOpen} on:click|stopPropagation={toggleStartMenu}>
      <img src="/img/win/windows-logo.png" alt="" width="16" height="16" />
      Start
    </button>
    {#if startMenuOpen}
      <StartMenu on:close={closeStartMenu} />
    {/if}
  </div>

  <div class="taskbar-windows">
    {#each Object.values($windows).filter(w => w.isOpen) as win}
      <button class="taskbar-item" on:click={() => windows.focus(win.id)}>
        {win.id}
      </button>
    {/each}
  </div>
</div>

<style>
  .taskbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 28px;
    background: rgb(192, 192, 192);
    border-top: 2px solid white;
    display: flex;
    align-items: center;
    padding: 2px 4px;
    gap: 4px;
    z-index: 9999;
  }
  .start-container {
    position: relative;
  }
  .start-button {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: bold;
    padding: 2px 6px;
  }
  .start-button.active {
    border-style: inset;
  }
  .taskbar-windows {
    display: flex;
    gap: 2px;
    flex: 1;
  }
  .taskbar-item {
    min-width: 120px;
    text-align: left;
    padding: 2px 8px;
  }
</style>
