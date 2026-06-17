import type { TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.css";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * A multi-line edit control: white client area inside the WS_EX_CLIENTEDGE
 * sunken bevel. Fills its flex parent so windows can size it to taste.
 */
export default function TextArea({ className, ...rest }: TextAreaProps) {
  return <textarea className={[styles.textarea, className].filter(Boolean).join(" ")} {...rest} />;
}
