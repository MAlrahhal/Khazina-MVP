export interface FinancialRow {
  category: string;
  name: string;
  department: string;
  annualCost: number;
  usagePercent: number;
  lastUsedDays: number;
  supplier: string;
  marketAverageCost: number;
  contractId: string;
  status: string;
}

export type IssueType =
  | "unused_license"
  | "unused_asset"
  | "high_cost_vendor"
  | "duplicate_subscription";

export interface DetectedIssue {
  type: IssueType;
  row: FinancialRow;
  rowIndex: number;
  ruleLabel: string;
}

export interface RuleEngineResult {
  unusedLicenses: number;
  unusedAssets: number;
  highCostVendors: number;
  duplicateContracts: number;
  unusedContracts: number;
  estimatedAnnualSavings: number;
  issues: DetectedIssue[];
  rows: FinancialRow[];
  totalAnnualSpend: number;
}

export interface WasteChartData {
  wasteByCategory: { name: string; value: number }[];
  licenseUsage: { name: string; used: number; unused: number }[];
  vendorSpend: { name: string; spend: number; isOverpriced: boolean }[];
}
