import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { CatalogCourseCard } from "@/components/cards/CatalogCourseCard";
import { formatDuration } from "@/lib/format-duration";
import { formatLevel } from "@/lib/format-level";
import { urlFor } from "@/sanity/lib/image";
import type { CourseCardData } from "@/types/course";

type CoursesSectionProps = {
  courses: CourseCardData[];
};

export function CoursesSection({ courses }: CoursesSectionProps) {
  return (
    <section className="px-6 pb-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-display-2 font-bold leading-[44px] text-neutral-900">
            All Courses
          </h2>
          <Link
            href="/courses"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary-500 transition-colors hover:text-primary-400"
          >
            View all courses
            <ArrowRightIcon className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const coverImageUrl = course.coverImage
              ? urlFor(course.coverImage).width(192).height(192).url()
              : undefined;

            return (
              <CatalogCourseCard
                key={course.slug}
                coverImageUrl={coverImageUrl}
                coverImageAlt={course.title}
                title={course.title}
                description={course.summary}
                level={formatLevel(course.level)}
                duration={formatDuration(course.totalDuration)}
                moduleCount={`${course.moduleCount} modules`}
                href={`/courses/${course.slug}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
