import type { Menu } from "../win95";

/**
 * The Explorer folder-window menu bar (File / Edit / View / Help), as every
 * Win95 shell folder — Personal, Documents, My Computer, Recycle Bin — shows it.
 * `extraFile` prepends folder-specific File items (e.g. "Empty Recycle Bin");
 * `view` is the view the folder opens in, marked with the option bullet (the
 * status bar is on, the toolbar off, as a new Win95 folder window has them).
 */
export function folderMenu(
  onClose: () => void,
  extraFile: Menu["items"] = [],
  view: "large" | "details" = "large",
): Menu[] {
  return [
    {
      label: "&File",
      items: [
        ...extraFile,
        { label: "Create &Shortcut", disabled: true },
        { label: "&Delete", disabled: true },
        { label: "Rena&me", disabled: true },
        { label: "P&roperties", disabled: true },
        "divider",
        { label: "&Close", onClick: onClose },
      ],
    },
    {
      label: "&Edit",
      items: [
        { label: "&Undo", disabled: true },
        "divider",
        { label: "Cu&t", shortcut: "Ctrl+X", disabled: true },
        { label: "&Copy", shortcut: "Ctrl+C", disabled: true },
        { label: "&Paste", shortcut: "Ctrl+V", disabled: true },
        { label: "Paste &Shortcut", disabled: true },
        "divider",
        { label: "Select &All", shortcut: "Ctrl+A" },
        { label: "&Invert Selection" },
      ],
    },
    {
      label: "&View",
      items: [
        { label: "&Toolbar" },
        { label: "Status &Bar", checked: true },
        "divider",
        { label: "Lar&ge Icons", checked: view === "large", radio: true },
        { label: "S&mall Icons" },
        { label: "&List" },
        { label: "&Details", checked: view === "details", radio: true },
        "divider",
        {
          label: "Arrange &Icons",
          submenu: [
            { label: "by &Name" },
            { label: "by &Type" },
            { label: "by Si&ze" },
            { label: "by &Date" },
            "divider",
            { label: "&Auto Arrange" },
          ],
        },
        { label: "Line &up Icons" },
        "divider",
        { label: "&Refresh", shortcut: "F5" },
        { label: "&Options..." },
      ],
    },
    {
      label: "&Help",
      items: [{ label: "&Help Topics" }, "divider", { label: "&About Windows 95" }],
    },
  ];
}
