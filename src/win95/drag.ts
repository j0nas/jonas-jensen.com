import type { MouseEvent as ReactMouseEvent } from "react";

/**
 * Begins a left-button pointer drag: captures the press origin, then streams
 * (dx, dy) deltas to `onMove` on every mousemove until release. Returns a
 * teardown function (also runnable early, e.g. on unmount) that detaches the
 * listeners. Shared by window move and window resize.
 */
export function beginDrag(
  event: ReactMouseEvent,
  onMove: (dx: number, dy: number) => void,
  onEnd?: () => void,
): (() => void) | undefined {
  if (event.button !== 0) return undefined;
  event.preventDefault();
  const startX = event.clientX;
  const startY = event.clientY;

  const move = (e: MouseEvent) => onMove(e.clientX - startX, e.clientY - startY);
  const end = () => {
    window.removeEventListener("mousemove", move);
    window.removeEventListener("mouseup", end);
    onEnd?.();
  };

  window.addEventListener("mousemove", move);
  window.addEventListener("mouseup", end);
  return end;
}
