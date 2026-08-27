import type { InputHTMLAttributes, ReactNode } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/cn";

export type InputSize = "md" | "lg";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  showSearchIcon?: boolean;
  shortcutHint?: ReactNode;
  size?: InputSize;
};

const sizeStyles: Record<InputSize, { field: string; iconLeft: string; iconRight: string }> = {
  md: {
    field: "h-11 px-4 text-sm",
    iconLeft: "left-4 h-5 w-5",
    iconRight: "right-4 text-xs",
  },
  lg: {
    field: "h-14 px-5 text-base shadow-md",
    iconLeft: "left-5 h-5 w-5",
    iconRight: "right-5 text-xs",
  },
};

export function Input({
  className,
  showSearchIcon = false,
  shortcutHint,
  size = "md",
  ...props
}: InputProps) {
  const styles = sizeStyles[size];

  return (
    <div className="relative w-full">
      {showSearchIcon && (
        <MagnifyingGlassIcon
          className={cn(
            "pointer-events-none absolute top-1/2 -translate-y-1/2 text-neutral-500",
            styles.iconLeft,
          )}
          strokeWidth={2}
        />
      )}
      <input
        className={cn(
          "w-full rounded-md border border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-500",
          "focus:border-primary-400 focus:outline-none focus:ring-0",
          "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-300",
          styles.field,
          showSearchIcon && (size === "lg" ? "pl-12" : "pl-11"),
          shortcutHint != null && (size === "lg" ? "pr-20" : "pr-16"),
          className,
        )}
        {...props}
      />
      {shortcutHint && (
        <span
          className={cn(
            "pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-sm border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-neutral-500",
            styles.iconRight,
          )}
        >
          {shortcutHint}
        </span>
      )}
    </div>
  );
}
