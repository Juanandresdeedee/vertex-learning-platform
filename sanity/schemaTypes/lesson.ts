import { defineField, defineType } from 'sanity'

export const lessonType = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
    }),

    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'number',
    }),
  ],
})