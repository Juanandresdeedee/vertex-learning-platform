import { defineQuery } from "next-sanity";

const courseCardProjection = /* groq */ `{
  title,
  "slug": slug.current,
  summary,
  coverImage,
  level,
  studentCount,
  "modules": modules[]{
    "lessons": lessons[]->{
      duration
    }
  }
}`;

export const COURSES_FOR_HOMEPAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && slug.current in $slugs] ${courseCardProjection}
`);

export const ALL_COURSES_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && defined(slug.current)] | order(title asc) ${courseCardProjection}
`);

export const COURSE_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage,
    level,
    popular,
    studentCount,
    instructor->{
      name,
      "slug": slug.current,
      photo
    },
    learningOutcomes[]{
      icon,
      title,
      description
    },
    modules[]{
      title,
      summary,
      "lessons": lessons[]->{
        title,
        "slug": slug.current,
        duration,
        freePreview
      }
    }
  }
`);

export const LESSON_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "lesson" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    videoUrl,
    thumbnail,
    duration,
    freePreview,
    studentCount,
    notes,
    keyPoints,
    proTip,
    resources[]{
      _key,
      type,
      title,
      description,
      url
    },
    "course": *[
      _type == "course" &&
      references(^._id)
    ][0]{
      _id,
      title,
      "slug": slug.current,
      coverImage,
      level,
      modules[]{
        title,
        summary,
        "lessons": lessons[]->{
          _id,
          title,
          "slug": slug.current,
          duration,
          freePreview
        }
      }
    }
  }
`);

export const COURSE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && defined(slug.current)]{
    "slug": slug.current
  }
`);