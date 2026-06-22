import { useState } from "react";
import AppWindow, { type WindowControls } from "../../components/window/AppWindow";
import { appMeta, type AppId } from "../registry";
import styles from "./EmbeddedApp.module.css";

interface EmbeddedAppProps {
  id: AppId;
  controls: WindowControls;
}

/**
 * Hosts a standalone web app — with its own toolchain, dependencies and styles —
 * inside a Win95 window via an <iframe>. The app is built separately and vendored
 * as a static bundle under public/apps/<id>/ (see scripts/sync-apps.mjs); the
 * registry's `embed` field is the path the iframe points at. This keeps the
 * desktop shell free of each app's dependencies and gives every app full style
 * and JS isolation, while the Win95 chrome supplies the window frame.
 */
export default function EmbeddedApp({ id, controls }: EmbeddedAppProps) {
  const { embed, title } = appMeta(id);
  const [loaded, setLoaded] = useState(false);

  return (
    <AppWindow id={id} controls={controls}>
      <div className={styles.frame}>
        {!loaded && <div className={styles.loading}>Loading {title}…</div>}
        <iframe
          className={styles.iframe}
          src={embed}
          title={title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </AppWindow>
  );
}
