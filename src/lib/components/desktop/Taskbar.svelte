<script lang="ts">
  import { windows } from '$lib/stores/windows';
</script>

<div class="taskbar">
  <button class="start-button">
    <img src="/img/win/windows.ico" alt="" width="16" height="16" />
    Start
  </button>

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
  }
  .start-button {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: bold;
    padding: 2px 6px;
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
