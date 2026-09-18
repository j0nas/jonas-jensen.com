import type { Menu } from "../win95";

/**
 * The Explorer folder-window menu bar (File / Edit / View / Help), as every
 * Win95 shell folder — Personal, Documents, My Computer, Recycle Bin — shows it.
 * `extraFile` prepends folder-specific File items (e.g. "Empty Recycle Bin").
 */
export function folderMenu(onClose: () => void, extraFile: Menu["items"] = []): Menu[] {
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
        { label: "Status &Bar" },
        "divider",
        { label: "Lar&ge Icons" },
        { label: "S&mall Icons" },
        { label: "&List" },
        { label: "&Details" },
        "divider",
        { label: "Arrange &Icons" },
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
