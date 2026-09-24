import { useState } from "react";
import type { ReactNode } from "react";
import AppWindow, { type WindowControls } from "../../components/window/AppWindow";
import { IconView, StatusBar, type IconViewItem, type Menu } from "../../win95";
import { folderMenu } from "../folderMenu";
import type { WindowId } from "../registry";

interface FolderWindowProps {
  id: WindowId;
  controls: WindowControls;
  items: IconViewItem[];
  /** Folder-specific File menu items, above the standard ones. */
  extraFile?: Menu["items"];
  /** The status bar for a selected item (a drive's free space); defaults to "1 object(s) selected". */
  selectedStatus?: (key: string) => string | undefined;
  /** Replaces the icon view (e.g. the Recycle Bin's details list). */
  children?: ReactNode;
  view?: "large" | "details";
}

/**
 * An Explorer folder window: the folder menu bar, the icons in Large Icons view
 * and the status bar counting them ("6 object(s)", or what's selected).
 */
export default function FolderWindow({
  id,
  controls,
  items,
  extraFile,
  selectedStatus,
  children,
  view = "large",
}: FolderWindowProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const status = selected
    ? (selectedStatus?.(selected) ?? "1 object(s) selected")
    : `${items.length} object(s)`;
  return (
    <AppWindow id={id} controls={controls} menu={folderMenu(controls.onClose, extraFile, view)}>
      {children ?? <IconView items={items} onSelect={setSelected} />}
      <StatusBar>{status}</StatusBar>
    </AppWindow>
  );
}
