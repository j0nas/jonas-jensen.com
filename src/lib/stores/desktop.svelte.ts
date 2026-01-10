// Desktop selection state using Svelte 5 runes
let selectedIds = $state<Set<string>>(new Set());

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
