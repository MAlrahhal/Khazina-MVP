import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-xl border border-slate-200/80 bg-white px-3.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 transition-all",
        "focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/15",
        "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
        className
      )}
      {...props}
    />
  );
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-xl border border-slate-200/80 bg-white px-3.5 text-sm text-slate-900 shadow-sm transition-all",
        "focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/15",
        "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
