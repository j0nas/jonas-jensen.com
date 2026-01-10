<script lang="ts">
  import { onMount } from 'svelte';
  import MenuBar from '$lib/components/window/MenuBar.svelte';

  const STORAGE_KEY = 'textarea__main';
  let content = '';

  const menus = [
    {
      label: 'File',
      items: [
        { label: 'New' },
        { label: 'Open...' },
        { label: 'Save' },
        { label: 'Save As...' },
        { divider: true },
        { label: 'Print...' },
        { label: 'Print Preview' },
        { label: 'Page Setup...' },
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
        { label: 'Paste Special...' },
        { label: 'Clear' },
        { label: 'Select All' },
        { divider: true },
        { label: 'Find...' },
        { label: 'Find Next' },
        { label: 'Replace...' }
      ]
    },
    {
      label: 'View',
      items: [
        { label: 'Toolbar' },
        { label: 'Format Bar' },
        { label: 'Ruler' },
        { label: 'Status Bar' }
      ]
    },
    {
      label: 'Insert',
      items: [
        { label: 'Date and Time...' },
        { label: 'Object...' }
      ]
    },
    {
      label: 'Help',
      items: [
        { label: 'Help Topics' },
        { divider: true },
        { label: 'About WordPad' }
      ]
    }
  ];

  onMount(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) content = stored;
  });

  function handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    content = target.value;
    localStorage.setItem(STORAGE_KEY, content);
  }
</script>

<MenuBar {menus} />

<textarea
  value={content}
  on:input={handleInput}
  placeholder="Type here..."
></textarea>

<style>
  textarea {
    width: 100%;
    height: calc(100% - 24px);
    resize: none;
    border: none;
    padding: 4px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
  }
</style>
