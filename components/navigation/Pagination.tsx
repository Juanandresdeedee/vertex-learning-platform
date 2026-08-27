"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/cn";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        className="inline-flex h-9 items-center gap-1 rounded-sm px-2 text-sm text-neutral-700 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-300"
      >
        <ChevronLeftIcon className="h-4 w-4" strokeWidth={2} />
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange?.(page)}
          className={cn(
            "inline-flex h-9 min-w-9 items-center justify-center rounded-sm px-2 text-sm transition-colors",
            page === currentPage
              ? "font-semibold text-primary-500"
              : "text-neutral-700 hover:bg-neutral-100",
          )}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        className="inline-flex h-9 items-center gap-1 rounded-sm px-2 text-sm text-neutral-700 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-300"
      >
        Next
        <ChevronRightIcon className="h-4 w-4" strokeWidth={2} />
      </button>
    </nav>
  );
}
