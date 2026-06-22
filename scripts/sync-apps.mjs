// Build each external app listed in apps.manifest.json and vendor its static
// output into public/apps/<id>/, where the Win95 shell embeds it via an <iframe>
// (see src/apps/embedded/EmbeddedApp.tsx).
//
// Run this LOCALLY before committing: the vendored output under public/apps/ is
// committed to the repo so Netlify — which only ever checks out this repo — can
// serve each app without needing the app's source or toolchain. CI does nothing
// special; `pnpm run build` just copies public/ (apps included) into dist/.
//
// Usage:
//   node scripts/sync-apps.mjs                       sync every app in the manifest
//   node scripts/sync-apps.mjs floor-planner [...]   sync only the named app(s)
import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(resolve(root, "apps.manifest.json"), "utf8"));

const filter = process.argv.slice(2);
const apps = manifest.apps.filter((a) => filter.length === 0 || filter.includes(a.id));

if (apps.length === 0) {
  const wanted = filter.length ? `matching: ${filter.join(", ")}` : "in apps.manifest.json";
  console.error(`No apps ${wanted}.`);
  process.exit(1);
}

for (const app of apps) {
  const source = resolve(root, app.source);
  if (!existsSync(source)) {
    console.error(`✗ ${app.id}: source checkout not found at ${source}`);
    process.exit(1);
  }

  console.log(`\n▶ ${app.id}: building in ${source}`);
  execSync(app.build ?? "pnpm run build", { cwd: source, stdio: "inherit" });

  const dist = resolve(source, app.dist ?? "dist");
  if (!existsSync(dist)) {
    console.error(`✗ ${app.id}: build produced no "${app.dist ?? "dist"}" directory at ${dist}`);
    process.exit(1);
  }

  const target = resolve(root, "public/apps", app.id);
  rmSync(target, { recursive: true, force: true });
  mkdirSync(target, { recursive: true });
  cpSync(dist, target, { recursive: true });
  console.log(`✓ ${app.id}: vendored → public/apps/${app.id}/`);
}

console.log(`\nDone. Review the diff under public/apps/ and commit it.`);
