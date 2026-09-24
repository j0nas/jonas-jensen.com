import type { WindowControls } from "../../components/window/AppWindow";
import FolderWindow from "../folder/FolderWindow";

// Shortcuts to self-hosted services; each opens in a new browser tab.
const shortcuts = [
  {
    label: "Jellyfin",
    url: "https://j0nas.comet.usbx.me/jellyfin/",
    icon: "/img/personal/jellyfin.png",
  },
  {
    label: "Audiobookshelf",
    url: "https://audiobookshelf-j0nas.comet.usbx.me/audiobookshelf/",
    icon: "/img/personal/audiobookshelf.png",
  },
  {
    label: "LazyLibrarian",
    url: "https://j0nas.comet.usbx.me/lazylibrarian/",
    icon: "/img/personal/lazylibrarian.png",
  },
];

export default function Personal({ controls }: { controls: WindowControls }) {
  return (
    <FolderWindow
      id="personal"
      controls={controls}
      items={shortcuts.map((s) => ({
        key: s.label,
        icon: s.icon,
        label: s.label,
        shortcut: true,
        onOpen: () => window.open(s.url, "_blank", "noopener,noreferrer"),
      }))}
    />
  );
}
