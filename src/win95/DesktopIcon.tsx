import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from "react";
import styles from "./DesktopIcon.module.css";

interface DesktopIconProps {
  /** 32×32 icon URL. */
  icon: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

/**
 * A desktop launcher: single-click selects (navy label, 50% navy dither over
 * the glyph — the GDI selected-icon tint), double-click or Enter/Space opens.
 */
export default function DesktopIcon({ icon, label, selected, onSelect, onOpen }: DesktopIconProps) {
  function handleClick(event: ReactMouseEvent) {
    event.stopPropagation();
    onSelect();
  }
  function handleKeyDown(event: ReactKeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen();
    }
  }

  return (
    <button
      type="button"
      className={`${styles.icon}${selected ? ` ${styles.selected}` : ""}`}
      onClick={handleClick}
      onDoubleClick={onOpen}
      onKeyDown={handleKeyDown}
      aria-label={`Open ${label}`}
    >
      <span className={styles.iconImage} aria-hidden="true">
        <img src={icon} alt="" width={32} height={32} />
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  );
}
