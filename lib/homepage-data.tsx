import type { ReactNode } from "react";
import { NextJsLogo } from "@/components/cards/course-logos/NextJsLogo";
import { DockerLogo } from "@/components/cards/course-logos/DockerLogo";
import { TypeScriptLogo } from "@/components/cards/course-logos/TypeScriptLogo";

export type HomepageCourse = {
  id: string;
  logo: ReactNode;
  title: string;
  description: string;
  level: string;
  duration: string;
  moduleCount: string;
};

export const heroCopy = {
  badge: "Intelligent Learning",
  headline: "Search your learning in plain English.",
  subtext:
    "Vertex understands what you want to learn and finds the exact lessons across all your courses.",
  ctaLabel: "Explore Courses",
  searchPlaceholder: "Ask anything about your learning…",
};

export const homepageCourses: HomepageCourse[] = [
  {
    id: "nextjs",
    logo: <NextJsLogo />,
    title: "Next.js for Production",
    description:
      "Build fast, scalable React applications with the App Router, server components, and modern deployment patterns.",
    level: "Intermediate",
    duration: "18h 24m",
    moduleCount: "12 modules",
  },
  {
    id: "docker",
    logo: <DockerLogo />,
    title: "Docker for Developers",
    description:
      "Containerize your applications, orchestrate services, and deploy with confidence using Docker and Compose.",
    level: "Beginner",
    duration: "14h 10m",
    moduleCount: "9 modules",
  },
  {
    id: "typescript",
    logo: <TypeScriptLogo />,
    title: "TypeScript Deep Dive",
    description:
      "Master TypeScript's type system, generics, and advanced patterns for safer, more maintainable code.",
    level: "Intermediate",
    duration: "16h 45m",
    moduleCount: "11 modules",
  },
];

export const footerCopy = {
  callout: "New courses and lessons added every week.",
};
