import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { Glyph, type GlyphName } from "./glyphs";
import MenuPopup, { type MenuItem } from "./Menu";
import styles from "./TitleBar.module.css";

interface TitleBarProps {
  title: string;
  /** 16×16 icon URL; dialogs have none. */
  icon?: string;
  active: boolean;
  maximized?: boolean;
  /** Dialogs have just the Close button. */
  closeOnly?: boolean;
  /** Drag-start on the bar itself (the icon and caption buttons are excluded via data-w95-no-drag). */
  onMouseDown: (event: ReactMouseEvent) => void;
  onDoubleClick: (event: ReactMouseEvent) => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose: () => void;
}

// Where each Marlett glyph sits inside the 16×14 button (sampled from RTM).
const GLYPH_AT = {
  minimize: { left: 4, top: 9 },
  maximize: { left: 3, top: 2 },
  restore: { left: 3, top: 2 },
  close: { left: 4, top: 3 },
} satisfies Partial<Record<GlyphName, { left: number; top: number }>>;

function CaptionButton({
  glyph,
  label,
  onClick,
  className,
}: {
  glyph: keyof typeof GLYPH_AT;
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      tabIndex={-1}
      className={[styles.control, className].filter(Boolean).join(" ")}
      onClick={onClick}
      aria-label={label}
    >
      <Glyph name={glyph} className={styles.glyph} style={GLYPH_AT[glyph]} />
    </button>
  );
}

/**
 * A window caption: the 18px band (navy when active, grey when not) with the 16px
 * icon, the bold title, and the Minimize / Maximize-or-Restore / Close buttons
 * (16×14, glyphs placed as Win95's Marlett bitmaps). Clicking the icon opens the
 * system menu; double-clicking it closes the window.
 */
export default function TitleBar({
  title,
  icon,
  active,
  maximized = false,
  closeOnly = false,
  onMouseDown,
  onDoubleClick,
  onMinimize,
  onMaximize,
  onClose,
}: TitleBarProps) {
  const [systemMenu, setSystemMenu] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!systemMenu) return;
    function onDown(event: MouseEvent) {
      if (!iconRef.current?.contains(event.target as Node)) setSystemMenu(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [systemMenu]);

  const systemItems: MenuItem[] = [
    { label: "&Restore", disabled: !maximized || !onMaximize, onClick: onMaximize },
    { label: "&Move", disabled: true },
    { label: "&Size", disabled: true },
    { label: "Mi&nimize", disabled: !onMinimize, onClick: onMinimize },
    { label: "Ma&ximize", disabled: maximized || !onMaximize, onClick: onMaximize },
    "divider",
    { label: "&Close", shortcut: "Alt+F4", isDefault: true, onClick: onClose },
  ];

  return (
    <div
      className={`${styles.titlebar}${active ? ` ${styles.active}` : ""}`}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      {icon && (
        <div
          ref={iconRef}
          className={styles.iconSlot}
          data-w95-no-drag
          onMouseDown={(e) => {
            e.preventDefault();
            setSystemMenu((v) => !v);
          }}
          onDoubleClick={onClose}
        >
          <img
            className={styles.icon}
            src={icon}
            alt=""
            width={16}
            height={16}
            aria-hidden="true"
          />
          {systemMenu && (
            <MenuPopup
              items={systemItems}
              onClose={() => setSystemMenu(false)}
              className={styles.systemMenu}
            />
          )}
        </div>
      )}
      <span className={`${styles.caption}${icon ? "" : ` ${styles.bare}`}`}>{title}</span>
      <div className={styles.controls} data-w95-no-drag>
        {!closeOnly && onMinimize && onMaximize && (
          <>
            <CaptionButton glyph="minimize" label="Minimize" onClick={onMinimize} />
            <CaptionButton
              glyph={maximized ? "restore" : "maximize"}
              label={maximized ? "Restore" : "Maximize"}
              onClick={onMaximize}
            />
          </>
        )}
        <CaptionButton
          glyph="close"
          label="Close"
          onClick={onClose}
          className={closeOnly ? undefined : styles.close}
        />
      </div>
    </div>
  );
}
