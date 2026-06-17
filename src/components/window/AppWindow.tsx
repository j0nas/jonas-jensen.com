import type { ReactNode } from "react";
import { Window, type Menu } from "../../win95";
import { apps, type AppId } from "../../apps/registry";

/** The per-window state Desktop owns and threads into each app's window. */
export interface WindowControls {
  initialX: number;
  initialY: number;
  zIndex: number;
  active: boolean;
  minimized: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
}

interface AppWindowProps {
  id: AppId;
  controls: WindowControls;
  menu?: Menu[];
  children: ReactNode;
}

// Pairs an app's registry metadata (icon, title, default size) with the live
// window controls Desktop supplies, then renders our owned <Window>.
export default function AppWindow({ id, controls, menu, children }: AppWindowProps) {
  const { iconSmall, title, defaultSize } = apps[id];
  return (
    <Window
      title={title}
      icon={iconSmall}
      width={defaultSize.width}
      height={defaultSize.height}
      menu={menu}
      {...controls}
    >
      {children}
    </Window>
  );
}
