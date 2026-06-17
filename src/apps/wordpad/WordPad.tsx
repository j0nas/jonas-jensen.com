import { useState } from "react";
import type { ChangeEvent, ComponentProps } from "react";
import { List, Modal, TextArea } from "@react95/core";
import AppWindow from "../../components/window/AppWindow";

const STORAGE_KEY = "textarea__main";

interface WordPadProps {
  position: { x: number; y: number };
  onClose: () => void;
}

export default function WordPad({ position, onClose }: WordPadProps) {
  const [content, setContent] = useState(() => localStorage.getItem(STORAGE_KEY) ?? "");

  function handleInput(event: ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value;
    setContent(value);
    localStorage.setItem(STORAGE_KEY, value);
  }

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
          <List.Item>Print...</List.Item>
          <List.Item>Print Preview</List.Item>
          <List.Item>Page Setup...</List.Item>
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
          <List.Item>Paste Special...</List.Item>
          <List.Item>Clear</List.Item>
          <List.Item>Select All</List.Item>
          <List.Divider />
          <List.Item>Find...</List.Item>
          <List.Item>Find Next</List.Item>
          <List.Item>Replace...</List.Item>
        </List>
      ),
    },
    {
      name: "View",
      list: (
        <List width="200px">
          <List.Item>Toolbar</List.Item>
          <List.Item>Format Bar</List.Item>
          <List.Item>Ruler</List.Item>
          <List.Item>Status Bar</List.Item>
        </List>
      ),
    },
    {
      name: "Insert",
      list: (
        <List width="200px">
          <List.Item>Date and Time...</List.Item>
          <List.Item>Object...</List.Item>
        </List>
      ),
    },
    {
      name: "Help",
      list: (
        <List width="200px">
          <List.Item>Help Topics</List.Item>
          <List.Divider />
          <List.Item>About WordPad</List.Item>
        </List>
      ),
    },
  ];

  return (
    <AppWindow id="wordpad" position={position} onClose={onClose} menu={menu}>
      <TextArea
        value={content}
        onChange={handleInput}
        placeholder="Type here..."
        style={{ flex: 1, width: "100%", minHeight: 0, resize: "none" }}
      />
    </AppWindow>
  );
}
