import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { P } from '@undp/design-system-react/Typography';
import ImpactStory from '@/routes/chapters/components/ImpactStorySection';
import { useIsGenderLensActive } from '@/stores/chapterStore';
import type { ChapterTarget } from '@/types';
import ChapterEndNav from '../components/ChapterFooter';
import ChapterHero from '../components/HeroBanner';
import Highlight from '../components/Highlight';
import InfoTooltip from '../components/InfoTooltip';
import PlaceholderBlock from '../components/PlaceholderBlock';
import SectionHeading from '../components/SectionHeading';
import ChapterSubNav from '../components/SubNav';
import TargetsDrawer from '../components/TargetsDrawer';

export function Inclusion() {
  const isGenderLensActive = useIsGenderLensActive();
  const targets: ChapterTarget[] = [
    {
      code: '16.6',
      description: 'Develop effective, accountable and transparent institutions at all levels',
      indicators: [
        { code: '16.6.1', label: 'Government expenditures' },
        { code: '16.6.2', label: 'Satisfaction with public services' },
      ],
    },
    {
      code: '16.7',
      description:
        'Ensure responsive, inclusive, participatory and representative decision-making at all levels',
      indicators: [
        { code: '16.7.1 (a)', label: 'Representation in the legislature' },
        {
          code: '16.7.1 (b) & (c)',
          label: 'Representation in public service institutions and the judiciary',
        },
        { code: '16.7.2', label: 'Political efficacy' },
      ],
    },
    {
      code: '16.8',
      description:
        'Broaden and strengthen the participation of developing countries in the institutions of global governance',
      indicators: [{ code: '16.8.1', label: 'Global governance' }],
    },
    {
      code: '16.9',
      description: 'By 2030, provide legal identity for all, including birth registration',
      indicators: [{ code: '16.9.1', label: 'Legal identity' }],
    },
    {
      code: '16.10',
      description:
        'Ensure public access to information and protect fundamental freedoms, in accordance with national legislation and international agreements',
      indicators: [{ code: '16.10.2', label: 'Access to information' }],
    },
    {
      code: '16.b',
      description:
        'Promote and enforce non-discriminatory laws and policies for sustainable development',
      indicators: [{ code: '16.b.1', label: 'Experience of Discrimination' }],
    },
  ];
  const sections = [
    {
      id: '01',
      title: 'Legal identity',
      indicatorCode: '16.9.1',
      heading:
        'Birth registration continues to expand, but 150 million children remain without a legal identity',
      anchor: 'legal-identity',
      isGenderLens: true,
      content: (
        <>
          <P marginBottom='none' size='lg'>
            Birth registration is the first step towards inclusion in society. By establishing a
            child's legal identity, it helps protect fundamental rights and enables access to
            essential services such as health care, education and social protection.
          </P>
          <PlaceholderBlock label='Scrollytelling' />
          <P
            marginBottom='none'
            size='lg'
            className={isGenderLensActive ? 'gender-lens' : undefined}
          >
            There is little evidence of gender inequality in birth registration. Across almost all
            countries with available data, boys and girls are registered at similar rates. This
            suggests that the remaining gaps primarily reflect inequalities in access to
            registration systems rather than differences between girls and boys.
          </P>
        </>
      ),
    },
    {
      id: '02',
      title: 'Representation in the legislature',
      indicatorCode: '16.7.1 (a)',
      heading:
        'Women hold only one in four parliamentary seats and face persistent barriers accessing the highest level of political leadership',
      anchor: 'representation-in-the-legislature',
      isGenderLens: true,
      content: (
        <>
          <P
            marginBottom='none'
            size='lg'
            className={isGenderLensActive ? 'gender-lens' : undefined}
          >
            As societies confront increasingly complex challenges from climate change and conflict
            to economic insecurity and technological change, it is important that political decision
            making reflects the diversity{' '}
            <InfoTooltip
              trigger='of the populations it serves'
              content='This indicator measures the representation of women and young people in national parliaments. However, inclusive representation extends beyond age and sex. Legislatures should also reflect the diversity of persons with disabilities, indigenous peoples, ethnic minorities and other population groups. Data on these dimensions remain limited because of differences in legal frameworks, privacy protections, self-identification practices and parliamentary reporting systems.'
              color='tertiary'
            />
            . Women and younger representatives, bring{' '}
            <InfoTooltip
              trigger='different lived experiences and policy priorities'
              content="Young leaders tend to have different priorities from their counterparts, typically leaning towards social spending related to their cohort's long-term future, such as climate change, and women leaders often favour investments on education, childcare, and influence gender-sensitive policy discussions in Parliaments."
              color='tertiary'
            />{' '}
            helping to broaden parliamentary debate and strengthen the responsiveness of public
            policy.
          </P>
          <P
            marginBottom='none'
            size='lg'
            className={isGenderLensActive ? 'gender-lens' : undefined}
          >
            As of 2026, women held 27.5 per cent of parliamentary seats globally, a modest increase
            from 27.2 per cent in 2025. Representation remains even lower in parliamentary
            leadership, where women accounted for 19.9 per cent of Speakers of Parliament in 2026, a
            decline of 3.8 percentage points from the previous year. However, the proportion of
            women in the leadership of core policy committees has shown signs of progress, with the
            share of parliamentary chair positions held by women rising by 4.1, 3.6 and 2.7
            percentage points for foreign affairs, defence and finance committees, respectively.
          </P>
          <Highlight
            color='tertiary'
            content='Young people remain underrepresented in political decision-making'
          />
          <P marginBottom='none' size='lg'>
            While people aged 18 to 40 account for around one third of the world's adult population,
            they represent only 19 per cent of parliamentarians globally. Although this is an
            important improvement from 12.9 per cent in 2014, progress has slowed considerably in
            recent years, with only minimal gains since 2023. Representation among the youngest
            parliamentarians has stagnated entirely. In 2026, just 2.8 per cent of Members of
            Parliament were aged 30 years or younger, unchanged since 2023, although twice the level
            observed in 2014, when it was 1.4 per cent.
          </P>
          <Highlight
            color='tertiary'
            content='Progress among younger generations offers some grounds for optimism'
          />
          <P
            marginBottom='none'
            size='lg'
            className={isGenderLensActive ? 'gender-lens' : undefined}
          >
            Younger generations of parliamentarians are, however, considerably more gender balanced
            than older ones. Women account for 43.5 per cent of all MPs aged 30 years or younger and
            36.2 per cent of those aged 40 years or younger. These patterns suggest that gender
            balance in parliaments may continue to improve as younger cohorts enter political
            office.
          </P>
          <PlaceholderBlock label='Figure' />
          <Highlight color='tertiary' content='Progress remains uneven across regions' />
          <P
            marginBottom='none'
            size='lg'
            className={isGenderLensActive ? 'gender-lens' : undefined}
          >
            The Americas lead in both women's and youth representation, with women holding 35.6 per
            cent of parliamentary seats and MPs aged 40 or younger accounting for 23.5 per cent of
            members. By contrast, women hold only 16.2 per cent of seats in the Middle East and
            North Africa, while the Pacific records the lowest levels of youth representation, with
            MPs aged 30 or younger accounting for just 2.0 per cent of parliamentarians and those
            aged 40 or younger only 12.0 per cent.
          </P>
          <ImpactStory id='inclusion-benin-womens-representation' />
        </>
      ),
    },
    {
      id: '03',
      title: 'Representation in public service institutions and the judiciary',
      indicatorCode: '16.7.1 (b) & (c)',
      heading:
        'Women remain underrepresented in leadership despite broader gains in representation',
      anchor: 'representation-in-public-service-and-judiciary',
      isGenderLens: true,
      content: (
        <>
          <P
            marginBottom='none'
            size='lg'
            className={isGenderLensActive ? 'gender-lens' : undefined}
          >
            Women's representation in public service and the judiciary has improved across many
            countries, yet this progress has not consistently translated into equal presence in
            decision-making roles. Globally, women remain underrepresented, with representation
            ratios of 0.80 in public service and 0.88 in the judiciary,{' '}
            <InfoTooltip
              trigger='well below parity'
              content="Gender parity rate equals 1. The gender parity is the ratio of women's representation relative to their share of the working age population (assumed to be 0.5)."
              color='tertiary'
            />
            .
          </P>
          <P marginBottom='none' size='lg'>
            Progress also remains uneven across regions and income groups. Countries that have
            achieved or approached parity are concentrated primarily among high-income countries,
            while many middle- and low-income countries continue to lag behind.
          </P>
          <P marginBottom='none' size='lg'>
            Recent advances in data collection provide new evidence on how representation is
            distributed within institutions.
          </P>
          <PlaceholderBlock label='Scrollytelling' />
          <P
            marginBottom='none'
            size='lg'
            className={isGenderLensActive ? 'gender-lens' : undefined}
          >
            The evidence suggests that achieving inclusive governance requires more than improving
            overall representation. It requires ensuring that women have equal opportunities to
            advance into leadership and decision-making roles across public institutions.
          </P>
          <ImpactStory id='inclusion-armenia-representation-data' />
          <ImpactStory id='inclusion-bosnia-herzegovina-institutional-change' />
          <ImpactStory id='inclusion-bangladesh-judicial-leadership' />
        </>
      ),
    },
    {
      id: '04',
      title: 'Experience of discrimination',
      indicatorCode: '16.b.1',
      heading: 'Nearly one in five people worldwide report experiencing discrimination',
      anchor: 'experience-of-discrimination',
      isGenderLens: true,
      content: (
        <>
          <P marginBottom='none' size='lg'>
            Discrimination remains a barrier to inclusive societies. Yet discrimination continues to
            affect millions of people worldwide, limiting access to opportunities, services and
            participation in public life.
          </P>
          <P
            marginBottom='none'
            size='lg'
            className={isGenderLensActive ? 'gender-lens' : undefined}
          >
            Globally, nearly one in five people report having personally experienced discrimination
            during the previous 12 months. Women and men report similar overall levels of
            discrimination. However, women are more likely to report discrimination based on gender,
            reflecting persistent inequalities that often intersect with disability, income,
            education and minority status.
          </P>
          <Highlight
            color='tertiary'
            className={isGenderLensActive ? 'gender-lens' : undefined}
            content='Transgender and gender-diverse people report the highest discrimination rates'
          />
          <P
            marginBottom='none'
            size='lg'
            className={isGenderLensActive ? 'gender-lens' : undefined}
          >
            Transgender and gender-diverse individuals frequently report levels of discrimination
            often exceeding 60 per cent, while people identifying as sexual minorities report
            discrimination rates 2.2 times higher than the population average.
          </P>
          <PlaceholderBlock label='Figure' />
          <P marginBottom='none' size='lg'>
            The availability of data on discrimination has improved considerably in recent years,
            enabling more detailed analysis across population groups. However, important gaps
            remain. Fewer than half of reporting countries provide data disaggregated by income,
            education, or migration status, and only a limited number collect information on sexual
            orientation and gender identity. As a result, some of the most severe forms of exclusion
            remain insufficiently documented, hindering assessments for effective policy
            initiatives.
          </P>
          <ImpactStory id='inclusion-mexico-discrimination-data' />
        </>
      ),
    },
    {
      id: '05',
      title: 'Government expenditures',
      indicatorCode: '16.6.1',
      heading: 'Governments are improving their ability to deliver approved budgets',
      anchor: 'government-expenditures',
      content: (
        <>
          <P marginBottom='none' size='lg'>
            Public budgets translate government priorities into investments in public services,
            infrastructure and social protection. The extent to which governments implement approved
            budgets as planned provides an important measure of institutional effectiveness to
            deliver on policy commitments.
          </P>
          <P marginBottom='none' size='lg'>
            Following the disruptions caused by the COVID-19 pandemic, governments have made steady
            progress in improving budget reliability and expenditure forecasts. Global average
            deviations between approved and actual government expenditure declined from 12.6 per
            cent in 2020 to 10.2 per cent in 2024.
          </P>
          <PlaceholderBlock label='Figure' />
          <Highlight
            color='tertiary'
            content='Data suggests that stronger public financial management systems and institutional capacity are associated with more reliable budget execution.'
          />
          <P marginBottom='none' size='lg'>
            Despite overall progress, important differences persist across income groups. Between
            2021 and 2024, low-income countries recorded the largest budget deviations between
            approved and actual expenditure, with median deviations of around 11.8 per cent. By
            contrast, most high-income and upper-middle-income countries generally maintained
            deviations below 7 per cent.
          </P>
        </>
      ),
    },
    {
      id: '06',
      title: 'Satisfaction with public services',
      indicatorCode: '16.6.2',
      heading: 'Quality public services remain out of reach for many people',
      anchor: 'satisfaction-with-public-services',
      content: (
        <>
          <P marginBottom='none' size='lg'>
            Across healthcare, education, and{' '}
            <InfoTooltip
              trigger='government services'
              content="These include services to obtain government-issued identification documents such as national identity cards, passports, driver's licenses and voter's cards, and services for the civil registration of life events such as births, marriages and deaths."
              color='tertiary'
            />
            , the quality of public services has become a defining feature of how individuals
            experience and interact with their governments.
          </P>
          <P marginBottom='none' size='lg'>
            Among countries with available data, satisfaction ranges from less than 10 per cent in
            some countries to over 90 per cent in others.
          </P>
          <PlaceholderBlock label='Figure' />
          <P marginBottom='none' size='lg'>
            Healthcare provides the most comprehensive basis for global trend analysis, with trend
            data available for a subset of 95 countries.
          </P>
          <Highlight
            color='tertiary'
            content='Satisfaction with accessibility of healthcare has improved modestly over the past decade, but regional disparities remain pronounced.'
          />
          <P marginBottom='none' size='lg'>
            Countries in Eastern and South-Eastern Asia report the highest average satisfaction with
            88.2 per cent, while Sub-Saharan Africa records the lowest with 46.4 per cent. These
            persistent differences show that, while progress has been made, access to quality public
            services remains highly unequal across countries.
          </P>
          <PlaceholderBlock label='Figure' />
        </>
      ),
    },
    {
      id: '07',
      title: 'Political efficacy',
      indicatorCode: '16.7.2',
      heading: 'Fewer than half of people feel they have a say in government decisions',
      anchor: 'political-efficacy',
      isGenderLens: true,
      content: (
        <>
          <P marginBottom='none' size='lg'>
            Inclusive governance is not only about who institutions represent or the services they
            deliver. Inclusive governance is also about{' '}
            <InfoTooltip
              trigger='whether people believe their voices influence public decisions'
              content="This is known as “external political efficacy”. It refers to people's feeling of having a say in what their government does. This concept is used to measure beliefs regarding system's responsiveness to people's demands. Internal political efficacy instead refers to confidence of the individual in his or her own abilities to understand politics and to act politically."
              color='tertiary'
            />
            .
          </P>
          <P marginBottom='none' size='lg'>
            Globally, less than half of people believe they have a meaningful say in what their
            government does, revealing a persistent gap between participation in public life and
            perceived influence over decision-making.
          </P>
          <Highlight
            color='tertiary'
            content='Some of the lowest levels of perceived influence are found in Europe and Northern America'
          />
          <P marginBottom='none' size='lg'>
            In Europe and Northern America only around one in three people believe they can
            influence government decisions. Across regions, perceptions of influence differ by as
            much as 40 percentage points.
          </P>
          <PlaceholderBlock label='Figure' />
          <P
            marginBottom='none'
            size='lg'
            className={isGenderLensActive ? 'gender-lens' : undefined}
          >
            Women report lower levels of political influence than men. Across 37 high-income
            countries with sex-disaggregated data, 27.3 per cent of women believe they have a say in
            government decisions, compared with 32.6 per cent of men.
          </P>
        </>
      ),
    },
    {
      id: '08',
      title: 'Access to information',
      indicatorCode: '16.10.2',
      heading:
        'Legal guarantees for access to information are widespread, but implementation remains uneven',
      anchor: 'access-to-information',
      content: (
        <>
          <P marginBottom='none' size='lg'>
            Access to information is a cornerstone of inclusive and transparent governance. It
            enables people to understand how public decisions are made, scrutinize government action
            and participate more effectively in public life.
          </P>
          <P marginBottom='none' size='lg'>
            As of 2026, 141 UN Member States have adopted statutory guarantees for public access to
            information, compared with just 14 countries in 1990, reflecting a remarkable increase
            in the right to information. The most recent adopters include Cuba and Senegal.
          </P>
          <PlaceholderBlock label='Figure' />
          <Highlight
            color='tertiary'
            content='Legal guarantees, however, do not always translate into effective access in practice.'
          />
          <P marginBottom='none' size='lg'>
            In 2025, 49 out of 123 countries responding to the UNESCO annual survey reported almost
            5.9 million access to information requests, demonstrating the growing use of these laws.
            Yet implementation remains challenging due to the absence of record-keeping systems,
            limited legal enforcement, lack of independent oversight bodies and designated
            institutional roles.
          </P>
          <P marginBottom='none' size='lg'>
            These implementation gaps are also reflected in the first large-scale global assessment
            into the effectiveness of access to information laws. Identical access to information
            requests were submitted across 76 countries, where less than half received full
            disclosure.
          </P>
          <PlaceholderBlock label='Big numbers' />
          <P marginBottom='none' size='lg'>
            These findings demonstrate that, while legal recognition of the right to information has
            become widespread, ensuring that this right can be effectively exercised remains a
            significant challenge.
          </P>
        </>
      ),
    },
    {
      id: '09',
      title: 'Representation of developing countries in international organizations',
      indicatorCode: '16.8.1',
      heading: 'Global economic governance has not kept pace with a changing world',
      anchor: 'global-governance',
      content: (
        <>
          <P marginBottom='none' size='lg'>
            Inclusive and effective global governance also depends on whether international
            institutions reflect the voices and interests of all countries.
          </P>
          <PlaceholderBlock label='Figure' />
        </>
      ),
    },
    {
      id: '10',
      title: 'The role of Institutions',
      heading:
        'Inclusive societies are ensured through substantive representation and transparency',
      anchor: 'role-of-institutions',
      content: (
        <>
          <P marginBottom='none' size='lg'>
            Content goes here
          </P>
        </>
      ),
    },
  ];

  return (
    <>
      <ChapterSubNav
        chapterNumber={3}
        chapterTitle='Inclusion'
        color='tertiary'
        subsections={sections}
      />

      <ChapterHero
        chapterNumber={3}
        bg='/imgs/chapters/inclusion-hero.webp'
        title='Inclusion'
        intro={
          <>
            Inclusion is central to societal progress, as inclusive societies enable everyone to
            participate meaningfully in public life. Under Goal 16, inclusion is measured through
            indicators that assess whether institutions represent and serve all people equally and
            effectively. Together, these indicators provide insight into the broader dimensions of
            social cohesion and institutional legitimacy.
          </>
        }
        color='tertiary'
        subsections={sections}
      />

      <TargetsDrawer
        chapterTitle='Inclusion'
        bg='/imgs/chapters/inclusion-texture.webp'
        color='tertiary'
        targets={targets}
      />

      <div className='mx-auto max-w-2xl px-4 py-12 md:px-8 lg:px-16'>
        <P marginBottom='base' size='lg'>
          Inclusion begins at birth. Without proof of legal identity, people may be excluded from
          essential services that ensures meaningful participation and contributions to society.
          Inclusion also requires that public institutions reflect the diversity of the populations
          they serve. Equal participation is closely linked to equal treatment. Today, women remain
          underrepresented in many leadership and decision-making positions, while many population
          groups continue to face barriers to equal representation and opportunity.
        </P>
        <P marginBottom='none' size='lg'>
          Finally, inclusion depends also on how people experience them. Governments must deliver
          accessible, high-quality public services, manage public resources fairly and effectively
          and provide meaningful opportunities for people to participate in public decision-making.
          Building inclusive societies therefore requires institutions that not only serve people,
          but also ensure that everyone has a place, a voice and an equal opportunity to contribute.
        </P>
      </div>

      <div className='mx-auto flex max-w-2xl flex-col'>
        {sections.map((section) => (
          <SectionHeading
            key={section.anchor}
            id={section.anchor}
            tag={
              section.indicatorCode
                ? `SDG Indicator ${section.indicatorCode} – ${section.title}`
                : section.title
            }
            heading={section.heading}
            color='tertiary'
          >
            {section.content}
          </SectionHeading>
        ))}
      </div>

      <ChapterEndNav label='Back to' title='Home' to='/' color='tertiary' />
    </>
  );
}

export default function createInclusionRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/chapters/inclusion',
    component: Inclusion,
    getParentRoute: () => parentRoute,
  });
}
