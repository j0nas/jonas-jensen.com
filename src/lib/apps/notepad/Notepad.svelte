<script lang="ts">
  import MenuBar from '$lib/components/window/MenuBar.svelte';

  export let content: string = '';

  const menus = [
    {
      label: 'File',
      items: [
        { label: 'New' },
        { label: 'Open...' },
        { label: 'Save' },
        { label: 'Save As...' },
        { divider: true },
        { label: 'Page Setup...' },
        { label: 'Print...' },
        { divider: true },
        { label: 'Exit' }
      ]
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo' },
        { divider: true },
        { label: 'Cut' },
        { label: 'Copy' },
        { label: 'Paste' },
        { label: 'Delete' },
        { divider: true },
        { label: 'Select All' },
        { label: 'Time/Date' }
      ]
    },
    {
      label: 'Search',
      items: [
        { label: 'Find...' },
        { label: 'Find Next' }
      ]
    },
    {
      label: 'Help',
      items: [
        { label: 'Help Topics' },
        { divider: true },
        { label: 'About Notepad' }
      ]
    }
  ];
</script>

<MenuBar {menus} />

<div class="notepad-content">
  <pre>{content}</pre>
</div>

<style>
  .notepad-content {
    width: 100%;
    height: calc(100% - 24px);
    overflow: auto;
    background: white;
  }

  pre {
    margin: 0;
    padding: 2px;
    min-height: 100%;
    box-sizing: border-box;
    font-family: 'Fixedsys', 'Courier New', monospace;
    font-size: 12px;
    line-height: 1.4;
    white-space: pre;
    color: black;
  }
</style>
