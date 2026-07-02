"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageTransition } from "@/components/shared/PageTransition";
import { UploadArea, WasteDetectionHints } from "@/components/waste-detection/UploadArea";
import { ResultSummary } from "@/components/waste-detection/ResultSummary";
import { RecommendationCards } from "@/components/waste-detection/RecommendationCards";
import { WasteCharts } from "@/components/waste-detection/WasteCharts";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useAnalysis } from "@/hooks/useAnalysis";

export default function WasteDetectionPage() {
  const {
    isAnalyzing,
    hasResults,
    results,
    uploadedFile,
    analysisStep,
    analysisError,
    analyze,
    reset,
  } = useAnalysis();

  return (
    <AppLayout title="اكتشاف الهدر المالي" subtitle="تحليل البيانات المالية واكتشاف فرص التوفير">
      <PageTransition className="space-y-6">
        <UploadArea
          onAnalyze={analyze}
          isAnalyzing={isAnalyzing}
          uploadedFile={uploadedFile}
          hasResults={hasResults}
          analysisStep={analysisStep}
          analysisError={analysisError}
          onReset={reset}
        />

        {!hasResults && !isAnalyzing && (
          <div>
            <SectionHeader
              title="ماذا سيكتشف التحليل؟"
              description="أنواع الهدر المالي التي يبحث عنها النظام"
            />
            <div className="mt-3">
              <WasteDetectionHints />
            </div>
          </div>
        )}

        {hasResults && results && (
          <>
            <ResultSummary results={results} />
            <WasteCharts results={results} />
            <RecommendationCards recommendations={results.recommendations} />
          </>
        )}
      </PageTransition>
    </AppLayout>
  );
}
