<script lang="ts">
  import DesktopIcon from './DesktopIcon.svelte';
  import SelectionRectangle from './SelectionRectangle.svelte';
  import Taskbar from './Taskbar.svelte';
  import Window from '$lib/components/window/Window.svelte';
  import WordPad from '$lib/apps/wordpad/WordPad.svelte';
  import { apps } from '$lib/apps';
  import { desktopSelection } from '$lib/stores/desktop.svelte';

  // Desktop icons configuration with positions
  const desktopIcons = [
    { id: 'wordpad-doc', icon: apps.wordpad.icon, label: 'Document', appId: 'wordpad', x: 8, y: 8 }
  ];

  // Drag selection state
  let isDragging = $state(false);
  let wasDragging = $state(false); // Track if a drag just completed
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
    // Reset the wasDragging flag after click
    wasDragging = false;
  }

  function handleMouseDown(event: MouseEvent) {
    // Only start drag if clicking directly on desktop background
    if (event.target === event.currentTarget && event.button === 0) {
      isDragging = true;
      dragStart = { x: event.clientX, y: event.clientY };
      dragEnd = { x: event.clientX, y: event.clientY };
    }
  }

  function handleMouseMove(event: MouseEvent) {
    if (isDragging) {
      dragEnd = { x: event.clientX, y: event.clientY };
      // Calculate which icons are inside the selection rectangle
      updateSelectionFromRect();
    }
  }

  function handleMouseUp() {
    if (isDragging) {
      wasDragging = true; // Mark that we just finished dragging
      isDragging = false;
    }
  }

  function updateSelectionFromRect() {
    // Get all desktop icon elements and check intersection
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
  {#each desktopIcons as iconConfig (iconConfig.id)}
    <DesktopIcon
      id={iconConfig.id}
      icon={iconConfig.icon}
      label={iconConfig.label}
      appId={iconConfig.appId}
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
