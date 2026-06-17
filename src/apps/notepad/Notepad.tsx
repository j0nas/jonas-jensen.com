import type { ComponentProps } from "react";
import { List, Modal, TextArea } from "@react95/core";
import AppWindow from "../../components/window/AppWindow";

interface NotepadProps {
  position: { x: number; y: number };
  onClose: () => void;
  content?: string;
}

export default function Notepad({ position, onClose, content = "" }: NotepadProps) {
  const menu: ComponentProps<typeof Modal>["menu"] = [
    {
      name: "File",
      list: (
        <List width="200px">
          <List.Item>New</List.Item>
          <List.Item>Open...</List.Item>
          <List.Item>Save</List.Item>
          <List.Item>Save As...</List.Item>
          <List.Divider />
          <List.Item>Page Setup...</List.Item>
          <List.Item>Print...</List.Item>
          <List.Divider />
          <List.Item onClick={onClose}>Exit</List.Item>
        </List>
      ),
    },
    {
      name: "Edit",
      list: (
        <List width="200px">
          <List.Item>Undo</List.Item>
          <List.Divider />
          <List.Item>Cut</List.Item>
          <List.Item>Copy</List.Item>
          <List.Item>Paste</List.Item>
          <List.Item>Delete</List.Item>
          <List.Divider />
          <List.Item>Select All</List.Item>
          <List.Item>Time/Date</List.Item>
        </List>
      ),
    },
    {
      name: "Search",
      list: (
        <List width="200px">
          <List.Item>Find...</List.Item>
          <List.Item>Find Next</List.Item>
        </List>
      ),
    },
    {
      name: "Help",
      list: (
        <List width="200px">
          <List.Item>Help Topics</List.Item>
          <List.Divider />
          <List.Item>About Notepad</List.Item>
        </List>
      ),
    },
  ];

  return (
    <AppWindow id="personal-details" position={position} onClose={onClose} menu={menu}>
      <TextArea
        readOnly
        value={content}
        style={{ flex: 1, width: "100%", minHeight: 0, resize: "none" }}
      />
    </AppWindow>
  );
}
