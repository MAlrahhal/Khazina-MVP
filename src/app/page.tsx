import { AppLayout } from "@/components/layout/AppLayout";
import { PageTransition } from "@/components/shared/PageTransition";
import { DashboardHero, KpiCards } from "@/components/dashboard/KpiCards";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { RecentRecommendations } from "@/components/dashboard/RecentRecommendations";
import { RecentAnalysis } from "@/components/dashboard/RecentAnalysis";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function DashboardPage() {
  return (
    <AppLayout title="لوحة التحكم" subtitle="نظرة عامة على الأداء المالي والتوصيات">
      <PageTransition>
        <DashboardHero />

        <section>
          <SectionHeader title="المؤشرات الرئيسية" description="ملخص سريع لفرص التوفير والهدر المالي" />
          <div className="mt-4">
            <KpiCards />
          </div>
        </section>

        <section>
          <SectionHeader title="التحليلات المرئية" description="اتجاهات الهدر والتوفير عبر الفئات" />
          <div className="mt-4">
            <DashboardCharts />
          </div>
        </section>

        <section>
          <SectionHeader title="النشاط الأخير" description="توصيات وتحليلات تحتاج انتباهك" />
          <div className="mt-4 grid gap-5 lg:grid-cols-2">
            <RecentRecommendations />
            <RecentAnalysis />
          </div>
        </section>
      </PageTransition>
    </AppLayout>
  );
}
