// Desktop selection and icon position state using Svelte 5 runes

// Grid settings for icon snapping
export const GRID_SIZE = 75;

// Icon position type
export interface IconPosition {
  x: number;
  y: number;
}

// Selection state
let selectedIds = $state<Set<string>>(new Set());

// Icon positions state
let iconPositions = $state<Map<string, IconPosition>>(new Map());

export const desktopSelection = {
  get selected() {
    return selectedIds;
  },

  isSelected(id: string): boolean {
    return selectedIds.has(id);
  },

  select(id: string, addToSelection = false) {
    if (addToSelection) {
      // Ctrl+click: toggle in current selection
      const newSet = new Set(selectedIds);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      selectedIds = newSet;
    } else {
      // Single click: select only this icon
      selectedIds = new Set([id]);
    }
  },

  selectMultiple(ids: string[]) {
    selectedIds = new Set(ids);
  },

  deselect(id: string) {
    const newSet = new Set(selectedIds);
    newSet.delete(id);
    selectedIds = newSet;
  },

  deselectAll() {
    selectedIds = new Set();
  },

  selectRange(fromId: string, toId: string, orderedIds: string[]) {
    const fromIndex = orderedIds.indexOf(fromId);
    const toIndex = orderedIds.indexOf(toId);
    if (fromIndex === -1 || toIndex === -1) return;

    const start = Math.min(fromIndex, toIndex);
    const end = Math.max(fromIndex, toIndex);
    const rangeIds = orderedIds.slice(start, end + 1);
    selectedIds = new Set(rangeIds);
  }
};

export const desktopIcons = {
  get positions() {
    return iconPositions;
  },

  getPosition(id: string): IconPosition | undefined {
    return iconPositions.get(id);
  },

  setPosition(id: string, position: IconPosition) {
    const newMap = new Map(iconPositions);
    newMap.set(id, position);
    iconPositions = newMap;
  },

  // Snap position to grid
  snapToGrid(x: number, y: number): IconPosition {
    return {
      x: Math.round(x / GRID_SIZE) * GRID_SIZE,
      y: Math.round(y / GRID_SIZE) * GRID_SIZE
    };
  },

  // Move multiple icons by a delta
  moveSelected(deltaX: number, deltaY: number) {
    const newMap = new Map(iconPositions);
    selectedIds.forEach(id => {
      const current = newMap.get(id);
      if (current) {
        const newPos = desktopIcons.snapToGrid(
          current.x + deltaX,
          current.y + deltaY
        );
        newMap.set(id, newPos);
      }
    });
    iconPositions = newMap;
  },

  // Initialize icon position if not set
  initPosition(id: string, defaultPosition: IconPosition) {
    if (!iconPositions.has(id)) {
      const newMap = new Map(iconPositions);
      newMap.set(id, defaultPosition);
      iconPositions = newMap;
    }
  }
};
