import { Modal } from "@react95/core";
import AppWindow from "../../components/window/AppWindow";

interface RecycleBinProps {
  position: { x: number; y: number };
  onClose: () => void;
}

export default function RecycleBin({ position, onClose }: RecycleBinProps) {
  return (
    <AppWindow id="recycle-bin" position={position} onClose={onClose}>
      <Modal.Content boxShadow="$in" bgColor="white" style={{ flex: 1, minHeight: 0 }}>
        <p style={{ margin: 0 }}>Recycle Bin</p>
        <p style={{ marginTop: 8, color: "#555" }}>This folder is empty.</p>
      </Modal.Content>
    </AppWindow>
  );
}
