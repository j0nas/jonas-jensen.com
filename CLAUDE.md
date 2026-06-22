# CLAUDE.md

Guidance for agents working in this repo. For the Vite+ toolchain checklist, see `AGENTS.md`;
for the prose overview, see `README.md`.

## What this is

A personal site styled as a Windows 95 desktop (React 19, Vite+). The chrome is our own
component library in `src/win95/`. There are two kinds of "apps" on the desktop:

- **Built-in apps** — written against `src/win95/` (Notepad, WordPad, My Computer, …). Each
  renders its body inside an `AppWindow` and is wired in `src/components/desktop/Desktop.tsx`.
- **Embedded apps** — separate, standalone web apps (their own repo, toolchain, deps and
  styles) hosted inside a Win95 window via an `<iframe>`. The Floor Planner is the first.

## Adding an embedded app

Embedded apps are vendored as static bundles under `public/apps/<id>/` and surfaced by a
single registry entry. Adding one is fully data-driven — no new component, no `Desktop.tsx`
edit:

1. **In the app's own repo:** set a relative base so the bundle works from a subpath —
   `base: "./"` in its `vite.config.ts`.
2. **Manifest:** add an entry to `apps.manifest.json` — `{ "id", "source", "build", "dist" }`,
   where `source` is the path to the app's local checkout, relative to this repo.
3. **Vendor it:** `pnpm sync-apps <id>` (omit `<id>` to sync every app in the manifest). This
   builds the app and copies its `dist/` into `public/apps/<id>/`.
4. **Icon:** add `public/img/apps/<id>.svg` (one SVG scales to both the 32px desktop icon and
   the 16px title-bar/taskbar icon).
5. **Register:** add an entry to `src/apps/registry.tsx` with `title`, `defaultSize`,
   `icon`/`iconSmall` (the SVG at both), and `embed: "/apps/<id>/"`. The desktop icon, the
   Start › Programs entry, and the window rendering all derive from this automatically.
6. **Validate & commit:** `vp check && vp build`, then commit — including the vendored
   `public/apps/<id>/`.

Update an embedded app later by re-running `pnpm sync-apps <id>` and committing the diff.

### Invariants — do not break these

- `public/apps/**` is **generated, committed output**. Never hand-edit it; refresh it only via
  `pnpm sync-apps`. It is excluded from format/lint via `ignorePatterns` in `vite.config.ts`.
- The bundle is committed on purpose: Netlify only ever checks out this repo, so vendoring is
  what makes the app deployable. CI does nothing app-specific — `pnpm run build` just copies
  `public/` into `dist/`. The SPA rewrite in `netlify.toml` has no `force`, so real files at
  `/apps/<id>/` are served in preference to the `/index.html` fallback.
- `sync-apps` is a **local-only** step — it needs the app's source checkout, which never
  exists in CI. Don't add it to the build/deploy pipeline.

## Validate

Run `vp check` (format, lint, type-check) and `vp build` before committing. See `AGENTS.md`.
