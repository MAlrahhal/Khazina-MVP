import { AppLayout } from "@/components/layout/AppLayout";
import { PageTransition } from "@/components/shared/PageTransition";
import { ComingSoon } from "@/components/shared/ComingSoon";

export default function CrisisManagementPage() {
  return (
    <AppLayout title="إدارة الأزمات">
      <PageTransition>
        <ComingSoon
          title="إدارة الأزمات"
          description="اكتشف المخاطر المالية مبكراً وتعامل مع الأزمات بخطط استباقية مدعومة بالذكاء الاصطناعي. هذه الوحدة قيد التطوير."
          icon="crisis"
        />
      </PageTransition>
    </AppLayout>
  );
}
