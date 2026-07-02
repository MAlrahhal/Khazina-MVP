"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Search,
  AlertTriangle,
  LineChart,
  FileText,
  Settings,
  Shield,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ComingSoonBadge } from "@/components/ui/Badge";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { useSidebar } from "@/hooks/useSidebar";
import { SIDEBAR_WIDTH } from "@/lib/sidebar-layout";

const navSections = [
  {
    label: "الرئيسية",
    items: [{ href: "/", label: "لوحة التحكم", icon: LayoutDashboard }],
  },
  {
    label: "التحليل",
    items: [
      { href: "/waste-detection", label: "اكتشاف الهدر المالي", icon: Search },
      { href: "/crisis-management", label: "إدارة الأزمات", icon: AlertTriangle, comingSoon: true },
      { href: "/simulation", label: "المحاكاة والتنبؤ", icon: LineChart, comingSoon: true },
    ],
  },
  {
    label: "النظام",
    items: [
      { href: "/reports", label: "التقارير", icon: FileText },
      { href: "/settings", label: "الإعدادات", icon: Settings },
    ],
  },
];

function NavLinks({
  collapsed,
  onNavigate,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {navSections.map((section) => (
        <div key={section.label} className="mb-6 last:mb-0">
          {!collapsed && (
            <p className="mb-2 px-3 text-[11px] font-semibold text-slate-400">{section.label}</p>
          )}
          <div className="space-y-0.5">
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-xl py-2.5 text-[13px] font-medium transition-all duration-200",
                    collapsed ? "justify-center px-2" : "pe-3 ps-4",
                    isActive
                      ? "bg-black text-white shadow-md"
                      : "text-slate-600 hover:bg-gold-soft hover:text-black"
                  )}
                >
                  {isActive && !collapsed && (
                    <span className="absolute inset-y-2.5 start-0 w-[3px] rounded-full bg-gold" />
                  )}
                  <Icon
                    className={cn(
                      "h-[18px] w-[18px] shrink-0",
                      isActive ? "text-gold-light" : "text-slate-400 group-hover:text-gold-dark"
                    )}
                    strokeWidth={isActive ? 2.25 : 2}
                  />
                  {!collapsed && (
                    <>
                      <span className="flex-1 leading-snug">{item.label}</span>
                      {item.comingSoon && !isActive && (
                        <ComingSoonBadge className="px-1.5 py-px text-[10px] leading-tight" />
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

function SidebarPanel({
  collapsed,
  showMobileClose,
  showTabletToggle,
  onCloseMobile,
  onToggleTablet,
  onNavigate,
  className,
}: {
  collapsed: boolean;
  showMobileClose?: boolean;
  showTabletToggle?: boolean;
  onCloseMobile?: () => void;
  onToggleTablet?: () => void;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <aside className={cn("flex h-full flex-col bg-white", className)}>
      <div
        className={cn(
          "flex h-16 shrink-0 items-center border-b border-slate-100 sm:h-[4.25rem]",
          collapsed ? "justify-center px-2" : "gap-4 px-5"
        )}
      >
        <BrandLogo size={collapsed ? "sm" : "sidebar"} priority />
        {!collapsed && (
          <p className="text-[1.3rem] font-bold leading-none tracking-tight text-black">خزينة</p>
        )}
        {showMobileClose && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
            aria-label="إغلاق"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {showTabletToggle && (
          <button
            type="button"
            onClick={onToggleTablet}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label={collapsed ? "توسيع القائمة" : "طي القائمة"}
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <NavLinks collapsed={collapsed} onNavigate={onNavigate} />
      </nav>

      {!collapsed && (
        <div className="shrink-0 border-t border-slate-100 p-4">
          <div className="rounded-xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-4">
            <div className="mb-1.5 flex items-center gap-2">
              <Shield className="h-3.5 w-3.5 text-gold-dark" strokeWidth={2} />
              <p className="text-xs font-semibold text-slate-700">النشر المحلي</p>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500">
              يعمل النظام داخل البنية التحتية للمؤسسة وفق متطلبات ساما
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}

/** In-flow sidebar — reserves horizontal space in the app shell (tablet + desktop) */
export function SidebarRail() {
  const { mode, toggleTablet, viewport } = useSidebar();
  const collapsed = mode === "collapsed";

  if (mode === "hidden") return null;

  return (
    <div
      className="hidden shrink-0 transition-[width] duration-300 ease-out md:block"
      style={{ width: mode === "collapsed" ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.full }}
    >
      <div className="sticky top-0 h-screen border-e border-slate-200/60 shadow-sidebar">
        <SidebarPanel
          collapsed={collapsed}
          showTabletToggle={viewport === "tablet"}
          onToggleTablet={toggleTablet}
          className="h-full"
        />
      </div>
    </div>
  );
}

/** Fixed drawer — mobile only, does not affect main column width */
export function SidebarDrawer() {
  const { mobileOpen, closeMobile, viewport } = useSidebar();

  if (viewport !== "mobile") return null;

  return (
    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="fixed inset-y-0 start-0 z-50 w-[min(85vw,17.5rem)] shadow-2xl md:hidden"
        >
          <SidebarPanel
            collapsed={false}
            showMobileClose
            onCloseMobile={closeMobile}
            onNavigate={closeMobile}
            className="h-full shadow-sidebar"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SidebarOverlay() {
  const { mobileOpen, closeMobile, viewport } = useSidebar();

  if (viewport !== "mobile") return null;

  return (
    <AnimatePresence>
      {mobileOpen && (
        <motion.button
          type="button"
          aria-label="إغلاق القائمة"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeMobile}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] md:hidden"
        />
      )}
    </AnimatePresence>
  );
}
