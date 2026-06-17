import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import Clock from "./Clock";
import styles from "./TaskBar.module.css";

export interface TaskButton {
  id: string;
  title: string;
  icon: string;
  active: boolean;
}

interface TaskBarProps {
  windows: TaskButton[];
  onTaskClick: (id: string) => void;
  startOpen: boolean;
  onStartToggle: () => void;
  onStartClose: () => void;
  /** The Start menu popup, rendered above the Start button while open. */
  startMenu: ReactNode;
}

/**
 * The bottom taskbar: a raised strip with the Start button (toggling the Start
 * menu), one button per open window (the active window's button shown pressed),
 * and the tray clock. Pressing outside the Start region closes the menu.
 */
export default function TaskBar({
  windows,
  onTaskClick,
  startOpen,
  onStartToggle,
  onStartClose,
  startMenu,
}: TaskBarProps) {
  const startRegion = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOpen) return;
    function onDown(event: MouseEvent) {
      if (!startRegion.current?.contains(event.target as Node)) onStartClose();
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [startOpen, onStartClose]);

  return (
    <div className={styles.taskbar}>
      <div className={styles.startRegion} ref={startRegion}>
        {startOpen && <div className={styles.startMenu}>{startMenu}</div>}
        <button
          type="button"
          className={`${styles.start}${startOpen ? ` ${styles.startActive}` : ""}`}
          onClick={onStartToggle}
        >
          <img src="/img/win/windows-logo.png" alt="" width={16} height={16} aria-hidden="true" />
          <span className={styles.startLabel}>Start</span>
        </button>
      </div>

      <div className={styles.tasks}>
        {windows.map((win) => (
          <button
            key={win.id}
            type="button"
            className={`${styles.task}${win.active ? ` ${styles.taskActive}` : ""}`}
            onClick={() => onTaskClick(win.id)}
          >
            <img src={win.icon} alt="" width={16} height={16} aria-hidden="true" />
            <span className={styles.taskTitle}>{win.title}</span>
          </button>
        ))}
      </div>

      <div className={styles.tray}>
        <Clock />
      </div>
    </div>
  );
}
