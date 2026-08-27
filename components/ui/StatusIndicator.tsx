import {
  CheckIcon,
  LockClosedIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { cn } from "@/lib/cn";

export type StatusVariant =
  | "in-progress"
  | "completed"
  | "now-playing"
  | "locked";

export type StatusIndicatorProps = {
  variant: StatusVariant;
  label: string;
  className?: string;
};

export function StatusIndicator({
  variant,
  label,
  className,
}: StatusIndicatorProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-sm text-neutral-700",
        className,
      )}
    >
      {variant === "in-progress" && (
        <span className="inline-flex h-5 w-5 items-center justify-center">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
        </span>
      )}
      {variant === "completed" && (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-success-500">
          <CheckIcon className="h-3 w-3 text-white" />
        </span>
      )}
      {variant === "now-playing" && (
        <PlayIcon className="h-5 w-5 text-primary-500" />
      )}
      {variant === "locked" && (
        <LockClosedIcon className="h-5 w-5 text-neutral-500" />
      )}
      {label}
    </span>
  );
}
