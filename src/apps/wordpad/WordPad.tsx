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

  const menu: Menu[] = [
    {
      label: "&File",
      items: [
        { label: "&New" },
        { label: "&Open..." },
        { label: "&Save" },
        { label: "Save &As..." },
        "divider",
        { label: "&Print..." },
        { label: "Print Pre&view" },
        { label: "Page Set&up..." },
        "divider",
        { label: "E&xit", onClick: controls.onClose },
      ],
    },
    {
      label: "&Edit",
      items: [
        { label: "&Undo" },
        "divider",
        { label: "Cu&t" },
        { label: "&Copy" },
        { label: "&Paste" },
        { label: "Paste &Special..." },
        { label: "Cle&ar" },
        { label: "Se&lect All" },
        "divider",
        { label: "&Find..." },
        { label: "Find &Next" },
        { label: "R&eplace..." },
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
      label: "&Help",
      items: [{ label: "&Help Topics" }, "divider", { label: "&About WordPad" }],
    },
  ];

  return (
    <AppWindow id="wordpad" controls={controls} menu={menu}>
      <TextArea value={content} onChange={handleInput} placeholder="Type here..." />
    </AppWindow>
  );
}
