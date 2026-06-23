# CLAUDE.md

Guidance for agents working in this repo. For the Vite+ toolchain checklist, see `AGENTS.md`;
for the prose overview, see `README.md`.

## What this is

A personal site styled as a Windows 95 desktop (React 19, Vite+). The chrome is our own
component library in `src/win95/`. There are two kinds of "apps" on the desktop:

- **Built-in apps** — written against `src/win95/` (Notepad, WordPad, My Computer, …). Each
  renders its body inside an `AppWindow` and is wired in `src/components/desktop/Desktop.tsx`.
- **Embedded apps** — separate, standalone web apps (their own repo, toolchain, deps and
  styles) that **deploy themselves**. The desktop embeds each one's _live_ deploy inside a
  Win95 window via an `<iframe>`, served under a same-origin proxy. The Floor Planner
  (`github.com/j0nas/floor-boards-planner` → GitHub Pages) is the first.

## Adding an embedded app

The app owns its build and deploy; this repo only proxies to it and registers it. The app is
the source of truth — once added, **updating it is just pushing the app's repo** (it
redeploys and the desktop serves the new build live; no change here). Adding one is
data-driven — no new component, no `Desktop.tsx` edit:

1. **In the app's own repo:** set a relative base (`base: "./"` in its `vite.config.ts`) so
   assets resolve under both its own deploy path and the proxied subpath, and give it a deploy
   that publishes on push (e.g. a GitHub Pages Actions workflow). Note its deploy URL.
2. **Proxy it (prod):** add a rule to `netlify.toml`, _above_ the SPA catch-all:
   ```toml
   [[redirects]]
   from = "/apps/<id>/*"
   to = "<app deploy URL>/:splat"
   status = 200
   ```
3. **Proxy it (dev/preview):** mirror that in `vite.config.ts`'s `embeddedProxy` so `vp dev` /
   `vp preview` load the same live build locally.
4. **Icon:** add `public/img/apps/<id>.svg` (one SVG scales to both the 32px desktop icon and
   the 16px title-bar/taskbar icon).
5. **Register:** add an entry to `src/apps/registry.tsx` with `title`, `defaultSize`,
   `icon`/`iconSmall` (the SVG at both), and `embed: "/apps/<id>/"`. The desktop icon, the
   Start › Programs entry, and the window rendering all derive from this automatically.
6. **Validate & commit:** `vp check && vp build`, then commit.

### Invariants — do not break these

- The embedded app is the **source of truth** and deploys itself. This repo never vendors,
  builds, or commits the app's bundle — it only proxies to the live deploy. An app update
  needs no commit here.
- The proxy rule must **precede** the SPA catch-all in `netlify.toml` (Netlify applies the
  first matching rule). A `200`-rewrite to an external URL proxies it **same-origin**, so the
  `<iframe>` and the shareable `/apps/<id>/` link need no CORS or framing exceptions.
- Keep the two proxy definitions in sync: `netlify.toml` (production) and the `embeddedProxy`
  in `vite.config.ts` (dev + preview) must point at the same deploy.
- The app **must** use a relative base (`base: "./"`); an absolute base would break under the
  proxied subpath.

## Sharable links (desktop routing)

`src/components/desktop/route.ts` routes the desktop by the focused app: every app — built-in
or embedded — is shareable at `/<id>` (e.g. `/floor-planner`), which opens the desktop with
that window open. `Desktop` derives its initial window from the path and `replaceState`s the
active app's id into the URL as windows open/focus/close. App routes are single-segment, so
they don't collide with the bare embedded builds at `/apps/<id>/`. There's no router library
and no per-app wiring — a new registry entry is automatically deep-linkable.

## Validate

Run `vp check` (format, lint, type-check) and `vp build` before committing. See `AGENTS.md`.
