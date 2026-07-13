import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent as ReactMouseEvent, ReactNode } from "react";
import MenuBar, { type Menu } from "./MenuBar";
import TitleBar from "./TitleBar";
import { beginDrag } from "./drag";
import styles from "./Window.module.css";

interface WindowProps {
  title: string;
  /** 16×16 caption icon URL. */
  icon: string;
  initialX: number;
  initialY: number;
  width: number;
  height: number;
  zIndex: number;
  active: boolean;
  /** Minimised windows stay mounted (preserving scroll/input) but unpainted. */
  minimized?: boolean;
  /** Spawn maximized (small viewports); Restore falls back to the initial bounds. */
  initialMaximized?: boolean;
  menu?: Menu[];
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  children: ReactNode;
}

const DRAG_THRESHOLD = 5;
const MIN_W = 200;
const MIN_H = 150;

// The eight sizing-border grips, in DOM order so the corner grips paint over
// the edge grips where they overlap.
const HANDLES: { dir: string; cls: string }[] = [
  { dir: "n", cls: styles.rn },
  { dir: "s", cls: styles.rs },
  { dir: "e", cls: styles.re },
  { dir: "w", cls: styles.rw },
  { dir: "ne", cls: styles.rne },
  { dir: "nw", cls: styles.rnw },
  { dir: "se", cls: styles.rse },
  { dir: "sw", cls: styles.rsw },
];

/**
 * A draggable, resizable Win95 window: raised frame, a TitleBar, an optional
 * MenuBar, and the client area. Dragging the title bar past a 5px threshold
 * moves it; the sizing-border grips resize it (min 200×150); Maximize (or a
 * title-bar double-click) fills the desktop above the taskbar and restores the
 * prior bounds. Pressing anywhere raises the window via onFocus.
 */
export default function Window({
  title,
  icon,
  initialX,
  initialY,
  width,
  height,
  zIndex,
  active,
  minimized = false,
  initialMaximized = false,
  menu,
  onFocus,
  onClose,
  onMinimize,
  children,
}: WindowProps) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ w: width, h: height });
  const [maximized, setMaximized] = useState(initialMaximized);
  const restoreBounds = useRef<{ x: number; y: number; w: number; h: number } | null>(null);
  const dragCleanup = useRef<(() => void) | undefined>(undefined);

  // Tear down any in-flight drag listeners if we unmount mid-drag.
  useEffect(() => () => dragCleanup.current?.(), []);

  function startTitleDrag(event: ReactMouseEvent) {
    if ((event.target as HTMLElement).closest("[data-w95-no-drag]")) return;
    if (maximized) return;
    onFocus();
    const origin = { ...pos };
    let moved = false;
    dragCleanup.current = beginDrag(event, (dx, dy) => {
      if (!moved && Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
      moved = true;
      setPos({ x: origin.x + dx, y: Math.max(0, origin.y + dy) });
    });
  }

  function startResize(dir: string) {
    return (event: ReactMouseEvent) => {
      if (maximized) return;
      event.stopPropagation();
      onFocus();
      const o = { x: pos.x, y: pos.y, w: size.w, h: size.h };
      dragCleanup.current = beginDrag(event, (dx, dy) => {
        let { x, y, w, h } = o;
        if (dir.includes("e")) w = o.w + dx;
        if (dir.includes("s")) h = o.h + dy;
        if (dir.includes("w")) {
          w = o.w - dx;
          x = o.x + dx;
        }
        if (dir.includes("n")) {
          h = o.h - dy;
          y = o.y + dy;
        }
        if (w < MIN_W) {
          if (dir.includes("w")) x = o.x + o.w - MIN_W;
          w = MIN_W;
        }
        if (h < MIN_H) {
          if (dir.includes("n")) y = o.y + o.h - MIN_H;
          h = MIN_H;
        }
        setPos({ x, y: Math.max(0, y) });
        setSize({ w, h });
      });
    };
  }

  function toggleMaximize() {
    if (maximized) {
      const b = restoreBounds.current;
      if (b) {
        setPos({ x: b.x, y: b.y });
        setSize({ w: b.w, h: b.h });
      }
      setMaximized(false);
    } else {
      restoreBounds.current = { x: pos.x, y: pos.y, w: size.w, h: size.h };
      setMaximized(true);
    }
  }

  const style: CSSProperties = maximized
    ? { left: 0, top: 0, width: "100%", height: "calc(100% - var(--w95-taskbar-height))", zIndex }
    : { left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex };
  if (minimized) style.display = "none";

  return (
    <div className={styles.window} style={style} onMouseDown={onFocus}>
      {!maximized &&
        HANDLES.map((h) => <div key={h.dir} className={h.cls} onMouseDown={startResize(h.dir)} />)}

      <div className={styles.inner}>
        <TitleBar
          title={title}
          icon={icon}
          active={active}
          maximized={maximized}
          onMouseDown={startTitleDrag}
          onDoubleClick={(e) => {
            if ((e.target as HTMLElement).closest("[data-w95-no-drag]")) return;
            toggleMaximize();
          }}
          onMinimize={onMinimize}
          onMaximize={toggleMaximize}
          onClose={onClose}
        />

        {menu && <MenuBar menus={menu} />}

        <div className={styles.client}>{children}</div>
      </div>
    </div>
  );
}
