import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Embedded apps are separate deploys, proxied under /apps/<id>/ in production
// (see netlify.toml). Mirror that proxy on the dev and preview servers so the
// embedded iframes load the same live build locally as in production.
const embeddedProxy = {
  "/apps/floor-planner": {
    target: "https://j0nas.github.io",
    changeOrigin: true,
    rewrite: (p: string) => p.replace(/^\/apps\/floor-planner/, "/floor-boards-planner"),
  },
  "/apps/deck-box": {
    target: "https://j0nas.github.io",
    changeOrigin: true,
    rewrite: (p: string) => p.replace(/^\/apps\/deck-box/, "/parametric-mtg-deck-box"),
  },
  "/apps/laser-deck-box": {
    target: "https://j0nas.github.io",
    changeOrigin: true,
    rewrite: (p: string) => p.replace(/^\/apps\/laser-deck-box/, "/laser-mtg-deck-box"),
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { proxy: embeddedProxy },
  preview: { proxy: embeddedProxy },
});
