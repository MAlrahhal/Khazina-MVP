import * as XLSX from "xlsx";
import type { FinancialRow } from "@/types/financial";

const COLUMN_MAP: Record<string, keyof FinancialRow> = {
  category: "category",
  name: "name",
  department: "department",
  annualcost: "annualCost",
  usagepercent: "usagePercent",
  lastuseddays: "lastUsedDays",
  supplier: "supplier",
  marketaveragecost: "marketAverageCost",
  contractid: "contractId",
  status: "status",
};

function normalizeKey(key: string): string {
  return key.replace(/\s+/g, "").toLowerCase();
}

function toNumber(value: unknown): number {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/,/g, "").trim());
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

function toString(value: unknown): string {
  if (value == null) return "";
  return String(value).trim();
}

function mapRawRow(raw: Record<string, unknown>): FinancialRow | null {
  const mapped: Partial<FinancialRow> = {};

  for (const [key, value] of Object.entries(raw)) {
    const field = COLUMN_MAP[normalizeKey(key)];
    if (!field) continue;

    if (
      field === "annualCost" ||
      field === "usagePercent" ||
      field === "lastUsedDays" ||
      field === "marketAverageCost"
    ) {
      mapped[field] = toNumber(value);
    } else {
      mapped[field] = toString(value);
    }
  }

  if (!mapped.name && !mapped.category) return null;

  return {
    category: mapped.category ?? "",
    name: mapped.name ?? "",
    department: mapped.department ?? "",
    annualCost: mapped.annualCost ?? 0,
    usagePercent: mapped.usagePercent ?? 0,
    lastUsedDays: mapped.lastUsedDays ?? 0,
    supplier: mapped.supplier ?? "",
    marketAverageCost: mapped.marketAverageCost ?? 0,
    contractId: mapped.contractId ?? "",
    status: mapped.status ?? "",
  };
}

export function parseExcelBuffer(buffer: ArrayBuffer): FinancialRow[] {
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) return [];

  const sheet = workbook.Sheets[sheetName];
  const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: "",
  });

  return rawRows.map(mapRawRow).filter((row): row is FinancialRow => row !== null);
}

export async function parseExcelFile(file: File): Promise<FinancialRow[]> {
  const buffer = await file.arrayBuffer();
  return parseExcelBuffer(buffer);
}
