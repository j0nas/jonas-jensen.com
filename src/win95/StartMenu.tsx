import { useState } from "react";
import Mnemonic from "./mnemonic";
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

interface StartMenuProps {
  entries: StartEntry[];
  onClose: () => void;
}

function Row({ entry, onClose }: { entry: StartEntry; onClose: () => void }) {
  const [hover, setHover] = useState(false);
  if (entry === "divider") return <div className={styles.divider} role="separator" />;

  const hasSub = !!entry.submenu?.length;
  return (
    <div
      className={styles.row}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        type="button"
        className={styles.item}
        disabled={entry.disabled}
        onClick={() => {
          if (hasSub) return;
          onClose();
          entry.onClick?.();
        }}
      >
        {entry.icon ? (
          <img className={styles.icon} src={entry.icon} alt="" width={32} height={32} />
        ) : (
          <span className={styles.icon} />
        )}
        <span className={styles.label}>
          <Mnemonic label={entry.label} />
        </span>
        {hasSub && <span className={styles.arrow}>▶</span>}
      </button>
      {hasSub && hover && (
        <div className={styles.flyout}>
          {entry.submenu!.map((sub, i) => (
            <Row key={sub === "divider" ? `d${i}` : sub.label} entry={sub} onClose={onClose} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * The Start menu: the vertical "Windows 95" banner down the left, then the
 * canonical entries. Items with a submenu open a flyout on hover; leaf items
 * fire their action and dismiss the menu.
 */
export default function StartMenu({ entries, onClose }: StartMenuProps) {
  return (
    <div className={styles.menu}>
      <div className={styles.banner} role="img" aria-label="Windows 95" />
      <div className={styles.entries}>
        {entries.map((entry, i) => (
          <Row key={entry === "divider" ? `d${i}` : entry.label} entry={entry} onClose={onClose} />
        ))}
      </div>
    </div>
  );
}
