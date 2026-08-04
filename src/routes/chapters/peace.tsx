import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import ChapterHero from '../../components/chapter/ChapterHero';
import ChapterSubNav from '../../components/chapter/ChapterSubNav';
import SectionHeading from '../../components/chapter/SectionHeading';
import { peaceMeta, ROUTES } from '../../constants';
import type { ChapterSection } from '../../types';

const peaceSections: ChapterSection[] = [
  {
    number: '01',
    title: 'Conflict-related deaths',
    indicatorCode: '16.1.2',
    heading: 'A civilian dies every 14 minutes in armed conflict',
    anchor: 'conflict-related-deaths',
    image: '/imgs/icons/16-1-2.png',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '02',
    title: 'Homicide',
    indicatorCode: '16.1.1',
    heading:
      'Global homicide rates continue to decline, but the world remains off track to significantly reduce violence by 2030',
    anchor: 'homicide',
    image: '/imgs/icons/16-1-1.webp',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '03',
    title: 'Attacks on defenders',
    indicatorCode: '16.10.1',
    heading:
      'One human rights defender, journalist or trade unionist is killed or disappeared every 10 hours',
    anchor: 'attacks-on-defenders',
    image: '/imgs/icons/16-10-1.png',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '04',
    title: 'Physical, sexual and psychological violence',
    indicatorCode: '16.1.3',
    heading:
      'Millions of people experience non-lethal violence, with distinct regional and gendered patterns of victimization',
    anchor: 'non-lethal-violence',
    image: '/imgs/icons/16-1-3.png',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '05',
    title: 'Violence against children',
    indicatorCode: '16.2.1 & 16.2.3',
    heading:
      'Violence begins early in life, with two in three children experiencing violent discipline at home',
    anchor: 'violence-against-children',
    image: '/imgs/icons/16-2-1.png',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '06',
    title: 'Trafficking in persons',
    indicatorCode: '16.2.2',
    heading: 'More than one in three detected victims of human trafficking is a child',
    anchor: 'trafficking-in-persons',
    image: '/imgs/icons/16-2-2.png',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '07',
    title: 'Perception of safety',
    indicatorCode: '16.1.4',
    heading: 'One in three people globally do not feel safe walking alone at night',
    anchor: 'perception-of-safety',
    image: '/imgs/icons/16-1-4.png',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '08',
    title: 'Role of Institutions',
    heading: 'Achieving peace through capable, trustworthy and responsive institutions',
    anchor: 'role-of-institutions',
    image: '/imgs/icons/the-role-of-institutions.png',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
];

export function Peace() {
  return (
    <>
      <ChapterSubNav
        chapterNumber={peaceMeta.number}
        chapterTitle={peaceMeta.title}
        color={peaceMeta.color}
        subsections={peaceSections}
      />

      <ChapterHero
        chapterNumber={peaceMeta.number}
        bg={peaceMeta.bg}
        title={peaceMeta.title}
        intro={peaceMeta.description}
        color={peaceMeta.color}
        subsections={peaceSections}
      />

      <div className='mx-auto flex max-w-2xl flex-col'>
        {peaceSections.map((section) => (
          <SectionHeading
            key={section.anchor}
            id={section.anchor}
            image={section.image}
            icon={section.icon}
            tag={
              section.indicatorCode
                ? `SDG Indicator ${section.indicatorCode} – ${section.title}`
                : section.title
            }
            heading={section.heading}
            color={peaceMeta.color}
          >
            {section.content}
          </SectionHeading>
        ))}
      </div>
    </>
  );
}

export default function createPeaceRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: ROUTES.peace,
    component: Peace,
    getParentRoute: () => parentRoute,
  });
}
