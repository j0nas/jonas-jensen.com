import { apps, type AppId } from "../../apps/registry";

// The desktop is "routed" by the focused app: each app — built-in or embedded —
// is shareable at /<id> (e.g. /floor-planner), which opens the desktop with that
// window already open. The bare embedded builds live at /apps/<id>/ instead, so
// there's no collision with these single-segment app routes.
const APP_IDS = new Set<string>(Object.keys(apps));

/** The app id encoded in a URL path, or null for "/" or any path that isn't an app. */
export function appIdFromPath(pathname: string = window.location.pathname): AppId | null {
  const seg = pathname.replace(/^\/+|\/+$/g, "");
  return APP_IDS.has(seg) ? (seg as AppId) : null;
}

/** Reflect the focused app in the address bar (so it's shareable) without growing history. */
export function syncPath(id: AppId | null): void {
  const next = id ? `/${id}` : "/";
  if (window.location.pathname !== next) {
    window.history.replaceState(null, "", next);
  }
}
