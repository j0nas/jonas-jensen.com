export const apps = {
  wordpad: {
    icon: '/img/win/wordpad.ico',
    title: 'Document - WordPad',
    defaultSize: { width: 500, height: 350 }
  },
  'my-computer': {
    icon: '/img/win/my-computer.png',
    title: 'My Computer',
    defaultSize: { width: 600, height: 400 }
  },
  'recycle-bin': {
    icon: '/img/win/recycle-bin.png',
    title: 'Recycle Bin',
    defaultSize: { width: 400, height: 300 }
  }
} as const;

export type AppId = keyof typeof apps;
