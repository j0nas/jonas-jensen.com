import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from "react";
import styles from "./DesktopIcon.module.css";

interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

// A desktop launcher: single-click selects (navy label highlight), double-click
// or Enter/Space opens. Win95 desktops have no React95 component, so this is the
// one bit of bespoke UI left — deliberately minimal.
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
        {icon}
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  );
}
