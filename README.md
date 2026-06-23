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
laminate floor-layout planner, at
[`j0nas/floor-boards-planner`](https://github.com/j0nas/floor-boards-planner)). Embedding
keeps the desktop shell free of each app's dependencies and gives every app full style/JS
isolation; the Win95 chrome just supplies the window frame.

Each embedded app **is the source of truth and deploys itself** (the Floor Planner builds to
GitHub Pages on every push). The desktop embeds its _live_ deploy rather than a vendored copy,
so updating an app is just pushing that app's repo — nothing here changes.

How it fits together:

- **`netlify.toml`** proxies `/apps/<id>/*` to the app's live deploy with a `200` rewrite,
  which keeps it **same-origin** — so the `<iframe>` and the shareable `/apps/<id>/` link need
  no CORS or framing exceptions. The proxy rule sits above the SPA catch-all (first match
  wins). `vite.config.ts` mirrors the same proxy for `vp dev` / `vp preview`.
- **`src/apps/registry.tsx`** — an app with an `embed` path is rendered generically by
  **`src/apps/embedded/EmbeddedApp.tsx`** and is automatically given a desktop icon and a
  Start › Programs entry. No per-app component or `Desktop` wiring is needed.

### Adding an embedded app

1. In the app's own repo, set a **relative base** (`base: "./"`) so its bundle works under a
   subpath, and give it a deploy that publishes on push (e.g. a GitHub Pages workflow). Note
   its deploy URL.
2. Add a **proxy rule** to `netlify.toml`, above the SPA catch-all:
   `from = "/apps/<id>/*"`, `to = "<app deploy URL>/:splat"`, `status = 200`.
3. Mirror that proxy in **`vite.config.ts`**'s `embeddedProxy` (so dev/preview match prod).
4. Drop a **`public/img/apps/<id>.svg`** icon (an SVG scales to both the 32px desktop icon
   and 16px title-bar/taskbar icon).
5. Add a registry entry to **`src/apps/registry.tsx`** with `title`, `defaultSize`, the icon
   at both `icon`/`iconSmall`, and `embed: "/apps/<id>/"`.
6. `vp check && vp build`, then commit.

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
