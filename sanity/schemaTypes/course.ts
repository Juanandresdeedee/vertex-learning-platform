import { defineField, defineType } from 'sanity'

export const courseType = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    defineField({
      name: 'image',
      title: 'Course Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})