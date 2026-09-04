import "server-only";

import { LESSON_BY_SLUG_QUERY } from "@/sanity/queries/courses";
import { getServerClient } from "@/sanity/lib/serverClient";
import type {
  LessonCourseModule,
  LessonDetail,
  LessonParentCourse,
  LessonResource,
} from "@/types/lesson";

type RawLessonCourseLesson = {
  _id: string;
  title: string;
  slug: string;
  duration?: number;
  freePreview?: boolean;
};

type RawLessonCourseModule = {
  title: string;
  summary?: string;
  lessons?: RawLessonCourseLesson[];
};

type RawLessonParentCourse = {
  _id: string;
  title: string;
  slug: string;
  coverImage?: LessonParentCourse["coverImage"];
  level: string;
  modules?: RawLessonCourseModule[];
};

type RawLessonDetail = {
  _id: string;
  title: string;
  slug: string;
  videoUrl?: string;
  thumbnail?: LessonDetail["thumbnail"];
  duration?: number;
  freePreview?: boolean;
  studentCount?: number;
  notes?: LessonDetail["notes"];
  keyPoints?: string[];
  proTip?: string;
  resources?: LessonResource[];
  course?: RawLessonParentCourse;
};

function normalizeModules(
  modules: RawLessonCourseModule[] = [],
): LessonCourseModule[] {
  return modules.map((module) => {
    const lessons = (module.lessons ?? []).map((lesson) => ({
      _id: lesson._id,
      title: lesson.title,
      slug: lesson.slug,
      duration: lesson.duration ?? 0,
      freePreview: lesson.freePreview,
    }));

    return {
      title: module.title,
      summary: module.summary,
      lessons,
      duration: lessons.reduce(
        (total, lesson) => total + lesson.duration,
        0,
      ),
    };
  });
}

export async function getLessonBySlug(
  slug: string,
): Promise<LessonDetail | null> {
  const client = getServerClient();

  const lesson = await client.fetch<RawLessonDetail | null>(
    LESSON_BY_SLUG_QUERY,
    { slug },
  );

  if (!lesson || !lesson.course) {
    return null;
  }

  const modules = normalizeModules(lesson.course.modules);

  return {
    _id: lesson._id,
    title: lesson.title,
    slug: lesson.slug,
    videoUrl: lesson.videoUrl,
    thumbnail: lesson.thumbnail,
    duration: lesson.duration ?? 0,
    freePreview: lesson.freePreview,
    studentCount: lesson.studentCount ?? 0,
    notes: lesson.notes ?? [],
    keyPoints: lesson.keyPoints ?? [],
    proTip: lesson.proTip,
    resources: lesson.resources ?? [],

    course: {
      _id: lesson.course._id,
      title: lesson.course.title,
      slug: lesson.course.slug,
      coverImage: lesson.course.coverImage,
      level: lesson.course.level,
      modules,
      totalDuration: modules.reduce(
        (total, module) => total + module.duration,
        0,
      ),
    },
  };
}