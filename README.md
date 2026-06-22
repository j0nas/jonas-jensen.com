# jonas-jensen.com

A personal site styled as a Windows 95 desktop — draggable windows, a Start menu, a
taskbar, and a handful of "apps" (Notepad, WordPad, My Computer, Recycle Bin, Personal), plus
standalone web apps (e.g. the Floor Planner) embedded in their own windows.

Built with **React 19**, managed end-to-end by **[Vite+](https://viteplus.dev/)** (the `vp`
CLI — Vite/Rolldown build, Oxlint, Oxfmt, Vitest). The Windows 95 UI is **our own component
library** (`src/win95/`) — no third-party UI dependency.

## The `src/win95/` component library

The chrome is built from scratch on a single foundation sheet, `src/win95/theme.css`, whose
every value is taken from a Microsoft primary source rather than reverse-engineered by eye:

- **Palette** — the "Windows Standard" scheme, i.e. the GDI `GetSysColor()` defaults
  (`COLOR_3DFACE` `#c0c0c0`, `COLOR_ACTIVECAPTION` the solid navy `#000080`, `COLOR_3DDKSHADOW`
  true black `#000000`, and so on).
- **Metrics** — the `GetSystemMetrics()` defaults at 96 DPI (2px 3D edge, 18px caption, 16px
  scrollbar, 8pt/11px MS Sans Serif).
- **Bevels** — the `DrawEdge()` algorithm, decoded from ReactOS's faithful user32
  reimplementation into reusable `box-shadow` recipes (`--w95-bevel-raised` / `-raised-soft`
  / `-sunken` / `-pressed`). Every raised/sunken surface in the UI is one of these tokens.

Components built on top: `Window` (drag, focus/z-order, minimize, menu slot), `MenuBar`,
`Button`, `TextArea`, `StatusBar`, `TaskBar`, `StartMenu`, `DesktopIcon`, `Clock`. Icons are
the authentic Win95 icon files in `public/img/`; the pixel font is served as a ~12 KB WOFF2
from `public/fonts/`.

The app layer is thin: `Desktop` owns window state (open set, z-order, focus, minimize) and
composes the shell; each "app" renders its body inside an `AppWindow` wrapper that pairs the
registry metadata with the live window controls.

## Embedded apps

Some "apps" on the desktop are **separate, self-contained web apps** — their own repo,
toolchain, dependencies and styles — hosted inside a Win95 window via an `<iframe>` rather
than written against `src/win95/`. The first is the **Floor Planner** (a React + Tailwind
laminate floor-layout planner). Embedding keeps the desktop shell free of each app's
dependencies and gives every app full style/JS isolation; the Win95 chrome just supplies the
window frame.

How it fits together:

- **`apps.manifest.json`** lists each external app and the path to its local checkout.
- **`scripts/sync-apps.mjs`** (`pnpm sync-apps`) builds each app and copies its static
  bundle into **`public/apps/<id>/`**, which is committed. Netlify only ever checks out this
  repo, so vendoring the build is what lets it serve the app — CI does nothing special, it
  just copies `public/` into `dist/`. Netlify serves these real files in preference to the
  SPA rewrite, so `/apps/<id>/` loads the app, not the desktop shell.
- **`src/apps/registry.tsx`** — an app with an `embed` path is rendered generically by
  **`src/apps/embedded/EmbeddedApp.tsx`** and is automatically given a desktop icon and a
  Start › Programs entry. No per-app component or `Desktop` wiring is needed.

### Adding an embedded app

1. In the app's own repo, set a **relative base** so its bundle works from a subpath:
   `base: "./"` in its `vite.config.ts`.
2. Add it to **`apps.manifest.json`**: `{ "id", "source" (path to the checkout, relative to
this repo), "build", "dist" }`.
3. Run **`pnpm sync-apps <id>`** (omit `<id>` to sync all). This builds the app and vendors
   it into `public/apps/<id>/`.
4. Drop a **`public/img/apps/<id>.svg`** icon (an SVG scales to both the 32px desktop icon
   and 16px title-bar/taskbar icon).
5. Add a registry entry to **`src/apps/registry.tsx`** with `title`, `defaultSize`, the icon
   at both `icon`/`iconSmall`, and `embed: "/apps/<id>/"`.
6. `vp check && vp build`, then commit — including the vendored `public/apps/<id>/`.

To pick up new changes from an app later, re-run `pnpm sync-apps <id>` and commit the diff.

## Sharable app links

The desktop is routed by the focused app: every app — built-in or embedded — is shareable at
`/<id>` (e.g. `/floor-planner`, `/wordpad`), which opens the desktop with that window already
open and focused. Opening, focusing or closing a window keeps the address bar in sync, so the
URL you copy always reflects what's on screen. The whole thing is client-side
(`src/components/desktop/route.ts`) layered on the Netlify SPA rewrite — an unknown path falls
through to the shell, which opens the matching app. (The bare embedded builds stay at
`/apps/<id>/` for sharing an app on its own, with no desktop chrome.)

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
