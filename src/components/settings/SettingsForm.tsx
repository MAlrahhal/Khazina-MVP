"use client";

import { Building2, Globe, Bell, Shield, Database, Palette, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const sections = [
  { icon: Building2, title: "معلومات المؤسسة", desc: "اسم الشركة وبيانات الاتصال", value: "شركة الخزينة للتقنية" },
  { icon: Globe, title: "اللغة والمنطقة", desc: "اللغة الافتراضية والعملة", value: "العربية — المملكة العربية السعودية", currency: true },
  { icon: Bell, title: "الإشعارات", desc: "تفضيلات التنبيهات والتقارير", value: "تقارير أسبوعية" },
  { icon: Shield, title: "الأمان والخصوصية", desc: "إعدادات النشر المحلي وساما", value: "النشر المحلي — مفعّل" },
  { icon: Database, title: "مصادر البيانات", desc: "ربط أنظمة المحاسبة والموارد", value: "غير مرتبط" },
  { icon: Palette, title: "المظهر", desc: "تخصيص واجهة النظام", value: "الوضع الفاتح" },
];

export function SettingsForm() {
  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-slate-50/80 px-4 py-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
        <p className="text-sm text-slate-500">
          هذه الصفحة للعرض فقط في النسخة التجريبية. الإعدادات غير قابلة للتعديل حالياً.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title} hover>
              <CardHeader className="mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-soft">
                    <Icon className="h-5 w-5 text-gold-dark" />
                  </div>
                  <div>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.desc}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <div className="space-y-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-500">القيمة الحالية</label>
                  <Input defaultValue={section.value} disabled />
                </div>
                {section.currency && (
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-500">العملة</label>
                    <Select disabled defaultValue="SAR">
                      <option value="SAR">ريال سعودي</option>
                    </Select>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline">إلغاء</Button>
        <Button variant="default" disabled>حفظ التغييرات</Button>
      </div>
    </div>
  );
}
