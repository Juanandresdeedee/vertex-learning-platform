import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { CatalogCourseCard } from "@/components/cards/CatalogCourseCard";
import { homepageCourses } from "@/lib/homepage-data";

export function CoursesSection() {
  return (
    <section className="px-6 pb-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-display-2 font-bold leading-[44px] text-neutral-900">
            All Courses
          </h2>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary-500 transition-colors hover:text-primary-400"
          >
            View all courses
            <ArrowRightIcon className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {homepageCourses.map((course) => (
            <CatalogCourseCard
              key={course.id}
              logo={course.logo}
              title={course.title}
              description={course.description}
              level={course.level}
              duration={course.duration}
              moduleCount={course.moduleCount}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
