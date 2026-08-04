import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import ChapterHero from '../../components/chapter/ChapterHero';
import ChapterSubNav from '../../components/chapter/ChapterSubNav';
import Footnote from '../../components/chapter/Footnote';
import Highlight from '../../components/chapter/Highlight';
import PlaceholderBlock from '../../components/chapter/PlaceholderBlock';
import SectionHeading from '../../components/chapter/SectionHeading';
import { inclusionMeta, ROUTES } from '../../constants';
import type { ChapterSection } from '../../types';

const inclusionIntroParagraphs = [
  'Inclusion begins at birth. Without proof of legal identity, people may be excluded from essential services that ensures meaningful participation and contributions to society. Inclusion also requires that public institutions reflect the diversity of the populations they serve. Equal participation is closely linked to equal treatment. Today, women remain underrepresented in many leadership and decision-making positions, while many population groups continue to face barriers to equal representation and opportunity.',
  'Finally, inclusion depends also on how people experience them. Governments must deliver accessible, high-quality public services, manage public resources fairly and effectively and provide meaningful opportunities for people to participate in public decision-making. Building inclusive societies therefore requires institutions that not only serve people, but also ensure that everyone has a place, a voice and an equal opportunity to contribute.',
];

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
        <p>
          Birth registration is the first step towards inclusion in society. By establishing a
          child's legal identity, it helps protect fundamental rights and enables access to
          essential services such as health care, education and social protection.
        </p>
        <PlaceholderBlock label='Scrollytelling' />
        <p>
          There is little evidence of gender inequality in birth registration. Across almost all
          countries with available data, boys and girls are registered at similar rates. This
          suggests that the remaining gaps primarily reflect inequalities in access to registration
          systems rather than differences between girls and boys.
        </p>
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
        <p>
          As societies confront increasingly complex challenges from climate change and conflict to
          economic insecurity and technological change, it is important that political decision
          making reflects the diversity{' '}
          <Footnote
            note='This indicator measures the representation of women and young people in national parliaments. However, inclusive representation extends beyond age and sex. Legislatures should also reflect the diversity of persons with disabilities, indigenous peoples, ethnic minorities and other population groups. Data on these dimensions remain limited because of differences in legal frameworks, privacy protections, self-identification practices and parliamentary reporting systems.'
            color={inclusionMeta.color}
          >
            of the populations it serves
          </Footnote>
          . Women and younger representatives, bring{' '}
          <Footnote
            note="Young leaders tend to have different priorities from their counterparts, typically leaning towards social spending related to their cohort's long-term future, such as climate change, and women leaders often favour investments on education, childcare, and influence gender-sensitive policy discussions in Parliaments."
            color={inclusionMeta.color}
          >
            different lived experiences and policy priorities
          </Footnote>{' '}
          helping to broaden parliamentary debate and strengthen the responsiveness of public
          policy.
        </p>
        <p>
          As of 2026, women held 27.5 per cent of parliamentary seats globally, a modest increase
          from 27.2 per cent in 2025. Representation remains even lower in parliamentary leadership,
          where women accounted for 19.9 per cent of Speakers of Parliament in 2026, a decline of
          3.8 percentage points from the previous year. However, the proportion of women in the
          leadership of core policy committees has shown signs of progress, with the share of
          parliamentary chair positions held by women rising by 4.1, 3.6 and 2.7 percentage points
          for foreign affairs, defence and finance committees, respectively.
        </p>
        <Highlight color={inclusionMeta.color}>
          Young people remain underrepresented in political decision-making
        </Highlight>
        <p>
          While people aged 18 to 40 account for around one third of the world's adult population,
          they represent only 19 per cent of parliamentarians globally. Although this is an
          important improvement from 12.9 per cent in 2014, progress has slowed considerably in
          recent years, with only minimal gains since 2023. Representation among the youngest
          parliamentarians has stagnated entirely. In 2026, just 2.8 per cent of Members of
          Parliament were aged 30 years or younger, unchanged since 2023, although twice the level
          observed in 2014, when it was 1.4 per cent.
        </p>
        <Highlight color={inclusionMeta.color}>
          Progress among younger generations offers some grounds for optimism
        </Highlight>
        <p>
          Younger generations of parliamentarians are, however, considerably more gender balanced
          than older ones. Women account for 43.5 per cent of all MPs aged 30 years or younger and
          36.2 per cent of those aged 40 years or younger. These patterns suggest that gender
          balance in parliaments may continue to improve as younger cohorts enter political office.
        </p>
        <PlaceholderBlock label='Figure' />
        <Highlight color={inclusionMeta.color}>Progress remains uneven across regions</Highlight>
        <p>
          The Americas lead in both women's and youth representation, with women holding 35.6 per
          cent of parliamentary seats and MPs aged 40 or younger accounting for 23.5 per cent of
          members. By contrast, women hold only 16.2 per cent of seats in the Middle East and North
          Africa, while the Pacific records the lowest levels of youth representation, with MPs aged
          30 or younger accounting for just 2.0 per cent of parliamentarians and those aged 40 or
          younger only 12.0 per cent.
        </p>
        <PlaceholderBlock
          label='Data to impact story'
          title="Advancing Women's Representation in Benin's National Assembly"
        />
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
        <p>
          Women's representation in public service and the judiciary has improved across many
          countries, yet this progress has not consistently translated into equal presence in
          decision-making roles. Globally, women remain underrepresented, with representation ratios
          of 0.80 in public service and 0.88 in the judiciary,{' '}
          <Footnote
            note="Gender parity rate equals 1. The gender parity is the ratio of women's representation relative to their share of the working age population (assumed to be 0.5)."
            color={inclusionMeta.color}
          >
            well below parity
          </Footnote>
          .
        </p>
        <p>
          Progress also remains uneven across regions and income groups. Countries that have
          achieved or approached parity are concentrated primarily among high-income countries,
          while many middle- and low-income countries continue to lag behind.
        </p>
        <p>
          Recent advances in data collection provide new evidence on how representation is
          distributed within institutions.
        </p>
        <PlaceholderBlock label='Scrollytelling' />
        <p>
          The evidence suggests that achieving inclusive governance requires more than improving
          overall representation. It requires ensuring that women have equal opportunities to
          advance into leadership and decision-making roles across public institutions.
        </p>
        <PlaceholderBlock
          label='Data to impact story'
          title='Using representation data to inform more inclusive public institutions in Armenia'
        />
        <PlaceholderBlock
          label='Data to impact story'
          title='Turning Representation Data into Institutional Change in Bosnia and Herzegovina'
        />
        <PlaceholderBlock
          label='Data to impact story'
          title="Advancing Women's Judicial Leadership in Bangladesh"
        />
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
        <p>
          Discrimination remains a barrier to inclusive societies. Yet discrimination continues to
          affect millions of people worldwide, limiting access to opportunities, services and
          participation in public life.
        </p>
        <p>
          Globally, nearly one in five people report having personally experienced discrimination
          during the previous 12 months. Women and men report similar overall levels of
          discrimination. However, women are more likely to report discrimination based on gender,
          reflecting persistent inequalities that often intersect with disability, income, education
          and minority status.
        </p>
        <Highlight color={inclusionMeta.color}>
          Transgender and gender-diverse people report the highest discrimination rates
        </Highlight>
        <p>
          Transgender and gender-diverse individuals frequently report levels of discrimination
          often exceeding 60 per cent, while people identifying as sexual minorities report
          discrimination rates 2.2 times higher than the population average.
        </p>
        <PlaceholderBlock label='Figure' />
        <p>
          The availability of data on discrimination has improved considerably in recent years,
          enabling more detailed analysis across population groups. However, important gaps remain.
          Fewer than half of reporting countries provide data disaggregated by income, education, or
          migration status, and only a limited number collect information on sexual orientation and
          gender identity. As a result, some of the most severe forms of exclusion remain
          insufficiently documented, hindering assessments for effective policy initiatives.
        </p>
        <PlaceholderBlock
          label='Data to impact story'
          title='Using Data to Strengthen Institutional Responses to Discrimination in Mexico'
        />
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
        <p>
          Public budgets translate government priorities into investments in public services,
          infrastructure and social protection. The extent to which governments implement approved
          budgets as planned provides an important measure of institutional effectiveness to deliver
          on policy commitments.
        </p>
        <p>
          Following the disruptions caused by the COVID-19 pandemic, governments have made steady
          progress in improving budget reliability and expenditure forecasts. Global average
          deviations between approved and actual government expenditure declined from 12.6 per cent
          in 2020 to 10.2 per cent in 2024.
        </p>
        <PlaceholderBlock label='Figure' />
        <Highlight color={inclusionMeta.color}>
          Data suggests that stronger public financial management systems and institutional capacity
          are associated with more reliable budget execution.
        </Highlight>
        <p>
          Despite overall progress, important differences persist across income groups. Between 2021
          and 2024, low-income countries recorded the largest budget deviations between approved and
          actual expenditure, with median deviations of around 11.8 per cent. By contrast, most
          high-income and upper-middle-income countries generally maintained deviations below 7 per
          cent.
        </p>
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
        <p>
          Across healthcare, education, and{' '}
          <Footnote
            note="These include services to obtain government-issued identification documents such as national identity cards, passports, driver's licenses and voter's cards, and services for the civil registration of life events such as births, marriages and deaths."
            color={inclusionMeta.color}
          >
            government services
          </Footnote>
          , the quality of public services has become a defining feature of how individuals
          experience and interact with their governments.
        </p>
        <p>
          Among countries with available data, satisfaction ranges from less than 10 per cent in
          some countries to over 90 per cent in others.
        </p>
        <PlaceholderBlock label='Figure' />
        <p>
          Healthcare provides the most comprehensive basis for global trend analysis, with trend
          data available for a subset of 95 countries.
        </p>
        <Highlight color={inclusionMeta.color}>
          Satisfaction with accessibility of healthcare has improved modestly over the past decade,
          but regional disparities remain pronounced.
        </Highlight>
        <p>
          Countries in Eastern and South-Eastern Asia report the highest average satisfaction with
          88.2 per cent, while Sub-Saharan Africa records the lowest with 46.4 per cent. These
          persistent differences show that, while progress has been made, access to quality public
          services remains highly unequal across countries.
        </p>
        <PlaceholderBlock label='Figure' />
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
        <p>
          Inclusive governance is not only about who institutions represent or the services they
          deliver. Inclusive governance is also about{' '}
          <Footnote
            note="This is known as “external political efficacy”. It refers to people's feeling of having a say in what their government does. This concept is used to measure beliefs regarding system's responsiveness to people's demands. Internal political efficacy instead refers to confidence of the individual in his or her own abilities to understand politics and to act politically."
            color={inclusionMeta.color}
          >
            whether people believe their voices influence public decisions
          </Footnote>
          .
        </p>
        <p>
          Globally, less than half of people believe they have a meaningful say in what their
          government does, revealing a persistent gap between participation in public life and
          perceived influence over decision-making.
        </p>
        <Highlight color={inclusionMeta.color}>
          Some of the lowest levels of perceived influence are found in Europe and Northern America
        </Highlight>
        <p>
          In Europe and Northern America only around one in three people believe they can influence
          government decisions. Across regions, perceptions of influence differ by as much as 40
          percentage points.
        </p>
        <PlaceholderBlock label='Figure' />
        <p>
          Women report lower levels of political influence than men. Across 37 high-income countries
          with sex-disaggregated data, 27.3 per cent of women believe they have a say in government
          decisions, compared with 32.6 per cent of men.
        </p>
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
        <p>
          Access to information is a cornerstone of inclusive and transparent governance. It enables
          people to understand how public decisions are made, scrutinize government action and
          participate more effectively in public life.
        </p>
        <p>
          As of 2026, 141 UN Member States have adopted statutory guarantees for public access to
          information, compared with just 14 countries in 1990, reflecting a remarkable increase in
          the right to information. The most recent adopters include Cuba and Senegal.
        </p>
        <PlaceholderBlock label='Figure' />
        <Highlight color={inclusionMeta.color}>
          Legal guarantees, however, do not always translate into effective access in practice.
        </Highlight>
        <p>
          In 2025, 49 out of 123 countries responding to the UNESCO annual survey reported almost
          5.9 million access to information requests, demonstrating the growing use of these laws.
          Yet implementation remains challenging due to the absence of record-keeping systems,
          limited legal enforcement, lack of independent oversight bodies and designated
          institutional roles.
        </p>
        <p>
          These implementation gaps are also reflected in the first large-scale global assessment
          into the effectiveness of access to information laws. Identical access to information
          requests were submitted across 76 countries, where less than half received full
          disclosure.
        </p>
        <PlaceholderBlock label='Big numbers' />
        <p>
          These findings demonstrate that, while legal recognition of the right to information has
          become widespread, ensuring that this right can be effectively exercised remains a
          significant challenge.
        </p>
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
        <p>
          Inclusive and effective global governance also depends on whether international
          institutions reflect the voices and interests of all countries.
        </p>
        <PlaceholderBlock label='Figure' />
      </>
    ),
  },
  {
    number: '10',
    title: 'The role of Institutions',
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

      <div className='mx-auto flex max-w-2xl flex-col gap-4 px-4 py-12 md:px-8 lg:px-16'>
        {inclusionIntroParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>

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
