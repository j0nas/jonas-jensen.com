import { Fragment, useCallback, useState } from "react";
import type { ReactElement } from "react";
import { List, TaskBar, useModal } from "@react95/core";
import { HelpBook, PowerOff } from "@react95/icons";
import DesktopIcon from "./DesktopIcon";
import WordPad from "../../apps/wordpad/WordPad";
import MyComputer from "../../apps/my-computer/MyComputer";
import RecycleBin from "../../apps/recycle-bin/RecycleBin";
import Notepad from "../../apps/notepad/Notepad";
import Personal from "../../apps/personal/Personal";
import { apps, type AppId } from "../../apps/registry";
import styles from "./Desktop.module.css";

// Desktop icons down the left edge. Labels differ from window titles (e.g. the
// file name rather than "… - WordPad").
const DESKTOP_ICONS: { id: string; appId: AppId; label: string }[] = [
  { id: "my-computer", appId: "my-computer", label: "My Computer" },
  { id: "recycle-bin", appId: "recycle-bin", label: "Recycle Bin" },
  { id: "wordpad", appId: "wordpad", label: "Document.rtf" },
  { id: "personal-details", appId: "personal-details", label: "personal-details.txt" },
  { id: "personal", appId: "personal", label: "Personal" },
];

const NOTEPAD_CONTENT = `Hi, I'm Jonas. I'm a software developer based in Oslo, Norway. I'm super passionate about computers, technology, animal rights and tinkering. Currently working on https://pep.dev.

I love to use my skills to make people's lives better in whatever ways I can and to build things that do so. If you do too, feel free to reach out at: jonas.jensen@msn.com`;

interface AppSlotProps {
  position: { x: number; y: number };
  onClose: () => void;
}

// Maps each app id to its window. React95's <Modal> base sits at top:50px,
// left:0; dragOptions.defaultPosition translates from there.
const renderers: Record<AppId, (props: AppSlotProps) => ReactElement> = {
  "personal-details": (props) => <Notepad {...props} content={NOTEPAD_CONTENT} />,
  wordpad: (props) => <WordPad {...props} />,
  "my-computer": (props) => <MyComputer {...props} />,
  "recycle-bin": (props) => <RecycleBin {...props} />,
  personal: (props) => <Personal {...props} />,
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
  const { focus, restore } = useModal();
  const [selected, setSelected] = useState<string | null>(null);
  const [openWindows, setOpenWindows] = useState<{ id: AppId; pos: { x: number; y: number } }[]>(
    () => [
      { id: "personal-details", pos: spawnPosition(0, apps["personal-details"].defaultSize.width) },
    ],
  );

  const openApp = useCallback(
    (id: AppId) => {
      setOpenWindows((prev) => {
        if (prev.some((w) => w.id === id)) return prev;
        return [...prev, { id, pos: spawnPosition(prev.length, apps[id].defaultSize.width) }];
      });
      // Bring an already-open (or freshly-restored) window to the front.
      restore(id);
      focus(id);
    },
    [focus, restore],
  );

  const closeApp = useCallback((id: AppId) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  return (
    <div
      className={styles.desktop}
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

      {openWindows.map(({ id, pos }) => (
        <Fragment key={id}>
          {renderers[id]({ position: pos, onClose: () => closeApp(id) })}
        </Fragment>
      ))}

      <TaskBar
        list={
          <List>
            <List.Item icon={apps.personal.icon} onClick={() => openApp("personal")}>
              Personal
            </List.Item>
            <List.Item icon={apps.wordpad.icon} onClick={() => openApp("wordpad")}>
              Document.rtf
            </List.Item>
            <List.Item
              icon={apps["personal-details"].icon}
              onClick={() => openApp("personal-details")}
            >
              personal-details.txt
            </List.Item>
            <List.Item icon={apps["my-computer"].icon} onClick={() => openApp("my-computer")}>
              My Computer
            </List.Item>
            <List.Item icon={apps["recycle-bin"].icon} onClick={() => openApp("recycle-bin")}>
              Recycle Bin
            </List.Item>
            <List.Divider />
            <List.Item icon={<HelpBook variant="32x32_4" />}>Help</List.Item>
            <List.Item icon={<PowerOff variant="32x32_4" />}>Shut Down...</List.Item>
          </List>
        }
      />
    </div>
  );
}
