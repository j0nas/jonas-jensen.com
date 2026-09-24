import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import styles from "./Tooltip.module.css";

// TTM_SETDELAYTIME defaults (from the double-click time): 500ms to appear, 5s shown.
const INITIAL = 500;
const AUTOPOP = 5000;

/**
 * A Win95 tooltip: black text on COLOR_INFOBK in a 1px black box, shown below-right
 * of the pointer after the initial delay and hidden after five seconds or when the
 * pointer leaves. Wraps its child in an inline-block hover target.
 */
export default function Tooltip({
  text,
  children,
  className,
}: {
  /** Nothing to show (e.g. an untruncated taskbar label): no tooltip. */
  text: string | null;
  children: ReactNode;
  className?: string;
}) {
  const [at, setAt] = useState<{ x: number; y: number } | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clear, []);

  return (
    <div
      className={className}
      onMouseEnter={() => {
        clear();
        timers.current.push(
          window.setTimeout(() => {
            setAt({ ...pointer.current });
            timers.current.push(window.setTimeout(() => setAt(null), AUTOPOP));
          }, INITIAL),
        );
      }}
      onMouseMove={(e) => {
        pointer.current = { x: e.clientX, y: e.clientY };
      }}
      onMouseLeave={() => {
        clear();
        setAt(null);
      }}
      onMouseDown={() => {
        clear();
        setAt(null);
      }}
    >
      {children}
      {text && at && <Tip text={text} x={at.x} y={at.y} />}
    </div>
  );
}

/** Below-right of the pointer, or above it / pulled left when that runs off screen. */
function Tip({ text, x, y }: { text: string; x: number; y: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ left: x, top: y + 20 });
  useLayoutEffect(() => {
    const r = ref.current!.getBoundingClientRect();
    setPos({
      left: Math.max(0, Math.min(x, window.innerWidth - r.width)),
      top: y + 20 + r.height <= window.innerHeight ? y + 20 : y - r.height - 2,
    });
  }, [x, y]);
  return (
    <div ref={ref} className={styles.tip} style={pos} role="tooltip">
      {text}
    </div>
  );
}
