<script lang="ts">
  import { windows } from '$lib/stores/windows';
  import { desktopSelection, desktopIcons, GRID_SIZE, type IconPosition } from '$lib/stores/desktop.svelte';

  interface Props {
    icon: string;
    label: string;
    appId: string;
    id: string;
    position?: IconPosition;
    onDragStart?: (id: string, startX: number, startY: number) => void;
    onDrag?: (id: string, deltaX: number, deltaY: number) => void;
    onDragEnd?: (id: string) => void;
  }

  let { icon, label, appId, id, position, onDragStart, onDrag, onDragEnd }: Props = $props();

  // Reactive check for selection state
  let selected = $derived(desktopSelection.selected.has(id));

  // Dragging state
  let isDragging = $state(false);
  let dragStartPos = $state({ x: 0, y: 0 });
  let currentDragOffset = $state({ x: 0, y: 0 });

  // Calculate display position
  let displayPosition = $derived({
    x: (position?.x ?? 0) + (isDragging ? currentDragOffset.x : 0),
    y: (position?.y ?? 0) + (isDragging ? currentDragOffset.y : 0)
  });

  function handleClick(event: MouseEvent) {
    // Don't select if we just finished dragging
    if (isDragging) return;
    event.stopPropagation();
    desktopSelection.select(id, event.ctrlKey || event.metaKey);
  }

  function handleDblClick() {
    if (isDragging) return;
    windows.open(appId);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      windows.open(appId);
    }
  }

  function handleMouseDown(event: MouseEvent) {
    if (event.button !== 0) return;

    // Select this icon if not already selected
    if (!selected) {
      desktopSelection.select(id, event.ctrlKey || event.metaKey);
    }

    // Start drag tracking
    dragStartPos = { x: event.clientX, y: event.clientY };

    // Add global mouse listeners for drag
    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    event.preventDefault(); // Prevent text selection
  }

  function handleGlobalMouseMove(event: MouseEvent) {
    const deltaX = event.clientX - dragStartPos.x;
    const deltaY = event.clientY - dragStartPos.y;

    // Only start visual drag after moving a few pixels (prevents accidental drags)
    if (!isDragging && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
      isDragging = true;
      onDragStart?.(id, dragStartPos.x, dragStartPos.y);
    }

    if (isDragging) {
      currentDragOffset = { x: deltaX, y: deltaY };
      onDrag?.(id, deltaX, deltaY);
    }
  }

  function handleGlobalMouseUp(event: MouseEvent) {
    window.removeEventListener('mousemove', handleGlobalMouseMove);
    window.removeEventListener('mouseup', handleGlobalMouseUp);

    if (isDragging) {
      const deltaX = event.clientX - dragStartPos.x;
      const deltaY = event.clientY - dragStartPos.y;

      // Update position in store with grid snapping
      if (position) {
        const newPos = desktopIcons.snapToGrid(position.x + deltaX, position.y + deltaY);
        desktopIcons.setPosition(id, newPos);
      }

      onDragEnd?.(id);

      // Reset drag state after a short delay to prevent click from firing
      requestAnimationFrame(() => {
        isDragging = false;
        currentDragOffset = { x: 0, y: 0 };
      });
    }
  }
</script>

<button
  class="desktop-icon"
  class:selected
  class:dragging={isDragging}
  data-icon-id={id}
  style="left: {displayPosition.x}px; top: {displayPosition.y}px;"
  onclick={handleClick}
  ondblclick={handleDblClick}
  onkeydown={handleKeyDown}
  onmousedown={handleMouseDown}
  aria-label="{label} - double-click or press Enter to open"
  aria-pressed={selected}
>
  <div class="icon-wrapper">
    <img src={icon} alt="" aria-hidden="true" />
    {#if selected}
      <div class="dithered-overlay" aria-hidden="true"></div>
    {/if}
  </div>
  <span class="label" aria-hidden="true">{label}</span>
</button>

<style>
  .desktop-icon {
    /* Reset all 98.css button styles */
    all: unset;

    /* Positioning */
    position: absolute;

    /* Desktop icon layout */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 4px;
    cursor: pointer;
    width: 64px;
    box-sizing: border-box;
  }

  /* Dragging state */
  .desktop-icon.dragging {
    opacity: 0.7;
    cursor: grabbing;
    z-index: 1000;
  }

  /* Explicitly ensure no button styling remains */
  .desktop-icon,
  .desktop-icon:hover,
  .desktop-icon:active {
    background: transparent;
    border: none;
    box-shadow: none;
    outline: none;
  }

  /* Focus state: 1px dotted black border around entire icon */
  .desktop-icon:focus {
    background: transparent;
    box-shadow: none;
    outline: 1px dotted black;
    outline-offset: 0px;
  }

  .icon-wrapper {
    position: relative;
    width: 32px;
    height: 32px;
  }

  .desktop-icon img {
    width: 32px;
    height: 32px;
    pointer-events: none;
  }

  /* Dithered blue overlay for selected state - 2x2 checkerboard pattern */
  .dithered-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    /* 2x2 pixel checkerboard: alternating navy blue and transparent */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23000080'/%3E%3Crect x='1' y='1' width='1' height='1' fill='%23000080'/%3E%3C/svg%3E");
    background-size: 2px 2px;
    image-rendering: pixelated;
  }

  .label {
    color: white;
    text-shadow: 1px 1px 1px black;
    font-size: 11px;
    text-align: center;
    pointer-events: none;
    padding: 1px 2px;
  }

  /* Selected state: navy blue background with white text */
  .desktop-icon.selected .label {
    background-color: #000080;
    color: white;
    text-shadow: none;
  }
</style>
