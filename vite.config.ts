import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/**
 * @react95/core's `GlobalStyle` inlines its fonts as base64 @font-face blocks:
 * "MS Sans Serif" as TTF-only (~460 KB, no WOFF2) plus a whole face for the
 * `React95Video-Numbers` numerals used by the <Video> component we don't ship.
 *
 * We serve the same pixel font as a 12 KB WOFF2 (see src/index.css, registered
 * under the "MS Sans Serif" family these components reference) and drop every
 * inlined @font-face from the bundled CSS here. Safe: base64 data-URIs contain
 * no "}", so each @font-face match is self-contained. Remove this plugin (and
 * the local fonts) once upstream ships a WOFF2 — see the PR notes in README.
 */
function stripInlinedReact95Fonts(): Plugin {
  return {
    name: "strip-inlined-react95-fonts",
    enforce: "post",
    generateBundle(_options, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type !== "asset" || !file.fileName.endsWith(".css")) continue;
        const original =
          typeof file.source === "string" ? file.source : Buffer.from(file.source).toString("utf8");
        const css = original.replace(/@font-face\{[^}]*data:[^}]*\}/g, "");
        if (css !== original) {
          file.source = css;
          const saved = Math.round((original.length - css.length) / 1024);
          this.info(`stripped ${saved} KB of inlined fonts from ${file.fileName}`);
        }
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), stripInlinedReact95Fonts()],
  css: {
    // @react95/core ships a compiled `mask-image: url('…')` rule whose inline
    // SVG data-URI contains unescaped single quotes (`width='10'`). That's
    // malformed CSS — browsers silently drop the rule, but lightningcss
    // (vite-plus's default minifier) rejects it fatally. Error recovery
    // downgrades it to a warning and skips the rule so the build succeeds.
    lightningcss: { errorRecovery: true },
  },
});
