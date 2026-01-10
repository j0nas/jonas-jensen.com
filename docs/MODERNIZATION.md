# Windows 95 Personal Site Modernization - Ralph Wiggum Prompt

This document is designed for the Ralph Wiggum autonomous loop technique. Use with:
```bash
/ralph-loop "Follow the plan in docs/MODERNIZATION.md" --completion-promise "ALL_PHASES_COMPLETE" --max-iterations 100
```

---

## Project Context

**Repository:** jonas-jensen.com (personal portfolio site)
**Current state:** Single HTML file with Windows 95 theme, pure CSS, Firebase Hosting
**Goal:** Modernize to SvelteKit + 98.css, deploy to Netlify, enable adding "apps" to the desktop

### Key Decisions Made
- **Framework:** SvelteKit with Vite (small bundles, great DX for creative projects)
- **Styling:** 98.css library + custom Win95 overrides
- **Hosting:** Netlify (replacing Firebase)
- **Navigation:** State-based (not URL routing) - icons open/close windows

### Source Files to Preserve
- `public/index.dev.html` - Contains all CSS (~275 lines) and localStorage JS to port
- `public/img/` - Desktop background and Win95 icons
- `public/stuff/` - PDF and text files

---

## PHASE 1: Project Scaffolding

### Tasks
1. Create new SvelteKit project in a `new-site/` directory
2. Configure for static site generation (adapter-static)
3. Install dependencies: `98.css`
4. Copy assets from `public/img/` → `new-site/static/img/`
5. Copy assets from `public/stuff/` → `new-site/static/stuff/`

### Commands to Run
```bash
cd /Users/jonasjensen/Desktop/personal/jonas-jensen.com
npm create svelte@latest new-site -- --template skeleton --types typescript
cd new-site
npm install
npm install 98.css
npm install -D @sveltejs/adapter-static
```

### Verification Checklist
- [ ] `new-site/` directory exists with SvelteKit structure
- [ ] `npm run dev` starts without errors
- [ ] `new-site/static/img/ms-bg.jpg` exists
- [ ] `new-site/static/img/win/*.ico` files exist

### Phase 1 Complete When
All verification items pass. Output: `PHASE_1_COMPLETE`

---

## PHASE 2: Core Components - Desktop Shell

### Tasks
1. Create global styles in `src/app.css`:
   - Import 98.css
   - Add desktop background styling
   - Port unique Win95 styles from original CSS (color overrides if needed)

2. Create `src/lib/stores/windows.ts`:
   - Svelte writable store for window state
   - Track: which apps are open, z-index ordering

3. Create `src/lib/components/desktop/Desktop.svelte`:
   - Full-viewport container with ms-bg.jpg background
   - Grid layout for desktop icons

4. Create `src/lib/components/desktop/DesktopIcon.svelte`:
   - Props: icon path, label, app ID
   - Click handler to open app via store

5. Create `src/lib/components/desktop/Taskbar.svelte`:
   - Fixed at bottom
   - Start button (can be non-functional initially)
   - Show open windows as buttons

6. Update `src/routes/+page.svelte`:
   - Import and render Desktop component

### Key CSS to Port (from public/index.dev.html)
```css
/* Desktop background */
body {
  background-image: url('/img/ms-bg.jpg');
  background-size: cover;
  height: 100vh;
}

/* Taskbar styling */
.startmenu {
  position: fixed;
  bottom: 0;
  /* ... rest of taskbar styles */
}
```

### Verification Checklist
- [ ] `npm run dev` shows desktop with Win95 background
- [ ] Taskbar visible at bottom of screen
- [ ] At least one desktop icon renders (can be placeholder)
- [ ] No console errors

### Phase 2 Complete When
All verification items pass. Output: `PHASE_2_COMPLETE`

---

## PHASE 3: Window Component

### Tasks
1. Create `src/lib/components/window/Window.svelte`:
   - Props: title, icon, width, height, isOpen, onClose
   - 98.css `.window` and `.title-bar` classes
   - Close button (X) that calls onClose
   - Slot for content

2. Create `src/lib/components/window/MenuBar.svelte`:
   - Horizontal menu bar below title
   - Props: items array with labels
   - Use 98.css menu styling

3. Integrate with Desktop:
   - Clicking icon opens window via store
   - Window renders when isOpen is true
   - Close button updates store

### Key CSS (98.css provides most, may need overrides)
```css
/* 98.css uses .title-bar, original uses .title */
/* Verify 98.css classes match, add overrides if needed */
```

### Verification Checklist
- [ ] Clicking a desktop icon opens a window
- [ ] Window has title bar with icon and title text
- [ ] Window has working close button (X)
- [ ] Clicking X closes window
- [ ] Window uses 98.css styling

### Phase 3 Complete When
All verification items pass. Output: `PHASE_3_COMPLETE`

---

## PHASE 4: App Registry & WordPad Migration

### Tasks
1. Create `src/lib/apps/index.ts`:
   ```typescript
   export const apps = {
     wordpad: {
       component: () => import('./wordpad/WordPad.svelte'),
       icon: '/img/win/wordpad.ico',
       title: 'Document - WordPad',
       defaultSize: { width: 500, height: 300 }
     }
   };
   ```

2. Create `src/lib/apps/wordpad/WordPad.svelte`:
   - Menu bar: File, Edit, View, Insert, Help (from original)
   - Textarea with same styling as original
   - localStorage persistence (port original JS)

3. Port localStorage logic from original:
   ```javascript
   // Original code to port:
   var textareaMain = "textarea__main";
   var el = document.getElementById(textareaMain);
   var storedText = localStorage.getItem(textareaMain);
   if (storedText) { el.value = storedText; }
   el.onkeyup = function(ev) {
     localStorage.setItem(textareaMain, ev.target.value);
   };
   ```

4. Add WordPad icon to Desktop

### Verification Checklist
- [ ] WordPad icon visible on desktop
- [ ] Clicking icon opens WordPad window
- [ ] WordPad has menu bar with File, Edit, View, Insert, Help
- [ ] Textarea is editable
- [ ] Type text, refresh page - text persists
- [ ] Close button works

### Phase 4 Complete When
All verification items pass. Output: `PHASE_4_COMPLETE`

---

## PHASE 5: Build & Cleanup

### Tasks
1. Configure adapter-static in `svelte.config.js`:
   ```javascript
   import adapter from '@sveltejs/adapter-static';
   export default {
     kit: {
       adapter: adapter({ fallback: 'index.html' })
     }
   };
   ```

2. Add prerender config to `src/routes/+layout.ts`:
   ```typescript
   export const prerender = true;
   export const ssr = false;
   ```

3. Test production build:
   ```bash
   npm run build
   npm run preview
   ```

4. Move new-site contents to root (after confirming everything works):
   - Backup old files
   - Move new-site/* to root
   - Delete old public/, build.js, firebase.json, etc.

5. Update package.json scripts if needed

### Verification Checklist
- [ ] `npm run build` succeeds without errors
- [ ] `npm run preview` serves the site correctly
- [ ] All functionality works in preview mode
- [ ] Old Firebase files removed
- [ ] Project structure is clean

### Phase 5 Complete When
All verification items pass. Output: `PHASE_5_COMPLETE`

---

## PHASE 6: Netlify Deployment

### Tasks
1. Create `netlify.toml` in project root:
   ```toml
   [build]
     command = "npm run build"
     publish = "build"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. Initialize git and commit all changes

3. Deployment will be manual (human connects repo to Netlify)
   - Document steps for human:
     1. Go to netlify.com, connect GitHub
     2. Select repository
     3. Build settings auto-detected from netlify.toml
     4. Deploy

### Verification Checklist
- [ ] `netlify.toml` exists with correct config
- [ ] All changes committed to git
- [ ] README updated with deployment instructions

### Phase 6 Complete When
All verification items pass. Output: `PHASE_6_COMPLETE`

---

## Final Completion

When ALL phases are complete, output: `ALL_PHASES_COMPLETE`

---

## Self-Correction Instructions

If any verification step fails:
1. Read the error message carefully
2. Check relevant source files
3. Fix the issue
4. Re-run verification
5. Continue to next phase only when current phase passes

If stuck after 10 iterations on same phase:
1. Document what's blocking in a `BLOCKING.md` file
2. List what was attempted
3. Suggest alternative approaches
4. Output: `BLOCKED_NEED_HUMAN`

---

## Reference: Original CSS Classes to Port

From `public/index.dev.html`, these may need custom overrides on top of 98.css:

| Original Class | Purpose | 98.css Equivalent |
|---------------|---------|-------------------|
| `.window` | Window container | `.window` (same) |
| `.title` | Title bar | `.title-bar` |
| `.title-left` | Title text | `.title-bar-text` |
| `.button` | 3D button | `button` element |
| `.menu` | Menu bar | `.menu` |
| `.startmenu` | Taskbar | Custom (no 98.css equivalent) |

Colors from original:
- Primary gray: `rgb(192, 192, 192)` / `#c0c0c0`
- Title bar blue: `rgb(0, 2, 117)`
- Border highlights: white, `#666`

---

## Directory Structure Target

```
jonas-jensen.com/
├── src/
│   ├── app.css
│   ├── app.html
│   ├── lib/
│   │   ├── components/
│   │   │   ├── desktop/
│   │   │   │   ├── Desktop.svelte
│   │   │   │   ├── DesktopIcon.svelte
│   │   │   │   └── Taskbar.svelte
│   │   │   └── window/
│   │   │       ├── Window.svelte
│   │   │       └── MenuBar.svelte
│   │   ├── apps/
│   │   │   ├── wordpad/
│   │   │   │   └── WordPad.svelte
│   │   │   └── index.ts
│   │   └── stores/
│   │       └── windows.ts
│   └── routes/
│       ├── +layout.svelte
│       ├── +layout.ts
│       └── +page.svelte
├── static/
│   ├── img/
│   │   ├── ms-bg.jpg
│   │   └── win/*.ico
│   └── stuff/
├── svelte.config.js
├── vite.config.ts
├── netlify.toml
└── package.json
```
