import AppWindow, { type WindowControls } from "../../components/window/AppWindow";

const panel: React.CSSProperties = {
  flex: 1,
  minHeight: 0,
  padding: 8,
  overflow: "auto",
  background: "var(--w95-window)",
  boxShadow: "var(--w95-bevel-sunken)",
};

export default function MyComputer({ controls }: { controls: WindowControls }) {
  return (
    <AppWindow id="my-computer" controls={controls}>
      <div style={panel}>
        <p style={{ margin: 0 }}>My Computer</p>
        <p style={{ marginTop: 8, color: "var(--w95-gray-text)" }}>This is a placeholder window.</p>
      </div>
    </AppWindow>
  );
}
