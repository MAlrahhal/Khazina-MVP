import { AppLayout } from "@/components/layout/AppLayout";
import { PageTransition } from "@/components/shared/PageTransition";
import { SettingsForm } from "@/components/settings/SettingsForm";

export default function SettingsPage() {
  return (
    <AppLayout title="الإعدادات" subtitle="تخصيص إعدادات النظام والمؤسسة">
      <PageTransition>
        <SettingsForm />
      </PageTransition>
    </AppLayout>
  );
}
