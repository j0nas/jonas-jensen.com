import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import styles from "./DesktopIcon.module.css";

interface DesktopIconProps {
  /** 32×32 icon URL. */
  icon: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
  /** Icons in a folder window: black labels on the white client area. */
  inFolder?: boolean;
  /** A shortcut: the arrow overlay in the icon's bottom-left corner. */
  shortcut?: boolean;
}

/**
 * A large icon, on the desktop or in a folder window (SOURCES.md §Desktop icons):
 * a 75px cell with the 32px icon at (21,2) and its label below. A click selects
 * (the icon's own pixels take a 50% navy dither, the label turns navy), a
 * double-click or Enter opens, and the focused icon's label carries the dotted
 * focus rectangle.
 */
export default function DesktopIcon({
  icon,
  label,
  selected,
  onSelect,
  onOpen,
  inFolder = false,
  shortcut = false,
}: DesktopIconProps) {
  function handleMouseDown(event: ReactMouseEvent) {
    event.stopPropagation();
    onSelect();
  }
  function handleKeyDown(event: ReactKeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      onOpen();
    }
  }

  const cls = [styles.icon, inFolder ? styles.inFolder : "", selected ? styles.selected : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <button
      type="button"
      className={cls}
      onMouseDown={handleMouseDown}
      onDoubleClick={onOpen}
      onKeyDown={handleKeyDown}
      aria-label={label}
      aria-pressed={selected}
    >
      <span
        className={styles.image}
        style={{ "--icon": `url("${icon}")` } as CSSProperties}
        aria-hidden="true"
      >
        <img src={icon} alt="" width={32} height={32} draggable={false} />
        {shortcut && (
          <img
            className={styles.overlay}
            src="/img/win95/shortcut-overlay-32.png"
            alt=""
            width={32}
            height={32}
            draggable={false}
          />
        )}
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  );
}
