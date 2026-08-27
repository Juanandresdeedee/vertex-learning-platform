import { cn } from "@/lib/cn";

export type CourseCardProps = {
  courseIcon?: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  moduleCount: string;
  className?: string;
};

export function CourseCard({
  courseIcon = "N",
  title,
  description,
  level,
  duration,
  moduleCount,
  className,
}: CourseCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-md bg-white p-6 shadow-md",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-neutral-900 text-lg font-semibold text-white">
        {courseIcon}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-heading-1 font-semibold leading-[36px] text-neutral-900">
          {title}
        </h3>
        <p className="text-body leading-5 text-neutral-500">{description}</p>
      </div>
      <p className="text-small text-neutral-500">
        {level} · {duration} · {moduleCount}
      </p>
    </article>
  );
}
