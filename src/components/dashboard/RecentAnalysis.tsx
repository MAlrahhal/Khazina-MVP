"use client";

import { FileSearch, CheckCircle2, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { dashboardData } from "@/data";
import { formatDate } from "@/lib/format";

export function RecentAnalysis() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <CardTitle>التحليلات الأخيرة</CardTitle>
          <CardDescription>سجل التحليلات المالية المنفذة</CardDescription>
        </div>
      </CardHeader>
      <div className="space-y-2">
        {dashboardData.recentAnalysis.map((item) => (
          <div key={item.id} className="list-row">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-soft">
              <FileSearch className="h-4 w-4 text-gold-dark" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-900">{item.title}</p>
              <p className="text-xs text-slate-400">{formatDate(item.date)}</p>
            </div>
            <div className="shrink-0 text-end">
              <Badge variant={item.status === "مكتمل" ? "success" : "warning"}>
                {item.status === "مكتمل" ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    {item.status}
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.status}
                  </span>
                )}
              </Badge>
              <p className="num mt-1 text-xs text-slate-400">{item.findings} نتائج</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
