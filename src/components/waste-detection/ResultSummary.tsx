"use client";

import { motion } from "framer-motion";
import { PiggyBank, Key, Monitor, Building2, Copy, FileX } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/format";
import type { AnalysisResult } from "@/types";

const stats = [
  { key: "inactiveLicenses", label: "تراخيص غير نشطة", icon: Key },
  { key: "unusedAssets", label: "أصول غير مستغلة", icon: Monitor },
  { key: "overpricedVendors", label: "موردين مرتفعي التكلفة", icon: Building2 },
  { key: "duplicateSubscriptions", label: "اشتراكات مكررة", icon: Copy },
  { key: "unusedContracts", label: "عقود غير مستخدمة", icon: FileX },
] as const;

interface ResultSummaryProps {
  results: AnalysisResult;
}

export function ResultSummary({ results }: ResultSummaryProps) {
  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="relative overflow-hidden border-emerald-200/40 bg-gradient-to-br from-emerald-50/60 via-white to-white">
          <div className="absolute -end-8 -top-8 h-28 w-28 rounded-full bg-emerald-100/50" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-soft shadow-sm">
                <PiggyBank className="h-6 w-6 text-gold-dark" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">التوفير السنوي المحتمل</p>
                <p className="num text-2xl font-bold tracking-tight text-black sm:text-3xl">
                  {formatCurrency(results.totalSavings)}
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white px-5 py-3 text-center shadow-sm">
              <p className="text-xs text-slate-500">نسبة من الإنفاق السنوي</p>
              <p className="num text-xl font-bold text-emerald-600">
                {formatPercent(results.savingsPercent)}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          const value = results[stat.key];
          return (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i + 1) * 0.05 }}
            >
              <Card hover className="h-full">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gold-soft">
                  <Icon className="h-4 w-4 text-gold-dark" />
                </div>
                <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                <p className="num mt-1 text-xl font-bold text-black">{formatNumber(value)}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
