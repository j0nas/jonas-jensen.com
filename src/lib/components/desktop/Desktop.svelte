<script lang="ts">
  import DesktopIcon from './DesktopIcon.svelte';
  import SelectionRectangle from './SelectionRectangle.svelte';
  import Taskbar from './Taskbar.svelte';
  import Window from '$lib/components/window/Window.svelte';
  import WordPad from '$lib/apps/wordpad/WordPad.svelte';
  import MyComputer from '$lib/apps/my-computer/MyComputer.svelte';
  import RecycleBin from '$lib/apps/recycle-bin/RecycleBin.svelte';
  import { apps } from '$lib/apps';
  import { desktopSelection, desktopIcons as desktopIconsStore, GRID_SIZE } from '$lib/stores/desktop.svelte';
  import { onMount } from 'svelte';

  // Desktop icons configuration
  const iconConfigs = [
    { id: 'my-computer', icon: apps['my-computer'].icon, label: 'My Computer', appId: 'my-computer', defaultX: 8, defaultY: 8 },
    { id: 'recycle-bin', icon: apps['recycle-bin'].icon, label: 'Recycle Bin', appId: 'recycle-bin', defaultX: 8, defaultY: 83 },
    { id: 'wordpad-doc', icon: apps.wordpad.icon, label: 'Document', appId: 'wordpad', defaultX: 8, defaultY: 158 }
  ];

  // Initialize icon positions on mount
  onMount(() => {
    iconConfigs.forEach(config => {
      desktopIconsStore.initPosition(config.id, { x: config.defaultX, y: config.defaultY });
    });
  });

  // Get position for icon from store
  function getIconPosition(id: string) {
    return desktopIconsStore.positions.get(id) ?? { x: 8, y: 8 };
  }

  // Drag selection state
  let isDragging = $state(false);
  let wasDragging = $state(false);
  let dragStart = $state({ x: 0, y: 0 });
  let dragEnd = $state({ x: 0, y: 0 });

  // Calculate selection rectangle bounds
  let selectionRect = $derived({
    x: Math.min(dragStart.x, dragEnd.x),
    y: Math.min(dragStart.y, dragEnd.y),
    width: Math.abs(dragEnd.x - dragStart.x),
    height: Math.abs(dragEnd.y - dragStart.y)
  });

  function handleDesktopClick(event: MouseEvent) {
    // Only deselect if clicking directly on the desktop background (not during or after drag)
    if (event.target === event.currentTarget && !isDragging && !wasDragging) {
      desktopSelection.deselectAll();
    }
    wasDragging = false;
  }

  function handleMouseDown(event: MouseEvent) {
    // Only start drag-select if clicking directly on desktop background
    if (event.target === event.currentTarget && event.button === 0) {
      isDragging = true;
      dragStart = { x: event.clientX, y: event.clientY };
      dragEnd = { x: event.clientX, y: event.clientY };
    }
  }

  function handleMouseMove(event: MouseEvent) {
    if (isDragging) {
      dragEnd = { x: event.clientX, y: event.clientY };
      updateSelectionFromRect();
    }
  }

  function handleMouseUp() {
    if (isDragging) {
      wasDragging = true;
      isDragging = false;
    }
  }

  function updateSelectionFromRect() {
    const iconElements = document.querySelectorAll('.desktop-icon');
    const selectedIds: string[] = [];

    iconElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rectsIntersect(selectionRect, rect)) {
        const id = el.getAttribute('data-icon-id');
        if (id) selectedIds.push(id);
      }
    });

    desktopSelection.selectMultiple(selectedIds);
  }

  function rectsIntersect(
    r1: { x: number; y: number; width: number; height: number },
    r2: DOMRect
  ): boolean {
    return !(
      r1.x + r1.width < r2.left ||
      r1.x > r2.right ||
      r1.y + r1.height < r2.top ||
      r1.y > r2.bottom
    );
  }
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div
  class="desktop"
  role="application"
  onclick={handleDesktopClick}
  onmousedown={handleMouseDown}
>
  {#each iconConfigs as config (config.id)}
    <DesktopIcon
      id={config.id}
      icon={config.icon}
      label={config.label}
      appId={config.appId}
      position={getIconPosition(config.id)}
    />
  {/each}
</div>

<SelectionRectangle
  x={selectionRect.x}
  y={selectionRect.y}
  width={selectionRect.width}
  height={selectionRect.height}
  visible={isDragging && selectionRect.width > 2 && selectionRect.height > 2}
/>

<Window
  id="wordpad"
  title={apps.wordpad.title}
  icon={apps.wordpad.icon}
  width={apps.wordpad.defaultSize.width}
  height={apps.wordpad.defaultSize.height}
>
  <WordPad />
</Window>

<Window
  id="my-computer"
  title={apps['my-computer'].title}
  icon={apps['my-computer'].icon}
  width={apps['my-computer'].defaultSize.width}
  height={apps['my-computer'].defaultSize.height}
>
  <MyComputer />
</Window>

<Window
  id="recycle-bin"
  title={apps['recycle-bin'].title}
  icon={apps['recycle-bin'].icon}
  width={apps['recycle-bin'].defaultSize.width}
  height={apps['recycle-bin'].defaultSize.height}
>
  <RecycleBin />
</Window>

<Taskbar />

<style>
  .desktop {
    position: relative;
    height: calc(100vh - 28px);
    padding: 8px;
  }
</style>
