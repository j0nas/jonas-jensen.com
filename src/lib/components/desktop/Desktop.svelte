<script lang="ts">
  import DesktopIcon from './DesktopIcon.svelte';
  import Taskbar from './Taskbar.svelte';
  import Window from '$lib/components/window/Window.svelte';
  import WordPad from '$lib/apps/wordpad/WordPad.svelte';
  import { apps } from '$lib/apps';
  import { desktopSelection } from '$lib/stores/desktop.svelte';

  function handleDesktopClick(event: MouseEvent) {
    // Only deselect if clicking directly on the desktop background
    if (event.target === event.currentTarget) {
      desktopSelection.deselectAll();
    }
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div class="desktop" on:click={handleDesktopClick}>
  <DesktopIcon
    id="wordpad-doc"
    icon={apps.wordpad.icon}
    label="Document"
    appId="wordpad"
  />
</div>

<Window
  id="wordpad"
  title={apps.wordpad.title}
  icon={apps.wordpad.icon}
  width={apps.wordpad.defaultSize.width}
  height={apps.wordpad.defaultSize.height}
>
  <WordPad />
</Window>

<Taskbar />

<style>
  .desktop {
    height: calc(100vh - 28px);
    padding: 8px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 16px;
  }
</style>
