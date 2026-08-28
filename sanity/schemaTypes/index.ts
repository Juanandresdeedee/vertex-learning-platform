import { type SchemaTypeDefinition } from 'sanity'
import { courseType } from './course'
import { instructorType } from './instructor'
import { lessonType } from './lesson'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [courseType, instructorType, lessonType],
}