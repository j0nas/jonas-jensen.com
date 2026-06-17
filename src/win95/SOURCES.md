# Windows 95 — canonical sources

This library is a **pixel-accurate** reproduction of the Windows 95 UI. The rule is simple:
**every visual value traces to a Microsoft primary source or a faithful reimplementation of
one — nothing is eyeballed.** This document is the spec-of-record. Code carries a terse inline
citation (e.g. `/* COLOR_3DFACE */` or `see SOURCES.md §Bevels`); the full provenance lives
here so it can be audited in one place and lifted wholesale if this is ever extracted into a
standalone package.

## How we document style choices

- **This file is the source of truth.** Each value below maps to a named Win32 constant /
  metric / algorithm and the document that defines it.
- **Inline comments cite, they don't re-derive.** In `theme.css` and components you'll see the
  `COLOR_*` / `SM_*` / `DrawEdge` name next to the value. That's enough to find it here.
- **When a choice could be mistaken for Win98/later, we say so explicitly** (see
  §Win95-specific, the things the "authentic" libraries get wrong).

## Primary sources

- **[S1] _The Windows Interface Guidelines for Software Design_** (Microsoft Press, 1995) —
  the official spec for Win95 UI anatomy, spacing, and component behaviour.
  <https://archive.org/details/windowsinterface00micr>
- **[S2] `GetSysColor`** (Win32 API reference) — defines every system colour index
  (`COLOR_*`). The "Windows Standard" scheme is the set of defaults.
  <https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getsyscolor>
- **[S3] `GetSystemMetrics`** (Win32 API reference) — defines every system metric (`SM_*`).
  Values below are the defaults at 96 DPI (the Win95 baseline).
  <https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getsystemmetrics>
- **[S4] `DrawEdge`** (Win32 API reference) — the GDI call that paints every 3D edge, and the
  flags (`EDGE_RAISED`, `EDGE_SUNKEN`, `BF_SOFT`, …) that name each edge style. The four edge
  colours are the 3D system colours from [S2]; the light-source convention (highlights
  top-left, shadows bottom-right) is from [S1].
  <https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-drawedge>
  - _Algorithm reference (not a dependency):_ for the precise outer/inner line ordering we
    cross-checked **ReactOS**, the open-source clean-room reimplementation of Windows
    (`IntDrawRectEdge` and its `LT*/RB*` colour tables in `user32`). **ReactOS is an operating
    system, unrelated to React95** — the React component library we removed. Nothing from it
    (or from React95) is a code dependency; it is read-only documentation, and where it would
    disagree with the shipped Win95 pixels, [S6] wins.
    <https://github.com/reactos/reactos/blob/master/win32ss/user/user32/windows/draw.c>
- **[S5] Start menu banner bitmap** — the banner is a pre-rendered bitmap resource in
  `explorer.exe` (resource **157**), not a documented spec, so we **ship the real bitmap**
  (`public/img/win95/start-banner.png`, sampled from the authentic banner at its native 21px
  width) rather than re-typesetting it — that keeps the exact Franklin Gothic glyphs without
  depending on a client font. The blue _gradient_ banners belong to Windows 98 (res 157) and ME
  (res 161). <https://adamdemasi.com/2024/07/24/windows-nt-4-start-menu-watermark.html>
- **[S7] Icon set** — the desktop / taskbar / Start-menu icons are the authentic Win95 16-colour
  shell bitmaps (`public/img/win95/*.png`), extracted from `@react95/icons` (MIT) purely as a
  static asset source; the package is **not** a dependency. `_32x32` for the desktop and Start
  menu, `_16x16` for title bars and taskbar buttons.
- **[S6] Direct pixel sampling of authentic Win95 chrome** — the final authority. Where an
  exact line arrangement matters, we sample the real rendered Win95 bitmaps pixel-by-pixel and
  match them, overriding any reimplementation or community convention. So far: the Start banner
  [S5]; the push-button bevel (the magnified, authentic "Ship It!" button); and the raised
  window-frame + sunken client-edge bevels (the authentic Win95 "Close Program" dialog,
  <https://commons.wikimedia.org/wiki/File:Windows95-4.0.180-TaskManager.png>).

## Palette — "Windows Standard" scheme [S2]

| Token                            | Hex                   | System colour                                         |
| -------------------------------- | --------------------- | ----------------------------------------------------- |
| `--w95-3d-dark-shadow`           | `#000000`             | `COLOR_3DDKSHADOW`                                    |
| `--w95-3d-shadow`                | `#808080`             | `COLOR_3DSHADOW` / `COLOR_BTNSHADOW`                  |
| `--w95-3d-face`                  | `#c0c0c0`             | `COLOR_3DFACE` / `COLOR_BTNFACE`                      |
| `--w95-3d-light`                 | `#dfdfdf`             | `COLOR_3DLIGHT`                                       |
| `--w95-3d-highlight`             | `#ffffff`             | `COLOR_3DHIGHLIGHT` / `COLOR_BTNHIGHLIGHT`            |
| `--w95-window` / `-window-text`  | `#ffffff` / `#000000` | `COLOR_WINDOW` / `COLOR_WINDOWTEXT`                   |
| `--w95-active-title` / `-text`   | `#000080` / `#ffffff` | `COLOR_ACTIVECAPTION` / `COLOR_CAPTIONTEXT`           |
| `--w95-inactive-title` / `-text` | `#808080` / `#c0c0c0` | `COLOR_INACTIVECAPTION` / `COLOR_INACTIVECAPTIONTEXT` |
| `--w95-menu` / `-text`           | `#c0c0c0` / `#000000` | `COLOR_MENU` / `COLOR_MENUTEXT`                       |
| `--w95-highlight` / `-text`      | `#000080` / `#ffffff` | `COLOR_HIGHLIGHT` / `COLOR_HIGHLIGHTTEXT`             |
| `--w95-gray-text`                | `#808080`             | `COLOR_GRAYTEXT`                                      |
| `--w95-desktop`                  | `#008080`             | `COLOR_BACKGROUND` (teal)                             |

## Metrics — defaults @96 DPI [S3]

| Token                  | Value                              | Metric                                      |
| ---------------------- | ---------------------------------- | ------------------------------------------- |
| `--w95-edge`           | `2px`                              | `SM_CXEDGE` / `SM_CYEDGE` (3D border)       |
| `--w95-border`         | `1px`                              | `SM_CXBORDER` / `SM_CYBORDER`               |
| `--w95-frame`          | `4px`                              | `SM_CXFRAME` / `SM_CYFRAME` (sizing border) |
| `--w95-caption-height` | `18px`                             | `SM_CYCAPTION`                              |
| `--w95-scrollbar`      | `16px`                             | `SM_CXVSCROLL` / `SM_CYHSCROLL`             |
| `--w95-menu-height`    | `18px`                             | `SM_CYMENU`                                 |
| font                   | 8 pt MS Sans Serif = `11px` bitmap | —                                           |

## Bevels — `DrawEdge` edge→colour tables [S4]

Each 3D border stacks up to a 1px outer + 1px inner line per side. Outer (±1px) lines paint
over inner (±2px) lines (later shadows win in CSS). TL = top-left, BR = bottom-right. Colours
are the 3D system colours from [S2]; "face" means the inner line is the button face and so is
invisible.

| Token                     | Edge flag                | TL outer / inner        | BR outer / inner        | Used for                                   |
| ------------------------- | ------------------------ | ----------------------- | ----------------------- | ------------------------------------------ |
| `--w95-bevel-raised`      | `EDGE_RAISED`            | `3DLIGHT` / `HIGHLIGHT` | `DKSHADOW` / `SHADOW`   | window bodies, group boxes, status/taskbar |
| `--w95-bevel-raised-soft` | `EDGE_RAISED \| BF_SOFT` | `HIGHLIGHT` / face      | `DKSHADOW` / `SHADOW`   | push buttons, caption buttons, scrollbars  |
| `--w95-bevel-sunken`      | `EDGE_SUNKEN`            | `SHADOW` / `DKSHADOW`   | `HIGHLIGHT` / `3DLIGHT` | text fields, list panes, client edge       |
| `--w95-bevel-sunken-thin` | `BDR_SUNKENOUTER`        | `SHADOW` (1px)          | `HIGHLIGHT` (1px)       | status fields, separators                  |
| `--w95-bevel-pressed`     | pressed button           | `DKSHADOW` / `SHADOW`   | `HIGHLIGHT` / `3DLIGHT` | held / depressed buttons                   |

**Button bevel — pixel-verified [S6].** Sampling the authentic "Ship It!" button at 1px
granularity shows the light (top-left) side is a **single** white line straight onto the face,
and the dark (bottom-right) side is two lines (`SHADOW` inner, `DKSHADOW` outer). There is **no
`3DLIGHT` inner-light line** — the symmetric white+`#dfdfdf` border used by 98.css and most
"Win9x" CSS kits is an embellishment. `--w95-bevel-raised-soft` matches the real pixels.

**Raised-hard + sunken — pixel-verified [S6].** Sampling the authentic "Close Program" dialog
confirms the _hard_ raised frame does use the two-line `3DLIGHT`+`HIGHLIGHT` light edge (so the
button's single white line is specifically the _soft_ variant), and the sunken client edge is
`SHADOW`+`DKSHADOW` (TL) / `3DLIGHT`+`HIGHLIGHT` (BR), exactly as tabulated.

## Start menu banner [S5]

Sampled from the authentic Win95 `explorer.exe` resource 157 bitmap:

| Element                         | Hex       | = system colour     |
| ------------------------------- | --------- | ------------------- |
| Ground (solid, **no gradient**) | `#808080` | `COLOR_3DSHADOW`    |
| "95" (large)                    | `#c0c0c0` | `COLOR_3DFACE`      |
| "Windows" (small)               | `#ffffff` | `COLOR_3DHIGHLIGHT` |

Font: **Franklin Gothic** (the Windows wordmark face, 95–XP) — _not_ MS Sans Serif. The text is
bottom-aligned and reads bottom-to-top: a small "Windows" with a large "95" above it (we ship
the bitmap, so this is exact — see [S5]).

## Caption glyphs & menu mnemonics [S1]

- **Caption buttons are the Marlett symbol font** — minimize = Marlett `0`, maximize = `1`,
  restore = `2`, close = `r`. We reproduce each as a crisp pixel glyph (the close `r` is a
  chunky 8×7 X with 2px diagonals; maximize is a box with a thick title-bar top), not a thin
  vector stroke.
- **Menu & Start access keys are underlined permanently.** Win95 shows mnemonic underlines at
  all times (XP+ hides them until Alt is pressed). Labels carry the Win32 `&` mnemonic
  (`&File` → underlined F); `mnemonic.tsx` underlines the character after `&`.

## Win95-specific — where the "authentic" libraries half-ass it

- **Title bars are SOLID navy `#000080`** (`COLOR_ACTIVECAPTION`). The left→right gradient is
  Win98's `COLOR_GRADIENTACTIVECAPTION`, introduced with the Plus! pack — wrong for Win95.
- **The Start banner is solid grey**, not a blue gradient (that's Win98/ME — see [S5]).
- **The dark shadow is true black `#000000`** (`COLOR_3DDKSHADOW`). 98.css uses `#0a0a0a`;
  ours matches the system value.
- **Bevels are the real `DrawEdge` stacks**, not a single `border` approximation, so raised
  and sunken edges have the correct 2-line (4-colour) profile.
