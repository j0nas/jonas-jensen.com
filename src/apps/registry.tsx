import type { ReactElement } from "react";
import { Computer, Folder, Notepad, RecycleFull, Wordpad } from "@react95/icons";

// App metadata. Icons are pre-rendered React95 icon elements (32px for the
// desktop/Start menu, 16px for window title bars) — keeping them as elements
// sidesteps the typing friction of passing memoized icon components around.
interface AppMeta {
  icon: ReactElement;
  iconSmall: ReactElement;
  title: string;
  defaultSize: { width: number; height: number };
}

export const apps = {
  wordpad: {
    icon: <Wordpad variant="32x32_4" />,
    iconSmall: <Wordpad variant="16x16_4" />,
    title: "Document.rtf - WordPad",
    defaultSize: { width: 500, height: 350 },
  },
  "my-computer": {
    icon: <Computer variant="32x32_4" />,
    iconSmall: <Computer variant="16x16_4" />,
    title: "My Computer",
    defaultSize: { width: 600, height: 400 },
  },
  "recycle-bin": {
    icon: <RecycleFull variant="32x32_4" />,
    iconSmall: <RecycleFull variant="16x16_4" />,
    title: "Recycle Bin",
    defaultSize: { width: 400, height: 300 },
  },
  "personal-details": {
    icon: <Notepad variant="32x32_4" />,
    iconSmall: <Notepad variant="16x16_4" />,
    title: "personal-details.txt - Notepad",
    defaultSize: { width: 480, height: 420 },
  },
  personal: {
    icon: <Folder variant="32x32_4" />,
    iconSmall: <Folder variant="16x16_4" />,
    title: "Personal",
    defaultSize: { width: 400, height: 300 },
  },
} satisfies Record<string, AppMeta>;

export type AppId = keyof typeof apps;
