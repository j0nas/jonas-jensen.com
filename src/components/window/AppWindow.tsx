import type { ComponentProps, ReactNode } from "react";
import { Modal, TitleBar } from "@react95/core";
import { apps, type AppId } from "../../apps/registry";

interface AppWindowProps {
  id: AppId;
  position: { x: number; y: number };
  onClose: () => void;
  // React95's menu-bar shape: [{ name, list: <List>… }]. Optional — folders
  // and placeholders render no menu bar.
  menu?: ComponentProps<typeof Modal>["menu"];
  children: ReactNode;
}

// Thin wrapper over React95's <Modal>. The library handles dragging, focus,
// z-ordering, minimize/restore, and TaskBar registration via its global modal
// controller — so this just wires per-app metadata and the close handler.
export default function AppWindow({ id, position, onClose, menu, children }: AppWindowProps) {
  const { iconSmall, title, defaultSize } = apps[id];

  return (
    <Modal
      id={id}
      icon={iconSmall}
      title={title}
      width={`${defaultSize.width}px`}
      height={`${defaultSize.height}px`}
      dragOptions={{ defaultPosition: position }}
      menu={menu}
      titleBarOptions={[
        <Modal.Minimize key="minimize" />,
        <TitleBar.Close key="close" onClick={onClose} />,
      ]}
    >
      {children}
    </Modal>
  );
}
