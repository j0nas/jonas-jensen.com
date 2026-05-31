<script lang="ts">
  import { windows } from '$lib/stores/windows';

  export let id: string;
  export let title: string;
  export let icon: string = '';
  export let width: number = 400;
  export let height: number = 300;

  $: state = $windows[id];
  $: isOpen = state?.isOpen ?? false;
  $: zIndex = state?.zIndex ?? 1;
  $: winX = state?.x ?? 50;
  $: winY = state?.y ?? 50;
  $: winW = state?.width ?? width;
  $: winH = state?.height ?? height;

  // Drag state
  let isDragging = false;
  let dragStartMouse = { x: 0, y: 0 };
  let dragStartPos = { x: 0, y: 0 };

  // Resize state
  let isResizing = false;
  let resizeEdge = '';
  let resizeStartMouse = { x: 0, y: 0 };
  let resizeStartRect = { x: 0, y: 0, w: 0, h: 0 };

  const MIN_WIDTH = 200;
  const MIN_HEIGHT = 150;

  function handleClose() {
    windows.close(id);
  }

  function handleFocus() {
    windows.focus(id);
  }

  // --- Drag ---
  function handleTitleBarMouseDown(event: MouseEvent) {
    // Don't drag when clicking buttons
    if ((event.target as HTMLElement).closest('.title-bar-controls')) return;
    if (event.button !== 0) return;

    windows.focus(id);
    dragStartMouse = { x: event.clientX, y: event.clientY };
    dragStartPos = { x: winX, y: winY };

    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);
    event.preventDefault();
  }

  function handleDragMove(event: MouseEvent) {
    const deltaX = event.clientX - dragStartMouse.x;
    const deltaY = event.clientY - dragStartMouse.y;

    if (!isDragging && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
      isDragging = true;
    }

    if (isDragging) {
      windows.setPosition(id, dragStartPos.x + deltaX, dragStartPos.y + deltaY);
    }
  }

  function handleDragEnd() {
    window.removeEventListener('mousemove', handleDragMove);
    window.removeEventListener('mouseup', handleDragEnd);
    // Delay reset so click handlers on title bar buttons aren't confused
    requestAnimationFrame(() => {
      isDragging = false;
    });
  }

  // --- Resize ---
  function handleResizeMouseDown(event: MouseEvent, edge: string) {
    if (event.button !== 0) return;

    windows.focus(id);
    isResizing = true;
    resizeEdge = edge;
    resizeStartMouse = { x: event.clientX, y: event.clientY };
    resizeStartRect = { x: winX, y: winY, w: winW, h: winH };

    window.addEventListener('mousemove', handleResizeMove);
    window.addEventListener('mouseup', handleResizeEnd);
    event.preventDefault();
    event.stopPropagation();
  }

  function handleResizeMove(event: MouseEvent) {
    const dx = event.clientX - resizeStartMouse.x;
    const dy = event.clientY - resizeStartMouse.y;

    let newX = resizeStartRect.x;
    let newY = resizeStartRect.y;
    let newW = resizeStartRect.w;
    let newH = resizeStartRect.h;

    if (resizeEdge.includes('e')) newW = Math.max(MIN_WIDTH, resizeStartRect.w + dx);
    if (resizeEdge.includes('s')) newH = Math.max(MIN_HEIGHT, resizeStartRect.h + dy);

    if (resizeEdge.includes('w')) {
      const maxDx = resizeStartRect.w - MIN_WIDTH;
      const clampedDx = Math.min(dx, maxDx);
      newW = resizeStartRect.w - clampedDx;
      newX = resizeStartRect.x + clampedDx;
    }

    if (resizeEdge.includes('n')) {
      const maxDy = resizeStartRect.h - MIN_HEIGHT;
      const clampedDy = Math.min(dy, maxDy);
      newH = resizeStartRect.h - clampedDy;
      newY = resizeStartRect.y + clampedDy;
    }

    windows.setPosition(id, newX, newY);
    windows.setSize(id, newW, newH);
  }

  function handleResizeEnd() {
    window.removeEventListener('mousemove', handleResizeMove);
    window.removeEventListener('mouseup', handleResizeEnd);
    isResizing = false;
    resizeEdge = '';
  }
</script>

{#if isOpen}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="window"
    class:dragging={isDragging}
    class:resizing={isResizing}
    style="left: {winX}px; top: {winY}px; width: {winW}px; height: {winH}px; z-index: {zIndex};"
    on:mousedown={handleFocus}
    role="dialog"
  >
    <!-- Resize handles -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="resize-handle n" on:mousedown={(e) => handleResizeMouseDown(e, 'n')}></div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="resize-handle s" on:mousedown={(e) => handleResizeMouseDown(e, 's')}></div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="resize-handle e" on:mousedown={(e) => handleResizeMouseDown(e, 'e')}></div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="resize-handle w" on:mousedown={(e) => handleResizeMouseDown(e, 'w')}></div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="resize-handle nw" on:mousedown={(e) => handleResizeMouseDown(e, 'nw')}></div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="resize-handle ne" on:mousedown={(e) => handleResizeMouseDown(e, 'ne')}></div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="resize-handle sw" on:mousedown={(e) => handleResizeMouseDown(e, 'sw')}></div>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="resize-handle se" on:mousedown={(e) => handleResizeMouseDown(e, 'se')}></div>

    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="title-bar" on:mousedown={handleTitleBarMouseDown}>
      <div class="title-bar-text">
        {#if icon}<img src={icon} alt="" width="16" height="16" />{/if}
        {title}
      </div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close" on:click={handleClose}></button>
      </div>
    </div>
    <div class="window-body">
      <slot />
    </div>
  </div>
{/if}

<style>
  .window {
    position: absolute;
    display: flex;
    flex-direction: column;
  }

  .window.dragging,
  .window.resizing {
    user-select: none;
  }

  .title-bar {
    cursor: default;
  }

  .title-bar-text {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* Fill the window below the title bar; override 98.css's default 8px margin
     so app content (Notepad/WordPad text areas, file views) sits flush in a thin
     frame like real Win98, rather than inside a fat gray border. */
  .window-body {
    flex: 1 1 auto;
    min-height: 0;
    margin: 0;
    overflow: visible;
  }

  /* Resize handles */
  .resize-handle {
    position: absolute;
    z-index: 1;
  }

  /* Edge handles */
  .resize-handle.n {
    top: -3px; left: 6px; right: 6px; height: 6px;
    cursor: ns-resize;
  }
  .resize-handle.s {
    bottom: -3px; left: 6px; right: 6px; height: 6px;
    cursor: ns-resize;
  }
  .resize-handle.e {
    right: -3px; top: 6px; bottom: 6px; width: 6px;
    cursor: ew-resize;
  }
  .resize-handle.w {
    left: -3px; top: 6px; bottom: 6px; width: 6px;
    cursor: ew-resize;
  }

  /* Corner handles */
  .resize-handle.nw {
    top: -3px; left: -3px; width: 12px; height: 12px;
    cursor: nwse-resize;
  }
  .resize-handle.ne {
    top: -3px; right: -3px; width: 12px; height: 12px;
    cursor: nesw-resize;
  }
  .resize-handle.sw {
    bottom: -3px; left: -3px; width: 12px; height: 12px;
    cursor: nesw-resize;
  }
  .resize-handle.se {
    bottom: -3px; right: -3px; width: 12px; height: 12px;
    cursor: nwse-resize;
  }
</style>
