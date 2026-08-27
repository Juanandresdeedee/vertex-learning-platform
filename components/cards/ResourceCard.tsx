import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/cn";

export type ResourceCardProps = {
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  href?: string;
  className?: string;
};

export function ResourceCard({
  title,
  description,
  fileType,
  fileSize,
  href = "#",
  className,
}: ResourceCardProps) {
  return (
    <a
      href={href}
      className={cn(
        "flex items-start gap-4 rounded-md bg-white p-6 shadow-md transition-colors hover:bg-neutral-50",
        className,
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-neutral-100">
        <DocumentTextIcon className="h-5 w-5 text-neutral-700" strokeWidth={2} />
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="text-heading-3 font-medium leading-[26px] text-neutral-900">
          {title}
        </h3>
        <p className="text-body text-neutral-500">{description}</p>
        <p className="text-small text-neutral-500">
          {fileType} · {fileSize}
        </p>
      </div>
    </a>
  );
}
