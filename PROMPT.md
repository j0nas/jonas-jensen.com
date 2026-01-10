# PROMPT.md

## Project
Fix Windows 98 UI: Rebuild Start Menu with authentic styling/functionality and add working dropdown menus to WordPad menu bar.

## Requirements
Full requirements in `.claude/clarify-session.md`

## Each Iteration

1. Read `TODO.md` for current tasks
2. Pick the highest priority incomplete task (top `- [ ]` item)
3. Read any files before editing them
4. Implement the task completely
5. Run `npm run build` to verify no build errors
6. If build fails, fix before continuing
7. Use the Playwright Skill to verify the UI matches Windows 98 exactly
8. Mark task complete in `TODO.md` with `[x]`
9. Commit changes: `git add -A && git commit -m "descriptive message"`
10. Continue to next task

## Guardrails

- Always read files before editing
- Never skip failing builds
- If build fails 3 times on same issue, output: <promise>STUCK</promise>
- Don't refactor unrelated code
- Keep changes focused on current task
- Update TODO.md immediately after completing each task
- Preserve existing WordPad text editing and localStorage functionality
- Visual authenticity is priority - match real Windows 98 exactly
- Use 98.css classes where available, custom CSS only when needed
- Icons: Download to static/img/win/ directory

## Tech Stack Reference

- Framework: SvelteKit with Svelte 5
- Styling: 98.css library + custom CSS in app.css
- Key files:
  - `src/lib/components/desktop/Taskbar.svelte` - Start button and menu
  - `src/lib/components/window/MenuBar.svelte` - WordPad menu bar
  - `src/lib/apps/wordpad/WordPad.svelte` - WordPad app
  - `src/lib/stores/windows.ts` - Window state management

## Completion

When all tasks in TODO.md are marked `[x]` and build passes, output:

<promise>DONE</promise>
