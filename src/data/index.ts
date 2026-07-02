import vendors from "./mock/vendors.json";
import licenses from "./mock/licenses.json";
import assets from "./mock/assets.json";
import expenses from "./mock/expenses.json";
import recommendations from "./mock/recommendations.json";
import dashboard from "./mock/dashboard.json";
import reports from "./mock/reports.json";
import type {
  Vendor,
  License,
  Asset,
  Expense,
  Recommendation,
  Report,
  KpiMetric,
} from "@/types";

export const vendorsData = vendors as Vendor[];
export const licensesData = licenses as License[];
export const assetsData = assets as Asset[];
export const expensesData = expenses as Expense[];
export const recommendationsData = recommendations as Recommendation[];
export const dashboardData = dashboard as {
  kpis: KpiMetric[];
  recentAnalysis: {
    id: string;
    title: string;
    date: string;
    status: string;
    findings: number;
  }[];
};
export const reportsData = reports as Report[];

const riskBySeverity: Record<string, string> = { عالي: "مرتفع", متوسط: "متوسط", منخفض: "منخفض" };
const confidenceBySeverity: Record<string, number> = { عالي: 94, متوسط: 87, منخفض: 79 };
const actionByCategory: Record<string, string> = {
  تراخيص: "مراجعة التراخيص وإلغاء غير المستخدم",
  موردين: "إعادة التفاوض أو طلب عروض بديلة",
  أصول: "إعادة توزيع أو تصفية الأصول",
  عقود: "إنهاء العقود غير النشطة",
  اشتراكات: "دمج الاشتراكات المكررة",
};

export function enrichRecommendation(rec: Recommendation): Recommendation {
  return {
    ...rec,
    estimatedRisk: rec.estimatedRisk ?? riskBySeverity[rec.severity] ?? "متوسط",
    confidenceScore: rec.confidenceScore ?? confidenceBySeverity[rec.severity] ?? 85,
    suggestedAction: rec.suggestedAction ?? actionByCategory[rec.category] ?? "مراجعة مع فريق المالية",
  };
}

export function getWasteByCategory() {
  return [
    { name: "تراخيص", value: 949000 },
    { name: "موردين", value: 678000 },
    { name: "أصول", value: 238000 },
    { name: "عقود", value: 89000 },
    { name: "اشتراكات", value: 156000 },
  ];
}

export function getMonthlyTrend() {
  return [
    { name: "يناير", waste: 420000, savings: 180000 },
    { name: "فبراير", waste: 385000, savings: 210000 },
    { name: "مارس", waste: 410000, savings: 245000 },
    { name: "أبريل", waste: 395000, savings: 260000 },
    { name: "مايو", waste: 370000, savings: 280000 },
    { name: "يونيو", waste: 350000, savings: 310000 },
  ];
}
