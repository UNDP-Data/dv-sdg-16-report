import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import ChapterHero from '../../components/chapter/ChapterHero';
import ChapterSubNav from '../../components/chapter/ChapterSubNav';
import SectionHeading from '../../components/chapter/SectionHeading';
import { justiceMeta, ROUTES } from '../../constants';
import type { ChapterSection } from '../../types';

const justiceSections: ChapterSection[] = [
  {
    number: '01',
    title: 'Access to criminal justice',
    indicatorCode: '16.3.1',
    heading: 'More than half of violent crimes remain hidden from the justice system',
    anchor: 'access-to-criminal-justice',
    image: '/imgs/icons/16-3-1.png',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '02',
    title: 'Access to civil justice',
    indicatorCode: '16.3.3',
    heading: 'More than 1.5 billion people are estimated to have unmet justice needs',
    anchor: 'access-to-civil-justice',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '03',
    title: 'Unsentenced detention',
    indicatorCode: '16.3.2',
    heading:
      'One in three prisoners globally is held in detention without a sentence, with little progress over the past decade',
    anchor: 'unsentenced-detention',
    image: '/imgs/icons/16-3-2.png',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '04',
    title: 'Illicit financial flows',
    indicatorCode: '16.4.1',
    heading:
      'Corruption and illicit financial flows continue to erode the rule of law and divert billions of dollars away from sustainable development',
    anchor: 'illicit-financial-flows',
    image: '/imgs/icons/16-4-1.png',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '05',
    title: 'Illicit firearms flows',
    indicatorCode: '16.4.2',
    heading:
      'Less than half of seized firearms are traced, limiting efforts to reduce illicit arms flows globally',
    anchor: 'illicit-firearms-flows',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '06',
    title: 'Bribery among the population',
    indicatorCode: '16.5.1',
    heading: 'Bribery remains widespread, with large differences across regions',
    anchor: 'bribery-among-the-population',
    image: '/imgs/icons/16-5-1.png',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '07',
    title: 'Bribery of businesses',
    indicatorCode: '16.5.2',
    heading: 'Bribery is generally less common among businesses than among individuals',
    anchor: 'bribery-of-businesses',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '08',
    title: 'National human rights institutions',
    indicatorCode: '16.a.1',
    heading:
      'Progress had stalled in establishing National Human Rights Institutions compliant with the Paris Principles',
    anchor: 'national-human-rights-institutions',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '09',
    title: 'Role of Institutions',
    heading: 'Building just societies through accessible, fair and accountable institutions',
    anchor: 'role-of-institutions',
    image: '/imgs/icons/the-role-of-institutions.png',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
];

export function Justice() {
  return (
    <>
      <ChapterSubNav
        chapterNumber={justiceMeta.number}
        chapterTitle={justiceMeta.title}
        color={justiceMeta.color}
        subsections={justiceSections}
      />

      <ChapterHero
        chapterNumber={justiceMeta.number}
        bg={justiceMeta.bg}
        title={justiceMeta.title}
        intro={justiceMeta.description}
        color={justiceMeta.color}
        subsections={justiceSections}
      />

      <div className='mx-auto flex max-w-2xl flex-col'>
        {justiceSections.map((section) => (
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
            color={justiceMeta.color}
          >
            {section.content}
          </SectionHeading>
        ))}
      </div>
    </>
  );
}

export default function createJusticeRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: ROUTES.justice,
    component: Justice,
    getParentRoute: () => parentRoute,
  });
}
