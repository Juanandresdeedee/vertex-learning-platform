import { notFound } from "next/navigation";

import { LessonNavigation } from "@/components/lesson/LessonNavigation";
import { LessonSidebar } from "@/components/lesson/LessonSidebar";
import { LessonTabs } from "@/components/lesson/LessonTabs";
import { LessonVideoPlayer } from "@/components/lesson/LessonVideoPlayer";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { formatDuration } from "@/lib/format-duration";
import { getLessonBySlug } from "@/lib/sanity/lessons";
import { urlFor } from "@/sanity/lib/image";

type LessonPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    t?: string;
  }>;
};

export default async function LessonPage({
  params,
  searchParams,
}: LessonPageProps) {
  const { slug } = await params;
  const { t } = await searchParams;

  const lesson = await getLessonBySlug(slug);

  if (!lesson) {
    notFound();
  }

  const currentModuleIndex = lesson.course.modules.findIndex((module) =>
    module.lessons.some((item) => item.slug === lesson.slug),
  );

  const currentModule =
    currentModuleIndex >= 0
      ? lesson.course.modules[currentModuleIndex]
      : undefined;

  const currentLessonIndex =
    currentModule?.lessons.findIndex(
      (item) => item.slug === lesson.slug,
    ) ?? -1;

  const lessonNumber =
    currentModuleIndex >= 0 && currentLessonIndex >= 0
      ? `${currentModuleIndex + 1}.${currentLessonIndex + 1}`
      : "—";

  const curriculum = lesson.course.modules.flatMap((module) =>
    module.lessons.map((courseLesson) => ({
      ...courseLesson,
      moduleTitle: module.title,
    })),
  );

  const currentCurriculumIndex = curriculum.findIndex(
    (item) => item.slug === lesson.slug,
  );

  const previousLesson =
    currentCurriculumIndex > 0
      ? curriculum[currentCurriculumIndex - 1]
      : undefined;

  const nextLesson =
    currentCurriculumIndex >= 0 &&
    currentCurriculumIndex < curriculum.length - 1
      ? curriculum[currentCurriculumIndex + 1]
      : undefined;

  const startSeconds = Math.max(
    0,
    Number.parseInt(t ?? "0", 10) || 0,
  );

  const posterUrl = lesson.thumbnail
    ? urlFor(lesson.thumbnail)
        .width(1280)
        .height(720)
        .url()
    : undefined;

  const courseCoverUrl = lesson.course.coverImage
    ? urlFor(lesson.course.coverImage)
        .width(160)
        .height(160)
        .url()
    : undefined;

  return (
    <main className="min-h-screen bg-white">
      <div className="flex min-h-[calc(100vh-64px)] flex-col lg:flex-row">
        <LessonSidebar
          courseTitle={lesson.course.title}
          courseSlug={lesson.course.slug}
          courseCoverUrl={courseCoverUrl}
          modules={lesson.course.modules}
          currentModuleIndex={currentModuleIndex}
          currentLessonSlug={lesson.slug}
        />

        <div className="min-w-0 flex-1">
          <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
            <Breadcrumbs
              items={[
                {
                  label: "All Courses",
                  href: "/courses",
                },
                {
                  label: lesson.course.title,
                  href: `/courses/${lesson.course.slug}`,
                },
                {
                  label: currentModule?.title ?? "Lesson",
                },
                {
                  label: lesson.title,
                },
              ]}
            />

            <div className="mt-8">
              <Badge variant="lesson">
                LESSON {lessonNumber}
              </Badge>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-950">
                {lesson.title}
              </h1>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-600">
                <span>{formatDuration(lesson.duration)}</span>

                <span className="capitalize">
                  {lesson.course.level}
                </span>

                <span>
                  {lesson.studentCount.toLocaleString()} students
                </span>
              </div>
            </div>

            <div className="mt-8">
              <LessonVideoPlayer
                videoUrl={lesson.videoUrl}
                posterUrl={posterUrl}
                title={lesson.title}
                startSeconds={startSeconds}
              />
            </div>

            <LessonTabs
              notes={lesson.notes}
              keyPoints={lesson.keyPoints}
              proTip={lesson.proTip}
              resources={lesson.resources}
            />

            <LessonNavigation
              previousLesson={previousLesson}
              nextLesson={nextLesson}
            />
          </div>
        </div>
      </div>
    </main>
  );
}