"use client";

import Link from "next/link";
import { TrendingUp, TrendingDown, PiggyBank, Key, Monitor, Building2, Sparkles, Play, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { dashboardData } from "@/data";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

const iconMap = {
  savings: PiggyBank,
  license: Key,
  assets: Monitor,
  vendors: Building2,
};

const kpiDescriptions: Record<string, string> = {
  k1: "إجمالي فرص التوفير المكتشفة",
  k2: "تراخيص بدون نشاط 90 يوماً",
  k3: "أصول بمعدل استخدام منخفض",
  k4: "موردين فوق متوسط السوق",
};

export function DashboardHero() {
  const today = new Intl.DateTimeFormat("ar-SA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-black via-dark-gray to-black p-0 shadow-card">
      <div className="absolute inset-0 bg-[linear-gradient(to_left,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className="absolute -start-16 top-8 h-48 w-48 rounded-full bg-gold/15 blur-3xl" />
      <div className="absolute bottom-0 end-0 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute end-8 top-1/2 hidden -translate-y-1/2 lg:flex lg:items-center lg:justify-center">
        <div className="relative flex h-[200px] w-[200px] items-center justify-center">
          <div className="absolute inset-4 rounded-full bg-gold/25 blur-3xl" />
          <div className="absolute inset-8 rounded-full bg-gold-light/15 blur-2xl" />
          <BrandLogo size="hero" className="relative z-10" priority />
        </div>
      </div>

      <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:max-w-[68%]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-medium text-gold-light">
            <Sparkles className="h-3.5 w-3.5 text-gold-light" strokeWidth={2} />
            رؤية الذكاء الاصطناعي
          </span>
          <span className="text-xs text-slate-400">{today}</span>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">مرحباً، أحمد</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
            <span className="num font-semibold text-gold-light">٢٬٣٥٠٬٠٠٠ ر.س</span> توفيراً محتملاً —
            أبرز فرصة: <span className="text-white">31 ترخيص برمجي غير مستخدم</span> يمكن إلغاؤها فوراً.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/waste-detection" className={buttonVariants({ variant: "accent", size: "lg" })}>
            <Play className="h-4 w-4" />
            بدء التحليل
          </Link>
          <Link
            href="/waste-detection"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-gold/40 bg-white/5 text-gold-light hover:border-gold hover:bg-gold/10 hover:text-white"
            )}
          >
            <Upload className="h-4 w-4" />
            رفع إكسل
          </Link>
        </div>
      </div>
    </Card>
  );
}

export function KpiCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardData.kpis.map((kpi, i) => {
        const Icon = iconMap[kpi.icon as keyof typeof iconMap] || PiggyBank;
        const isPositive = kpi.trend === "up";
        const isFeatured = kpi.id === "k1";
        const desc = kpi.description ?? kpiDescriptions[kpi.id];

        return (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
          >
            <Card
              hover
              className={cn(
                "group relative overflow-hidden",
                isFeatured && "border-gold-light/40 bg-gradient-to-b from-gold-soft/60 to-white"
              )}
            >
              {isFeatured && <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-l from-gold-light to-gold" />}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-slate-500">{kpi.title}</p>
                  <p className="num mt-2 text-2xl font-bold leading-none tracking-tight text-black">
                    {kpi.id === "k1" ? `${kpi.value} ر.س` : kpi.value}
                  </p>
                  {desc && <p className="mt-2 text-xs leading-relaxed text-slate-400">{desc}</p>}
                  <div className="mt-3 flex items-center gap-1.5">
                    <span
                      className={cn(
                        "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-semibold",
                        isPositive ? "bg-emerald-50 text-emerald-700" : "bg-gold-soft text-gold-dark"
                      )}
                    >
                      {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      <span className="num">{formatNumber(kpi.change)}%</span>
                    </span>
                    <span className="text-[11px] text-slate-400">شهرياً</span>
                  </div>
                </div>
                <div
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105",
                    isFeatured ? "bg-gold-soft shadow-sm" : "bg-gold-soft/70 group-hover:bg-gold-soft"
                  )}
                >
                  <Icon className={cn("h-5 w-5", isFeatured ? "text-gold-dark" : "text-gold")} strokeWidth={2} />
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
