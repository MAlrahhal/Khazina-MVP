import type { DetectedIssue, FinancialRow, RuleEngineResult } from "@/types/financial";

function isInactiveStatus(status: string): boolean {
  const normalized = status.trim().toLowerCase();
  return normalized !== "active" && normalized !== "نشط" && normalized !== "";
}

export function runRuleEngine(rows: FinancialRow[]): RuleEngineResult {
  const issues: DetectedIssue[] = [];

  rows.forEach((row, rowIndex) => {
    if (row.lastUsedDays > 90) {
      issues.push({
        type: "unused_license",
        row,
        rowIndex,
        ruleLabel: "LastUsedDays > 90",
      });
    }

    if (row.usagePercent < 25) {
      issues.push({
        type: "unused_asset",
        row,
        rowIndex,
        ruleLabel: "UsagePercent < 25",
      });
    }

    if (row.marketAverageCost > 0 && row.annualCost > row.marketAverageCost * 1.2) {
      issues.push({
        type: "high_cost_vendor",
        row,
        rowIndex,
        ruleLabel: "AnnualCost > MarketAverageCost × 1.2",
      });
    }
  });

  const contractCounts = new Map<string, number>();
  rows.forEach((row) => {
    const id = row.contractId.trim();
    if (!id) return;
    contractCounts.set(id, (contractCounts.get(id) ?? 0) + 1);
  });

  rows.forEach((row, rowIndex) => {
    const id = row.contractId.trim();
    if (!id) return;
    if ((contractCounts.get(id) ?? 0) > 1) {
      issues.push({
        type: "duplicate_subscription",
        row,
        rowIndex,
        ruleLabel: "ContractID duplicated",
      });
    }
  });

  const unusedLicenses = issues.filter((i) => i.type === "unused_license").length;
  const unusedAssets = issues.filter((i) => i.type === "unused_asset").length;
  const highCostVendors = issues.filter((i) => i.type === "high_cost_vendor").length;
  const duplicateContracts = issues.filter((i) => i.type === "duplicate_subscription").length;

  const detectedRowIndices = new Set(issues.map((i) => i.rowIndex));
  const estimatedAnnualSavings = [...detectedRowIndices].reduce(
    (sum, index) => sum + rows[index].annualCost * 0.5,
    0
  );

  const unusedContracts = rows.filter((row, index) => {
    if (!isInactiveStatus(row.status)) return false;
    return !issues.some((issue) => issue.rowIndex === index);
  }).length;

  const totalAnnualSpend = rows.reduce((sum, row) => sum + row.annualCost, 0);

  return {
    unusedLicenses,
    unusedAssets,
    highCostVendors,
    duplicateContracts,
    unusedContracts,
    estimatedAnnualSavings,
    issues,
    rows,
    totalAnnualSpend,
  };
}
