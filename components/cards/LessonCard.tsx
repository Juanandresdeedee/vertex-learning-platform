import { PlayCircleIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export type LessonCardVariant = "video" | "lesson";

export type LessonCardProps = {
  variant: LessonCardVariant;
  title: string;
  description: string;
  lessonLabel: string;
  keyPoints?: string[];
  ctaText?: string;
  ctaHref?: string;
  className?: string;
};

export function LessonCard({
  variant,
  title,
  description,
  lessonLabel,
  keyPoints,
  ctaText,
  ctaHref = "#",
  className,
}: LessonCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-md bg-white p-6 shadow-md sm:flex-row sm:items-start",
        className,
      )}
    >
      {variant === "video" && (
        <div className="h-24 w-full shrink-0 rounded-sm bg-neutral-100 sm:h-28 sm:w-40" />
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={variant === "video" ? "video" : "lesson"}>
            {variant === "video" ? "Video" : "Lesson"}
          </Badge>
          <span className="text-small text-neutral-500">{lessonLabel}</span>
        </div>

        <h3 className="text-heading-2 font-semibold leading-[30px] text-neutral-900">
          {title}
        </h3>

        {variant === "lesson" && keyPoints && keyPoints.length > 0 && (
          <ul className="list-inside list-disc text-body text-neutral-700">
            {keyPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        )}

        <p className="text-body text-neutral-500">{description}</p>

        {variant === "video" && ctaText && (
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-500 hover:text-primary-400"
          >
            <PlayCircleIcon className="h-4 w-4" strokeWidth={2} />
            {ctaText}
          </a>
        )}
      </div>
    </article>
  );
}
