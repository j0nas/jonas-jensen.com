import { isWindowId, type WindowId } from "../../apps/registry";

// The desktop is "routed" by the focused window: each app — built-in or
// embedded — is shareable at /<id> (e.g. /floor-planner), and each document at
// /docs/<slug>, which opens the desktop with that window already open. The bare
// embedded builds live at /apps/<id>/ instead, so there's no collision.

/** The window id encoded in a URL path, or null for "/" or any path that isn't one. */
export function windowIdFromPath(pathname: string = window.location.pathname): WindowId | null {
  const path = pathname.replace(/^\/+|\/+$/g, "");
  return isWindowId(path) ? path : null;
}

/** Reflect the focused window in the address bar (so it's shareable) without growing history. */
export function syncPath(id: WindowId | null): void {
  const next = id ? `/${id}` : "/";
  if (window.location.pathname !== next) {
    window.history.replaceState(null, "", next);
  }
}
