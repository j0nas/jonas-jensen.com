import { Modal } from "@react95/core";
import AppWindow from "../../components/window/AppWindow";

interface MyComputerProps {
  position: { x: number; y: number };
  onClose: () => void;
}

export default function MyComputer({ position, onClose }: MyComputerProps) {
  return (
    <AppWindow id="my-computer" position={position} onClose={onClose}>
      <Modal.Content boxShadow="$in" bgColor="white" style={{ flex: 1, minHeight: 0 }}>
        <p style={{ margin: 0 }}>My Computer</p>
        <p style={{ marginTop: 8, color: "#555" }}>This is a placeholder window.</p>
      </Modal.Content>
    </AppWindow>
  );
}
