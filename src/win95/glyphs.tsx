import type { CSSProperties } from "react";

// The Marlett / menu glyphs as the bitmaps Win95 draws, sampled from RTM captures
// (SOURCES.md §Glyphs): "#" is an ink pixel. Each renders as a crisp SVG in
// currentColor, so a glyph turns white on the selection highlight like the real
// ones do.
const GLYPHS = {
  minimize: ["######", "######"],
  maximize: [
    "#########",
    "#########",
    "#.......#",
    "#.......#",
    "#.......#",
    "#.......#",
    "#.......#",
    "#.......#",
    "#########",
  ],
  restore: [
    "..######",
    "..######",
    "..#....#",
    "######.#",
    "######.#",
    "#....###",
    "#....#..",
    "#....#..",
    "######..",
  ],
  close: ["##....##", ".##..##.", "..####..", "...##...", "..####..", ".##..##.", "##....##"],
  /** The submenu arrow in menus and the Start menu. */
  arrow: ["#...", "##..", "###.", "####", "###.", "##..", "#..."],
  check: ["......#", ".....##", "#...###", "##.###.", "#####..", ".###...", "..#...."],
  radio: [".###.", "#####", "#####", "#####", ".###."],
} satisfies Record<string, string[]>;

export type GlyphName = keyof typeof GLYPHS;

function toPath(rows: string[]): string {
  let d = "";
  rows.forEach((row, y) => {
    for (const run of row.matchAll(/#+/g))
      d += `M${run.index} ${y}h${run[0].length}v1h-${run[0].length}z`;
  });
  return d;
}

const PATHS = Object.fromEntries(
  Object.entries(GLYPHS).map(([name, rows]) => [name, toPath(rows)]),
) as Record<GlyphName, string>;

/** A pixel glyph at its native size (positioned by the caller). */
export function Glyph({
  name,
  className,
  style,
}: {
  name: GlyphName;
  className?: string;
  style?: CSSProperties;
}) {
  const rows = GLYPHS[name];
  return (
    <svg
      className={className}
      style={style}
      width={rows[0].length}
      height={rows.length}
      viewBox={`0 0 ${rows[0].length} ${rows.length}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <path d={PATHS[name]} fill="currentColor" />
    </svg>
  );
}
