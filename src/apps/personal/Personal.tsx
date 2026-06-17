import { Modal } from "@react95/core";
import AppWindow from "../../components/window/AppWindow";
import styles from "./Personal.module.css";

const shortcuts = [
  { label: "Seerr", url: "https://j0nas.comet.usbx.me/seerr", icon: "/img/personal/overseerr.png" },
  { label: "Sonarr", url: "https://j0nas.comet.usbx.me/sonarr", icon: "/img/personal/sonarr.png" },
  { label: "Radarr", url: "https://j0nas.comet.usbx.me/radarr", icon: "/img/personal/radarr.png" },
];

interface PersonalProps {
  position: { x: number; y: number };
  onClose: () => void;
}

export default function Personal({ position, onClose }: PersonalProps) {
  return (
    <AppWindow id="personal" position={position} onClose={onClose}>
      <Modal.Content boxShadow="$in" bgColor="white" style={{ flex: 1, minHeight: 0 }}>
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
      </Modal.Content>
      <div className={styles.statusBar}>{shortcuts.length} object(s)</div>
    </AppWindow>
  );
}
