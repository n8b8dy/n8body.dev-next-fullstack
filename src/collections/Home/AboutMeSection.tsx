import Link from 'next/link'

import { Section } from '@/components/layout/Section'
import { Heading } from '@/components/typography/Heading'
import { Paragraph } from '@/components/typography/Paragraph'
import { Bold } from '@/components/typography/Bold'
import { UserIpText } from '@/collections/Home/UserIpText'

import { cn } from '@/utils/styles'

export interface AboutMeSectionProps {}

export const AboutMeSection = ({}: AboutMeSectionProps) => {
  return (
    <Section>
      <Heading tag="h3" terminal>
        About me
      </Heading>
      <Paragraph>
        Hello, <UserIpText endpoint={process.env.NEXT_PUBLIC_IP_ENDPOINT!} />! Welcome to my
        personal website — I am an ambitious developer from Bulgaria specialising in front-end
        development using Typescript and React. Currently,{' '}
        <Bold>I am actively looking for a job</Bold>, so...{' '}
        <Link href="/contacts" className={cn('rounded underline')}>
          contact me
        </Link>
        !<br />
      </Paragraph>
      <Paragraph>
        Most of my free time is spent on developing pet projects or studying new technologies.
        Additionally, my interests include system administration, history, philosophy and
        playing the guitar.
      </Paragraph>
      <Paragraph>
        <i>Oh, and I use Arch btw.</i>
      </Paragraph>
    </Section>
  )
}
