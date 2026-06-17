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
        { label: "&Undo" },
        "divider",
        { label: "Cu&t" },
        { label: "&Copy" },
        { label: "&Paste" },
        { label: "De&lete" },
        "divider",
        { label: "Select &All" },
        { label: "Time/&Date" },
      ],
    },
    {
      label: "&Search",
      items: [{ label: "&Find..." }, { label: "Find &Next" }],
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
