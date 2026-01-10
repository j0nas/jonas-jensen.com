<script lang="ts">
  import { windows } from '$lib/stores/windows';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  interface MenuItem {
    id: string;
    label: string;
    icon: string;
    hasSubmenu?: boolean;
    action?: () => void;
  }

  const menuItems: MenuItem[] = [
    { id: 'programs', label: 'Programs', icon: '/img/win/programs.png', hasSubmenu: true },
    { id: 'documents', label: 'Documents', icon: '/img/win/documents.png', hasSubmenu: true },
    { id: 'settings', label: 'Settings', icon: '/img/win/settings.png', hasSubmenu: true },
    { id: 'find', label: 'Find', icon: '/img/win/find.png', hasSubmenu: true },
    { id: 'help', label: 'Help', icon: '/img/win/help.png' },
    { id: 'run', label: 'Run...', icon: '/img/win/run.png' },
    { id: 'shutdown', label: 'Shut Down...', icon: '/img/win/shutdown.png' }
  ];

  let hoveredItem: string | null = null;

  function handleProgramClick(appId: string) {
    windows.open(appId);
    dispatch('close');
  }
</script>

<div class="start-menu">
  <div class="sidebar">
    <span class="sidebar-text">Windows<span class="sidebar-98">98</span></span>
  </div>
  <div class="menu-content">
    <ul class="menu-items">
      {#each menuItems as item, index}
        {#if index === 4}
          <li class="divider"></li>
        {/if}
        {#if index === 6}
          <li class="divider"></li>
        {/if}
        <li
          class="menu-item"
          class:has-submenu={item.hasSubmenu}
          on:mouseenter={() => hoveredItem = item.id}
          on:mouseleave={() => hoveredItem = null}
        >
          <img src={item.icon} alt="" class="menu-icon" />
          <span class="menu-label">{item.label}</span>
          {#if item.hasSubmenu}
            <span class="submenu-arrow">▶</span>
          {/if}

          {#if item.id === 'programs' && hoveredItem === 'programs'}
            <div class="submenu">
              <ul class="submenu-items">
                <li class="menu-item" on:click={() => handleProgramClick('wordpad')}>
                  <img src="/img/win/wordpad.ico" alt="" class="menu-icon" />
                  <span class="menu-label">WordPad</span>
                </li>
              </ul>
            </div>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .start-menu {
    position: absolute;
    bottom: 100%;
    left: 0;
    display: flex;
    background: var(--win95-gray, rgb(192, 192, 192));
    border: 2px outset rgb(192, 192, 192);
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
  }

  .sidebar {
    width: 22px;
    background: linear-gradient(to top, rgb(0, 0, 128), rgb(16, 132, 208));
    display: flex;
    align-items: flex-end;
    padding-bottom: 8px;
    padding-left: 3px;
  }

  .sidebar-text {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    color: white;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 2px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }

  .sidebar-98 {
    font-weight: normal;
    color: white;
  }

  .menu-content {
    min-width: 180px;
  }

  .menu-items {
    list-style: none;
    margin: 0;
    padding: 2px 0;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 20px 4px 4px;
    cursor: pointer;
    position: relative;
  }

  .menu-item:hover {
    background: rgb(0, 0, 128);
    color: white;
  }

  .menu-icon {
    width: 32px;
    height: 32px;
  }

  .menu-label {
    flex: 1;
    font-size: 11px;
  }

  .has-submenu .submenu-arrow {
    font-size: 8px;
    margin-left: auto;
  }

  .divider {
    height: 2px;
    margin: 3px 2px;
    border-top: 1px solid rgb(128, 128, 128);
    border-bottom: 1px solid white;
  }

  .submenu {
    position: absolute;
    left: 100%;
    top: 0;
    background: var(--win95-gray, rgb(192, 192, 192));
    border: 2px outset rgb(192, 192, 192);
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
    min-width: 150px;
  }

  .submenu-items {
    list-style: none;
    margin: 0;
    padding: 2px 0;
  }
</style>
