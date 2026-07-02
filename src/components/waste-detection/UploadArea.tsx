"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileSpreadsheet,
  FileText,
  CheckCircle2,
  RotateCcw,
  Key,
  Building2,
  FileX,
  AlertCircle,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AnalysisLoader } from "./AnalysisLoader";
import { cn } from "@/lib/utils";

interface UploadAreaProps {
  onAnalyze: (file: File) => void;
  isAnalyzing: boolean;
  uploadedFile: string | null;
  hasResults: boolean;
  analysisStep: number;
  analysisError: string | null;
  onReset: () => void;
}

export function UploadArea({
  onAnalyze,
  isAnalyzing,
  uploadedFile,
  hasResults,
  analysisStep,
  analysisError,
  onReset,
}: UploadAreaProps) {
  const [dragOver, setDragOver] = useState(false);
  const [fileType, setFileType] = useState<"excel" | "csv">("excel");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    const isExcel = file.name.endsWith(".xlsx") || file.name.endsWith(".xls");
    if (!isExcel) return;
    setFileType("excel");
    setSelectedFile(file);
  }, []);

  const startAnalysis = useCallback(() => {
    if (selectedFile) onAnalyze(selectedFile);
  }, [onAnalyze, selectedFile]);

  const openFilePicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <Card padding="none" className="overflow-hidden">
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AnalysisLoader fileName={uploadedFile} currentStep={analysisStep} />
          </motion.div>
        ) : hasResults && uploadedFile ? (
          <motion.div
            key="done"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-100 bg-gradient-to-l from-emerald-50/60 to-white px-5 py-4 sm:px-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">اكتمل التحليل بنجاح</p>
                <p className="text-xs text-slate-500">{uploadedFile}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onReset}>
              <RotateCcw className="h-4 w-4" />
              تحليل جديد
            </Button>
          </motion.div>
        ) : (
          <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-4 sm:px-6">
              <h3 className="text-base font-semibold text-slate-900">رفع ملف</h3>
              <p className="mt-0.5 text-[13px] text-slate-500">حمّل بياناتك المالية لبدء اكتشاف الهدر</p>
            </div>

            <div className="p-5 sm:p-6">
              {analysisError && (
                <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {analysisError}
                </div>
              )}

              <div
                role="button"
                tabIndex={0}
                onClick={openFilePicker}
                onKeyDown={(e) => e.key === "Enter" && openFilePicker()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFile(file);
                }}
                className={cn(
                  "relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed px-4 py-12 transition-all duration-300 sm:px-6 sm:py-14",
                  dragOver
                    ? "border-gold bg-gold-soft/50 shadow-[inset_0_0_0_1px_rgb(184_137_45/0.2)]"
                    : "border-slate-200 bg-slate-50/30 hover:border-slate-300 hover:bg-slate-50/60"
                )}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-black shadow-md">
                  <Upload className="h-6 w-6 text-gold-light" strokeWidth={2} />
                </div>
                <p className="text-base font-semibold text-slate-900">اسحب الملف هنا</p>
                <p className="mt-1 text-sm text-slate-500">أو اختر نوع الملف أدناه</p>

                {selectedFile && (
                  <p className="mt-3 rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-black shadow-sm">
                    {selectedFile.name}
                  </p>
                )}

                <div className="mt-7 grid w-full max-w-md gap-3 sm:grid-cols-2">
                  {(
                    [
                      { type: "excel" as const, icon: FileSpreadsheet, title: "ملف إكسل", desc: "جداول النفقات والتراخيص" },
                      { type: "csv" as const, icon: FileText, title: "جدول بيانات", desc: "بيانات الموردين والعقود" },
                    ] as const
                  ).map(({ type, icon: Icon, title, desc }) => (
                    <button
                      key={type}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFileType(type);
                        if (type === "excel") openFilePicker();
                      }}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-xl border bg-white p-4 text-start shadow-sm transition-all hover:-translate-y-px hover:shadow-md active:scale-[0.98]",
                        fileType === type
                          ? "border-black ring-2 ring-gold/20"
                          : "border-slate-200 hover:border-slate-300"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                          fileType === type ? "bg-black" : "bg-gold-soft"
                        )}
                      >
                        <Icon
                          className={cn("h-4 w-4", fileType === type ? "text-gold-light" : "text-gold-dark")}
                          strokeWidth={2}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{title}</p>
                        <p className="text-[11px] text-slate-400">{desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button variant="accent" size="lg" onClick={startAnalysis} disabled={!selectedFile || fileType !== "excel"}>
                  بدء التحليل
                </Button>
                <a
                  href="/sample-data/financial_data.xlsx"
                  download
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-gold-dark"
                >
                  <Download className="h-4 w-4" />
                  تحميل ملف نموذجي
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

const hintIcons = { Key, Building2, FileX };

export function WasteDetectionHints() {
  const hints = [
    { title: "تراخيص غير مستخدمة", desc: "اكتشاف الاشتراكات بدون نشاط", icon: "Key" as const },
    { title: "موردين مرتفعي التكلفة", desc: "مقارنة الأسعار مع السوق", icon: "Building2" as const },
    { title: "عقود غير نشطة", desc: "رصد العقود منتهية الصلاحية", icon: "FileX" as const },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {hints.map((hint) => {
        const Icon = hintIcons[hint.icon];
        return (
          <div
            key={hint.title}
            className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white px-4 py-3.5 shadow-sm"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100">
              <Icon className="h-4 w-4 text-gold-dark" strokeWidth={2} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">{hint.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{hint.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
