<script lang="ts">
  import { onMount } from 'svelte';
  import MenuBar from '$lib/components/window/MenuBar.svelte';

  const STORAGE_KEY = 'textarea__main';
  let content = '';

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

<MenuBar items={['File', 'Edit', 'View', 'Insert', 'Help']} />

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
