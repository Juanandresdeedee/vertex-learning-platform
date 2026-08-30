import Link from "next/link";
import { notFound } from "next/navigation";

import { getLessonBySlug } from "@/lib/sanity/lessons";

type LessonPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LessonPage({
  params,
}: LessonPageProps) {
  const { slug } = await params;

  const lesson = await getLessonBySlug(slug);

  if (!lesson) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <Link
          href={`/courses/${lesson.course.slug}`}
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          ← Back to course
        </Link>

        <div className="mt-8">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            {lesson.course.title}
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950">
            {lesson.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            <span>{Math.ceil(lesson.duration / 60)} min</span>

            <span className="capitalize">
              {lesson.course.level}
            </span>

            <span>
              {lesson.studentCount.toLocaleString()} students
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}