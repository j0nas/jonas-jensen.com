import AppWindow, { type WindowControls } from "../../components/window/AppWindow";
import { StatusBar } from "../../win95";
import { folderMenu } from "../folderMenu";
import { apps, type DocWindowId } from "../registry";
import { docs } from "../../docs";
import styles from "./Documents.module.css";

interface DocumentsProps {
  controls: WindowControls;
  onOpen: (id: DocWindowId) => void;
}

// A folder window listing every document in content/docs/ as a WordPad file.
// Double-click (or Enter) opens it in its own read-only WordPad window.
export default function Documents({ controls, onOpen }: DocumentsProps) {
  return (
    <AppWindow id="documents" controls={controls} menu={folderMenu(controls.onClose)}>
      <div className={styles.folder}>
        <div className={styles.grid}>
          {docs.map((doc) => (
            <button
              type="button"
              className={styles.file}
              key={doc.slug}
              onDoubleClick={() => onOpen(`docs/${doc.slug}`)}
              onKeyDown={(event) => {
                if (event.key === "Enter") onOpen(`docs/${doc.slug}`);
              }}
              aria-label={`Open ${doc.title}`}
            >
              <img src={apps.wordpad.icon} alt="" width={32} height={32} />
              <span className={styles.fileLabel}>{doc.fileName}</span>
            </button>
          ))}
        </div>
      </div>
      <StatusBar>{docs.length} object(s)</StatusBar>
    </AppWindow>
  );
}
