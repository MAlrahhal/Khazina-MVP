import type { AnalysisResult, Category, Recommendation, Severity } from "@/types";
import type { DetectedIssue, RuleEngineResult, WasteChartData } from "@/types/financial";

const CATEGORY_LABELS: Record<string, Category> = {
  License: "تراخيص",
  license: "تراخيص",
  Asset: "أصول",
  asset: "أصول",
  Vendor: "موردين",
  vendor: "موردين",
  Subscription: "اشتراكات",
  subscription: "اشتراكات",
  "Duplicate Contract": "عقود",
};

function mapCategory(raw: string): Category {
  return CATEGORY_LABELS[raw] ?? CATEGORY_LABELS[raw.toLowerCase()] ?? "عقود";
}

function severityForIssue(type: DetectedIssue["type"], cost: number): Severity {
  if (type === "duplicate_subscription" || cost >= 5000) return "عالي";
  if (cost >= 1500) return "متوسط";
  return "منخفض";
}

function groupIssuesByType(issues: DetectedIssue[]) {
  return {
    unused_license: issues.filter((i) => i.type === "unused_license"),
    unused_asset: issues.filter((i) => i.type === "unused_asset"),
    high_cost_vendor: issues.filter((i) => i.type === "high_cost_vendor"),
    duplicate_subscription: issues.filter((i) => i.type === "duplicate_subscription"),
  };
}

function savingsForIssues(issueList: DetectedIssue[]): number {
  const indices = new Set(issueList.map((i) => i.rowIndex));
  return [...indices].reduce((sum, index) => {
    const issue = issueList.find((i) => i.rowIndex === index);
    return sum + (issue?.row.annualCost ?? 0) * 0.5;
  }, 0);
}

function buildRecommendations(issues: DetectedIssue[]): Recommendation[] {
  const grouped = groupIssuesByType(issues);
  const today = new Date().toISOString().slice(0, 10);
  const recommendations: Recommendation[] = [];
  let id = 1;

  if (grouped.unused_license.length > 0) {
    const names = [...new Set(grouped.unused_license.map((i) => i.row.name))].slice(0, 3);
    const savings = savingsForIssues(grouped.unused_license);
    recommendations.push({
      id: String(id++),
      title: "إلغاء أو تجميد التراخيص غير المستخدمة",
      description: `تم رصد ${grouped.unused_license.length} ترخيصاً بدون استخدام لأكثر من 90 يوماً، منها: ${names.join("، ")}.`,
      category: "تراخيص",
      severity: severityForIssue("unused_license", savings),
      potentialSavings: savings,
      status: "جديد",
      date: today,
      suggestedAction: "إيقاف التراخيص غير النشطة وإعادة توزيع المقاعد على الأقسام ذات الطلب.",
      estimatedRisk: "منخفض",
      confidenceScore: 92,
    });
  }

  if (grouped.unused_asset.length > 0) {
    const names = [...new Set(grouped.unused_asset.map((i) => i.row.name))].slice(0, 3);
    const savings = savingsForIssues(grouped.unused_asset);
    recommendations.push({
      id: String(id++),
      title: "إعادة توزيع الأصول قليلة الاستخدام",
      description: `تم رصد ${grouped.unused_asset.length} أصلاً بمعدل استخدام أقل من 25%، منها: ${names.join("، ")}.`,
      category: "أصول",
      severity: severityForIssue("unused_asset", savings),
      potentialSavings: savings,
      status: "جديد",
      date: today,
      suggestedAction: "إعادة تخصيص الأصول للأقسام الأكثر احتياجاً أو تصفية غير المستخدم.",
      estimatedRisk: "متوسط",
      confidenceScore: 88,
    });
  }

  if (grouped.high_cost_vendor.length > 0) {
    const names = [...new Set(grouped.high_cost_vendor.map((i) => i.row.supplier || i.row.name))].slice(0, 3);
    const savings = savingsForIssues(grouped.high_cost_vendor);
    recommendations.push({
      id: String(id++),
      title: "مراجعة الموردين مرتفعي التكلفة",
      description: `تم رصد ${grouped.high_cost_vendor.length} بنداً يتجاوز متوسط السوق بنسبة 20% أو أكثر، منها: ${names.join("، ")}.`,
      category: "موردين",
      severity: severityForIssue("high_cost_vendor", savings),
      potentialSavings: savings,
      status: "جديد",
      date: today,
      suggestedAction: "إعادة التفاوض مع الموردين أو طلب عروض أسعار بديلة.",
      estimatedRisk: "متوسط",
      confidenceScore: 90,
    });
  }

  if (grouped.duplicate_subscription.length > 0) {
    const contractIds = [...new Set(grouped.duplicate_subscription.map((i) => i.row.contractId))].slice(0, 3);
    const savings = savingsForIssues(grouped.duplicate_subscription);
    recommendations.push({
      id: String(id++),
      title: "دمج الاشتراكات والعقود المكررة",
      description: `تم رصد ${grouped.duplicate_subscription.length} سجلّاً مرتبطاً بعقود مكررة (${contractIds.join("، ")}).`,
      category: "اشتراكات",
      severity: "عالي",
      potentialSavings: savings,
      status: "جديد",
      date: today,
      suggestedAction: "دمج العقود المكررة وإلغاء الاشتراكات الزائدة.",
      estimatedRisk: "مرتفع",
      confidenceScore: 95,
    });
  }

  return recommendations.sort((a, b) => b.potentialSavings - a.potentialSavings);
}

export function buildChartData(result: RuleEngineResult): WasteChartData {
  const categoryTotals = new Map<string, number>();

  for (const issue of result.issues) {
    const label = mapCategory(issue.row.category);
    categoryTotals.set(label, (categoryTotals.get(label) ?? 0) + issue.row.annualCost * 0.5);
  }

  const wasteByCategory = [...categoryTotals.entries()].map(([name, value]) => ({ name, value }));

  const licenseRows = result.rows.filter((r) => r.category.toLowerCase().includes("license"));
  const licenseUsage = licenseRows.slice(0, 8).map((row) => ({
    name: row.name.length > 12 ? `${row.name.slice(0, 12)}…` : row.name,
    used: Math.round((row.usagePercent / 100) * 100),
    unused: Math.round(((100 - row.usagePercent) / 100) * 100),
  }));

  const vendorRows = result.rows.filter(
    (r) =>
      r.category.toLowerCase().includes("vendor") ||
      r.category.toLowerCase().includes("subscription") ||
      r.supplier
  );
  const vendorSpend = vendorRows.slice(0, 10).map((row) => ({
    name: (row.supplier || row.name).length > 14 ? `${(row.supplier || row.name).slice(0, 14)}…` : row.supplier || row.name,
    spend: row.annualCost,
    isOverpriced: row.marketAverageCost > 0 && row.annualCost > row.marketAverageCost * 1.2,
  }));

  return { wasteByCategory, licenseUsage, vendorSpend };
}

export function generateReport(engineResult: RuleEngineResult): AnalysisResult {
  const chartData = buildChartData(engineResult);
  const savingsPercent =
    engineResult.totalAnnualSpend > 0
      ? (engineResult.estimatedAnnualSavings / engineResult.totalAnnualSpend) * 100
      : 0;

  return {
    totalSavings: engineResult.estimatedAnnualSavings,
    inactiveLicenses: engineResult.unusedLicenses,
    unusedAssets: engineResult.unusedAssets,
    overpricedVendors: engineResult.highCostVendors,
    duplicateSubscriptions: engineResult.duplicateContracts,
    unusedContracts: engineResult.unusedContracts,
    savingsPercent,
    recommendations: buildRecommendations(engineResult.issues),
    chartData,
    rowCount: engineResult.rows.length,
  };
}
