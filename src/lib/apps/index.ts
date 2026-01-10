export const apps = {
  wordpad: {
    icon: '/img/win/wordpad.ico',
    title: 'Document - WordPad',
    defaultSize: { width: 500, height: 350 }
  }
} as const;

export type AppId = keyof typeof apps;
