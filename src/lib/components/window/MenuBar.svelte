<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  interface MenuItem {
    label: string;
    divider?: boolean;
  }

  interface Menu {
    label: string;
    items: MenuItem[];
  }

  interface Props {
    menus?: Menu[];
  }

  let { menus = [] }: Props = $props();

  const dispatch = createEventDispatcher();

  let openMenuIndex: number | null = $state(null);
  let menuBarElement: HTMLElement | undefined = $state(undefined);

  function handleMenuClick(index: number) {
    if (openMenuIndex === index) {
      openMenuIndex = null;
    } else {
      openMenuIndex = index;
    }
  }

  function handleMenuHover(index: number) {
    if (openMenuIndex !== null) {
      openMenuIndex = index;
    }
  }

  function handleItemClick(menuLabel: string, itemLabel: string) {
    dispatch('menuaction', { menu: menuLabel, item: itemLabel });
    openMenuIndex = null;
  }

  // Use onMount to add document-level click handler
  onMount(() => {
    function handleDocumentClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (menuBarElement && !menuBarElement.contains(target)) {
        openMenuIndex = null;
      }
    }

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  });
</script>

<div class="menu-bar" role="menubar" bind:this={menuBarElement}>
  {#each menus as menu, index}
    <div class="menu-container">
      <button
        class="menu-button"
        class:active={openMenuIndex === index}
        role="menuitem"
        aria-haspopup="true"
        aria-expanded={openMenuIndex === index}
        onclick={() => handleMenuClick(index)}
        onmouseenter={() => handleMenuHover(index)}
      >
        {menu.label}
      </button>
      {#if openMenuIndex === index}
        <div class="dropdown" role="menu">
          {#each menu.items as item}
            {#if item.divider}
              <div class="divider"></div>
            {:else}
              <button
                class="dropdown-item"
                role="menuitem"
                onclick={() => handleItemClick(menu.label, item.label)}
              >
                {item.label}
              </button>
            {/if}
          {/each}
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .menu-bar {
    display: flex;
    background: rgb(192, 192, 192);
    border-bottom: 1px solid #888;
    padding: 2px;
    position: relative;
  }

  .menu-container {
    position: relative;
  }

  .menu-button {
    background: none;
    border: none;
    padding: 2px 8px;
    cursor: pointer;
    font-size: 11px;
  }

  .menu-button:hover,
  .menu-button.active {
    background: rgb(0, 0, 128);
    color: white;
  }

  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    background: rgb(192, 192, 192);
    border: 2px outset rgb(192, 192, 192);
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
    min-width: 150px;
    z-index: 1000;
  }

  .dropdown-item {
    display: block;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 4px 20px;
    cursor: pointer;
    font-size: 11px;
    white-space: nowrap;
  }

  .dropdown-item:hover {
    background: rgb(0, 0, 128);
    color: white;
  }

  .divider {
    height: 2px;
    margin: 3px 2px;
    border-top: 1px solid rgb(128, 128, 128);
    border-bottom: 1px solid white;
  }
</style>
