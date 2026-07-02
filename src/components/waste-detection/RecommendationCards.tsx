"use client";

import { Download, FileSpreadsheet } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { RecommendationCard } from "@/components/shared/RecommendationCard";
import { enrichRecommendation } from "@/data";
import type { Recommendation } from "@/types";

interface RecommendationCardsProps {
  recommendations: Recommendation[];
  showDownload?: boolean;
}

export function RecommendationCards({ recommendations, showDownload = true }: RecommendationCardsProps) {
  const enriched = recommendations.map(enrichRecommendation);

  return (
    <div>
      <SectionHeader
        title="التوصيات"
        description="توصيات مدعومة بالذكاء الاصطناعي — جميع القرارات تحت إشراف بشري"
        action={
          showDownload ? (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" />
                تحميل التقرير
              </Button>
              <Button variant="outline" size="sm">
                <FileSpreadsheet className="h-4 w-4" />
                تصدير
              </Button>
            </div>
          ) : undefined
        }
      />

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {enriched.map((rec, i) => (
          <RecommendationCard key={rec.id} rec={rec} index={i} />
        ))}
      </div>
    </div>
  );
}
