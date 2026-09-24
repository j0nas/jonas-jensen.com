/**
 * The embedded apps: separate repos that deploy themselves. The desktop serves each one's
 * live deploy under /apps/<id>/ (worker/index.ts in production, vite.config.ts in dev), so
 * the iframe and a shared /apps/<id>/ link are same-origin with the desktop.
 */
export interface EmbeddedApp {
  /** The live deploy, without a trailing slash. */
  deploy: string;
}

export const APPS: Record<string, EmbeddedApp> = {
  "floor-planner": { deploy: "https://j0nas.github.io/floor-boards-planner" },
  "deck-box": { deploy: "https://j0nas.github.io/parametric-mtg-deck-box" },
  "laser-deck-box": { deploy: "https://j0nas.github.io/laser-mtg-deck-box" },
  "lamp-shade": { deploy: "https://j0nas.github.io/lamp-shade-designer" },
};

/** Apps that were embedded here and now live at their own address: old links go there. */
export const MOVED: Record<string, string> = {
  "edh-land": "https://edh.land",
};
