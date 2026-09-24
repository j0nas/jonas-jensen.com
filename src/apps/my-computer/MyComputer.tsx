import type { WindowControls } from "../../components/window/AppWindow";
import FolderWindow from "../folder/FolderWindow";

// A fresh Win95 install's My Computer: the drives, then the system folders.
const ITEMS = [
  { key: "a", icon: "/img/win95/floppy-32.png", label: "3½ Floppy (A:)" },
  { key: "c", icon: "/img/win95/drive-32.png", label: "(C:)" },
  { key: "d", icon: "/img/win95/cdrom-32.png", label: "(D:)" },
  { key: "control", icon: "/img/win95/control-panel-32.png", label: "Control Panel" },
  { key: "printers", icon: "/img/win95/printers-32.png", label: "Printers" },
  { key: "dialup", icon: "/img/win95/dialup-32.png", label: "Dial-Up Networking" },
];

export default function MyComputer({ controls }: { controls: WindowControls }) {
  return (
    <FolderWindow
      id="my-computer"
      controls={controls}
      items={ITEMS}
      selectedStatus={(key) => (key === "c" ? "Free Space: 1.93GB, Capacity: 2.00GB" : undefined)}
    />
  );
}
