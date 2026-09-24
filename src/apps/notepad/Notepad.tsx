import AppWindow, { type WindowControls } from "../../components/window/AppWindow";
import { TextArea, type Menu } from "../../win95";

interface NotepadProps {
  controls: WindowControls;
  content?: string;
}

export default function Notepad({ controls, content = "" }: NotepadProps) {
  const menu: Menu[] = [
    {
      label: "&File",
      items: [
        { label: "&New" },
        { label: "&Open..." },
        { label: "&Save" },
        { label: "Save &As..." },
        "divider",
        { label: "Page Set&up..." },
        { label: "&Print..." },
        "divider",
        { label: "E&xit", onClick: controls.onClose },
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
        { label: "De&lete", shortcut: "Del" },
        "divider",
        { label: "Select &All" },
        { label: "Time/&Date", shortcut: "F5" },
        "divider",
        { label: "&Word Wrap", checked: true },
      ],
    },
    {
      label: "&Search",
      items: [{ label: "&Find..." }, { label: "Find &Next", shortcut: "F3" }],
    },
    {
      label: "&Help",
      items: [{ label: "&Help Topics" }, "divider", { label: "&About Notepad" }],
    },
  ];

  return (
    <AppWindow id="personal-details" controls={controls} menu={menu}>
      <TextArea readOnly value={content} />
    </AppWindow>
  );
}
