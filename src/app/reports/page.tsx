import { AppLayout } from "@/components/layout/AppLayout";
import { PageTransition } from "@/components/shared/PageTransition";
import { ReportsTable } from "@/components/reports/ReportsTable";

export default function ReportsPage() {
  return (
    <AppLayout title="التقارير" subtitle="عرض وإدارة تقارير التحليل المالي">
      <PageTransition>
        <ReportsTable />
      </PageTransition>
    </AppLayout>
  );
}
