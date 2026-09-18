import AppWindow, { type WindowControls } from "../../components/window/AppWindow";
import { folderMenu } from "../folderMenu";

const panel: React.CSSProperties = {
  flex: 1,
  minHeight: 0,
  padding: 8,
  overflow: "auto",
  background: "var(--w95-window)",
  boxShadow: "var(--w95-bevel-sunken)",
};

export default function RecycleBin({ controls }: { controls: WindowControls }) {
  return (
    <AppWindow
      id="recycle-bin"
      controls={controls}
      menu={folderMenu(controls.onClose, [
        { label: "&Empty Recycle Bin", disabled: true },
        "divider",
      ])}
    >
      <div style={panel}>
        <p style={{ margin: 0 }}>Recycle Bin</p>
        <p style={{ marginTop: 8, color: "var(--w95-gray-text)" }}>This folder is empty.</p>
      </div>
    </AppWindow>
  );
}
