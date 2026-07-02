"use client";

import { motion } from "framer-motion";
import { AlertTriangle, LineChart, Clock, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { ComingSoonBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ComingSoonProps {
  title: string;
  description: string;
  icon?: "crisis" | "simulation";
  timeline?: string;
}

const icons = { crisis: AlertTriangle, simulation: LineChart };

export function ComingSoon({ title, description, icon = "crisis", timeline = "الربع الثاني ٢٠٢٦" }: ComingSoonProps) {
  const Icon = icons[icon];

  return (
    <div className="flex min-h-[48vh] items-center justify-center py-8">
      <Card className="w-full max-w-md text-center" padding="lg">
        <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
          <div className="relative mx-auto mb-6 w-fit">
            <div className="absolute -inset-4 rounded-full bg-gold/10 blur-2xl" />
            <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-black to-dark-gray shadow-card">
              <Icon className="h-11 w-11 text-gold-light" strokeWidth={1.5} />
            </div>
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 -end-2 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-100 bg-white shadow-sm"
            >
              <Clock className="h-4 w-4 text-slate-400" strokeWidth={2} />
            </motion.div>
          </div>

          <ComingSoonBadge className="mb-3" />
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600">
            <Calendar className="h-3 w-3" />
            متوقع: {timeline}
          </span>
          <h1 className="mb-2 text-xl font-bold text-slate-900">{title}</h1>
          <p className="mx-auto mb-6 max-w-xs text-[13px] leading-relaxed text-slate-500">{description}</p>

          <Link href="/waste-detection" className={cn(buttonVariants({ variant: "outline" }))}>
            <ArrowLeft className="h-4 w-4" />
            العودة لاكتشاف الهدر
          </Link>
        </motion.div>
      </Card>
    </div>
  );
}
