"use client";

import { motion } from "framer-motion";
import { Loader2, ScanSearch, Sparkles, Package, Building2, FileText, CheckCircle2 } from "lucide-react";
import { ANALYSIS_STEPS } from "@/hooks/useAnalysis";
import { cn } from "@/lib/utils";

const stepIcons = [ScanSearch, Sparkles, ScanSearch, Package, Building2, FileText, CheckCircle2];

interface AnalysisLoaderProps {
  fileName?: string | null;
  currentStep: number;
}

export function AnalysisLoader({ fileName, currentStep }: AnalysisLoaderProps) {
  const progress = Math.min(100, ((currentStep + 1) / ANALYSIS_STEPS.length) * 100);

  return (
    <div
      className="flex flex-col items-center justify-center px-6 py-14 sm:py-16"
      role="status"
      aria-live="polite"
      aria-label="جاري تحليل البيانات"
    >
      <div className="relative mb-7">
        <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl bg-black shadow-card">
          <Loader2 className="h-8 w-8 animate-spin text-gold-light" strokeWidth={2} />
        </div>
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -inset-2 rounded-3xl border border-gold-light/40"
        />
      </div>

      <h3 className="text-lg font-semibold text-slate-900">جاري تحليل البيانات</h3>
      {fileName && (
        <p className="mt-2 max-w-sm text-center text-sm text-slate-500">
          يتم فحص <span className="font-medium text-slate-700">{fileName}</span>
        </p>
      )}

      <div className="mt-8 w-full max-w-sm space-y-2">
        {ANALYSIS_STEPS.map((label, i) => {
          const Icon = stepIcons[i] ?? ScanSearch;
          const isDone = i < currentStep;
          const isActive = i === currentStep;

          return (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-4 py-3 shadow-sm transition-colors",
                isActive ? "border-gold-light/40 bg-gold-soft/60" : "border-slate-100 bg-white",
                isDone && "opacity-70"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  isActive ? "bg-gold-soft" : "bg-slate-50"
                )}
              >
                <Icon
                  className={cn("h-4 w-4", isActive ? "text-gold-dark" : "text-black")}
                  strokeWidth={2}
                />
              </div>
              <span
                className={cn(
                  "flex-1 text-sm font-medium",
                  isActive ? "text-black" : "text-slate-700"
                )}
              >
                {label}
              </span>
              {isDone && <CheckCircle2 className="h-4 w-4 text-emerald-500" strokeWidth={2} />}
              {isActive && (
                <motion.div
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.85, 1.1, 0.85] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="h-1.5 w-1.5 rounded-full bg-gold"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-7 h-1 w-48 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-l from-gold-dark via-gold to-gold-light"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
}
