<script lang="ts">
  import DesktopIcon from './DesktopIcon.svelte';
  import Taskbar from './Taskbar.svelte';
  import Window from '$lib/components/window/Window.svelte';
  import WordPad from '$lib/apps/wordpad/WordPad.svelte';
  import { apps } from '$lib/apps';
</script>

<div class="desktop">
  <DesktopIcon
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
