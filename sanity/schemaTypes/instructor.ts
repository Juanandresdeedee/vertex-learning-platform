import { defineField, defineType } from 'sanity'

export const instructorType = defineType({
  name: 'instructor',
  title: 'Instructor',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),

    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
    }),

    defineField({
      name: 'image',
      title: 'Instructor Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})