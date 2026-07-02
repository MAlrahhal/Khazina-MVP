export type Severity = "عالي" | "متوسط" | "منخفض";
export type Status = "جديد" | "قيد المراجعة" | "مُعتمد" | "مُنفّذ";
export type Category =
  | "تراخيص"
  | "موردين"
  | "أصول"
  | "عقود"
  | "اشتراكات";

export interface KpiMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: string;
  description?: string;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: Category;
  severity: Severity;
  potentialSavings: number;
  status: Status;
  date: string;
  estimatedRisk?: string;
  confidenceScore?: number;
  suggestedAction?: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  annualSpend: number;
  priceDiffPercent?: number;
  benchmarkVendor?: string;
}

export interface License {
  id: string;
  software: string;
  department: string;
  seats: number;
  usedSeats: number;
  annualCost: number;
  status: "نشط" | "غير مستخدم" | "مكرر";
}

export interface Asset {
  id: string;
  name: string;
  type: string;
  department: string;
  utilizationRate: number;
  annualCost: number;
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  month: string;
}

export interface Report {
  id: string;
  title: string;
  type: string;
  date: string;
  status: Status;
  savings: number;
  author: string;
}

export interface AnalysisResult {
  totalSavings: number;
  inactiveLicenses: number;
  unusedAssets: number;
  overpricedVendors: number;
  duplicateSubscriptions: number;
  unusedContracts: number;
  savingsPercent: number;
  rowCount: number;
  recommendations: Recommendation[];
  chartData: {
    wasteByCategory: { name: string; value: number }[];
    licenseUsage: { name: string; used: number; unused: number }[];
    vendorSpend: { name: string; spend: number; isOverpriced: boolean }[];
  };
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}
