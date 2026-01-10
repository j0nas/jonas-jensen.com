# PROMPT.md

## Project
Deploy jonas-jensen.com static site to Netlify

## Requirements
Full requirements provided inline:
- Site is already built (`npm run build` creates `build/` directory)
- Install Netlify CLI and deploy the site
- Verify the live URL works
- Document manual steps for Firebase deletion and DNS changes

## Each Iteration

1. Read `TODO.md` for current tasks
2. Pick the highest priority incomplete task (top `- [ ]` item)
3. Read any files before editing them
4. Implement the task completely
5. Run tests/validation relevant to the task
6. If tests fail, fix before continuing
7. Mark task complete in `TODO.md` with `[x]`
8. Commit changes: `git add -A && git commit -m "descriptive message"`
9. Continue to next task

## Guardrails

- Always read files before editing
- The build directory is `build/` (SvelteKit static adapter output)
- Use `npx netlify-cli` to avoid global install if preferred
- When deploying, use `--prod` flag for production deployment
- Verify deployment by fetching the live URL
- Do NOT delete Firebase or change DNS - only document what needs to happen
- If Netlify CLI requires authentication, guide user through it

## Completion

When all tasks in TODO.md are marked `[x]` and deployment is verified, output:

<promise>DONE</promise>
