import { useEffect, useState } from "react";

/** The tray's time: H:MM AM/PM, no leading zero ("1:47 PM"). */
export function shortTime(d: Date): string {
  const hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const meridiem = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}:${minutes} ${meridiem}`;
}

/** The clock's tooltip: the long date ("Thursday, September 25, 2026"). */
export function longDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** The current time, refreshed often enough for a minute-resolution clock. */
export function useNow(): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/** The taskbar tray clock — H:MM AM/PM, ticking each minute. */
export default function Clock() {
  return <span>{shortTime(useNow())}</span>;
}
