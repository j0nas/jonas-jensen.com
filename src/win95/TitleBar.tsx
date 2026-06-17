import type { MouseEvent as ReactMouseEvent } from "react";
import styles from "./TitleBar.module.css";

interface TitleBarProps {
  title: string;
  /** 16×16 icon URL. */
  icon: string;
  active: boolean;
  maximized: boolean;
  /** Drag-start on the bar itself (caption buttons are excluded via data-w95-no-drag). */
  onMouseDown: (event: ReactMouseEvent) => void;
  onDoubleClick: (event: ReactMouseEvent) => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

/**
 * A window caption bar: 16px icon, bold title (white on navy when active, light
 * grey on grey when not), and the Minimize / Maximize-or-Restore / Close caption
 * buttons. Glyphs are drawn to match the Win95 bitmaps; buttons always sit on the
 * face colour regardless of the active state.
 */
export default function TitleBar({
  title,
  icon,
  active,
  maximized,
  onMouseDown,
  onDoubleClick,
  onMinimize,
  onMaximize,
  onClose,
}: TitleBarProps) {
  return (
    <div
      className={`${styles.titlebar}${active ? ` ${styles.active}` : ""}`}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <img className={styles.icon} src={icon} alt="" width={16} height={16} aria-hidden="true" />
      <span className={styles.caption}>{title}</span>
      <div className={styles.controls} data-w95-no-drag>
        <button type="button" className={styles.control} onClick={onMinimize} aria-label="Minimize">
          <span className={styles.glyphMinimize} />
        </button>
        <button
          type="button"
          className={styles.control}
          onClick={onMaximize}
          aria-label={maximized ? "Restore" : "Maximize"}
        >
          {maximized ? (
            <svg width="10" height="9" viewBox="0 0 10 9" aria-hidden="true">
              <rect x="3" y="0.5" width="6" height="4" fill="var(--w95-3d-face)" stroke="#000" />
              <rect x="0.5" y="3" width="6" height="5" fill="var(--w95-3d-face)" stroke="#000" />
            </svg>
          ) : (
            <span className={styles.glyphMaximize} />
          )}
        </button>
        <button
          type="button"
          className={`${styles.control} ${styles.close}`}
          onClick={onClose}
          aria-label="Close"
        >
          {/* The Marlett "r" close glyph: a chunky 8×7 pixel X, 2px diagonals. */}
          <svg
            width="8"
            height="7"
            viewBox="0 0 8 7"
            shapeRendering="crispEdges"
            aria-hidden="true"
          >
            <g fill="#000">
              <rect x="0" y="0" width="2" height="1" />
              <rect x="6" y="0" width="2" height="1" />
              <rect x="1" y="1" width="2" height="1" />
              <rect x="5" y="1" width="2" height="1" />
              <rect x="2" y="2" width="2" height="1" />
              <rect x="4" y="2" width="2" height="1" />
              <rect x="3" y="3" width="2" height="1" />
              <rect x="2" y="4" width="2" height="1" />
              <rect x="4" y="4" width="2" height="1" />
              <rect x="1" y="5" width="2" height="1" />
              <rect x="5" y="5" width="2" height="1" />
              <rect x="0" y="6" width="2" height="1" />
              <rect x="6" y="6" width="2" height="1" />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}
