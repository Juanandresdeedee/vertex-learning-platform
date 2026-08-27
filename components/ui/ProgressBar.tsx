import { cn } from "@/lib/cn";

export type ProgressBarProps = {
  value: number;
  label?: string;
  className?: string;
};

export function ProgressBar({ value, label, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("flex w-full items-center gap-3", className)}>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full bg-primary-500 transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {label && (
        <span className="shrink-0 text-sm text-neutral-500">{label}</span>
      )}
    </div>
  );
}
