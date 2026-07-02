import * as XLSX from "xlsx";
import { mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "../public/sample-data/financial_data.xlsx");

const headers = [
  "Category",
  "Name",
  "Department",
  "AnnualCost",
  "UsagePercent",
  "LastUsedDays",
  "Supplier",
  "MarketAverageCost",
  "ContractID",
  "Status",
];

const rows = [
  ["License", "Microsoft 365", "IT", 1200, 15, 150, "Microsoft", 1000, "C001", "Active"],
  ["License", "Adobe Acrobat", "HR", 900, 5, 180, "Adobe", 700, "C002", "Active"],
  ["Asset", "HP Laptop", "Finance", 4500, 18, 95, "Dell Store", 4200, "C003", "Active"],
  ["Subscription", "Zoom Enterprise", "IT", 2200, 12, 120, "Zoom", 1800, "C004", "Active"],
  ["Vendor", "Cloud Storage", "IT", 6500, 90, 10, "Vendor A", 5200, "C005", "Active"],
  ["Duplicate Contract", "Microsoft 365", "IT", 1200, 20, 40, "Microsoft", 1000, "C001", "Active"],
  ["License", "Slack Business", "Operations", 3400, 22, 130, "Slack", 2800, "C006", "Active"],
  ["License", "Figma Organization", "Design", 1800, 8, 200, "Figma", 1500, "C007", "Active"],
  ["License", "Jira Software", "IT", 5600, 45, 35, "Atlassian", 4800, "C008", "Active"],
  ["License", "Salesforce CRM", "Sales", 8900, 62, 5, "Salesforce", 7500, "C009", "Active"],
  ["License", "AutoCAD", "Engineering", 4200, 10, 165, "Autodesk", 3800, "C010", "Active"],
  ["License", "Tableau Desktop", "Analytics", 3100, 6, 210, "Tableau", 2600, "C011", "Active"],
  ["License", "Notion Team", "HR", 600, 35, 88, "Notion", 550, "C012", "Active"],
  ["License", "Canva Pro", "Marketing", 480, 12, 145, "Canva", 400, "C013", "Active"],
  ["License", "GitHub Enterprise", "IT", 7200, 78, 2, "GitHub", 6500, "C014", "Active"],
  ["License", "Dropbox Business", "Legal", 1100, 4, 190, "Dropbox", 900, "C015", "Active"],
  ["License", "Monday.com", "PMO", 2400, 18, 102, "Monday", 2000, "C016", "Active"],
  ["License", "HubSpot", "Marketing", 5200, 55, 20, "HubSpot", 4500, "C017", "Active"],
  ["License", "ServiceNow", "IT", 9800, 70, 8, "ServiceNow", 8500, "C018", "Active"],
  ["License", "Power BI Pro", "Finance", 1500, 9, 175, "Microsoft", 1200, "C019", "Active"],
  ["Asset", "Dell Monitor 27", "IT", 800, 12, 110, "Dell Store", 650, "C020", "Active"],
  ["Asset", "MacBook Pro", "Design", 6200, 8, 140, "Apple", 5800, "C021", "Active"],
  ["Asset", "Conference Phone", "Operations", 1800, 5, 200, "Poly", 1500, "C022", "Active"],
  ["Asset", "Projector Epson", "Training", 2200, 15, 160, "Epson", 1900, "C023", "Active"],
  ["Asset", "Standing Desk", "HR", 950, 20, 98, "IKEA Business", 800, "C024", "Active"],
  ["Asset", "Server Rack Unit", "IT", 15000, 85, 3, "HPE", 14000, "C025", "Active"],
  ["Asset", "Printer HP LaserJet", "Admin", 1200, 10, 185, "HP", 1000, "C026", "Active"],
  ["Asset", "Security Camera Set", "Facilities", 4500, 22, 45, "Hikvision", 4000, "C027", "Active"],
  ["Asset", "Tablet iPad Pro", "Sales", 1100, 7, 155, "Apple", 950, "C028", "Active"],
  ["Asset", "Network Switch", "IT", 3800, 92, 12, "Cisco", 3500, "C029", "Active"],
  ["Asset", "Office Chair Ergonomic", "HR", 650, 18, 130, "Herman Miller", 550, "C030", "Active"],
  ["Asset", "Backup NAS", "IT", 5200, 14, 115, "Synology", 4500, "C031", "Active"],
  ["Subscription", "AWS Cloud", "IT", 45000, 88, 1, "Amazon", 38000, "C032", "Active"],
  ["Subscription", "Azure Services", "IT", 32000, 75, 2, "Microsoft", 28000, "C033", "Active"],
  ["Subscription", "Google Workspace", "IT", 8400, 65, 15, "Google", 7000, "C034", "Active"],
  ["Subscription", "LinkedIn Recruiter", "HR", 12000, 30, 95, "LinkedIn", 10000, "C035", "Active"],
  ["Subscription", "DocuSign", "Legal", 3600, 40, 60, "DocuSign", 3000, "C036", "Active"],
  ["Subscription", "Mailchimp", "Marketing", 1800, 8, 170, "Mailchimp", 1400, "C037", "Active"],
  ["Subscription", "Zendesk", "Support", 5400, 55, 25, "Zendesk", 4500, "C038", "Active"],
  ["Subscription", "Datadog", "IT", 7800, 82, 5, "Datadog", 6500, "C039", "Active"],
  ["Duplicate Contract", "Zoom Enterprise", "Operations", 2200, 35, 50, "Zoom", 1800, "C004", "Active"],
  ["Duplicate Contract", "Slack Business", "Sales", 3400, 28, 55, "Slack", 2800, "C006", "Active"],
  ["Vendor", "Office Supplies Co", "Admin", 8500, 70, 20, "Office Supplies Co", 6000, "C040", "Active"],
  ["Vendor", "Cleaning Services", "Facilities", 24000, 95, 5, "CleanPro", 18000, "C041", "Active"],
  ["Vendor", "Catering Vendor", "HR", 12000, 60, 30, "FoodServe", 9000, "C042", "Active"],
  ["Vendor", "Legal Advisory", "Legal", 85000, 45, 40, "Legal Partners", 70000, "C043", "Active"],
  ["Vendor", "Consulting Firm", "Strategy", 120000, 50, 15, "ConsultCo", 95000, "C044", "Active"],
  ["Vendor", "Training Provider", "HR", 18000, 35, 80, "TrainPro", 14000, "C045", "Active"],
  ["Vendor", "Insurance Broker", "Finance", 45000, 100, 1, "InsureAll", 42000, "C046", "Active"],
  ["Vendor", "Marketing Agency", "Marketing", 65000, 55, 22, "AdAgency", 50000, "C047", "Active"],
  ["Vendor", "Security Services", "Facilities", 36000, 90, 8, "SecureGuard", 28000, "C048", "Active"],
  ["Vendor", "IT Support Outsourced", "IT", 95000, 80, 3, "TechSupport Inc", 75000, "C049", "Active"],
  ["License", "Oracle Database", "IT", 45000, 12, 195, "Oracle", 38000, "C050", "Inactive"],
  ["Asset", "Legacy Scanner", "Admin", 800, 3, 365, "Fujitsu", 600, "C051", "Inactive"],
  ["Subscription", "Legacy CRM", "Sales", 15000, 5, 300, "OldVendor", 8000, "C052", "Inactive"],
  ["Vendor", "Unused SaaS Tool", "IT", 4200, 2, 250, "SaaSCo", 2500, "C053", "Inactive"],
  ["License", "Sketch App", "Design", 900, 15, 120, "Sketch", 800, "C054", "Active"],
  ["License", "Miro Enterprise", "PMO", 2800, 48, 42, "Miro", 2400, "C055", "Active"],
  ["Asset", "VR Headset", "Training", 3200, 6, 180, "Meta", 2800, "C056", "Active"],
  ["Subscription", "Snowflake", "Analytics", 28000, 72, 10, "Snowflake", 24000, "C057", "Active"],
  ["Vendor", "Cloud Backup", "IT", 14000, 85, 6, "BackupCo", 11000, "C058", "Active"],
  ["Duplicate Contract", "Adobe Acrobat", "Finance", 900, 10, 160, "Adobe", 700, "C002", "Active"],
];

mkdirSync(dirname(outPath), { recursive: true });

const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "FinancialData");
XLSX.writeFile(workbook, outPath);

console.log(`Generated ${rows.length} rows → ${outPath}`);
