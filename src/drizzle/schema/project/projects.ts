import { pgTable, text } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { base } from '@/drizzle/schema/helpers'
import { projectsToTechnologies } from '@/drizzle/schema/project/projectsToTechnologies'
import { projectsToTags } from '@/drizzle/schema/project/projectsToTags'

export const projects = pgTable('projects', {
  ...base,

  slug: text('slug').notNull().unique(),

  title: text('title').notNull(),
  description: text('description'),
  link: text('link'),
  repository: text('repository'),

  sections: text('sections')
    .array()
    .default([])
})

export const projectsRelations = relations(projects, ({ many }) => ({
  projectsToTags: many(projectsToTags),
  projectsToTechnologies: many(projectsToTechnologies)
}))
