import { useState } from "react";
import type { ChangeEvent } from "react";
import AppWindow, { type WindowControls } from "../../components/window/AppWindow";
import { TextArea, type Menu } from "../../win95";

const STORAGE_KEY = "textarea__main";

interface WordPadProps {
  controls: WindowControls;
}

export default function WordPad({ controls }: WordPadProps) {
  const [content, setContent] = useState(() => localStorage.getItem(STORAGE_KEY) ?? "");

  function handleInput(event: ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value;
    setContent(value);
    localStorage.setItem(STORAGE_KEY, value);
  }

  const menu = wordPadMenu(controls.onClose);

  return (
    <AppWindow id="wordpad" controls={controls} menu={menu}>
      <TextArea value={content} onChange={handleInput} placeholder="Type here..." />
    </AppWindow>
  );
}

/** WordPad's menu bar, shared with the read-only document viewer. */
export function wordPadMenu(onClose: () => void): Menu[] {
  return [
    {
      label: "&File",
      items: [
        { label: "&New", shortcut: "Ctrl+N" },
        { label: "&Open...", shortcut: "Ctrl+O" },
        { label: "&Save", shortcut: "Ctrl+S" },
        { label: "Save &As..." },
        "divider",
        { label: "&Print...", shortcut: "Ctrl+P" },
        { label: "Print Pre&view" },
        { label: "Page Set&up..." },
        "divider",
        { label: "E&xit", onClick: onClose },
      ],
    },
    {
      label: "&Edit",
      items: [
        { label: "&Undo", shortcut: "Ctrl+Z" },
        "divider",
        { label: "Cu&t", shortcut: "Ctrl+X" },
        { label: "&Copy", shortcut: "Ctrl+C" },
        { label: "&Paste", shortcut: "Ctrl+V" },
        { label: "Paste &Special..." },
        { label: "Cle&ar", shortcut: "Del" },
        { label: "Se&lect All", shortcut: "Ctrl+A" },
        "divider",
        { label: "&Find...", shortcut: "Ctrl+F" },
        { label: "Find &Next", shortcut: "F3" },
        { label: "R&eplace...", shortcut: "Ctrl+H" },
      ],
    },
    {
      label: "&View",
      items: [
        { label: "&Toolbar" },
        { label: "&Format Bar" },
        { label: "&Ruler" },
        { label: "&Status Bar" },
      ],
    },
    {
      label: "&Insert",
      items: [{ label: "&Date and Time..." }, { label: "&Object..." }],
    },
    {
      label: "F&ormat",
      items: [
        { label: "&Font..." },
        { label: "&Bullet Style" },
        { label: "&Paragraph..." },
        { label: "&Tabs..." },
      ],
    },
    {
      label: "&Help",
      items: [{ label: "&Help Topics" }, "divider", { label: "&About WordPad" }],
    },
  ];
}
