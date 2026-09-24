import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { longDate, shortTime, useNow } from "./Clock";
import Tooltip from "./Tooltip";
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

/** A task button; its tooltip (the full title) shows only when the label is cut off. */
function Task({ win, onClick }: { win: TaskButton; onClick: () => void }) {
  const label = useRef<HTMLSpanElement>(null);
  const [truncated, setTruncated] = useState(false);
  return (
    <Tooltip text={truncated ? win.title : null} className={styles.taskSlot}>
      <button
        type="button"
        className={`${styles.task}${win.active ? ` ${styles.taskActive}` : ""}`}
        onClick={onClick}
        onMouseEnter={() => {
          const el = label.current;
          setTruncated(!!el && el.scrollWidth > el.clientWidth);
        }}
      >
        <img src={win.icon} alt="" width={16} height={16} aria-hidden="true" />
        <span ref={label} className={styles.taskTitle}>
          {win.title}
        </span>
      </button>
    </Tooltip>
  );
}

/**
 * The taskbar (SOURCES.md §Taskbar): a 28px strip with the Start button, one button
 * per open window (the active one pushed in, dithered and bold) and the tray clock,
 * whose tooltip is the date. Pressing outside the Start region closes the menu.
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
  const now = useNow();

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
          onMouseDown={(e) => {
            e.preventDefault();
            onStartToggle();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onStartToggle();
            }
          }}
        >
          <img src="/img/win95/start-flag.png" alt="" width={16} height={16} aria-hidden="true" />
          <span className={styles.startLabel}>Start</span>
        </button>
      </div>

      <div className={styles.tasks}>
        {windows.map((win) => (
          <Task key={win.id} win={win} onClick={() => onTaskClick(win.id)} />
        ))}
      </div>

      <Tooltip text={longDate(now)} className={styles.tray}>
        {shortTime(now)}
      </Tooltip>
    </div>
  );
}
