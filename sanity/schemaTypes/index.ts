import { type SchemaTypeDefinition } from 'sanity'
import { courseType } from './course'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [courseType],
}