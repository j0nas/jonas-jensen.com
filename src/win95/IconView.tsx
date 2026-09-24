import { useState } from "react";
import DesktopIcon from "./DesktopIcon";
import styles from "./IconView.module.css";

export interface IconViewItem {
  key: string;
  /** 32×32 icon URL. */
  icon: string;
  label: string;
  onOpen?: () => void;
  shortcut?: boolean;
}

/**
 * A folder window's client area in Large Icons view: the white list pane inside
 * the sunken client edge, icons in 75px cells left to right, wrapping. A click
 * selects one, a press on the empty pane clears it; double-click or Enter opens.
 */
export default function IconView({
  items,
  onSelect,
}: {
  items: IconViewItem[];
  /** Selection changes, for the status bar ("1 object(s) selected"). */
  onSelect?: (key: string | null) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const select = (key: string | null) => {
    setSelected(key);
    onSelect?.(key);
  };
  return (
    <div
      className={styles.pane}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) select(null);
      }}
    >
      {items.map((item) => (
        <DesktopIcon
          key={item.key}
          icon={item.icon}
          label={item.label}
          shortcut={item.shortcut}
          inFolder
          selected={selected === item.key}
          onSelect={() => select(item.key)}
          onOpen={() => item.onOpen?.()}
        />
      ))}
    </div>
  );
}
