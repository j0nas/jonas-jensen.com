import AppWindow, { type WindowControls } from "../../components/window/AppWindow";
import { StatusBar } from "../../win95";
import styles from "./Personal.module.css";

const shortcuts = [
  { label: "Jellyfin", url: "https://j0nas.comet.usbx.me/jellyfin/", icon: "/img/personal/jellyfin.png" },
  { label: "Audiobookshelf", url: "https://audiobookshelf-j0nas.comet.usbx.me/audiobookshelf/", icon: "/img/personal/audiobookshelf.png" },
];

interface PersonalProps {
  controls: WindowControls;
}

export default function Personal({ controls }: PersonalProps) {
  return (
    <AppWindow id="personal" controls={controls}>
      <div className={styles.folder}>
        <div className={styles.grid}>
          {shortcuts.map((shortcut) => (
            <a
              className={styles.shortcut}
              href={shortcut.url}
              target="_blank"
              rel="noopener noreferrer"
              key={shortcut.label}
            >
              <div className={styles.shortcutIconWrapper}>
                <img src={shortcut.icon} alt="" width={32} height={32} />
                <img
                  className={styles.shortcutArrow}
                  src="/img/personal/shortcut-arrow.png"
                  alt=""
                  width={10}
                  height={10}
                />
              </div>
              <span className={styles.shortcutLabel}>{shortcut.label}</span>
            </a>
          ))}
        </div>
      </div>
      <StatusBar>{shortcuts.length} object(s)</StatusBar>
    </AppWindow>
  );
}
