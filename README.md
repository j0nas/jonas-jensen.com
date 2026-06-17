# jonas-jensen.com

A personal site styled as a Windows 95 desktop — draggable windows, a Start menu, a
taskbar, and a handful of "apps" (Notepad, WordPad, My Computer, Recycle Bin, Personal).

Built with **React 19** and **[React95](https://github.com/React95/React95)** (the
`@react95/core` and `@react95/icons` packages), managed end-to-end by
**[Vite+](https://viteplus.dev/)** (the `vp` CLI — Vite/Rolldown build, Oxlint, Oxfmt,
Vitest).

React95 does the heavy lifting: its `Modal` handles window dragging, focus, z-ordering, and
minimize/restore, and auto-registers each window with the `TaskBar` via a global controller.
The app keeps almost no UI state of its own — `Desktop` tracks which windows are open and
where they spawn; everything else is the library. The desktop icons are the only bespoke
piece (React95 has no desktop-icon component): simple click-to-select / double-click-to-open
launchers.

## Develop

```sh
vp install   # install dependencies
vp dev       # start the dev server
vp check     # format, lint, and type-check
vp build     # production build → dist/
vp preview   # serve the production build
```

## Deploy

Deployed to Netlify. `pnpm run build` outputs a static SPA to `dist/`; `netlify.toml`
rewrites all routes to `/index.html`.

## React95 packaging workarounds

React95's two most recent releases are mis-published, so dependencies are **pinned** and
patched. None of this is our bug — all of it should be fixed upstream (see below).

- **`@react95/core` is pinned to `9.7.3`** (not `9.8.0`). The `9.8.0` tarball is repo-rooted —
  its `exports`/`main` point at `./esm`, `./types` that only exist under `./dist/`, so the
  package won't resolve.
- **`@react95/icons` is forced to `2.4.1`** via `overrides` in `pnpm-workspace.yaml`. `2.5.0`
  ships no component code at all (only `icons.css` + PNGs), and core depends on `^2.4.1`,
  which would otherwise resolve up to it.
- **`@react95/icons` is patched** (`patches/@react95__icons@2.4.1.patch`) to add the missing
  `sideEffects` field. Without it the 975-icon barrel can't be tree-shaken (core itself does
  `import { Logo } from "@react95/icons"`), bundling all of them.
- **`vite.config.ts` strips inlined fonts** from the built CSS and we serve a 12 KB WOFF2
  (`public/fonts/`, see `src/index.css`) instead. `GlobalStyle` inlines "MS Sans Serif" as
  ~460 KB of base64 **TTF-only** (no WOFF2) plus a whole face for the unused `<Video>`
  component. This cut the CSS from ~490 KB to ~28 KB.
- **`vite.config.ts` sets `css.lightningcss.errorRecovery`** because a core `mask-image`
  rule has an inline SVG data-URI with unescaped quotes (`width='10'`) that lightningcss
  rejects fatally.

### Upstream fixes worth a PR to React95

1. Fix `9.8.0` packaging — honor `publishConfig.directory: dist` (publish with `pnpm publish`,
   not bare `npm publish`).
2. Fix `@react95/icons` `2.5.0` — it ships no components.
3. Add `"sideEffects": ["**/*.css"]` to `@react95/icons` so the icon barrel tree-shakes.
4. Ship "MS Sans Serif" as WOFF2 (ideally as a file, not base64-inlined), and don't bundle
   the `<Video>` font into `GlobalStyle` for apps that don't use it.
5. Escape the inline SVG data-URI quotes in the `mask-image` rule so strict CSS parsers
   (lightningcss) accept it.
