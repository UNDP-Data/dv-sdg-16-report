import { createLazyRoute } from '@tanstack/react-router';
import { Spacer } from '@undp/design-system-react/Spacer';
import { P } from '@undp/design-system-react/Typography';
import { VizCarousel } from '@undp/design-system-react/VizCarousel';
import { useMemo } from 'react';
import chaptersTargetList from '@/data/chapters/chaptersTargetList.json';
import ImpactStoryEl from '@/routes/chapters/components/ImpactStoryEl';
import { useIsGenderLensActive } from '@/stores/chapterStore';
import ChapterEndNav from '../components/ChapterFooter';
import { GraphContainer, ImpactStoriesContainer, TextContainer } from '../components/Containers';
import ChapterHero from '../components/HeroBanner';
import Highlight from '../components/Highlight';
import InfoTooltip from '../components/InfoTooltip';
import Section from '../components/Section';
import ChapterSubNav from '../components/SubNav';
import TargetsDrawer from '../components/TargetDrawer';
import WaveDivider from '../components/WaveDivider';
import AccessToInformationChoroplethMap from './charts/AccessToInformationChoroplethMap';
import AccessToInformationDisclosureBigNumbers from './charts/AccessToInformationDisclosureBigNumbers';
import BudgetDeviationByIncomeGroupLineChart from './charts/BudgetDeviationByIncomeGroupLineChart';
import DiscriminationRatesByGroupBarChart from './charts/DiscriminationRatesByGroupBarChart';
import HealthcareSatisfactionByRegionBarChart from './charts/HealthcareSatisfactionByRegionBarChart';
import ParliamentaryLeadershipByCategoryBarChart from './charts/ParliamentaryLeadershipByCategoryBarChart';
import PoliticalEfficacyByRegionBarChart from './charts/PoliticalEfficacyByRegionBarChart';
import RepresentationByInstitutionalLevelBarChart from './charts/RepresentationByInstitutionalLevelBarChart';
import RepresentationByRegionAndIncomeGroupsBarChart from './charts/RepresentationByRegionAndIncomeGroupsBarChart';
import SatisfactionWithPublicServicesStripChart from './charts/SatisfactionWithPublicServicesStripChart';
import VoteSharesByInstitutionDumbbellChart from './charts/VoteSharesByInstitutionDumbbellChart';
import ScrollyTellingViz from './ScrollyTellingViz';

export function Inclusion() {
  const isGenderLensActive = useIsGenderLensActive();
  const sections = useMemo(
    () => [
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
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Birth registration is the first step towards inclusion in society. By establishing a
                child's legal identity, it helps protect fundamental rights and enables access to
                essential services such as healthcare, education and social protection.
              </P>
            </TextContainer>
            <ScrollyTellingViz />
            <TextContainer isGenderLensActive={isGenderLensActive}>
              <P marginBottom='none' size='lg'>
                There is little evidence of gender inequality in birth registration. Across almost
                all countries with available data, boys and girls are registered at similar rates.
                This suggests that the remaining gaps primarily reflect inequalities in access to
                registration systems rather than differences between girls and boys.
              </P>
            </TextContainer>
            <WaveDivider src='/imgs/dividers/inclusion-04.webp' align='right' />
          </>
        ),
      },
      {
        id: '02',
        title: 'Representation in the legislature',
        indicatorCode: '16.7.1 (a)',
        heading:
          'Women hold only one in four parliamentary seats, and continue to face persistent barriers in accessing the highest levels of political leadership',
        anchor: 'representation-in-the-legislature',
        isGenderLens: true,
        content: (
          <>
            <TextContainer isGenderLensActive={isGenderLensActive}>
              <P marginBottom='none' size='lg'>
                As societies confront increasingly complex challenges from climate change and
                conflict to economic insecurity and technological change, it is important that
                political decision-making reflects the diversity{' '}
                <InfoTooltip
                  trigger='of the populations it serves'
                  content='This indicator measures the representation of women and young people in national parliaments. However, inclusive representation extends beyond age and sex. Legislatures should also reflect other diversity including persons with disabilities, Indigenous Peoples, ethnic minorities and other population groups. Data on these dimensions remain limited because of differences in legal frameworks, privacy protections, self-identification practices and parliamentary reporting systems.'
                  color='tertiary'
                />
                . Women and younger representatives bring{' '}
                <InfoTooltip
                  trigger='different lived experiences and policy priorities'
                  content="Young leaders tend to have different priorities from their counterparts, typically leaning towards social spending related to their cohort's long-term future, such as climate change, and women leaders often favour investments in education and childcare, and influence gender-sensitive policy discussions in parliaments."
                  color='tertiary'
                />
                , helping to broaden parliamentary debate and strengthen the responsiveness of
                public policy.
              </P>
            </TextContainer>
            <TextContainer isGenderLensActive={isGenderLensActive}>
              <P marginBottom='none' size='lg'>
                Despite steady progress over the past decade, parliaments remain far from reflecting
                the populations they represent. As of 2026, women held 27.5 per cent of
                parliamentary seats globally, a modest increase from 27.2 per cent in 2025.
                Representation remains even lower in parliamentary leadership, where women accounted
                for 19.9 per cent of Speakers of Parliament in 2026, a decline of 3.8 percentage
                points from the previous year. There are pronounced regional differences. Women's
                representation is highest in the Americas, where women hold 35.6 per cent of
                parliamentary seats. By contrast, women hold only 16.2 per cent of seats in the
                Middle East and North Africa.
              </P>
            </TextContainer>
            <GraphContainer>
              <ParliamentaryLeadershipByCategoryBarChart />
            </GraphContainer>
            <TextContainer>
              <Highlight
                color='tertiary'
                content='Young people remain underrepresented in political decision-making'
              />
              <P marginBottom='none' size='lg'>
                Age gaps in representation are even more pronounced. While people aged 18 to 40
                account for around one third of the world's adult population, they represent only 19
                per cent of parliamentarians globally. Although this is an important improvement
                from 12.9 per cent in 2014, progress has slowed considerably in recent years, with
                only minimal gains since 2023. Youth representation is also highest in the Americas,
                with MPs aged 40 or younger accounting for 23.5 per cent of parliamentarians. The
                Pacific records the lowest levels of youth representation, with MPs aged 30 or
                younger accounting for just 2.0 per cent of parliamentarians and those aged 40 or
                younger only 12.0 per cent.
              </P>
              <Highlight
                color='tertiary'
                content='Progress among younger generations offers some grounds for optimism'
              />
            </TextContainer>
            <TextContainer isGenderLensActive={isGenderLensActive}>
              <P marginBottom='none' size='lg'>
                Younger generations of parliamentarians are, however, considerably more gender
                balanced than older ones. Women account for 43.5 per cent of all MPs aged 30 years
                or younger and 36.2 per cent of those aged 40 years or younger. These patterns
                suggest that gender balance in parliaments may continue to improve as younger
                cohorts enter political office.
              </P>
            </TextContainer>
            <Spacer size='2xl' />
            <ImpactStoryEl id='inclusion-benin-womens-representation' color='tertiary' />
            <Spacer size='6xl' />
          </>
        ),
      },
      {
        id: '03',
        title: 'Representation in public service and the judiciary',
        indicatorCode: '16.7.1 (b) and (c)',
        heading:
          'Women also remain underrepresented in the public service and judiciary despite broader gains in representation',
        anchor: 'representation-in-public-service-and-judiciary',
        isGenderLens: true,
        content: (
          <>
            <TextContainer isGenderLensActive={isGenderLensActive}>
              <P marginBottom='none' size='lg'>
                Women's representation in the public service and the judiciary has improved across
                many countries, yet this progress has not consistently translated into equal
                representation. Globally, women remain underrepresented relative to their share of
                the population in both the public service and the judiciary, with representation
                ratios of 0.80 and 0.88, respectively, compared with{' '}
                <InfoTooltip
                  trigger='parity at 1.00'
                  content='SDG indicator 16.7.1 is based on the ratio between the share of a specific population group in parliament (a), public service (b), and judiciary (c), and the share of the same group in the population. A value of 1 indicates parity, while a value under 1 indicates underrepresentation and over 1 indicates overrepresentation.'
                  color='tertiary'
                />
                . Put simply, a ratio of 0.80 means that women have achieved only 80 per cent of the
                representation they would have if their share in public institutions matched their
                share of the population.
              </P>
            </TextContainer>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Progress also remains uneven across regions and income groups. Countries that have
                achieved or approached parity are concentrated primarily among high-income
                countries, while many middle- and low-income countries continue to lag behind.
              </P>
            </TextContainer>
            <GraphContainer>
              <RepresentationByRegionAndIncomeGroupsBarChart />
            </GraphContainer>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Recent advances in data collection provide new evidence on how representation is
                distributed within institutions.
              </P>
              <Highlight
                color='tertiary'
                className={isGenderLensActive ? 'gender-lens' : undefined}
                content='Women are often well represented, and in some cases
                overrepresented, in entry-level and administrative roles within the public service.
                Their representation, however, declines at higher levels of decision-making.'
              />
              <P marginBottom='none' size='lg'>
                Similar patterns are observed across judicial systems, where women tend to be better
                represented in lower courts than in constitutional and supreme courts.
              </P>
            </TextContainer>
            <GraphContainer>
              <RepresentationByInstitutionalLevelBarChart />
            </GraphContainer>
            <TextContainer isGenderLensActive={isGenderLensActive}>
              <P marginBottom='none' size='lg'>
                The evidence suggests that achieving inclusive governance requires more than
                improving overall representation. It requires ensuring that women have equal
                opportunities to advance into leadership and decision-making roles across public
                institutions.
              </P>
            </TextContainer>
            <Spacer size='2xl' />
            <ImpactStoriesContainer>
              <VizCarousel
                vizWidth='full'
                autoScroll={3000}
                classNames={{
                  arrowButton:
                    'border border-stroke bg-background hover:bg-background-soft [&.opacity-disabled]:pointer-events-none [&.opacity-disabled]:bg-transparent [&.opacity-disabled]:opacity-30',
                  arrows: 'text-foreground',
                  content: '[&_p]:hidden!',
                  progressBar: 'hidden!',
                  progressBarBg: 'hidden!',
                }}
                styles={{ arrows: { strokeWidth: 1.5 } }}
                slides={[
                  'inclusion-armenia-representation-data',
                  'inclusion-bosnia-herzegovina-institutional-change',
                  'inclusion-bangladesh-judicial-leadership',
                ].map((storyId) => ({
                  content: null,
                  viz: (
                    <ImpactStoryEl key={storyId} id={storyId} color='tertiary' asChild={false} />
                  ),
                }))}
              />
            </ImpactStoriesContainer>
            <Spacer size='6xl' />
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
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Discrimination remains a significant barrier to inclusive societies. It continues to
                affect millions of people worldwide, limiting access to opportunities, services and
                participation in public life. Globally, nearly one in five people report having
                personally experienced discrimination during the previous 12 months.
              </P>
            </TextContainer>
            <TextContainer isGenderLensActive={isGenderLensActive}>
              <P marginBottom='none' size='lg'>
                Women and men self-report similar overall levels of discrimination. However, women
                are more likely to report discrimination based on gender, reflecting persistent
                inequalities that often intersect with disability, income, education and minority
                status.
              </P>
            </TextContainer>
            <TextContainer>
              <Highlight
                color='tertiary'
                content='Discrimination is concentrated among already vulnerable groups'
              />
              <P marginBottom='none' size='lg'>
                Persons with disabilities experience some of the highest levels of discrimination,
                with nearly one in three reporting discrimination during the previous 12 months.
                Available evidence also suggests that levels of discrimination are consistently
                higher among people with lower levels of income and education.
              </P>
            </TextContainer>
            <TextContainer isGenderLensActive={isGenderLensActive}>
              <Highlight
                color='tertiary'
                className={isGenderLensActive ? 'gender-lens' : undefined}
                content='Newly collected data on sexual orientation and gender identity provide additional insights into forms of exclusion that have historically been difficult to measure'
              />
              <P marginBottom='none' size='lg'>
                Across countries where such data are available, transgender and gender-diverse
                individuals frequently report the highest levels of discrimination, often exceeding
                60 per cent, while people identifying as sexual minorities report discrimination
                rates 2.2 times higher than the population average.
              </P>
            </TextContainer>
            <TextContainer>
              <GraphContainer>
                <DiscriminationRatesByGroupBarChart />
              </GraphContainer>
              <P marginBottom='none' size='lg'>
                The availability of data on discrimination has improved considerably in recent
                years, enabling more detailed analysis across population groups. However, important
                gaps remain. Fewer than half of reporting countries provide data disaggregated by
                income, education or migration status, and only a limited number collect information
                on sexual orientation and gender identity. As a result, some of the most severe
                forms of exclusion remain insufficiently documented.
              </P>
            </TextContainer>
            <Spacer size='2xl' />
            <ImpactStoryEl id='inclusion-mexico-discrimination-data' color='tertiary' />
            <Spacer size='6xl' />
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
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Public budgets translate government priorities into investments in public services,
                infrastructure and social protection. The extent to which governments implement
                approved budgets as planned provides an important measure of institutional
                effectiveness to deliver on policy commitments.
              </P>
              <P marginBottom='none' size='lg'>
                Following the disruptions caused by the COVID-19 pandemic, governments have made
                steady progress in improving budget reliability and expenditure forecasts. The
                global average absolute deviation between approved and actual government
                expenditure, which captures both overspending and underspending relative to the
                approved budget, declined from 12.6 per cent in 2020 to 10.2 per cent in 2024.
                Moreover, budget reliability remains weaker in lower-income countries. Between 2021
                and 2024, low-income countries recorded the largest budget deviations between
                approved and actual expenditure, with median deviations of around 11.8 per cent. By
                contrast, most high-income and upper-middle-income countries generally maintained
                deviations below 7 per cent.
              </P>
            </TextContainer>
            <GraphContainer>
              <BudgetDeviationByIncomeGroupLineChart />
            </GraphContainer>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Implementing approved budgets is only one part of effective governance. Ultimately,
                effective governance is reflected in whether people can access high-quality public
                services and whether those services meet their needs.
              </P>
            </TextContainer>
            <WaveDivider src='/imgs/dividers/inclusion-01.webp' />
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
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Across healthcare, education and{' '}
                <InfoTooltip
                  trigger='government services'
                  content="These include services to obtain government-issued identification documents such as national identity cards, passports, driver's licenses and voter's cards, and services for the civil registration of life events such as births, marriages and deaths."
                  color='tertiary'
                />
                , the quality of public services has become a defining feature of how individuals
                experience and interact with their governments.
              </P>
              <P marginBottom='none' size='lg'>
                Among countries with available data, satisfaction ranges from less than 10 per cent
                in some countries to over 90 per cent in others. These wide gaps suggest that access
                to quality public services remains highly uneven and that many people continue to
                face barriers to services that are essential for well-being and inclusion.
              </P>
            </TextContainer>
            <GraphContainer>
              <SatisfactionWithPublicServicesStripChart />
            </GraphContainer>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Healthcare provides the most comprehensive basis for global trend analysis, with
                trend data available for a subset of 95 countries.
              </P>
              <Highlight
                color='tertiary'
                content='Satisfaction with accessibility of healthcare has improved modestly over the past decade, but regional disparities remain pronounced.'
              />
              <P marginBottom='none' size='lg'>
                Countries in Eastern and South-Eastern Asia report the highest average satisfaction
                with 88.2 per cent, while Sub-Saharan Africa records the lowest with 46.4 per cent.
                These persistent differences show that, while progress has been made, access to
                quality public services remains highly unequal across countries.
              </P>
            </TextContainer>
            <GraphContainer>
              <HealthcareSatisfactionByRegionBarChart />
            </GraphContainer>
            <WaveDivider src='/imgs/dividers/inclusion-02.webp' align='right' />
          </>
        ),
      },
      {
        id: '07',
        title: 'Political voice and responsiveness',
        indicatorCode: '16.7.2',
        heading: 'Fewer than half of people feel they have a say in government decisions',
        anchor: 'political-efficacy',
        isGenderLens: true,
        content: (
          <>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Inclusive governance is not only about who institutions represent or the services
                they deliver. It is also about whether people feel they have a say in public
                decision-making and whether political systems allow them to have an{' '}
                <InfoTooltip
                  trigger='influence on politics'
                  content='The extent to which people feel they have a say in what their government does and influence politics is known as “external political efficacy” and reflects perceptions of how inclusive and responsive the political system is to people’s views and demands.'
                  color='tertiary'
                />
                .
              </P>
              <P marginBottom='none' size='lg'>
                Globally, less than half of people believe they have a say in what their government
                does, revealing a persistent gap between participation in public life and people's
                perception of inclusion in decision-making.
              </P>
              <Highlight
                color='tertiary'
                content='Some of the lowest levels are found in Europe and Northern America, where only around one in three people believe they have a say in government decisions'
              />
              <P marginBottom='none' size='lg'>
                Across regions, these perceptions differ by as much as 40 percentage points,
                demonstrating that inclusive decision-making remains an important challenge in many
                countries across the world.
              </P>
            </TextContainer>
            <GraphContainer>
              <PoliticalEfficacyByRegionBarChart />
            </GraphContainer>
            <TextContainer isGenderLensActive={isGenderLensActive}>
              <P marginBottom='none' size='lg'>
                Women are less likely than men to feel that they have a say in government decisions.
                Across 37 high-income countries with sex-disaggregated data, 27.3 per cent of women
                believe they have a say in what their government does, compared with 32.6 per cent
                of men.
              </P>
            </TextContainer>
            <WaveDivider src='/imgs/dividers/inclusion-03.webp' />
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
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Access to information is a cornerstone of inclusive and transparent governance. It
                enables people to understand how public decisions are made, scrutinize government
                action and participate more effectively in public life.
              </P>
              <P marginBottom='none' size='lg'>
                As of 2026, 141 UN Member States have adopted statutory guarantees for public access
                to information, compared with just 14 countries in 1990, reflecting a remarkable
                increase in the right to information. The most recent adopters include Senegal and
                Cuba adopting access to information laws in 2005 and in 2006, respectively.
              </P>
            </TextContainer>
            <GraphContainer size='lg'>
              <AccessToInformationChoroplethMap />
            </GraphContainer>
            <TextContainer>
              <Highlight
                color='tertiary'
                content='Legal guarantees, however, do not always translate into effective access in practice.'
              />
              <P marginBottom='none' size='lg'>
                In 2025, 49 out of 123 countries responding to the UNESCO annual survey reported
                almost 5.9 million access to information requests, demonstrating the growing use of
                these laws. Yet implementation remains challenging due to the absence of
                record-keeping systems, limited legal enforcement, lack of independent oversight
                bodies and designated institutional roles.
              </P>
              <P marginBottom='none' size='lg'>
                These implementation gaps are also reflected in the{' '}
                <InfoTooltip
                  trigger='first large-scale global assessment'
                  content={
                    <span>
                      Mendel, T. and Vagliano, R. (2025) Global Comparative Testing of Responses to
                      Requests for Information. Halifax, NS: Centre for Law and Democracy. Available
                      at:{' '}
                      <span className='break-all'>
                        https://www.law-democracy.org/wp-content/uploads/2025/09/IDUAI.report.25-09-26.pdf
                      </span>
                    </span>
                  }
                  color='tertiary'
                />{' '}
                into the effectiveness of access to information laws. Identical access to
                information requests were submitted across 76 countries, and fewer than half
                received full disclosure.
              </P>
            </TextContainer>
            <GraphContainer>
              <AccessToInformationDisclosureBigNumbers />
            </GraphContainer>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                These findings demonstrate that, while legal recognition of the right to information
                has become widespread, ensuring that this right can be effectively exercised remains
                a significant challenge.
              </P>
            </TextContainer>
            <WaveDivider src='/imgs/dividers/inclusion-01.webp' />
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
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Goal 16 extends beyond national institutions. Inclusive and effective global
                governance also depends on whether international institutions reflect the voices and
                interests of all countries. Despite repeated commitments to strengthen the
                participation of developing countries in international decision-making, progress has
                been limited.
              </P>
              <P marginBottom='none' size='lg'>
                Today, developing countries hold 37 per cent of the voting rights in the
                International Monetary Fund and 39 per cent in the World Bank, despite accounting
                for 75 per cent of the membership of both institutions. Recent reviews of voting
                rights at both organizations concluded without agreement on further realignment,
                highlighting the growing difficulty of reforming global governance in an
                increasingly fragmented geopolitical environment.
              </P>
            </TextContainer>
            <GraphContainer>
              <VoteSharesByInstitutionDumbbellChart />
            </GraphContainer>
            <WaveDivider src='/imgs/dividers/inclusion-02.webp' align='right' />
          </>
        ),
      },
      {
        id: '10',
        title: 'The role of institutions',
        indicatorCode: '',
        heading:
          'Inclusive societies are ensured through substantive representation and transparency',
        anchor: 'role-of-institutions',
        content: (
          <>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Institutions play a crucial role in ensuring that all people are recognized,
                represented and able to participate meaningfully in public life. The evidence
                presented across these indicators highlights the many ways in which institutions
                shape inclusion, equal participation and equitable access to opportunities and
                services. Whether people feel included depends heavily on the ability of
                institutions to recognize individuals, protect their rights and respond to their
                needs.
              </P>
              <P marginBottom='none' size='lg'>
                Inclusive institutions ensure that every person is legally recognized through a
                legal identity, protected from discrimination, represented in public
                decision-making, able to access information and public services on equal terms, and
                empowered to participate in decisions that shape their lives. They also ensure that
                governments respond fairly and effectively to the needs of all people by delivering
                quality public services that are accessible, responsive and equitable, regardless of
                gender, age, disability, ethnicity, income or other characteristics. In doing so,
                inclusive institutions strengthen the relationship between people and the state by
                demonstrating that public institutions serve everyone fairly rather than a
                privileged few.
              </P>
              <P marginBottom='none' size='lg'>
                The indicators presented in this chapter illustrate both areas of progress and
                persistent gaps in achieving these objectives. They show the extent to which people
                are legally recognized, represented in public institutions, protected from
                discrimination and able to access public services and information. Together, they
                provide a picture of how effectively institutions promote inclusion and support
                meaningful participation in society.
              </P>
              <P marginBottom='none' size='lg'>
                When institutions function effectively, they help reduce barriers, expand
                opportunities and strengthen social cohesion. When institutions fail to share power
                equitably, exclusion deepens, discrimination persists, public services become less
                responsive, and decisions become less representative of the societies they serve.
                Trust in public institutions erodes as people lose confidence that they are
                recognized, treated equally and able to influence public decisions. Building
                inclusive societies therefore requires institutions that not only serve people, but
                also ensure that everyone has a place, a voice and an equal opportunity to
                participate in shaping their future.
              </P>
            </TextContainer>
            <Spacer size='6xl' />
          </>
        ),
      },
    ],
    [isGenderLensActive],
  );

  return (
    <>
      <ChapterSubNav chapterTitle='Inclusion' label='Chapter' subsections={sections} />

      <ChapterHero
        chapterNumber={3}
        bg='/imgs/chapters/inclusion-hero.webp'
        title='Inclusion'
        intro={
          <>
            Inclusive societies are built on institutions that recognize, represent and serve all
            people equally, and that enable everyone to participate meaningfully in public life.
            Such institutions strengthen trust, social cohesion and the legitimacy of governance.
            While inclusion is a broad concept that cannot be fully captured by a single set of
            indicators, Goal 16 measures several of its most fundamental dimensions.
          </>
        }
        color='tertiary'
        subsections={sections}
      />
      <TargetsDrawer
        chapterTitle='Inclusion'
        bg='/imgs/chapters/inclusion-texture.webp'
        color='tertiary'
        targets={chaptersTargetList.inclusion}
      />
      <Spacer size='8xl' />
      <div className='flex flex-col'>
        {sections.map((section) => (
          <Section
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
          </Section>
        ))}
      </div>

      <ChapterEndNav
        label='Next'
        title='SDG 16 Progress'
        to='/report/sdg16-progress'
        color='tertiary'
      />
    </>
  );
}

export const Route = createLazyRoute('/report/inclusion')({
  component: Inclusion,
});
