import type { ReactNode } from "react";
import styles from "./StatusBar.module.css";

/** One recessed (sunken-thin) pane within a status bar. */
function Field({ children, grow = false }: { children?: ReactNode; grow?: boolean }) {
  return <div className={`${styles.field}${grow ? ` ${styles.grow}` : ""}`}>{children}</div>;
}

/**
 * The strip across the bottom of a window: face-coloured, holding one or more
 * sunken-thin fields. A plain string child is wrapped in a single field.
 */
function StatusBar({ children }: { children?: ReactNode }) {
  const wrapped = typeof children === "string" ? <Field grow>{children}</Field> : children;
  return <div className={styles.bar}>{wrapped}</div>;
}

StatusBar.Field = Field;
export default StatusBar;
