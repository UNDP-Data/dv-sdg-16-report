import { createLazyRoute } from '@tanstack/react-router';
import { Spacer } from '@undp/design-system-react/Spacer';
import { P } from '@undp/design-system-react/Typography';
import { useMemo } from 'react';
import PlaceholderBlock from '@/components/PlaceholderBlock';
import chaptersTargetList from '@/data/chapters/chaptersTargetList.json';
import ImpactStoryEl from '@/routes/chapters/components/ImpactStoryEl';
import { useIsGenderLensActive } from '@/stores/chapterStore';
import ChapterEndNav from '../components/ChapterFooter';
import { GraphContainer, TextContainer } from '../components/Containers';
import ChapterHero from '../components/HeroBanner';
import Highlight from '../components/Highlight';
import InfoTooltip from '../components/InfoTooltip';
import Section from '../components/Section';
import ChapterSubNav from '../components/SubNav';
import TargetsDrawer from '../components/TargetDrawer';
import WaveDivider from '../components/WaveDivider';
import DisputeResolutionAccessStripChart from './charts/DisputeResolutionAccessStripChart';
import NHRIComplianceChoroplethMap from './charts/NHRIComplianceChoroplethMap';
import ScrollyTellingViz from './ScrollyTellingViz';

export function Justice() {
  const isGenderLensActive = useIsGenderLensActive();
  const sections = useMemo(
    () => [
      {
        id: '01',
        title: 'Access to criminal justice',
        indicatorCode: '16.3.1',
        heading: 'More than half of violent crimes remain hidden from the justice system',
        anchor: 'access-to-criminal-justice',
        isGenderLens: true,
        content: (
          <>
            <ScrollyTellingViz />
            <TextContainer isGenderLensActive={isGenderLensActive}>
              <P marginBottom='none' size='lg'>
                Sex-disaggregated data remain limited globally, but available evidence suggests that
                reporting behaviour may differ between women and men in some regions. Across 12
                countries in Latin America and the Caribbean with available data, the median
                reporting rate for physical assault was 56 per cent for women compared with 30 per
                cent for men. Such clear differences are not observed in the limited data available
                for other regions.
              </P>
            </TextContainer>
            <WaveDivider src='/imgs/dividers/justice-01.webp' />
          </>
        ),
      },
      {
        id: '02',
        title: 'Access to civil justice',
        indicatorCode: '16.3.3',
        heading: 'More than 1.5 billion people are estimated to have unmet justice needs',
        anchor: 'access-to-civil-justice',
        content: (
          <>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                This means{' '}
                <InfoTooltip
                  trigger='1.5 billion people'
                  content='Measuring the Justice Gap: A People-Centered Assessment of Unmet Justice Needs Around the World, World Justice Project, 2023.'
                  color='secondary'
                />{' '}
                cannot obtain justice for everyday civil, administrative, or criminal justice
                problems, cannot access the opportunities and protections provided by the law, or
                live in extreme conditions of injustice.
              </P>
              <P marginBottom='none' size='lg'>
                Recent progress in measuring access to criminal justice has helped shed light on
                some of these challenges. More than 80 countries have produced data on whether
                victims of violence report crimes to competent authorities, providing valuable
                insights into barriers to accessing formal justice systems. By contrast, only 11
                countries have reported data on whether people facing civil disputes are able to
                access dispute-resolution mechanisms.
              </P>
              <Highlight
                color='secondary'
                content='Access to civil justice remains one of the least measured areas under Goal 16'
              />
              <P marginBottom='none' size='lg'>
                Among countries with available data, access to dispute resolution varies
                considerably. In some countries, fewer than half of people who experienced a civil
                dispute sought resolution through formal or informal mechanisms, while in others
                almost everyone did. Although based on a limited number of countries, these findings
                suggest that access to civil justice differs substantially across national contexts
                and underscores the need for more systematic measurement and internationally
                comparable data.
              </P>
            </TextContainer>
            <GraphContainer>
              <DisputeResolutionAccessStripChart />
            </GraphContainer>
            <WaveDivider src='/imgs/dividers/justice-02.webp' align='right' />
          </>
        ),
      },
      {
        id: '03',
        title: 'Unsentenced detention',
        indicatorCode: '16.3.2',
        heading:
          'One in three prisoners globally is held in detention without a sentence, with little progress over the past decade',
        anchor: 'unsentenced-detention',
        isGenderLens: true,
        content: (
          <>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                The right to a fair and timely trial is a fundamental component of justice and
                enshrined in international human rights law. Yet, in 2024 an estimated 11.6 million
                people were held in detention worldwide, corresponding to a prison population rate
                of 143 prisoners per 100,000 population.
              </P>
              <P marginBottom='none' size='lg'>
                Prison population rates varied considerably across regions, ranging from 51
                prisoners per 100,000 population in Central and Southern Asia to 281 in Latin
                America and the Caribbean, the highest rate globally.
              </P>
              <PlaceholderBlock label='Figure' />
              <P marginBottom='none' size='lg'>
                Despite efforts to strengthen access to justice and improve the efficiency of
                criminal justice systems, little progress has been made in reducing pre-trial
                detention globally. The share of unsentenced detainees has remained virtually
                unchanged over the past decade, at around 30 per cent, equivalent to approximately
                3.6 million people. Regional trends, however, varied considerably. Latin America and
                the Caribbean reduced the proportion of prisoners awaiting trial or sentencing,
                while the situation deteriorated in Central and Southern Asia.
              </P>
              <PlaceholderBlock label='Figure' />
            </TextContainer>
            <TextContainer isGenderLensActive={isGenderLensActive}>
              <Highlight
                color='secondary'
                content='Gender gaps in pre-trial detention are regional rather than global'
              />
              <P marginBottom='none' size='lg'>
                Globally, women and men were equally likely to be held in pre-trial detention, at
                around one third of detainees in both groups awaiting trial or sentencing. This
                share has remained largely unchanged since 2015. Beneath this global average,
                however, important regional differences emerge. In Northern Africa and Western Asia,
                35 per cent of women detainees were held unsentenced, compared with 23 per cent of
                men. A similar pattern was observed in Oceania, where nearly half of women detainees
                (49 per cent) were unsentenced, compared with 38 per cent of men.
              </P>
              <PlaceholderBlock label='Figure' />
            </TextContainer>
            <WaveDivider src='/imgs/dividers/justice-03.webp' />
          </>
        ),
      },
      {
        id: '04',
        title: 'Illicit financial flows',
        indicatorCode: '16.4.1',
        heading:
          'Corruption and illicit financial flows continue to erode the rule of law and divert billions of dollars away from sustainable development',
        anchor: 'illicit-financial-flows',
        content: (
          <>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Illicit financial flows (IFFs) are a global phenomenon that drain national resources
                that could otherwise be invested in public services, institutions and development.
                They deplete critical resources both when they exit a country (outflows) and when
                they enter (inflows), fuelling corruption, organized crime and terrorism.
              </P>
              <Highlight
                color='secondary'
                content='If redirected to the formal economy, illicit flows could serve as a vital source of
          funding for sustainable development initiatives and help bridge the financing gap.'
              />
              <P marginBottom='none' size='lg'>
                To date, official estimates of crime-related IFFs have been produced for nine
                countries.
              </P>
              <P marginBottom='none' size='lg'>
                For example, in Myanmar, the opiates economy generated an estimated US$564 million
                to US$974 million in potential inward IFFs in 2025, equivalent to 0.8 to 1.3 per
                cent of GDP. Along the Balkan drug trafficking route, proceeds from trafficking in
                opiates and methamphetamine were estimated to generate between US$3.4 billion and
                US$6.9 billion annually between 2019 and 2022.
              </P>
              <P marginBottom='none' size='lg'>
                The first official estimates of tax and commercial IFFs also point to substantial
                losses. Pilot studies in{' '}
                <InfoTooltip
                  trigger='selected African countries'
                  content='Pilot studies were undertaken for 23 countries globally.'
                  color='secondary'
                />{' '}
                indicate that trade-related IFFs account for between 5 and 30 per cent of the
                official value of goods trade.
              </P>
              <PlaceholderBlock label='Figure' />
              <P marginBottom='none' size='lg'>
                Effective responses require a whole-of-government approach that combines stronger
                legal and regulatory frameworks, enhanced tax transparency, and robust enforcement
                mechanisms. Equally important is enhanced cooperation and information exchange among
                domestic agencies as well as across borders through international frameworks.
              </P>
            </TextContainer>
            <Spacer size='2xl' />
            <ImpactStoryEl id='justice-ghana-iffs' color='secondary' />
            <Spacer size='6xl' />
          </>
        ),
      },
      {
        id: '05',
        title: 'Illicit firearms flows',
        indicatorCode: '16.4.2',
        heading:
          'Less than half of seized firearms are traced, limiting efforts to reduce illicit arms flows globally',
        anchor: 'illicit-firearms-flows',
        content: (
          <>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Tracing firearms, the process of identifying the illicit origin of seized, found,
                and surrendered arms, is a critical tool for combating illicit arms trafficking.
                Successful tracing helps authorities identify trafficking routes, detect diversion
                points, uncover criminal networks and prevent firearms from being used in future
                crimes.
              </P>
              <Highlight
                color='secondary'
                content='Only 46% of seized firearms were successfully traced between 2016 and 2024'
              />
              <P marginBottom='none' size='lg'>
                Tracing rates varied considerably across countries, regions and reporting years,
                reflecting differences in national tracing capacities, the volume of firearms
                seized, and the complexity of establishing the illicit origin of individual
                firearms.
              </P>
              <PlaceholderBlock label='Figure' />
              <Highlight color='secondary' content='Tracing has become increasingly challenging' />
              <P marginBottom='none' size='lg'>
                To conceal the origin of firearms, criminal groups increasingly rely on illicit
                manufacturing methods, including counterfeit production, 3D printing and artisanal
                manufacture as well as the modification of non-lethal/less-lethal weapons (e.g. gas
                and blank firing, alarm or signal weapons) into firearms, often accompanied by the
                alteration and falsification of original markings. In conflict settings, the
                diversion of weapons through battlefield capture further complicates tracing
                efforts.
              </P>
              <P marginBottom='none' size='lg'>
                Progress in tracing depends heavily on robust marking and record-keeping systems.
                However, even in regions with relatively strong reporting systems, such as Europe
                and Northern America, and Latin America and the Caribbean, more than half of
                reporting countries recorded tracing rates below the global average of 46 per cent.
              </P>
            </TextContainer>
            <WaveDivider src='/imgs/dividers/justice-04.webp' align='right' />
          </>
        ),
      },
      {
        id: '06',
        title: 'Bribery among the population',
        indicatorCode: '16.5.1',
        heading: 'Bribery remains widespread, with large differences across regions',
        anchor: 'bribery-among-the-population',
        content: (
          <>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Bribery can undermine trust in public institutions, distort access to public
                services and weaken confidence that laws are applied fairly. Among the 139 countries
                and territories with available data, the median{' '}
                <InfoTooltip
                  trigger='prevalence of bribery among the population'
                  content='The share of the population that had at least one contact with a public official in the past 12 months and paid or was asked to pay a bribe'
                  color='secondary'
                />{' '}
                was approximately 17 per cent. A subset of 63 countries with available trend data
                reveals a relatively stable global trend between the periods 2010–2017 and
                2018–2025.
              </P>
              <P marginBottom='none' size='lg'>
                This global picture masks large differences across regions. The highest median
                prevalence was recorded in Sub-Saharan Africa at 24 per cent and Central and
                Southern Asia at 22.5 per cent. In contrast, Europe and Northern America recorded
                the lowest median prevalence with only 9 per cent.
              </P>
              <Highlight
                color='secondary'
                content='Considerable variation within region and income group suggests that economic development
          alone does not determine corruption risks'
              />
              <P marginBottom='none' size='lg'>
                Bribery was most prevalent in low-income countries, where the median prevalence
                reached 27 per cent, compared with 9 per cent in high-income countries.
                Nevertheless, substantial variation exists within each income group, suggesting that
                economic development alone does not determine corruption risks. The quality of
                governance, institutional integrity and the effectiveness of anti-corruption
                measures also play an important role.
              </P>
              <PlaceholderBlock label='Figure' />
            </TextContainer>
            <WaveDivider src='/imgs/dividers/justice-01.webp' />
          </>
        ),
      },
      {
        id: '07',
        title: 'Bribery of businesses',
        indicatorCode: '16.5.2',
        heading: 'Businesses also continue to face bribery when interacting with public officials',
        anchor: 'bribery-of-businesses',
        content: (
          <>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Available evidence suggests that bribery is generally less common among businesses
                than among individuals when interacting with public officials. However, these
                findings should be interpreted with caution as businesses may be less willing to
                disclose bribery experiences due to concerns about potential legal, financial or
                reputational consequences. As a result, available estimates are likely to represent
                a lower bound of the true extent of business bribery.
              </P>
              <P marginBottom='none' size='lg'>
                The prevalence of bribery among businesses varies considerably across regions and
                income groups. Sub-Saharan Africa and Eastern and South-Eastern Asia recorded the
                highest median levels of business bribery, while Europe and Northern America
                recorded the lowest. Businesses operating in low-income countries reported the
                highest median prevalence of bribery at 18.6 per cent, compared with 2.4 per cent in
                high-income countries.
              </P>
              <Highlight color='secondary' content='Business bribery has declined over time' />
              <P marginBottom='none' size='lg'>
                Available trend data in a more limited set of countries suggest a moderate decline
                in business bribery across all income groups between 2010–2016 and 2017–2024. The
                largest improvements were observed in low-income countries, where the median
                prevalence fell from 21.0 per cent to 12.3 per cent, and in lower-middle-income
                countries, where it declined from 25.6 per cent to 16.8 per cent.
              </P>
              <PlaceholderBlock label='Figure' />
            </TextContainer>
            <WaveDivider src='/imgs/dividers/justice-03.webp' align='right' />
          </>
        ),
      },
      {
        id: '08',
        title: 'National human rights institutions',
        indicatorCode: '16.a.1',
        heading:
          'Progress had stalled in establishing National Human Rights Institutions compliant with the Paris Principles',
        anchor: 'national-human-rights-institutions',
        content: (
          <>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                In 2025, 89 countries had National Human Rights Institutions that were fully
                compliant (A status) with the{' '}
                <InfoTooltip
                  trigger=' Paris Principles'
                  content='The Paris Principles are a set of core minimum recommendations adopted by the United Nations General Assembly relating to the status and functioning of national institutions for the protection and promotion of human rights.'
                  color='secondary'
                />
                , representing 46 per cent of UN Member States and observers that are home to 55 per
                cent of the world's population. The number of fully compliant institutions has
                increased from 70 countries in 2015. A further 26 countries had institutions with
                partial compliance (B status).
              </P>
            </TextContainer>
            <GraphContainer size='lg'>
              <NHRIComplianceChoroplethMap />
            </GraphContainer>
            <TextContainer>
              <Highlight
                color='secondary'
                content='Current progress is too slow to achieve universal coverage'
              />
              <P marginBottom='none' size='lg'>
                Despite steady long-term gains, progress remains too slow to achieve universal
                coverage of fully compliant (A status) national human rights institutions. Since
                2015, the number of A status institutions has increased by an average of only two
                countries per year. At this pace, many countries will still lack fully compliant
                institutions by 2030. Accelerating progress will require not only establishing NHRIs
                where they do not yet exist, but also strengthening the independence, effectiveness,
                accessibility, and long-term sustainability of all NHRIs.
              </P>
            </TextContainer>
            <WaveDivider src='/imgs/dividers/justice-01.webp' />
          </>
        ),
      },
      {
        id: '09',
        title: 'The role of Institutions',
        indicatorCode: '',
        heading: 'The role of Institutions in ensuring access to justice for all',
        anchor: 'role-of-institutions',
        content: (
          <>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Taken together, the justice indicators point to a common institutional challenge:
                ensuring that people can access justice, exercise their rights and receive a fair
                and equal treatment under the law. Disputes are an inevitable part of any society.
                Injustice is not.
              </P>
              <P marginBottom='none' size='lg'>
                Whether people can obtain redress when their rights are violated depends on
                institutions that are accessible, impartial and capable of administering justice,
                upholding the rule of law, protecting human rights and ensuring accountability.
                Effective institutions provide mechanisms through which people can report crimes,
                resolve disputes and seek remedies, while safeguarding due process and ensuring that
                decisions are guided by law rather than by money, influence or status.
              </P>
              <P marginBottom='none' size='lg'>
                Justice also depends on trust. People are more likely to report crimes, seek redress
                for grievances and comply with laws when they believe institutions will treat them
                fairly and equally. Independent National Human Rights Institutions play a vital role
                in this institutional ecosystem by monitoring human rights, promoting accountability
                and helping ensure that governments fulfil their obligations under international
                human rights law. Equally important are institutions that combat corruption and
                organized crime, investigate financial crime, safeguard due process and ensure equal
                access to justice for all.
              </P>
              <P marginBottom='none' size='lg'>
                Building just societies therefore requires more than laws and formal institutions on
                paper. It requires institutions that people can access, that apply the law fairly,
                protect rights and hold both individuals and public authorities accountable. Where
                these conditions are weak, grievances can remain unresolved, rights unprotected and
                trust undermined. Where they are strong, institutions provide the mechanisms through
                which justice can be realized in practice.
              </P>
              <Spacer size='6xl' />
            </TextContainer>
          </>
        ),
      },
    ],
    [isGenderLensActive],
  );
  return (
    <>
      <ChapterSubNav
        chapterNumber={2}
        chapterTitle='Justice'
        color='secondary'
        subsections={sections}
      />

      <ChapterHero
        chapterNumber={2}
        bg='/imgs/chapters/justice-hero.webp'
        title='Justice'
        intro={
          <>
            Justice is a cornerstone of peaceful, inclusive and resilient societies. It ensures that
            people are treated equally under the law, that their rights are protected, and that
            disputes can be resolved fairly and peacefully. Under Goal 16, justice is measured
            through people's ability to access justice institutions, the extent to which laws are
            applied equally, and whether public institutions are accountable for their actions.
          </>
        }
        color='secondary'
        subsections={sections}
      />
      <TargetsDrawer
        chapterTitle='Justice'
        bg='/imgs/chapters/justice-texture.webp'
        color='secondary'
        targets={chaptersTargetList.justice}
      />
      <Spacer size='8xl' />
      <TextContainer>
        <P marginBottom='none' size='lg'>
          At its core, justice is about whether people can obtain fair and just outcomes when their
          rights are violated. Yet for millions, justice remains beyond reach.
        </P>
      </TextContainer>
      <WaveDivider src='/imgs/dividers/justice-02.webp' align='right' />
      <Spacer size='2xl' />
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
            color='secondary'
          >
            {section.content}
          </Section>
        ))}
      </div>

      <ChapterEndNav
        label='Next chapter'
        title='Inclusion'
        to='/chapters/inclusion'
        color='secondary'
      />
    </>
  );
}

export const Route = createLazyRoute('/chapters/justice')({
  component: Justice,
});
