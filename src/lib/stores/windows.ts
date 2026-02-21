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

      return {
        ...state,
        [id]: {
          id,
          isOpen: true,
          zIndex: ++topZ,
          x: 50 + offset,
          y: 50 + offset,
          width: defaultSize?.width ?? 400,
          height: defaultSize?.height ?? 300
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
