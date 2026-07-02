"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  getSidebarMode,
  sidebarWidthForMode,
  type SidebarMode,
} from "@/lib/sidebar-layout";

type Viewport = "mobile" | "tablet" | "desktop";

function getViewport(width: number): Viewport {
  if (width >= 1024) return "desktop";
  if (width >= 768) return "tablet";
  return "mobile";
}

type SidebarContextValue = {
  mobileOpen: boolean;
  tabletCollapsed: boolean;
  viewport: Viewport;
  mode: SidebarMode;
  sidebarWidth: string;
  openMobile: () => void;
  closeMobile: () => void;
  toggleMobile: () => void;
  toggleTablet: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabletCollapsed, setTabletCollapsed] = useState(false);
  const [viewport, setViewport] = useState<Viewport>("desktop");

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const openMobile = useCallback(() => setMobileOpen(true), []);
  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);
  const toggleTablet = useCallback(() => setTabletCollapsed((v) => !v), []);

  useEffect(() => {
    const update = () => {
      const next = getViewport(window.innerWidth);
      setViewport(next);
      if (next === "desktop") setTabletCollapsed(false);
      if (next !== "mobile") setMobileOpen(false);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen, closeMobile]);

  const mode = getSidebarMode(viewport, tabletCollapsed);
  const sidebarWidth = sidebarWidthForMode(mode);

  const value = useMemo(
    () => ({
      mobileOpen,
      tabletCollapsed,
      viewport,
      mode,
      sidebarWidth,
      openMobile,
      closeMobile,
      toggleMobile,
      toggleTablet,
    }),
    [mobileOpen, tabletCollapsed, viewport, mode, sidebarWidth, openMobile, closeMobile, toggleMobile, toggleTablet]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}
