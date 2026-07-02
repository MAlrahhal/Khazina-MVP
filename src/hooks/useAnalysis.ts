"use client";

import { useState, useCallback } from "react";
import { parseExcelFile } from "@/lib/excelParser";
import { runRuleEngine } from "@/lib/ruleEngine";
import { generateReport } from "@/lib/reportGenerator";
import type { AnalysisResult } from "@/types";

export const ANALYSIS_STEPS = [
  "قراءة الملف...",
  "تنظيف البيانات...",
  "تحليل التراخيص...",
  "تحليل الأصول...",
  "تحليل الموردين...",
  "إنشاء التقرير...",
  "تم.",
] as const;

const STEP_DELAY_MS = 450;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const analyze = useCallback(async (file: File) => {
    setIsAnalyzing(true);
    setHasResults(false);
    setResults(null);
    setAnalysisError(null);
    setUploadedFile(file.name);
    setAnalysisStep(0);

    try {
      await delay(STEP_DELAY_MS);
      setAnalysisStep(1);

      const rows = await parseExcelFile(file);
      if (rows.length === 0) {
        throw new Error("لم يتم العثور على بيانات صالحة في الملف.");
      }

      await delay(STEP_DELAY_MS);
      setAnalysisStep(2);
      await delay(STEP_DELAY_MS);
      setAnalysisStep(3);
      await delay(STEP_DELAY_MS);
      setAnalysisStep(4);

      const engineResult = runRuleEngine(rows);

      await delay(STEP_DELAY_MS);
      setAnalysisStep(5);

      const report = generateReport(engineResult);

      await delay(STEP_DELAY_MS);
      setAnalysisStep(6);

      setResults(report);
      setHasResults(true);
    } catch (error) {
      setAnalysisError(error instanceof Error ? error.message : "حدث خطأ أثناء تحليل الملف.");
      setUploadedFile(null);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setHasResults(false);
    setResults(null);
    setUploadedFile(null);
    setAnalysisStep(0);
    setAnalysisError(null);
  }, []);

  return {
    isAnalyzing,
    hasResults,
    results,
    uploadedFile,
    analysisStep,
    analysisError,
    analyze,
    reset,
  };
}
