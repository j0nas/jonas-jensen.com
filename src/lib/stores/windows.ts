import { writable } from 'svelte/store';

export interface WindowState {
  id: string;
  isOpen: boolean;
  zIndex: number;
}

function createWindowStore() {
  const { subscribe, update } = writable<Record<string, WindowState>>({});
  let topZ = 1;

  return {
    subscribe,
    open: (id: string) => update(state => ({
      ...state,
      [id]: { id, isOpen: true, zIndex: ++topZ }
    })),
    close: (id: string) => update(state => ({
      ...state,
      [id]: { ...state[id], isOpen: false }
    })),
    focus: (id: string) => update(state => ({
      ...state,
      [id]: { ...state[id], zIndex: ++topZ }
    }))
  };
}

export const windows = createWindowStore();
