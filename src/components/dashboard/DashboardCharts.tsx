"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { getMonthlyTrend } from "@/data";
import { formatCurrency } from "@/lib/format";
import { formatChartAxis, chartTickStyle, CHART_COLORS } from "@/lib/chart-utils";

const trendData = getMonthlyTrend();
const categoryData = [
  { name: "تراخيص", value: 949000 },
  { name: "موردين", value: 678000 },
  { name: "أصول", value: 238000 },
  { name: "عقود", value: 89000 },
  { name: "اشتراكات", value: 156000 },
];

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white px-3.5 py-2.5 shadow-card">
      <p className="mb-1.5 text-sm font-semibold text-slate-900">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-xs text-slate-600">
          {entry.name === "waste" ? "الهدر" : "التوفير"}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
}

export function DashboardCharts() {
  return (
    <div className="grid gap-5 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader className="mb-4">
          <div>
            <CardTitle>اتجاه الهدر والتوفير</CardTitle>
            <CardDescription>مقارنة شهرية للنفقات غير الضرورية والتوفير المحقق</CardDescription>
          </div>
        </CardHeader>
        <div className="h-[300px] sm:h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="wasteGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS.gold} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={CHART_COLORS.gold} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS.black} stopOpacity={0.14} />
                  <stop offset="100%" stopColor={CHART_COLORS.black} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="name" tick={chartTickStyle} axisLine={false} tickLine={false} dy={6} />
              <YAxis tick={chartTickStyle} axisLine={false} tickLine={false} tickFormatter={formatChartAxis} width={36} />
              <Tooltip content={<ChartTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                iconSize={8}
                formatter={(v) => (v === "waste" ? "الهدر" : "التوفير")}
                wrapperStyle={{ fontSize: 12, paddingBottom: 10, color: "#64748B" }}
              />
              <Area type="monotone" dataKey="waste" stroke={CHART_COLORS.gold} fill="url(#wasteGrad)" strokeWidth={2.5} name="waste" dot={false} activeDot={{ r: 5, fill: CHART_COLORS.gold, strokeWidth: 0 }} />
              <Area type="monotone" dataKey="savings" stroke={CHART_COLORS.black} fill="url(#savingsGrad)" strokeWidth={2.5} name="savings" dot={false} activeDot={{ r: 5, fill: CHART_COLORS.black, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader className="mb-4">
          <div>
            <CardTitle>الهدر حسب الفئة</CardTitle>
            <CardDescription>توزيع فرص التوفير</CardDescription>
          </div>
        </CardHeader>
        <div className="h-[300px] sm:h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
              <XAxis type="number" tick={chartTickStyle} axisLine={false} tickLine={false} tickFormatter={formatChartAxis} />
              <YAxis type="category" dataKey="name" tick={{ ...chartTickStyle, fill: "#64748B" }} axisLine={false} tickLine={false} width={72} />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12, fontFamily: "inherit" }} />
              <Bar dataKey="value" fill={CHART_COLORS.goldDark} radius={[0, 8, 8, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
