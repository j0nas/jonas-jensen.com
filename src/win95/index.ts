// The owned Windows 95 component library — pixel-accurate chrome built on the
// canonical design tokens in theme.css (GDI palette, GetSystemMetrics sizes,
// DrawEdge bevels). Import the stylesheet once at the app entry.
export { default as Button } from "./Button";
export { default as Window } from "./Window";
export { default as TitleBar } from "./TitleBar";
export { default as MenuBar } from "./MenuBar";
export type { Menu, MenuItem } from "./MenuBar";
export { default as TextArea } from "./TextArea";
export { default as StatusBar } from "./StatusBar";
export { default as DesktopIcon } from "./DesktopIcon";
export { default as TaskBar } from "./TaskBar";
export type { TaskButton } from "./TaskBar";
export { default as StartMenu } from "./StartMenu";
export type { StartEntry } from "./StartMenu";
export { default as Clock } from "./Clock";
