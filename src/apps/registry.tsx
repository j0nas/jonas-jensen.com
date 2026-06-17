// App metadata. Icons are the authentic Win95 icon bitmaps (16-colour shell
// icons) in public/img/win95 — `icon` is the 32px size for the desktop and
// Start menu, `iconSmall` the 16px size for title bars and taskbar buttons.
interface AppMeta {
  icon: string;
  iconSmall: string;
  title: string;
  defaultSize: { width: number; height: number };
}

export const apps = {
  wordpad: {
    icon: "/img/win95/wordpad-32.png",
    iconSmall: "/img/win95/wordpad-16.png",
    title: "Document.rtf - WordPad",
    defaultSize: { width: 500, height: 350 },
  },
  "my-computer": {
    icon: "/img/win95/computer-32.png",
    iconSmall: "/img/win95/computer-16.png",
    title: "My Computer",
    defaultSize: { width: 600, height: 400 },
  },
  "recycle-bin": {
    icon: "/img/win95/recycle-32.png",
    iconSmall: "/img/win95/recycle-16.png",
    title: "Recycle Bin",
    defaultSize: { width: 400, height: 300 },
  },
  "personal-details": {
    icon: "/img/win95/notepad-32.png",
    iconSmall: "/img/win95/notepad-16.png",
    title: "personal-details.txt - Notepad",
    defaultSize: { width: 480, height: 420 },
  },
  personal: {
    icon: "/img/win95/folder-32.png",
    iconSmall: "/img/win95/folder-16.png",
    title: "Personal",
    defaultSize: { width: 400, height: 300 },
  },
} satisfies Record<string, AppMeta>;

export type AppId = keyof typeof apps;
