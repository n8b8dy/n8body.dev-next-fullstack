import { Fragment } from 'react'
import { desc, eq } from 'drizzle-orm'

import { Section } from '@/components/layout/Section'

import { Heading } from '@/components/typography/Heading'
import { HeroSection } from '@/collections/Home/HeroSection'
import { AboutMeSection } from '@/collections/Home/AboutMeSection'
import { TechStackSection } from '@/collections/Home/TechStackSection'
import { ProjectsSection } from '@/collections/Home/ProjectsSection'

import { cn } from '@/utils/styles'
import { db } from '@/drizzle/db'
import { technologies } from '@/drizzle/schema/technology/technologies'

async function getData() {
  const technologiesData = await db.query.technologies.findMany({
    where: eq(technologies.featured, true),
  })

  const projectsData = (
    await db.query.projects.findMany({
      limit: 5,
      orderBy: desc(technologies.updatedAt),
      with: {
        projectsToTechnologies: { with: { technology: true } },
        projectsToTags: { with: { tag: true } },
      },
    })
  ).map(({ projectsToTechnologies, projectsToTags, ...project }) => ({
    ...project,
    tags: projectsToTags.map(projectToTag => projectToTag.tag),
    technologies: projectsToTechnologies.map(
      projectToTechnology => projectToTechnology.technology,
    ),
  }))

  return { technologies: technologiesData, projects: projectsData }
}

export default async function Home() {
  const { technologies, projects } = await getData()

  return (
    <Fragment>
      <div
        className={cn(
          'relative w-full min-h-[inherit] flex justify-center items-center',
          'before:absolute before:w-full before:h-1/6 before:left-0 before:top-0 before:bg-gradient-to-t before:from-transparent before:to-neutral-50 before:dark:to-neutral-950',
          'after:absolute after:w-full after:h-1/3 after:left-0 after:bottom-0 after:bg-gradient-to-b after:from-transparent after:to-neutral-50 after:dark:to-neutral-950',
          'bg-pattern-circuit',
        )}
      >
        <HeroSection />
      </div>

      <AboutMeSection />
      <TechStackSection technologies={technologies} />
      <ProjectsSection projects={projects} />

      <Section>
        <div className={cn('py-16 flex flex-col items-center gap-2')}>
          <Heading tag="h5">Interested? Then...</Heading>
          <a
            href="/files/Ruslan_Shamsutdinov_CV.pdf"
            className={cn(
              'px-4 py-2 self-center text-white font-semibold rounded',
              'animate-background-shine bg-gradient-FVW',
            )}
            download
          >
            Download CV
          </a>
        </div>
      </Section>
    </Fragment>
  )
}
