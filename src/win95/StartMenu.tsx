import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { Glyph } from "./glyphs";
import { MENU_SHOW_DELAY } from "./Menu";
import Mnemonic, { mnemonicKey } from "./mnemonic";
import styles from "./StartMenu.module.css";

export type StartEntry =
  | "divider"
  | {
      label: string;
      /** 32px icon URL (top level) / 16px (flyout). */
      icon?: string;
      onClick?: () => void;
      disabled?: boolean;
      submenu?: StartEntry[];
    };

interface ListProps {
  entries: StartEntry[];
  /** The top level: 32px rows with large icons. Flyouts are 22px rows with small ones. */
  large?: boolean;
  onClose: () => void;
  /** Set on a flyout: Left or Escape closes just this level. */
  onBack?: () => void;
  keyboard?: boolean;
}

function List({ entries, large = false, onClose, onBack, keyboard = false }: ListProps) {
  const [hot, setHot] = useState<number | null>(() =>
    keyboard ? entries.findIndex((e) => e !== "divider") : null,
  );
  const [open, setOpen] = useState<{ index: number; keyboard: boolean } | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);

  function fire(index: number, fromKeyboard: boolean) {
    const entry = entries[index];
    if (entry === "divider" || entry.disabled) return;
    if (entry.submenu?.length) {
      window.clearTimeout(timer.current);
      setOpen({ index, keyboard: fromKeyboard });
      return;
    }
    onClose();
    entry.onClick?.();
  }

  function onKeyDown(event: ReactKeyboardEvent) {
    if (open) return;
    const key = event.key;
    const n = entries.length;
    if (key === "ArrowDown" || key === "ArrowUp") {
      const step = key === "ArrowDown" ? 1 : -1;
      let i = hot ?? (step === 1 ? -1 : n);
      for (let k = 0; k < n; k++) {
        i = (i + step + n) % n;
        if (entries[i] !== "divider") break;
      }
      setHot(i);
    } else if ((key === "Enter" || key === "ArrowRight") && hot !== null) {
      const entry = entries[hot];
      if (key === "Enter" || (entry !== "divider" && entry.submenu?.length)) fire(hot, true);
    } else if (key === "ArrowLeft" || key === "Escape") {
      if (onBack) onBack();
      else if (key === "Escape") onClose();
    } else {
      const index = entries.findIndex(
        (e) => e !== "divider" && !e.disabled && mnemonicKey(e.label) === key.toLowerCase(),
      );
      if (index === -1) return;
      setHot(index);
      fire(index, true);
    }
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <div
      ref={ref}
      className={large ? styles.entries : `${styles.popup} ${styles.flyout}`}
      role="menu"
      tabIndex={-1}
      onKeyDown={onKeyDown}
      onClick={(e) => e.stopPropagation()}
      onMouseLeave={() => {
        window.clearTimeout(timer.current);
        if (!open) setHot(null);
      }}
    >
      {entries.map((entry, i) => {
        if (entry === "divider")
          return <div key={`d${i}`} className={styles.divider} role="separator" />;
        const hasSub = !!entry.submenu?.length;
        const cls = [
          styles.item,
          large ? styles.large : styles.small,
          hot === i ? styles.hot : "",
          entry.disabled ? styles.disabled : "",
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <div
            key={entry.label}
            className={cls}
            role="menuitem"
            aria-haspopup={hasSub || undefined}
            aria-disabled={entry.disabled || undefined}
            onMouseEnter={() => {
              setHot(i);
              window.clearTimeout(timer.current);
              if (open && open.index !== i) setOpen(null);
              if (hasSub && open?.index !== i) {
                timer.current = window.setTimeout(
                  () => setOpen({ index: i, keyboard: false }),
                  MENU_SHOW_DELAY,
                );
              }
            }}
            onClick={() => fire(i, false)}
          >
            {entry.icon ? (
              <img
                className={styles.icon}
                src={entry.icon}
                alt=""
                width={large ? 32 : 16}
                height={large ? 32 : 16}
              />
            ) : (
              <span className={styles.icon} />
            )}
            <span className={styles.label}>
              <Mnemonic label={entry.label} />
            </span>
            {hasSub && <Glyph name="arrow" className={styles.arrow} />}
            {hasSub && open?.index === i && (
              <List
                entries={entry.submenu!}
                onClose={onClose}
                keyboard={open.keyboard}
                onBack={() => {
                  setOpen(null);
                  ref.current?.focus({ preventScroll: true });
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * The Start menu (SOURCES.md §Start menu): the grey "Windows 95" banner down the
 * left, 32px rows with large icons, and flyouts of 22px rows with small ones.
 * Submenus open after the menu show delay on hover, at once on click or Right;
 * leaf items fire and dismiss the menu.
 */
export default function StartMenu({
  entries,
  onClose,
  keyboard = false,
}: {
  entries: StartEntry[];
  onClose: () => void;
  /** Opened from the keyboard (Ctrl+Esc): highlight the first entry. */
  keyboard?: boolean;
}) {
  return (
    <div className={`${styles.popup} ${styles.menu}`}>
      <div className={styles.banner} role="img" aria-label="Windows 95" />
      <List entries={entries} large onClose={onClose} keyboard={keyboard} />
    </div>
  );
}
