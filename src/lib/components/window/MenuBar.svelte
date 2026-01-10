<script lang="ts">
  export let items: string[] = [];
</script>

<div class="menu-bar" role="menubar">
  {#each items as item}
    <button class="menu-item" role="menuitem">
      {item}
    </button>
  {/each}
</div>

<style>
  .menu-bar {
    display: flex;
    background: rgb(192, 192, 192);
    border-bottom: 1px solid #888;
    padding: 2px;
  }
  .menu-item {
    background: none;
    border: none;
    padding: 2px 8px;
    cursor: pointer;
  }
  .menu-item:hover {
    background: rgb(0, 2, 117);
    color: white;
  }
</style>
