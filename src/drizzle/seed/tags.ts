import { db } from '@/drizzle/db'
import { tags } from '@/drizzle/schema/tag/tags'

const TAGS = [
  ['FRONTEND', 'Front End'],
  ['BACKEND', 'Back End'],
  ['FULLSTACK', 'Full Stack'],
  ['SCRAPER', 'Scraper'],
  ['MOBILE', 'Mobile'],
  ['BOT', 'Bot'],
]

;(async function seed() {
  console.log('Seeding Database with tags...')

  try {
    for (const tag of TAGS) {
      await db
        .insert(tags)
        .values({ slug: tag[0], name: tag[1] })
        .onConflictDoUpdate({ target: tags.slug, set: { name: tag[1] } })
    }

    console.log('Database seeding with tags complete!')
  } catch (error) {
    console.error('Error during seeding tags:', error)
  }
})()
