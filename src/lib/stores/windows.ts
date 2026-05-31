import { writable } from 'svelte/store';

export interface WindowState {
  id: string;
  isOpen: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

function createWindowStore() {
  const { subscribe, update } = writable<Record<string, WindowState>>({});
  let topZ = 1;
  let openCount = 0;

  return {
    subscribe,
    open: (id: string, defaultSize?: { width: number; height: number }) => update(state => {
      // If already open, just focus
      if (state[id]?.isOpen) {
        return { ...state, [id]: { ...state[id], zIndex: ++topZ } };
      }

      // Stagger position so windows don't stack
      const offset = (openCount % 8) * 30;
      openCount++;

      const width = defaultSize?.width ?? 400;
      const height = defaultSize?.height ?? 300;

      // Desktop icons occupy a ~88px column down the left edge. When the
      // viewport has room, spawn clear of that column so the window doesn't
      // cover the icons; otherwise fall back to the classic top-left stagger
      // (e.g. on narrow/mobile viewports where there's no room beside them).
      const ICON_COLUMN = 88;
      const vw = typeof window !== 'undefined' ? window.innerWidth : 0;
      const clearX = ICON_COLUMN + offset;
      const x = vw && clearX + width + 16 <= vw ? clearX : 50 + offset;
      const y = 50 + offset;

      return {
        ...state,
        [id]: {
          id,
          isOpen: true,
          zIndex: ++topZ,
          x,
          y,
          width,
          height
        }
      };
    }),
    close: (id: string) => update(state => ({
      ...state,
      [id]: { ...state[id], isOpen: false }
    })),
    focus: (id: string) => update(state => ({
      ...state,
      [id]: { ...state[id], zIndex: ++topZ }
    })),
    setPosition: (id: string, x: number, y: number) => update(state => ({
      ...state,
      [id]: { ...state[id], x, y }
    })),
    setSize: (id: string, width: number, height: number) => update(state => ({
      ...state,
      [id]: { ...state[id], width, height }
    }))
  };
}

export const windows = createWindowStore();
