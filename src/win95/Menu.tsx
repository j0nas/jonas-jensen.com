import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from "react";
import { Glyph } from "./glyphs";
import Mnemonic, { mnemonicKey } from "./mnemonic";
import styles from "./Menu.module.css";

export type MenuItem =
  | "divider"
  | {
      label: string;
      onClick?: () => void;
      disabled?: boolean;
      shortcut?: string;
      /** A check mark (or, with `radio`, the option bullet) in the left column. */
      checked?: boolean;
      radio?: boolean;
      /** The default command, drawn bold (e.g. the system menu's Close). */
      isDefault?: boolean;
      submenu?: MenuItem[];
    };

/** Win95's MenuShowDelay: how long a hovered item waits before opening its submenu. */
export const MENU_SHOW_DELAY = 400;

interface MenuPopupProps {
  items: MenuItem[];
  /** Dismiss the whole menu chain (after a command, Escape at the top, outside press). */
  onClose: () => void;
  /** Set on a submenu: Left or Escape closes just this level. */
  onBack?: () => void;
  /** Left / Right past the ends of the chain (a menu bar steps to the next menu). */
  onLeft?: () => void;
  onRight?: () => void;
  /** Highlight the first item (menus opened from the keyboard). */
  keyboard?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * A popup menu: EDGE_RAISED border, 17px items with a check column, the label and a
 * left-aligned shortcut column, 9px etched separators and submenu arrows. The
 * highlight follows the mouse or the arrow keys; an item's access key fires it.
 * Submenus open after MENU_SHOW_DELAY on hover, at once on click or Right.
 */
export default function MenuPopup({
  items,
  onClose,
  onBack,
  onLeft,
  onRight,
  keyboard = false,
  className,
  style,
}: MenuPopupProps) {
  const [hot, setHot] = useState<number | null>(() =>
    keyboard ? items.findIndex((i) => i !== "divider") : null,
  );
  const [open, setOpen] = useState<{ index: number; keyboard: boolean } | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const ref = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState({ x: 0, y: 0 });

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Keep the popup on screen: slide it back in from the right or bottom edge.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(0, window.innerWidth - r.right);
    const y = Math.min(0, window.innerHeight - r.bottom);
    if (x || y) setShift({ x, y });
  }, []);

  // Take keyboard focus so the arrow keys and access keys reach this level.
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);

  function fire(index: number, fromKeyboard: boolean) {
    const item = items[index];
    if (item === "divider" || item.disabled) return;
    if (item.submenu) {
      window.clearTimeout(timer.current);
      setOpen({ index, keyboard: fromKeyboard });
      return;
    }
    onClose();
    item.onClick?.();
  }

  function move(step: 1 | -1) {
    const n = items.length;
    let i = hot ?? (step === 1 ? -1 : n);
    for (let k = 0; k < n; k++) {
      i = (i + step + n) % n;
      if (items[i] !== "divider") return setHot(i);
    }
  }

  function onKeyDown(event: ReactKeyboardEvent) {
    if (open) return; // the open submenu handles its own keys
    const key = event.key;
    if (key === "ArrowDown" || key === "ArrowUp") move(key === "ArrowDown" ? 1 : -1);
    else if (key === "Enter" && hot !== null) fire(hot, true);
    else if (key === "ArrowRight") {
      const item = hot === null ? "divider" : items[hot];
      if (item !== "divider" && item.submenu && !item.disabled) fire(hot!, true);
      else onRight?.();
    } else if (key === "ArrowLeft") {
      if (onBack) onBack();
      else onLeft?.();
    } else if (key === "Escape") {
      if (onBack) onBack();
      else onClose();
    } else {
      const index = items.findIndex(
        (i) => i !== "divider" && !i.disabled && mnemonicKey(i.label) === key.toLowerCase(),
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
      className={[styles.popup, className].filter(Boolean).join(" ")}
      style={{ ...style, translate: shift.x || shift.y ? `${shift.x}px ${shift.y}px` : undefined }}
      role="menu"
      tabIndex={-1}
      onKeyDown={onKeyDown}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onMouseLeave={() => {
        window.clearTimeout(timer.current);
        if (!open) setHot(null);
      }}
    >
      {items.map((item, i) => {
        if (item === "divider")
          return <div key={`d${i}`} className={styles.divider} role="separator" />;
        const hasSub = !!item.submenu?.length;
        const cls = [
          styles.item,
          hot === i ? styles.hot : "",
          item.disabled ? styles.disabled : "",
          item.isDefault ? styles.default : "",
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <div
            key={item.label}
            className={cls}
            role="menuitem"
            aria-disabled={item.disabled || undefined}
            aria-haspopup={hasSub || undefined}
            onMouseEnter={() => {
              setHot(i);
              window.clearTimeout(timer.current);
              if (open && open.index !== i) setOpen(null);
              if (hasSub && !item.disabled && open?.index !== i) {
                timer.current = window.setTimeout(
                  () => setOpen({ index: i, keyboard: false }),
                  MENU_SHOW_DELAY,
                );
              }
            }}
            onClick={() => fire(i, false)}
          >
            {item.checked && (
              <Glyph
                name={item.radio ? "radio" : "check"}
                className={item.radio ? styles.radio : styles.check}
              />
            )}
            <span className={styles.label}>
              <Mnemonic label={item.label} />
            </span>
            <span className={styles.shortcut}>{item.shortcut}</span>
            {hasSub && <Glyph name="arrow" className={styles.arrow} />}
            {hasSub && open?.index === i && (
              <MenuPopup
                items={item.submenu!}
                onClose={onClose}
                onBack={() => {
                  setOpen(null);
                  ref.current?.focus({ preventScroll: true });
                }}
                onRight={onRight}
                keyboard={open.keyboard}
                className={styles.submenu}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
