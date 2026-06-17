import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Render the held-down (sunken) look — used for toggles like an open Start button. */
  active?: boolean;
  /** The dialog default button: an extra 1px black frame around the raised face. */
  isDefault?: boolean;
};

/**
 * The standard Win95 push button: raised-soft bevel at rest, sunken-pressed
 * while held (with its label nudged 1px down-right), and a dotted focus
 * rectangle inset one pixel. The default button adds the 1px black frame Win95
 * draws around the Enter-activated button. All chrome comes from the tokens.
 */
export default function Button({
  active = false,
  isDefault = false,
  className,
  type,
  ...rest
}: ButtonProps) {
  const cls = [
    styles.button,
    active ? styles.active : "",
    isDefault ? styles.default : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <button type={type ?? "button"} className={cls} {...rest} />;
}
