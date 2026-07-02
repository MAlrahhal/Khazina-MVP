import { AppLayout } from "@/components/layout/AppLayout";
import { PageTransition } from "@/components/shared/PageTransition";
import { ComingSoon } from "@/components/shared/ComingSoon";

export default function SimulationPage() {
  return (
    <AppLayout title="المحاكاة والتنبؤ">
      <PageTransition>
        <ComingSoon
          title="المحاكاة والتنبؤ"
          description="قم بمحاكاة سيناريوهات مالية مختلفة وتوقع النتائج المستقبلية بناءً على البيانات التاريخية. هذه الوحدة قيد التطوير."
          icon="simulation"
        />
      </PageTransition>
    </AppLayout>
  );
}
