import { cn } from "@/lib/utils";
import { FileSearch } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  className?: string;
}

export function EmptyState({ title, description, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center px-6 py-16 text-center", className)}>
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 shadow-sm">
        <FileSearch className="h-6 w-6 text-slate-400" strokeWidth={1.75} />
      </div>
      <p className="text-sm font-semibold text-slate-700">{title}</p>
      {description && <p className="mt-1.5 max-w-xs text-[13px] leading-relaxed text-slate-500">{description}</p>}
    </div>
  );
}
