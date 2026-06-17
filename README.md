# jonas-jensen.com

A personal site styled as a Windows 95 desktop — draggable windows, a Start menu, a
taskbar, and a handful of "apps" (Notepad, WordPad, My Computer, Recycle Bin, Personal).

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
