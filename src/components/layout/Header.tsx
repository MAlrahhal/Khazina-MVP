"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Bell, Menu } from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { toggleMobile } = useSidebar();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const today = new Intl.DateTimeFormat("ar-SA", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b bg-white/95 backdrop-blur-xl transition-shadow duration-300",
        scrolled ? "border-slate-200/80 shadow-sm" : "border-transparent shadow-none"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={toggleMobile}
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-200/80 text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-95 md:hidden"
            aria-label="فتح القائمة"
          >
            <Menu className="h-[18px] w-[18px]" strokeWidth={2} />
          </button>
          <Link
            href="/"
            className="hidden shrink-0 transition-transform hover:scale-105 md:flex lg:hidden"
            aria-label="خزينة"
          >
            <BrandLogo size="sm" />
          </Link>
          <div className="min-w-0">
            {!isHome && (
              <p className="mb-0.5 hidden text-[11px] text-slate-400 sm:block">
                <Link href="/" className="transition-colors hover:text-slate-600">خزينة</Link>
                <span className="mx-1.5 text-slate-300">/</span>
                <span className="text-slate-500">{title}</span>
              </p>
            )}
            <h1 className="truncate text-base font-bold tracking-tight text-slate-900 sm:text-lg">{title}</h1>
            {subtitle && <p className="mt-0.5 hidden truncate text-[13px] text-slate-500 md:block">{subtitle}</p>}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <p className="hidden text-xs text-slate-400 xl:block">{today}</p>
          <button
            type="button"
            className="group relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200/80 bg-white text-slate-500 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 active:scale-95"
            aria-label="الإشعارات"
          >
            <Bell className="h-[17px] w-[17px] transition-transform group-hover:scale-110" strokeWidth={2} />
            <span className="absolute top-1.5 end-1.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-light opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold ring-2 ring-white" />
            </span>
          </button>
          <button
            type="button"
            className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white py-1 pe-2.5 ps-1 transition-all hover:border-slate-300 hover:shadow-sm sm:pe-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-black to-dark-gray text-[11px] font-bold text-gold-light ring-2 ring-white">
              أم
            </div>
            <div className="hidden min-w-0 text-start sm:block">
              <p className="truncate text-sm font-semibold leading-tight text-slate-900">أحمد</p>
              <p className="text-[11px] text-slate-500">مدير المالية</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
