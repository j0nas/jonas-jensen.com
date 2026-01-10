# Windows 95 Site Modernization - Ralph Loop Format

## How to Run

```bash
/ralph-loop Follow instructions in docs/MODERNIZATION-RALPH.md --completion-promise ALL_PHASES_COMPLETE --max-iterations 100
```

---

## Available Verification Tools

You have access to these verification methods:

1. **Bash commands** - For file existence, build success, server health
2. **Playwright skill** - For visual and interaction testing via `/playwright-skill`

### Using Playwright for Verification

When a phase requires visual or interaction verification, invoke the playwright-skill:

```
/playwright-skill Navigate to http://localhost:5555 and verify [specific checks]
```

Playwright can:
- Take screenshots for visual verification
- Click elements and verify state changes
- Fill forms and verify persistence
- Check for specific text/elements on page

**IMPORTANT:** Always ensure dev server is running before Playwright tests.

---

## Iteration Instructions

Each iteration, do the following:

1. **Read state file** at `.claude/modernization-state.md`
   - If it doesn't exist, create it with `current_phase: 1` and all tasks unchecked

2. **Check current phase** from state file

3. **Work on next uncompleted task** in that phase
   - Run commands, create files, make edits as needed
   - After completing a task, update state file to mark it done

4. **Verify phase completion** when all tasks in a phase are done
   - Run the verification commands listed for that phase
   - If all pass, increment `current_phase` in state file
   - Output the phase completion marker (e.g., PHASE_1_COMPLETE)

5. **Continue to next phase** or output ALL_PHASES_COMPLETE when phase 6 is done

---

## State File Format

Create/update `.claude/modernization-state.md`:

```markdown
# Modernization Progress

current_phase: 1
started: [timestamp]
last_updated: [timestamp]

## Phase 1: Project Scaffolding
- [ ] Create SvelteKit project in new-site/
- [ ] Configure adapter-static
- [ ] Install 98.css
- [ ] Copy img assets
- [ ] Copy stuff assets
- [ ] Verify: npm run dev works

## Phase 2: Desktop Shell
- [ ] Create src/app.css with 98.css import and desktop styles
- [ ] Create src/lib/stores/windows.ts
- [ ] Create Desktop.svelte
- [ ] Create DesktopIcon.svelte
- [ ] Create Taskbar.svelte
- [ ] Update +page.svelte
- [ ] Verify: desktop renders with background

## Phase 3: Window Component
- [ ] Create Window.svelte
- [ ] Create MenuBar.svelte
- [ ] Integrate with Desktop (click icon opens window)
- [ ] Verify: window opens and closes

## Phase 4: WordPad App
- [ ] Create src/lib/apps/index.ts registry
- [ ] Create WordPad.svelte with menu bar
- [ ] Port localStorage persistence
- [ ] Add WordPad icon to desktop
- [ ] Verify: text persists after refresh

## Phase 5: Build & Cleanup
- [ ] Configure adapter-static in svelte.config.js
- [ ] Add prerender config to +layout.ts
- [ ] Run npm run build successfully
- [ ] Test with npm run preview
- [ ] Move new-site contents to root
- [ ] Remove old Firebase files

## Phase 6: Netlify Setup
- [ ] Create netlify.toml
- [ ] Commit all changes
- [ ] Update README with deploy instructions
```

---

## Phase Details

### PHASE 1: Project Scaffolding

**Commands:**
```bash
cd /Users/jonasjensen/Desktop/personal/jonas-jensen.com
npm create svelte@latest new-site -- --template skeleton --types typescript
cd new-site
npm install
npm install 98.css
npm install -D @sveltejs/adapter-static
cp -r ../public/img ./static/
cp -r ../public/stuff ./static/
```

**Verification:**

Step 1 - Create screenshot directory for later phases:
```bash
mkdir -p .claude/screenshots
```

Step 2 - File structure checks:
```bash
test -d new-site/src && echo "OK: SvelteKit structure exists" || echo "FAIL: No src directory"
test -f new-site/package.json && echo "OK: package.json exists" || echo "FAIL: No package.json"
test -f new-site/static/img/ms-bg.jpg && echo "OK: Background image copied" || echo "FAIL: No background"
ls new-site/static/img/win/*.ico > /dev/null 2>&1 && echo "OK: Icons copied" || echo "FAIL: No icons"
grep -q "98.css" new-site/package.json && echo "OK: 98.css installed" || echo "FAIL: 98.css missing"
grep -q "adapter-static" new-site/package.json && echo "OK: adapter-static installed" || echo "FAIL: adapter missing"
```

Step 3 - Dev server smoke test:
```bash
cd new-site && npm run dev -- --port 5555 &
sleep 4
curl -s http://localhost:5555 > /dev/null && echo "OK: Dev server works" || echo "FAIL: Server not responding"
kill %1 2>/dev/null
```

**Pass criteria:**
- [ ] SvelteKit project structure exists (src/, package.json)
- [ ] 98.css is in dependencies
- [ ] adapter-static is in devDependencies
- [ ] Background image (ms-bg.jpg) copied to static/img/
- [ ] Icons (.ico files) copied to static/img/win/
- [ ] Dev server starts and responds on port 5555

**Complete when:** All pass criteria met. Output: PHASE_1_COMPLETE

---

### PHASE 2: Desktop Shell

**Files to create:**

1. `new-site/src/app.css`:
```css
@import '98.css';

:root {
  --win95-gray: rgb(192, 192, 192);
  --win95-title-blue: rgb(0, 2, 117);
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

body {
  background-image: url('/img/ms-bg.jpg');
  background-size: cover;
  background-position: center;
  font-family: 'Pixelated MS Sans Serif', Arial, sans-serif;
}

.desktop {
  height: calc(100vh - 28px);
  padding: 8px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 16px;
}

.taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 28px;
  background: var(--win95-gray);
  border-top: 2px solid white;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  gap: 4px;
}
```

2. `new-site/src/lib/stores/windows.ts`:
```typescript
import { writable } from 'svelte/store';

export interface WindowState {
  id: string;
  isOpen: boolean;
  zIndex: number;
}

function createWindowStore() {
  const { subscribe, update } = writable<Record<string, WindowState>>({});
  let topZ = 1;

  return {
    subscribe,
    open: (id: string) => update(state => ({
      ...state,
      [id]: { id, isOpen: true, zIndex: ++topZ }
    })),
    close: (id: string) => update(state => ({
      ...state,
      [id]: { ...state[id], isOpen: false }
    })),
    focus: (id: string) => update(state => ({
      ...state,
      [id]: { ...state[id], zIndex: ++topZ }
    }))
  };
}

export const windows = createWindowStore();
```

3. `new-site/src/lib/components/desktop/DesktopIcon.svelte`:
```svelte
<script lang="ts">
  import { windows } from '$lib/stores/windows';

  export let icon: string;
  export let label: string;
  export let appId: string;

  function handleDblClick() {
    windows.open(appId);
  }
</script>

<button class="desktop-icon" on:dblclick={handleDblClick}>
  <img src={icon} alt="" />
  <span>{label}</span>
</button>

<style>
  .desktop-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    width: 64px;
  }
  .desktop-icon:focus {
    outline: 1px dotted white;
  }
  .desktop-icon img {
    width: 32px;
    height: 32px;
  }
  .desktop-icon span {
    color: white;
    text-shadow: 1px 1px 1px black;
    font-size: 11px;
    text-align: center;
  }
</style>
```

4. `new-site/src/lib/components/desktop/Taskbar.svelte`:
```svelte
<script lang="ts">
  import { windows } from '$lib/stores/windows';
</script>

<div class="taskbar">
  <button class="start-button">
    <img src="/img/win/windows.ico" alt="" width="16" height="16" />
    Start
  </button>

  <div class="taskbar-windows">
    {#each Object.values($windows).filter(w => w.isOpen) as win}
      <button class="taskbar-item" on:click={() => windows.focus(win.id)}>
        {win.id}
      </button>
    {/each}
  </div>
</div>

<style>
  .taskbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 28px;
    background: rgb(192, 192, 192);
    border-top: 2px solid white;
    display: flex;
    align-items: center;
    padding: 2px 4px;
    gap: 4px;
  }
  .start-button {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: bold;
    padding: 2px 6px;
  }
  .taskbar-windows {
    display: flex;
    gap: 2px;
    flex: 1;
  }
  .taskbar-item {
    min-width: 120px;
    text-align: left;
    padding: 2px 8px;
  }
</style>
```

5. `new-site/src/lib/components/desktop/Desktop.svelte`:
```svelte
<script lang="ts">
  import DesktopIcon from './DesktopIcon.svelte';
  import Taskbar from './Taskbar.svelte';
</script>

<div class="desktop">
  <DesktopIcon
    icon="/img/win/wordpad.ico"
    label="Document"
    appId="wordpad"
  />
</div>

<Taskbar />

<style>
  .desktop {
    height: calc(100vh - 28px);
    padding: 8px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 16px;
  }
</style>
```

6. Update `new-site/src/routes/+page.svelte`:
```svelte
<script>
  import '../app.css';
  import Desktop from '$lib/components/desktop/Desktop.svelte';
</script>

<Desktop />
```

**Verification:**

Step 1 - Start dev server:
```bash
cd new-site && npm run dev -- --port 5555 &
sleep 3
curl -s http://localhost:5555 > /dev/null && echo "OK: Server running"
```

Step 2 - Playwright visual verification:
```
/playwright-skill Navigate to http://localhost:5555 and verify:
1. Background image is visible (not plain white/gray)
2. A desktop icon with "Document" label exists
3. A taskbar is visible at the bottom with a "Start" button
4. Take a screenshot and save to .claude/screenshots/phase2-desktop.png
```

Step 3 - Cleanup:
```bash
kill %1 2>/dev/null
```

**Pass criteria:**
- [ ] Server responds
- [ ] Background image visible
- [ ] Desktop icon present
- [ ] Taskbar with Start button visible

**Complete when:** All pass criteria met. Output: PHASE_2_COMPLETE

---

### PHASE 3: Window Component

**Files to create:**

1. `new-site/src/lib/components/window/Window.svelte`:
```svelte
<script lang="ts">
  import { windows } from '$lib/stores/windows';

  export let id: string;
  export let title: string;
  export let icon: string = '';
  export let width: number = 400;
  export let height: number = 300;

  $: state = $windows[id];
  $: isOpen = state?.isOpen ?? false;
  $: zIndex = state?.zIndex ?? 1;

  function handleClose() {
    windows.close(id);
  }

  function handleFocus() {
    windows.focus(id);
  }
</script>

{#if isOpen}
  <div
    class="window"
    style="width: {width}px; height: {height}px; z-index: {zIndex};"
    on:mousedown={handleFocus}
    role="dialog"
  >
    <div class="title-bar">
      <div class="title-bar-text">
        {#if icon}<img src={icon} alt="" width="16" height="16" />{/if}
        {title}
      </div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close" on:click={handleClose}></button>
      </div>
    </div>
    <div class="window-body">
      <slot />
    </div>
  </div>
{/if}

<style>
  .window {
    position: absolute;
    top: 50px;
    left: 50px;
  }
  .title-bar-text {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .window-body {
    height: calc(100% - 40px);
    overflow: auto;
  }
</style>
```

2. `new-site/src/lib/components/window/MenuBar.svelte`:
```svelte
<script lang="ts">
  export let items: string[] = [];
</script>

<div class="menu-bar" role="menubar">
  {#each items as item}
    <button class="menu-item" role="menuitem">
      {item}
    </button>
  {/each}
</div>

<style>
  .menu-bar {
    display: flex;
    background: rgb(192, 192, 192);
    border-bottom: 1px solid #888;
    padding: 2px;
  }
  .menu-item {
    background: none;
    border: none;
    padding: 2px 8px;
    cursor: pointer;
  }
  .menu-item:hover {
    background: rgb(0, 2, 117);
    color: white;
  }
</style>
```

3. Update `new-site/src/lib/components/desktop/Desktop.svelte` to include Window:
```svelte
<script lang="ts">
  import DesktopIcon from './DesktopIcon.svelte';
  import Taskbar from './Taskbar.svelte';
  import Window from '$lib/components/window/Window.svelte';
</script>

<div class="desktop">
  <DesktopIcon
    icon="/img/win/wordpad.ico"
    label="Document"
    appId="wordpad"
  />
</div>

<Window id="wordpad" title="Document - WordPad" icon="/img/win/wordpad.ico" width={500} height={350}>
  <p>Window content placeholder</p>
</Window>

<Taskbar />

<style>
  .desktop {
    height: calc(100vh - 28px);
    padding: 8px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 16px;
  }
</style>
```

**Verification:**

Step 1 - Start dev server:
```bash
cd new-site && npm run dev -- --port 5555 &
sleep 3
```

Step 2 - Playwright interaction verification:
```
/playwright-skill Navigate to http://localhost:5555 and perform these tests:
1. Verify no window is initially visible
2. Double-click on the "Document" desktop icon
3. Verify a window titled "Document - WordPad" appears
4. Verify the window has a title bar with minimize, maximize, and close buttons
5. Take a screenshot: .claude/screenshots/phase3-window-open.png
6. Click the close button (X) on the window
7. Verify the window is no longer visible
8. Take a screenshot: .claude/screenshots/phase3-window-closed.png
```

Step 3 - Cleanup:
```bash
kill %1 2>/dev/null
```

**Pass criteria:**
- [ ] Window is hidden initially
- [ ] Double-click icon opens window
- [ ] Window has 98.css title bar styling
- [ ] Close button closes the window

**Complete when:** All pass criteria met. Output: PHASE_3_COMPLETE

---

### PHASE 4: WordPad App

**Files to create:**

1. `new-site/src/lib/apps/index.ts`:
```typescript
export const apps = {
  wordpad: {
    icon: '/img/win/wordpad.ico',
    title: 'Document - WordPad',
    defaultSize: { width: 500, height: 350 }
  }
} as const;

export type AppId = keyof typeof apps;
```

2. `new-site/src/lib/apps/wordpad/WordPad.svelte`:
```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import MenuBar from '$lib/components/window/MenuBar.svelte';

  const STORAGE_KEY = 'textarea__main';
  let content = '';

  onMount(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) content = stored;
  });

  function handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    content = target.value;
    localStorage.setItem(STORAGE_KEY, content);
  }
</script>

<MenuBar items={['File', 'Edit', 'View', 'Insert', 'Help']} />

<textarea
  value={content}
  on:input={handleInput}
  placeholder="Type here..."
></textarea>

<style>
  textarea {
    width: 100%;
    height: calc(100% - 24px);
    resize: none;
    border: none;
    padding: 4px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
  }
</style>
```

3. Update Desktop.svelte to use WordPad component:
```svelte
<script lang="ts">
  import DesktopIcon from './DesktopIcon.svelte';
  import Taskbar from './Taskbar.svelte';
  import Window from '$lib/components/window/Window.svelte';
  import WordPad from '$lib/apps/wordpad/WordPad.svelte';
  import { apps } from '$lib/apps';
</script>

<div class="desktop">
  <DesktopIcon
    icon={apps.wordpad.icon}
    label="Document"
    appId="wordpad"
  />
</div>

<Window
  id="wordpad"
  title={apps.wordpad.title}
  icon={apps.wordpad.icon}
  width={apps.wordpad.defaultSize.width}
  height={apps.wordpad.defaultSize.height}
>
  <WordPad />
</Window>

<Taskbar />

<style>
  .desktop {
    height: calc(100vh - 28px);
    padding: 8px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 16px;
  }
</style>
```

**Verification:**

Step 1 - Start dev server:
```bash
cd new-site && npm run dev -- --port 5555 &
sleep 3
```

Step 2 - Playwright persistence verification:
```
/playwright-skill Navigate to http://localhost:5555 and perform these tests:

TEST A - Menu bar and basic functionality:
1. Double-click the "Document" desktop icon to open WordPad
2. Verify a menu bar with items "File", "Edit", "View", "Insert", "Help" is visible
3. Verify a textarea/text input area is visible
4. Take a screenshot: .claude/screenshots/phase4-wordpad-open.png

TEST B - localStorage persistence:
1. Click in the textarea
2. Type the test string: "PERSISTENCE_TEST_12345"
3. Take a screenshot: .claude/screenshots/phase4-before-refresh.png
4. Refresh the page (navigate to http://localhost:5555 again)
5. Double-click the Document icon to reopen WordPad
6. Verify the textarea contains "PERSISTENCE_TEST_12345"
7. Take a screenshot: .claude/screenshots/phase4-after-refresh.png

If the text persists, the test passes.
```

Step 3 - Cleanup:
```bash
kill %1 2>/dev/null
```

**Pass criteria:**
- [ ] WordPad opens with menu bar
- [ ] Textarea accepts input
- [ ] Text persists after page refresh

**Complete when:** All pass criteria met. Output: PHASE_4_COMPLETE

---

### PHASE 5: Build & Cleanup

**Tasks:**

1. Update `new-site/svelte.config.js`:
```javascript
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      fallback: 'index.html'
    })
  }
};
```

2. Create `new-site/src/routes/+layout.ts`:
```typescript
export const prerender = true;
export const ssr = false;
```

3. Build the project:
```bash
cd new-site
npm run build
```

Build must complete without errors. Check for build output directory.

4. Preview and verify with Playwright:
```bash
cd new-site && npm run preview -- --port 4444 &
sleep 2
```

```
/playwright-skill Navigate to http://localhost:4444 and perform a full smoke test:
1. Verify the page loads (not a 404 or error)
2. Verify background image is visible
3. Verify desktop icon is present
4. Double-click icon to open window
5. Verify window opens with WordPad
6. Type some text in the textarea
7. Refresh and verify text persists
8. Take a final screenshot: .claude/screenshots/phase5-static-build.png
9. Close the browser
```

```bash
kill %1 2>/dev/null
```

5. Move to root (after build and preview succeed):
```bash
cd /Users/jonasjensen/Desktop/personal/jonas-jensen.com

# Backup old files
mkdir -p .backup
mv public .backup/ 2>/dev/null || true
mv build.js .backup/ 2>/dev/null || true
mv firebase.json .backup/ 2>/dev/null || true
mv .firebaserc .backup/ 2>/dev/null || true

# Move new site to root
cp -r new-site/* .
rm -rf new-site
```

**Pass criteria:**
- [ ] `npm run build` completes without errors
- [ ] `build/` directory exists with index.html
- [ ] Preview server loads the site
- [ ] Playwright smoke test passes (all interactions work)
- [ ] No console errors in browser

**Complete when:** All pass criteria met. Output: PHASE_5_COMPLETE

---

### PHASE 6: Netlify Setup

**Tasks:**

1. Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Commit changes:
```bash
git add -A
git commit -m "Modernize to SvelteKit with 98.css Windows 95 theme"
```

3. Verify netlify.toml is valid:
```bash
test -f netlify.toml && grep -q "npm run build" netlify.toml && echo "OK: netlify.toml valid"
```

4. Document deployment in README (human will connect to Netlify manually)

**Pass criteria:**
- [ ] netlify.toml exists with correct build command
- [ ] All changes committed to git
- [ ] No uncommitted files (git status clean)

**Complete when:** All pass criteria met. Output: PHASE_6_COMPLETE

---

## Final Completion

When all 6 phases complete successfully, output:

ALL_PHASES_COMPLETE

---

## Error Recovery

### Verification Failure Protocol

If a **bash verification** fails:
1. Read the error output
2. Check file paths and permissions
3. Fix the issue
4. Re-run verification
5. Update state file

If a **Playwright verification** fails:
1. Check if dev server is running (`curl http://localhost:PORT`)
2. Check browser console for errors:
   ```
   /playwright-skill Navigate to http://localhost:5555 and check browser console for any JavaScript errors. Report all errors found.
   ```
3. Take a diagnostic screenshot:
   ```
   /playwright-skill Navigate to http://localhost:5555 and take a full-page screenshot saved to .claude/screenshots/debug-[timestamp].png
   ```
4. Check the page structure:
   ```
   /playwright-skill Navigate to http://localhost:5555 and output the accessibility tree / page snapshot to understand the DOM structure
   ```
5. Fix the identified issue
6. Re-run verification

### Common Issues and Fixes

| Issue | Diagnosis | Fix |
|-------|-----------|-----|
| Server not responding | `curl` fails | Check port, restart server |
| Element not found | Playwright can't click | Check selector, verify component renders |
| Text not persisting | localStorage test fails | Check storage key, verify onMount |
| Build fails | npm run build errors | Fix TypeScript/import errors |
| Styles missing | No 98.css look | Check @import path, verify node_modules |

### Escalation

If stuck for 10+ iterations on same task:
1. Gather all diagnostic info:
   - Console errors
   - Screenshots
   - Build/server logs
2. Create `.claude/BLOCKED.md` with:
   - Current phase and task
   - What was tried
   - Error messages
   - Screenshots paths
3. Output: BLOCKED_NEED_HUMAN
