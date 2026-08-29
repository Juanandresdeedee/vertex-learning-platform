import type { SanityImageSource } from "@sanity/image-url";

export type CourseLesson = {
  title: string;
  slug: string;
  duration: number;
};

export type CourseModule = {
  title: string;
  summary?: string;
  lessons: CourseLesson[];
  duration: number;
};

export type LearningOutcome = {
  icon?: string;
  title: string;
  description: string;
};

export type CourseInstructor = {
  name: string;
  slug: string;
  photo?: SanityImageSource;
};

export type CourseDetail = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  coverImage?: SanityImageSource;
  level: string;
  popular?: boolean;
  studentCount: number;
  instructor?: CourseInstructor;
  learningOutcomes: LearningOutcome[];
  modules: CourseModule[];
  moduleCount: number;
  totalDuration: number;
};

export type CourseCardData = {
  title: string;
  slug: string;
  summary: string;
  coverImage?: SanityImageSource;
  level: string;
  moduleCount: number;
  totalDuration: number;
};

export const HOMEPAGE_COURSE_SLUGS = [
  "nextjs-app-router-in-depth",
  "devops-with-docker-and-kubernetes",
  "typescript-for-application-developers",
] as const;
