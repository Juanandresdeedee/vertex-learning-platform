import type { ReactNode } from "react";
import Image from "next/image";
import {
  ChartBarIcon,
  ClockIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/cn";

export type CatalogCourseCardProps = {
  logo?: ReactNode;
  coverImageUrl?: string;
  coverImageAlt?: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  moduleCount: string;
  href?: string;
  className?: string;
};

function MetaItem({ icon: Icon, label }: { icon: typeof ClockIcon; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-small text-neutral-500">
      <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
      {label}
    </span>
  );
}

export function CatalogCourseCard({
  logo,
  coverImageUrl,
  coverImageAlt,
  title,
  description,
  level,
  duration,
  moduleCount,
  href = "#",
  className,
}: CatalogCourseCardProps) {
  return (
    <a
      href={href}
      className={cn(
        "flex flex-col rounded-md bg-white p-6 shadow-md transition-colors hover:bg-neutral-50",
        className,
      )}
    >
      <div className="mb-6 flex justify-center">
        {coverImageUrl ? (
          <div className="relative h-24 w-24 overflow-hidden rounded-md bg-neutral-100">
            <Image
              src={coverImageUrl}
              alt={coverImageAlt ?? title}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        ) : (
          logo
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <h3 className="font-display text-heading-1 font-semibold leading-[36px] text-neutral-900">
          {title}
        </h3>
        <p className="text-body leading-5 text-neutral-500">{description}</p>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-neutral-100 pt-4">
        <MetaItem icon={ChartBarIcon} label={level} />
        <MetaItem icon={ClockIcon} label={duration} />
        <MetaItem icon={DocumentTextIcon} label={moduleCount} />
      </div>
    </a>
  );
}
