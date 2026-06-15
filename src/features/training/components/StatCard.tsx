import { cn } from "@/shared/utils/cn";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  variant: "correct" | "wrong" | "neutral";
}

const styles = {
  correct: "border-emerald-500/30 text-emerald-400",
  wrong: "border-red-500/30 text-red-400",
  neutral: "border-slate-700/50 text-sky-400",
};

export function StatCard({ label, icon, value, variant }: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-slate-800/60 rounded-xl border px-4 py-3 flex flex-col gap-1.5",
        styles[variant],
      )}
    >
      <span
        className={cn(
          "flex items-center gap-1.5 text-[10px] uppercase tracking-widest",
          styles[variant],
        )}
      >
        {icon}
        {label}
      </span>
      <span className={cn("text-2xl font-bold tabular-nums", styles[variant])}>
        {value}
      </span>
    </div>
  );
}
