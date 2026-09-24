import type { WindowControls } from "../../components/window/AppWindow";
import FolderWindow from "../folder/FolderWindow";
import { apps, type DocWindowId } from "../registry";
import { docs } from "../../docs";

interface DocumentsProps {
  controls: WindowControls;
  onOpen: (id: DocWindowId) => void;
}

// A folder window listing every document in content/docs/ as a WordPad file.
// Double-click (or Enter) opens it in its own read-only WordPad window.
export default function Documents({ controls, onOpen }: DocumentsProps) {
  return (
    <FolderWindow
      id="documents"
      controls={controls}
      items={docs.map((doc) => ({
        key: doc.slug,
        icon: apps.wordpad.icon,
        label: doc.fileName,
        onOpen: () => onOpen(`docs/${doc.slug}`),
      }))}
    />
  );
}
