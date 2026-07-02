import { cn } from "@/lib/utils";

const variants = {
  default: "bg-slate-100 text-slate-700",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-700",
  accent: "bg-gold-soft text-gold-dark",
  navy: "bg-black text-white",
  outline: "border border-slate-200 bg-white text-slate-600",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export function ComingSoonBadge({ className }: { className?: string }) {
  return (
    <Badge variant="accent" className={cn("px-2 py-px text-[10px] font-semibold leading-tight", className)}>
      قريباً
    </Badge>
  );
}

export function SeverityBadge({ severity }: { severity: string }) {
  const map: Record<string, keyof typeof variants> = {
    عالي: "danger",
    متوسط: "warning",
    منخفض: "success",
  };
  return <Badge variant={map[severity] || "default"}>{severity}</Badge>;
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, keyof typeof variants> = {
    جديد: "accent",
    "قيد المراجعة": "warning",
    "مُعتمد": "success",
    "مُنفّذ": "navy",
    مكتمل: "success",
  };
  return <Badge variant={map[status] || "default"}>{status}</Badge>;
}
