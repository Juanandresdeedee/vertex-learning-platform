import "server-only";

import type { CourseCardData, CourseDetail, CourseInstructor, CourseModule } from "@/types/course";
import {
  COURSE_BY_SLUG_QUERY,
  COURSES_FOR_HOMEPAGE_QUERY,
  COURSE_SLUGS_QUERY,
} from "@/sanity/queries/courses";
import { getServerClient } from "@/sanity/lib/serverClient";
import { HOMEPAGE_COURSE_SLUGS } from "@/types/course";

type RawLesson = {
  duration?: number;
};

type RawModule = {
  title: string;
  summary?: string;
  lessons?: Array<{
    title: string;
    slug: string;
    duration?: number;
  }>;
};

type RawCourseCard = {
  title: string;
  slug: string;
  summary: string;
  coverImage?: CourseCardData["coverImage"];
  level: string;
  modules?: Array<{ lessons?: RawLesson[] }>;
};

type RawCourseDetail = RawCourseCard & {
  _id: string;
  popular?: boolean;
  studentCount: number;
  instructor?: CourseInstructor;
  learningOutcomes?: Array<{
    icon?: string;
    title: string;
    description: string;
  }>;
  modules?: RawModule[];
};

function sumLessonDurations(lessons: RawLesson[] = []): number {
  return lessons.reduce((total, lesson) => total + (lesson.duration ?? 0), 0);
}

function normalizeModules(modules: RawModule[] = []): CourseModule[] {
  return modules.map((module) => {
    const lessons = (module.lessons ?? []).map((lesson) => ({
      title: lesson.title,
      slug: lesson.slug,
      duration: lesson.duration ?? 0,
    }));

    return {
      title: module.title,
      summary: module.summary,
      lessons,
      duration: sumLessonDurations(lessons),
    };
  });
}

function toCourseCard(course: RawCourseCard): CourseCardData {
  const modules = normalizeModules(course.modules as RawModule[]);
  const totalDuration = modules.reduce((total, module) => total + module.duration, 0);

  return {
    title: course.title,
    slug: course.slug,
    summary: course.summary,
    coverImage: course.coverImage,
    level: course.level,
    moduleCount: modules.length,
    totalDuration,
  };
}

function toCourseDetail(course: RawCourseDetail): CourseDetail {
  const modules = normalizeModules(course.modules);
  const totalDuration = modules.reduce((total, module) => total + module.duration, 0);

  return {
    _id: course._id,
    title: course.title,
    slug: course.slug,
    summary: course.summary,
    coverImage: course.coverImage,
    level: course.level,
    popular: course.popular,
    studentCount: course.studentCount,
    instructor: course.instructor,
    learningOutcomes: course.learningOutcomes ?? [],
    modules,
    moduleCount: modules.length,
    totalDuration,
  };
}

export async function getHomepageCourses(): Promise<CourseCardData[]> {
  const client = getServerClient();
  const courses = await client.fetch<RawCourseCard[]>(COURSES_FOR_HOMEPAGE_QUERY, {
    slugs: HOMEPAGE_COURSE_SLUGS,
  });

  const bySlug = new Map(courses.map((course) => [course.slug, toCourseCard(course)]));

  return HOMEPAGE_COURSE_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (course): course is CourseCardData => course != null,
  );
}

export async function getCourseBySlug(slug: string): Promise<CourseDetail | null> {
  const client = getServerClient();
  const course = await client.fetch<RawCourseDetail | null>(COURSE_BY_SLUG_QUERY, { slug });

  if (!course) {
    return null;
  }

  return toCourseDetail(course);
}

export async function getAllCourseSlugs(): Promise<string[]> {
  const client = getServerClient();
  const rows = await client.fetch<Array<{ slug: string }>>(COURSE_SLUGS_QUERY);
  return rows.map((row) => row.slug).filter(Boolean);
}
