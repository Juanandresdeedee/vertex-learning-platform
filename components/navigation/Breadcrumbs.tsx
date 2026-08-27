import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/cn";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex flex-wrap items-center gap-1", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={item.label} className="inline-flex items-center gap-1">
            {index > 0 && (
              <ChevronRightIcon
                className="h-3 w-3 text-neutral-500"
                strokeWidth={2}
              />
            )}
            {item.href && !isLast ? (
              <a
                href={item.href}
                className="text-small text-neutral-500 hover:text-neutral-700"
              >
                {item.label}
              </a>
            ) : (
              <span
                className={cn(
                  "text-small",
                  isLast ? "text-neutral-900" : "text-neutral-500",
                )}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
