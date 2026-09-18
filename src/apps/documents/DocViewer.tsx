import AppWindow, { type WindowControls } from "../../components/window/AppWindow";
import { StatusBar } from "../../win95";
import { docSlug, type DocWindowId } from "../registry";
import { docBySlug } from "../../docs";
import { wordPadMenu } from "../wordpad/WordPad";
import styles from "./DocViewer.module.css";

interface DocViewerProps {
  id: DocWindowId;
  controls: WindowControls;
}

// A read-only WordPad showing one document from content/docs/. The markdown is
// compiled at build time (src/docs) from files we author ourselves, so the HTML
// is trusted and rendered as-is.
export default function DocViewer({ id, controls }: DocViewerProps) {
  const doc = docBySlug.get(docSlug(id));
  return (
    <AppWindow id={id} controls={controls} menu={wordPadMenu(controls.onClose)}>
      <div className={styles.page}>
        <article
          className={styles.document}
          dangerouslySetInnerHTML={{ __html: doc?.html ?? "" }}
        />
      </div>
      <StatusBar>For Help, press F1</StatusBar>
    </AppWindow>
  );
}
