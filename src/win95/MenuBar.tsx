import { useEffect, useRef, useState } from "react";
import Mnemonic from "./mnemonic";
import styles from "./MenuBar.module.css";

export type MenuItem =
  | "divider"
  | { label: string; onClick?: () => void; disabled?: boolean; shortcut?: string };

export interface Menu {
  label: string;
  items: MenuItem[];
}

/**
 * A window's menu bar (File / Edit / …). Click a title to drop its menu; with a
 * menu already open, hovering another title switches to it (Win95 "menu track"
 * behaviour). Outside click or Escape closes. The open title and hovered items
 * invert to the navy selection colour.
 */
export default function MenuBar({ menus }: { menus: Menu[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open === null) return;
    function onDown(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(null);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(null);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={styles.bar} ref={ref}>
      {menus.map((menu, i) => (
        <div className={styles.slot} key={menu.label}>
          <button
            type="button"
            className={`${styles.title}${open === i ? ` ${styles.titleOpen}` : ""}`}
            onMouseDown={(e) => {
              e.preventDefault();
              setOpen(open === i ? null : i);
            }}
            onMouseEnter={() => open !== null && setOpen(i)}
          >
            <Mnemonic label={menu.label} />
          </button>
          {open === i && (
            <div className={styles.dropdown}>
              {menu.items.map((item, j) =>
                item === "divider" ? (
                  <div key={`d${j}`} className={styles.divider} role="separator" />
                ) : (
                  <button
                    key={item.label}
                    type="button"
                    className={styles.item}
                    disabled={item.disabled}
                    onClick={() => {
                      setOpen(null);
                      item.onClick?.();
                    }}
                  >
                    <span>
                      <Mnemonic label={item.label} />
                    </span>
                    {item.shortcut && <span className={styles.shortcut}>{item.shortcut}</span>}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
