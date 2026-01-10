# PROMPT.md

## Project
Fix Windows 98 desktop icons to have authentic styling: remove button borders, add proper selection states with dithered blue overlay, and implement full icon interaction.

## Requirements
Full requirements in `.claude/clarify-session.md`

## Each Iteration

1. Read `TODO.md` for current tasks
2. Pick the highest priority incomplete task (top `- [ ]` item)
3. Read any files before editing them
4. Implement the task completely
5. Run `npm run build` to verify no build errors
6. If build fails, fix before continuing
7. **Verify with Playwright** (see verification section below)
8. Mark task complete in `TODO.md` with `[x]`
9. Commit changes: `git add -A && git commit -m "descriptive message"`
10. Continue to next task

## Playwright Verification

After implementing visual changes, use the Playwright MCP tools to verify:

1. **Navigate to the site**: `browser_navigate` to `http://localhost:5173/` (or current dev server port)
2. **Take a screenshot**: `browser_take_screenshot` to capture current state
3. **Inspect the UI**: `browser_snapshot` to get accessibility tree and element refs
4. **Test interactions**:
   - `browser_click` to click on icons and verify selection
   - `browser_type` or `browser_press_key` to test keyboard navigation

### What to verify at each HARD STOP:

**Phase 1 (Visual Fix)**:
- Screenshot shows desktop icons with NO raised 3D button borders
- Icons should just be image + text floating on desktop background

**Phase 2 (Selection)**:
- Click an icon, take screenshot
- Verify: icon has dithered blue overlay, text has navy blue background
- Click desktop background, verify icon deselects

**Phase 3 (Keyboard)**:
- Use `browser_press_key` with "Tab" to focus icons
- Verify dotted focus rectangle appears
- Press "Enter" to open app

**Phase 4 (Multi-Select)**:
- Ctrl+click multiple icons, verify all show selected state
- Test drag-select rectangle appears with marching ants animation

**Phase 5 (Drag)**:
- Drag an icon, verify it snaps to grid on drop

**Phase 6 (New Icons)**:
- Verify My Computer and Recycle Bin icons appear and open windows

## Guardrails

- Always read files before editing
- Never skip failing builds
- If build fails 3 times on same issue, output: <promise>STUCK</promise>
- Don't refactor unrelated code
- Keep changes focused on current task
- Update TODO.md immediately after completing each task
- This is a Svelte/SvelteKit project with Svelte 5 - use runes ($state, $derived, etc.)
- The project uses 98.css - override button styles on desktop icons WITHOUT breaking other buttons
- Test visual changes in browser when implementing CSS
- The dithered selection overlay should use a 2x2px checkerboard pattern (alternating blue/transparent)

## Key Files
- `src/lib/components/desktop/DesktopIcon.svelte` - Main icon component (needs major changes)
- `src/lib/components/desktop/Desktop.svelte` - Desktop container (needs selection state management)
- `src/lib/stores/windows.ts` - Window management store
- `src/app.css` - Global styles

## Key Colors
- Selection highlight background: #000080 (navy blue)
- Selection highlight text: #FFFFFF (white)
- Default icon text: #FFFFFF with 1px black text-shadow

## Completion

When all tasks in TODO.md are marked `[x]` and build passes, output:

<promise>DONE</promise>
