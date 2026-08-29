import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseHero } from "@/components/course/CourseHero";
import { CourseModulesSection } from "@/components/course/CourseModulesSection";
import { CourseProgressFooter } from "@/components/course/CourseProgressFooter";
import { LearningOutcomesGrid } from "@/components/course/LearningOutcomesGrid";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Navbar } from "@/components/navigation/Navbar";
import { getCourseBySlug } from "@/lib/sanity/courses";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return { title: "Course not found" };
  }

  return {
    title: `${course.title} — Vertex`,
    description: course.summary,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="page-texture flex min-h-full flex-col">
      <Navbar layout="homepage" showActions />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8 md:px-10">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "All Courses", href: "/" },
            { label: course.title },
          ]}
        />

        <div className="flex flex-col gap-12 pb-24">
          <CourseHero course={course} />
          <LearningOutcomesGrid outcomes={course.learningOutcomes} />
          <CourseModulesSection
            modules={course.modules}
            totalDuration={course.totalDuration}
          />
        </div>
      </main>

      <CourseProgressFooter />
    </div>
  );
}
