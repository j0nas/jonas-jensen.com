import type { WindowControls } from "../../components/window/AppWindow";
import FolderWindow from "../folder/FolderWindow";

export default function RecycleBin({ controls }: { controls: WindowControls }) {
  return (
    <FolderWindow
      id="recycle-bin"
      controls={controls}
      items={[]}
      extraFile={[{ label: "Empty Recycle &Bin", disabled: true }, "divider"]}
    />
  );
}
