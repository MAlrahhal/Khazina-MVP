"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatCurrency } from "@/lib/format";
import { formatChartAxis, chartTickStyle, CHART_COLORS } from "@/lib/chart-utils";
import type { AnalysisResult } from "@/types";

const COLORS = [
  CHART_COLORS.black,
  CHART_COLORS.gold,
  CHART_COLORS.gray,
  CHART_COLORS.grayLight,
  CHART_COLORS.goldLight,
];

interface WasteChartsProps {
  results: AnalysisResult;
}

export function WasteCharts({ results }: WasteChartsProps) {
  const { wasteByCategory, licenseUsage, vendorSpend } = results.chartData;
  const totalWaste = wasteByCategory.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-5">
      <SectionHeader title="تحليل مرئي" description="رؤى تفصيلية عن مصادر الهدر المالي" />

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>توزيع الهدر حسب الفئة</CardTitle>
              <CardDescription>نسبة كل فئة من إجمالي فرص التوفير</CardDescription>
            </div>
          </CardHeader>
          <div className="relative h-[280px] sm:h-[300px]">
            {wasteByCategory.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={wasteByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={68}
                      outerRadius={100}
                      paddingAngle={4}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {wasteByCategory.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v) => formatCurrency(Number(v))}
                      contentStyle={{ borderRadius: 12, fontSize: 12 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-[11px] text-slate-400">الإجمالي</p>
                  <p className="num text-lg font-bold text-black">{formatCurrency(totalWaste)}</p>
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-400">
                لا توجد بيانات للعرض
              </div>
            )}
          </div>
          {wasteByCategory.length > 0 && (
            <div className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-2">
              {wasteByCategory.map((item, i) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs text-slate-600">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>استخدام التراخيص</CardTitle>
              <CardDescription>مقارنة المقاعد المستخدمة وغير المستخدمة</CardDescription>
            </div>
          </CardHeader>
          <div className="h-[280px] sm:h-[300px]">
            {licenseUsage.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={licenseUsage} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="name" tick={chartTickStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={chartTickStyle} axisLine={false} tickLine={false} width={28} />
                  <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                    formatter={(v) => (v === "used" ? "مستخدم" : "غير مستخدم")}
                  />
                  <Bar dataKey="used" stackId="a" fill={CHART_COLORS.black} name="used" barSize={28} />
                  <Bar dataKey="unused" stackId="a" fill={CHART_COLORS.gold} name="unused" radius={[4, 4, 0, 0]} barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-400">
                لا توجد تراخيص في الملف
              </div>
            )}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>مقارنة تكلفة الموردين</CardTitle>
              <CardDescription>الإنفاق السنوي لكل مورد — الموردون المظللون يتجاوزون متوسط السوق</CardDescription>
            </div>
          </CardHeader>
          <div className="h-[260px] sm:h-[280px]">
            {vendorSpend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={vendorSpend.map((v) => ({
                    name: v.name,
                    spend: v.spend,
                    fill: v.isOverpriced ? CHART_COLORS.gold : CHART_COLORS.black,
                  }))}
                  margin={{ top: 4, right: 4, left: -12, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="name" tick={{ ...chartTickStyle, fill: "#64748B" }} axisLine={false} tickLine={false} />
                  <YAxis tick={chartTickStyle} axisLine={false} tickLine={false} tickFormatter={formatChartAxis} width={36} />
                  <Tooltip formatter={(v) => formatCurrency(Number(v))} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                  <Bar dataKey="spend" radius={[6, 6, 0, 0]} barSize={36} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-400">
                لا توجد بيانات موردين في الملف
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
