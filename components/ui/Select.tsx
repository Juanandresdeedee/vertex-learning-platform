import type { SelectHTMLAttributes } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/cn";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <div className="relative w-full">
      <select
        className={cn(
          "h-11 w-full appearance-none rounded-md border border-neutral-200 bg-white px-4 pr-10 text-sm text-neutral-900",
          "focus:border-primary-400 focus:outline-none focus:ring-0",
          "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-300",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDownIcon
        className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500"
        strokeWidth={2}
      />
    </div>
  );
}
