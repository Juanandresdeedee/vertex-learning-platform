import Image from "next/image";
import {
  ArrowRightIcon,
  BookmarkIcon,
  ChartBarIcon,
  ClockIcon,
  DocumentTextIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDuration } from "@/lib/format-duration";
import { formatLevel } from "@/lib/format-level";
import { formatStudentCount } from "@/lib/format-count";
import { urlFor } from "@/sanity/lib/image";
import type { CourseDetail } from "@/types/course";

type CourseHeroProps = {
  course: CourseDetail;
};

function MetaItem({
  icon: Icon,
  label,
}: {
  icon: typeof ClockIcon;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-neutral-500">
      <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
      {label}
    </span>
  );
}

export function CourseHero({ course }: CourseHeroProps) {
  const coverUrl = course.coverImage
    ? urlFor(course.coverImage).width(640).height(640).url()
    : null;

  return (
    <section className="grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
      <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-md bg-neutral-900 shadow-md lg:mx-0">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={course.title}
            width={640}
            height={640}
            className="aspect-square h-full w-full object-cover"
            priority
          />
        ) : (
          <div className="flex aspect-square items-center justify-center text-4xl font-bold text-white">
            {course.title.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {course.popular && <Badge variant="popular">Popular</Badge>}

        <h1 className="font-display text-display-1 font-bold leading-[56px] text-neutral-900">
          {course.title}
        </h1>

        <p className="max-w-2xl text-body-lg leading-6 text-neutral-500">
          {course.summary}
        </p>

        {course.instructor && (
          <p className="text-sm text-neutral-500">
            Instructor:{" "}
            <span className="font-medium text-neutral-700">
              {course.instructor.name}
            </span>
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <MetaItem icon={ChartBarIcon} label={formatLevel(course.level)} />
          <MetaItem
            icon={ClockIcon}
            label={formatDuration(course.totalDuration)}
          />
          <MetaItem
            icon={DocumentTextIcon}
            label={`${course.moduleCount} modules`}
          />
          <MetaItem
            icon={UserGroupIcon}
            label={formatStudentCount(course.studentCount)}
          />
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            variant="primary"
            showVariantIcon={false}
            trailingIcon={
              <ArrowRightIcon className="h-4 w-4 shrink-0" strokeWidth={2} />
            }
          >
            Continue Learning
          </Button>
          <Button variant="tertiary" size="md" showVariantIcon={false}>
            <BookmarkIcon className="h-4 w-4 shrink-0 text-primary-500" strokeWidth={2} />
            Bookmark
          </Button>
        </div>
      </div>
    </section>
  );
}
