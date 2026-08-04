import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import ChapterHero from '../../components/chapter/ChapterHero';
import ChapterSubNav from '../../components/chapter/ChapterSubNav';
import SectionHeading from '../../components/chapter/SectionHeading';
import { inclusionMeta, ROUTES } from '../../constants';
import type { ChapterSection } from '../../types';

const inclusionSections: ChapterSection[] = [
  {
    number: '01',
    title: 'Legal identity',
    indicatorCode: '16.9.1',
    heading:
      'Birth registration continues to expand, but 150 million children remain without a legal identity',
    anchor: 'legal-identity',
    image: '/imgs/icons/16-9-1.png',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '02',
    title: 'Representation in the legislature',
    indicatorCode: '16.7.1 (a)',
    heading:
      'Women hold only one in four parliamentary seats and face persistent barriers accessing the highest level of political leadership',
    anchor: 'representation-in-the-legislature',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '03',
    title: 'Representation in public service institutions and the judiciary',
    indicatorCode: '16.7.1 (b) & (c)',
    heading: 'Women remain underrepresented in leadership despite broader gains in representation',
    anchor: 'representation-in-public-service-and-judiciary',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '04',
    title: 'Experience of discrimination',
    indicatorCode: '16.b.1',
    heading: 'Nearly one in five people worldwide report experiencing discrimination',
    anchor: 'experience-of-discrimination',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '05',
    title: 'Government expenditures',
    indicatorCode: '16.6.1',
    heading: 'Governments are improving their ability to deliver approved budgets',
    anchor: 'government-expenditures',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '06',
    title: 'Satisfaction with public services',
    indicatorCode: '16.6.2',
    heading: 'Quality public services remain out of reach for many people',
    anchor: 'satisfaction-with-public-services',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '07',
    title: 'Political efficacy',
    indicatorCode: '16.7.2',
    heading: 'Fewer than half of people feel they have a say in government decisions',
    anchor: 'political-efficacy',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '08',
    title: 'Access to information',
    indicatorCode: '16.10.2',
    heading:
      'Legal guarantees for access to information are widespread, but implementation remains uneven',
    anchor: 'access-to-information',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '09',
    title: 'Representation of developing countries in international organizations',
    indicatorCode: '16.8.1',
    heading: 'Global economic governance has not kept pace with a changing world',
    anchor: 'global-governance',
    image: '/imgs/icons/16-8-1.png',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
  {
    number: '10',
    title: 'Role of Institutions',
    heading: 'Inclusive societies are ensured through substantive representation and transparency',
    anchor: 'role-of-institutions',
    image: '/imgs/icons/the-role-of-institutions.png',
    content: (
      <>
        <p>Content goes here</p>
      </>
    ),
  },
];

export function Inclusion() {
  return (
    <>
      <ChapterSubNav
        chapterNumber={inclusionMeta.number}
        chapterTitle={inclusionMeta.title}
        color={inclusionMeta.color}
        subsections={inclusionSections}
      />

      <ChapterHero
        chapterNumber={inclusionMeta.number}
        bg={inclusionMeta.bg}
        title={inclusionMeta.title}
        intro={inclusionMeta.description}
        color={inclusionMeta.color}
        subsections={inclusionSections}
      />

      <div className='mx-auto flex max-w-2xl flex-col'>
        {inclusionSections.map((section) => (
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
            color={inclusionMeta.color}
          >
            {section.content}
          </SectionHeading>
        ))}
      </div>
    </>
  );
}

export default function createInclusionRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: ROUTES.inclusion,
    component: Inclusion,
    getParentRoute: () => parentRoute,
  });
}
