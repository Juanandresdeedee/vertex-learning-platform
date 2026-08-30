import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

export type LessonResource = {
  _key: string;
  type?: string;
  title: string;
  description?: string;
  url: string;
};

export type LessonCourseLesson = {
  _id: string;
  title: string;
  slug: string;
  duration: number;
  freePreview?: boolean;
};

export type LessonCourseModule = {
  title: string;
  summary?: string;
  lessons: LessonCourseLesson[];
  duration: number;
};

export type LessonParentCourse = {
  _id: string;
  title: string;
  slug: string;
  coverImage?: SanityImageSource;
  level: string;
  modules: LessonCourseModule[];
  totalDuration: number;
};

export type LessonDetail = {
  _id: string;
  title: string;
  slug: string;
  videoUrl?: string;
  thumbnail?: SanityImageSource;
  duration: number;
  freePreview?: boolean;
  studentCount: number;
  notes: PortableTextBlock[];
  keyPoints: string[];
  proTip?: string;
  resources: LessonResource[];
  course: LessonParentCourse;
};