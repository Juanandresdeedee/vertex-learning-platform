import type { InputHTMLAttributes, ReactNode } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  showSearchIcon?: boolean;
  shortcutHint?: ReactNode;
};

export function Input({
  className,
  showSearchIcon = false,
  shortcutHint,
  ...props
}: InputProps) {
  return (
    <div className="relative w-full">
      {showSearchIcon && (
        <MagnifyingGlassIcon
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500"
          strokeWidth={2}
        />
      )}
      <input
        className={cn(
          "h-11 w-full rounded-md border border-neutral-200 bg-white px-4 text-sm text-neutral-900 placeholder:text-neutral-500",
          "focus:border-primary-400 focus:outline-none focus:ring-0",
          "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-300",
          showSearchIcon && "pl-11",
          shortcutHint != null && "pr-16",
          className,
        )}
        {...props}
      />
      {shortcutHint && (
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rounded-sm border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-xs text-neutral-500">
          {shortcutHint}
        </span>
      )}
    </div>
  );
}
