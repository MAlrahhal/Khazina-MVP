"use client";

import { ArrowLeft, Lightbulb } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { SeverityBadge, StatusBadge } from "@/components/ui/Badge";
import { recommendationsData } from "@/data";
import { formatCurrency, formatDate } from "@/lib/format";

export function RecentRecommendations() {
  const items = recommendationsData.slice(0, 4);

  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <CardTitle>أحدث التوصيات</CardTitle>
          <CardDescription>توصيات تحتاج مراجعة فورية</CardDescription>
        </div>
        <Link
          href="/waste-detection"
          className="flex shrink-0 items-center gap-1 text-xs font-medium text-gold-dark transition-colors hover:text-gold"
        >
          عرض الكل
          <ArrowLeft className="h-3.5 w-3.5" />
        </Link>
      </CardHeader>
      <div className="space-y-2">
        {items.map((rec, i) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="list-row items-start"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-soft">
              <Lightbulb className="h-4 w-4 text-gold" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm font-semibold text-slate-900">{rec.title}</h4>
                <SeverityBadge severity={rec.severity} />
              </div>
              <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{rec.description}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="num font-semibold text-emerald-600">{formatCurrency(rec.potentialSavings)}</span>
                <StatusBadge status={rec.status} />
                <span className="text-slate-400">{formatDate(rec.date)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
