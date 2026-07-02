"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Sparkles, Check, X, ShieldAlert, Target, Gauge } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SeverityBadge, StatusBadge } from "@/components/ui/Badge";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Recommendation } from "@/types";
import { cn } from "@/lib/utils";

const severityAccent: Record<string, string> = {
  عالي: "border-s-gold",
  متوسط: "border-s-gold-light",
  منخفض: "border-s-slate-300",
};

interface RecommendationCardProps {
  rec: Recommendation;
  index?: number;
}

export function RecommendationCard({ rec, index = 0 }: RecommendationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Card
        hover
        className={cn("flex h-full flex-col border-s-[3px]", severityAccent[rec.severity] || "border-s-slate-200")}
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-black px-2 py-0.5 text-[10px] font-semibold text-gold-light">
            <Sparkles className="h-3 w-3" />
            توصية ذكية
          </span>
          <StatusBadge status={rec.status} />
        </div>

        <h4 className="mb-2 text-sm font-semibold leading-snug text-slate-900">{rec.title}</h4>
        <p className="mb-4 flex-1 text-[13px] leading-relaxed text-slate-500">{rec.description}</p>

        <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="الأولوية" value={<SeverityBadge severity={rec.severity} />} />
          <Metric
            label="التوفير"
            value={<span className="num text-sm font-bold text-emerald-600">{formatCurrency(rec.potentialSavings)}</span>}
          />
          <Metric
            label="المخاطر"
            icon={ShieldAlert}
            value={<span className="text-sm font-semibold text-slate-700">{rec.estimatedRisk ?? "—"}</span>}
          />
          <Metric
            label="الثقة"
            icon={Gauge}
            value={<span className="num text-sm font-bold text-black">{rec.confidenceScore ?? "—"}%</span>}
          />
        </div>

        {rec.suggestedAction && (
          <div className="mb-3 flex items-start gap-2 rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2.5">
            <Target className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
            <div>
              <p className="text-[10px] font-semibold text-slate-400">الإجراء المقترح</p>
              <p className="text-xs leading-relaxed text-slate-700">{rec.suggestedAction}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-400">
          <span>{rec.category}</span>
          <span>{formatDate(rec.date)}</span>
        </div>

        <div className="mt-3 flex gap-2">
          <Button variant="default" size="sm" className="flex-1">
            <Check className="h-4 w-4" />
            اعتماد
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <X className="h-4 w-4" />
            رفض
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

function Metric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: ReactNode;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  return (
    <div className="rounded-lg border border-slate-100 bg-white px-2.5 py-2">
      <p className="mb-1 flex items-center gap-1 text-[10px] font-medium text-slate-400">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </p>
      <div>{value}</div>
    </div>
  );
}
