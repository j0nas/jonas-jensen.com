import { Fragment } from "react";
import type { ReactNode } from "react";

/**
 * Renders a Win32 mnemonic label: the character following `&` is underlined as
 * the access key (Win95 shows these underlines permanently, unlike XP+). `&&`
 * is a literal ampersand; a label with no `&` renders plain.
 */
export default function Mnemonic({ label }: { label: string }): ReactNode {
  const parts: ReactNode[] = [];
  let i = 0;
  let k = 0;
  while (i < label.length) {
    const amp = label.indexOf("&", i);
    if (amp === -1) {
      parts.push(label.slice(i));
      break;
    }
    if (amp > i) parts.push(label.slice(i, amp));
    const next = label[amp + 1];
    if (next === "&") {
      parts.push("&");
      i = amp + 2;
    } else if (next !== undefined) {
      parts.push(<u key={k++}>{next}</u>);
      i = amp + 2;
    } else {
      i = amp + 1;
    }
  }
  return <Fragment>{parts}</Fragment>;
}
