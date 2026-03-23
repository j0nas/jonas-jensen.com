<script lang="ts">
  const shortcuts = [
    {
      label: 'Overseerr',
      url: 'https://j0nas.comet.usbx.me/overseerr',
      icon: '/img/personal/overseerr.png'
    },
    {
      label: 'Sonarr',
      url: 'https://j0nas.comet.usbx.me/sonarr',
      icon: '/img/personal/sonarr.png'
    },
    {
      label: 'Radarr',
      url: 'https://j0nas.comet.usbx.me/radarr',
      icon: '/img/personal/radarr.png'
    }
  ];
</script>

<div class="folder">
  <div class="folder-content">
    {#each shortcuts as shortcut}
      <a
        class="shortcut"
        href={shortcut.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="shortcut-icon-wrapper">
          <img src={shortcut.icon} alt="" width="32" height="32" />
          <img class="shortcut-arrow" src="/img/personal/shortcut-arrow.png" alt="" width="10" height="10" />
        </div>
        <span class="shortcut-label">{shortcut.label}</span>
      </a>
    {/each}
  </div>
  <div class="status-bar">
    {shortcuts.length} object(s)
  </div>
</div>

<style>
  .folder {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: white;
  }

.folder-content {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 8px;
    overflow-y: auto;
  }

  .shortcut {
    all: unset;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    width: 75px;
    height: 75px;
    padding: 4px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .shortcut:active .shortcut-label {
    background-color: #000080;
    color: white;
  }

  .shortcut-icon-wrapper {
    position: relative;
    width: 32px;
    height: 32px;
  }

  .shortcut-icon-wrapper::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23000080'/%3E%3Crect x='1' y='1' width='1' height='1' fill='%23000080'/%3E%3C/svg%3E");
    background-size: 2px 2px;
    image-rendering: pixelated;
    opacity: 0;
  }

  .shortcut:active .shortcut-icon-wrapper::after {
    opacity: 1;
  }

  .shortcut-arrow {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .shortcut-label {
    font-size: 11px;
    text-align: center;
    padding: 1px 2px;
    word-break: break-word;
  }

  .status-bar {
    padding: 2px 8px;
    font-size: 11px;
    border-top: 1px solid;
    border-color: #808080 #dfdfdf #dfdfdf #808080;
    background: var(--surface, #c0c0c0);
  }
</style>
