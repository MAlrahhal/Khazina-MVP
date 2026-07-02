/** Sidebar width tokens — single source of truth for the app shell grid */
export const SIDEBAR_WIDTH = {
  full: "17.5rem",
  collapsed: "4rem",
} as const;

export type SidebarMode = "hidden" | "collapsed" | "expanded";

/** Resolve layout mode from viewport + UI state (client only) */
export function getSidebarMode(
  viewport: "mobile" | "tablet" | "desktop",
  tabletCollapsed: boolean
): SidebarMode {
  if (viewport === "mobile") return "hidden";
  if (viewport === "desktop") return "expanded";
  return tabletCollapsed ? "collapsed" : "expanded";
}

export function sidebarWidthForMode(mode: SidebarMode): string {
  if (mode === "hidden") return "0px";
  if (mode === "collapsed") return SIDEBAR_WIDTH.collapsed;
  return SIDEBAR_WIDTH.full;
}
