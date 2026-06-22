import { Fragment, useCallback, useMemo, useRef, useState } from "react";
import type { ReactElement } from "react";
import { DesktopIcon, StartMenu, TaskBar, type StartEntry } from "../../win95";
import type { WindowControls } from "../window/AppWindow";
import WordPad from "../../apps/wordpad/WordPad";
import MyComputer from "../../apps/my-computer/MyComputer";
import RecycleBin from "../../apps/recycle-bin/RecycleBin";
import Notepad from "../../apps/notepad/Notepad";
import Personal from "../../apps/personal/Personal";
import EmbeddedApp from "../../apps/embedded/EmbeddedApp";
import { apps, appMeta, embeddedAppIds, type AppId } from "../../apps/registry";
import styles from "./Desktop.module.css";

// Desktop icons down the left edge. Labels differ from window titles (e.g. the
// file name rather than "… - WordPad").
const DESKTOP_ICONS: { id: string; appId: AppId; label: string }[] = [
  { id: "my-computer", appId: "my-computer", label: "My Computer" },
  { id: "recycle-bin", appId: "recycle-bin", label: "Recycle Bin" },
  { id: "wordpad", appId: "wordpad", label: "Document.rtf" },
  { id: "personal-details", appId: "personal-details", label: "personal-details.txt" },
  { id: "personal", appId: "personal", label: "Personal" },
  // Embedded apps (registry `embed` field) get a desktop icon automatically.
  ...embeddedAppIds.map((id) => ({ id, appId: id, label: apps[id].title })),
];

const NOTEPAD_CONTENT = `Hi, I'm Jonas. I'm a software developer based in Oslo, Norway. I'm super passionate about computers, technology, animal rights and tinkering. Currently working on https://pep.dev.

I love to use my skills to make people's lives better in whatever ways I can and to build things that do so. If you do too, feel free to reach out at: jonas.jensen@msn.com`;

// Each open window's live state. Position is fixed at spawn; the window owns
// its own dragging after that.
interface WinState {
  id: AppId;
  x: number;
  y: number;
  z: number;
  minimized: boolean;
}

// Renders each built-in app's body, handing it the window controls Desktop
// computes. Embedded apps (registry `embed` field) aren't listed here — they're
// rendered generically via <EmbeddedApp> in the window loop below.
const renderers: Partial<Record<AppId, (controls: WindowControls) => ReactElement>> = {
  "personal-details": (controls) => <Notepad controls={controls} content={NOTEPAD_CONTENT} />,
  wordpad: (controls) => <WordPad controls={controls} />,
  "my-computer": (controls) => <MyComputer controls={controls} />,
  "recycle-bin": (controls) => <RecycleBin controls={controls} />,
  personal: (controls) => <Personal controls={controls} />,
};

// Desktop icons occupy a ~96px column on the left; spawn windows clear of it
// when the viewport has room, otherwise fall back to a top-left cascade.
const ICON_COLUMN = 96;
function spawnPosition(index: number, width: number): { x: number; y: number } {
  const offset = (index % 8) * 30;
  const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
  const clearX = ICON_COLUMN + offset;
  const x = clearX + width + 16 <= vw ? clearX : 50 + offset;
  return { x, y: offset };
}

export default function Desktop() {
  const topZ = useRef(1);
  const [wins, setWins] = useState<WinState[]>(() => {
    const pos = spawnPosition(0, apps["personal-details"].defaultSize.width);
    return [{ id: "personal-details", x: pos.x, y: pos.y, z: 1, minimized: false }];
  });
  const [selected, setSelected] = useState<string | null>(null);
  const [startOpen, setStartOpen] = useState(false);

  const openApp = useCallback((id: AppId) => {
    setWins((prev) => {
      topZ.current += 1;
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        return prev.map((w) => (w.id === id ? { ...w, z: topZ.current, minimized: false } : w));
      }
      const pos = spawnPosition(prev.length, apps[id].defaultSize.width);
      return [...prev, { id, x: pos.x, y: pos.y, z: topZ.current, minimized: false }];
    });
  }, []);

  const closeApp = useCallback((id: AppId) => {
    setWins((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const focusApp = useCallback((id: AppId) => {
    setWins((prev) => {
      const w = prev.find((x) => x.id === id);
      if (w && w.z === topZ.current && !w.minimized) return prev;
      topZ.current += 1;
      return prev.map((x) => (x.id === id ? { ...x, z: topZ.current, minimized: false } : x));
    });
  }, []);

  const minimizeApp = useCallback((id: AppId) => {
    setWins((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  }, []);

  // The active window is the topmost (highest z) one that isn't minimized.
  const activeId = useMemo(() => {
    const visible = wins.filter((w) => !w.minimized);
    if (!visible.length) return null;
    return visible.reduce((a, b) => (b.z > a.z ? b : a)).id;
  }, [wins]);

  // Win95 taskbar toggle: clicking the active window minimizes it; any other
  // click restores + raises.
  const onTaskClick = useCallback(
    (id: string) => {
      const appId = id as AppId;
      setWins((prev) => {
        const w = prev.find((x) => x.id === appId);
        if (!w) return prev;
        if (appId === activeId && !w.minimized) {
          return prev.map((x) => (x.id === appId ? { ...x, minimized: true } : x));
        }
        topZ.current += 1;
        return prev.map((x) => (x.id === appId ? { ...x, z: topZ.current, minimized: false } : x));
      });
    },
    [activeId],
  );

  const startEntries: StartEntry[] = useMemo(
    () => [
      {
        label: "&Programs",
        icon: "/img/win95/programs-32.png",
        submenu: [
          { label: "&WordPad", icon: apps.wordpad.iconSmall, onClick: () => openApp("wordpad") },
          { label: "&Personal", icon: apps.personal.iconSmall, onClick: () => openApp("personal") },
          // Embedded apps (registry `embed` field) get a Programs entry automatically.
          ...embeddedAppIds.map((id) => ({
            label: apps[id].title,
            icon: apps[id].iconSmall,
            onClick: () => openApp(id),
          })),
        ],
      },
      {
        label: "&Documents",
        icon: "/img/win95/documents-32.png",
        submenu: [
          {
            label: "personal-details.txt",
            icon: apps["personal-details"].iconSmall,
            onClick: () => openApp("personal-details"),
          },
        ],
      },
      {
        label: "&Settings",
        icon: "/img/win95/settings-32.png",
        submenu: [{ label: "&Control Panel" }, { label: "&Printers" }],
      },
      {
        label: "&Find",
        icon: "/img/win95/find-32.png",
        submenu: [{ label: "&Files or Folders..." }],
      },
      { label: "&Help", icon: "/img/win95/help-32.png" },
      { label: "&Run...", icon: "/img/win95/run-32.png" },
      "divider",
      { label: "Sh&ut Down...", icon: "/img/win/shutdown.png" },
    ],
    [openApp],
  );

  const taskButtons = wins.map((w) => ({
    id: w.id,
    title: apps[w.id].title,
    icon: apps[w.id].iconSmall,
    active: w.id === activeId,
  }));

  return (
    <div
      className={`w95 ${styles.desktop}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setSelected(null);
      }}
    >
      <div className={styles.icons}>
        {DESKTOP_ICONS.map((di) => (
          <DesktopIcon
            key={di.id}
            icon={apps[di.appId].icon}
            label={di.label}
            selected={selected === di.id}
            onSelect={() => setSelected(di.id)}
            onOpen={() => openApp(di.appId)}
          />
        ))}
      </div>

      {wins.map((w) => {
        const controls: WindowControls = {
          initialX: w.x,
          initialY: w.y,
          zIndex: w.z,
          active: w.id === activeId,
          minimized: w.minimized,
          onFocus: () => focusApp(w.id),
          onClose: () => closeApp(w.id),
          onMinimize: () => minimizeApp(w.id),
        };
        return (
          <Fragment key={w.id}>
            {appMeta(w.id).embed ? (
              <EmbeddedApp id={w.id} controls={controls} />
            ) : (
              renderers[w.id]?.(controls)
            )}
          </Fragment>
        );
      })}

      <TaskBar
        windows={taskButtons}
        onTaskClick={onTaskClick}
        startOpen={startOpen}
        onStartToggle={() => setStartOpen((v) => !v)}
        onStartClose={() => setStartOpen(false)}
        startMenu={<StartMenu entries={startEntries} onClose={() => setStartOpen(false)} />}
      />
    </div>
  );
}
