import { useEffect, useState } from "react";

function format(d: Date): string {
  const hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const meridiem = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}:${minutes} ${meridiem}`;
}

/** The taskbar tray clock — H:MM AM/PM, ticking each minute. */
export default function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(id);
  }, []);
  return <span>{format(now)}</span>;
}
