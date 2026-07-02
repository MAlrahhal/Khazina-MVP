"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, FileSpreadsheet, FileText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/Badge";
import { reportsData } from "@/data";
import { formatCurrency, formatDate } from "@/lib/format";

export function ReportsTable() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("الكل");

  const types = useMemo(() => ["الكل", ...new Set(reportsData.map((r) => r.type))], []);

  const filtered = useMemo(() => {
    return reportsData.filter((r) => {
      const matchSearch = r.title.includes(search) || r.author.includes(search);
      const matchType = typeFilter === "الكل" || r.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [search, typeFilter]);

  const totalSavings = reportsData.reduce((s, r) => s + r.savings, 0);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "إجمالي التقارير", value: String(reportsData.length), icon: FileText },
          { label: "التوفير المُبلّغ", value: formatCurrency(totalSavings), icon: Download },
          { label: "قيد المراجعة", value: String(reportsData.filter((r) => r.status === "قيد المراجعة").length), icon: Search },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card hover className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-soft">
                  <Icon className="h-5 w-5 text-gold-dark" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                  <p className="num truncate text-base font-bold text-black sm:text-lg">{stat.value}</p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/40 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="بحث في التقارير..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ps-10"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
            <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="w-full sm:w-auto sm:min-w-[140px]">
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
              تحميل
            </Button>
            <Button variant="outline" size="sm">
              <FileSpreadsheet className="h-4 w-4" />
              تصدير
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                {["العنوان", "النوع", "التاريخ", "التوفير", "الحالة", "المُعد"].map((h) => (
                  <th key={h} className="px-4 py-3 text-start text-[11px] font-semibold text-slate-400 sm:px-5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((report, i) => (
                <motion.tr
                  key={report.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.025 }}
                  className="border-b border-slate-50 transition-colors last:border-0 hover:bg-slate-50/70"
                >
                  <td className="px-4 py-3.5 text-sm font-medium text-slate-900 sm:px-5">{report.title}</td>
                  <td className="px-4 py-3.5 sm:px-5">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">{report.type}</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-sm text-slate-500 sm:px-5">{formatDate(report.date)}</td>
                  <td className="num whitespace-nowrap px-4 py-3.5 text-sm font-semibold text-emerald-600 sm:px-5">{formatCurrency(report.savings)}</td>
                  <td className="px-4 py-3.5 sm:px-5"><StatusBadge status={report.status} /></td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-sm text-slate-500 sm:px-5">{report.author}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <EmptyState
            title="لا توجد تقارير مطابقة"
            description="جرّب تغيير كلمات البحث أو الفلتر"
          />
        )}
      </Card>
    </div>
  );
}
