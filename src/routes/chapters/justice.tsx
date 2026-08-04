import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { P } from '@undp/design-system-react/Typography';
import ChapterEndNav from '../../components/chapter/ChapterEndNav';
import ChapterHero from '../../components/chapter/ChapterHero';
import ChapterSubNav from '../../components/chapter/ChapterSubNav';
import Footnote from '../../components/chapter/Footnote';
import Highlight from '../../components/chapter/Highlight';
import PlaceholderBlock from '../../components/chapter/PlaceholderBlock';
import SectionHeading from '../../components/chapter/SectionHeading';
import { justiceMeta, ROUTES } from '../../constants';
import type { ChapterSection } from '../../types';

const justiceIntro =
  'At its core, justice is about whether people can obtain fair outcomes when their rights are violated. Yet many continue to face barriers to reporting victimization, accessing effective justice mechanisms and receive fair treatment. Globally, we see that institutions do not always adhere to the rule of law and respect human rights. Justice ultimately depends on whether these institutions deliver for the people they are meant to serve.';

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
        <PlaceholderBlock label='Scrollytelling' />
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
        <P marginBottom='none' size='lg'>
          Global estimates suggest that more than{' '}
          <Footnote
            note="World Justice Project (2023). Estimates draw on legal needs surveys conducted in 104 countries (covering 90.6 per cent of the world's population), with estimates for an additional 114 countries modelled using regional and income-group averages where survey data were unavailable."
            color={justiceMeta.color}
          >
            1.5 billion people worldwide
          </Footnote>{' '}
          have unmet justice needs. Access to civil justice affects people's everyday lives.
          Resolving disputes over housing, employment, land, inheritance or family matters is
          fundamental to protecting rights, preventing conflicts from escalating, and promoting
          social and economic well-being.
        </P>
        <Highlight color={justiceMeta.color}>
          Access to civil justice remains one of the least measured areas under Goal 16
        </Highlight>
        <P marginBottom='none' size='lg'>
          Despite the striking scale of the challenge, as of 2026 only 11 countries have collected
          comparable data on access to dispute-resolution mechanisms, limiting understanding of
          where barriers persist and which groups are being left behind.
        </P>
        <P marginBottom='none' size='lg'>
          Among countries with available data, access to dispute resolution varies considerably. In
          some countries, fewer than half of people who experienced a civil dispute sought
          resolution through formal or informal mechanisms, while in others almost everyone did.
          Although based on a limited number of countries, these findings suggest that access to
          civil justice differs substantially across national contexts and underscores the need for
          more systematic measurement and internationally comparable data.
        </P>
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
        <P marginBottom='none' size='lg'>
          The right to a fair and timely trial is a fundamental component of justice and enshrined
          in international human rights law. Yet, in 2024 an estimated 11.6 million people were held
          in detention worldwide, corresponding to a prison population rate of 143 prisoners per
          100,000 population.
        </P>
        <P marginBottom='none' size='lg'>
          Prison population rates varied considerably across regions, ranging from 51 prisoners per
          100,000 population in Central and Southern Asia to 281 in Latin America and the Caribbean,
          the highest rate globally.
        </P>
        <P marginBottom='none' size='lg'>
          Despite efforts to strengthen access to justice and improve the efficiency of criminal
          justice systems, little progress has been made in reducing pre-trial detention globally.
          The share of unsentenced detainees has remained virtually unchanged over the past decade,
          at around 30 per cent, equivalent to approximately 3.6 million people.
        </P>
        <P marginBottom='none' size='lg' className='gender-lens'>
          Regional and gendered patterns, however, have varied considerably. While men make up the
          majority of the global prison population, women account for a higher share of unsentenced
          prisoners in several regions.
        </P>
        <PlaceholderBlock label='Figure' />
        <P marginBottom='none' size='lg'>
          The global prevalence of overcrowding undermines human rights, restricts access to health
          care and legal services, and has well-documented consequences for health and mortality.
        </P>
        <Highlight color={justiceMeta.color}>
          In 2024, nearly two thirds of countries with available data reported prison populations
          exceeding their official prison capacity, while more than one quarter exceeded 150 per
          cent of intended capacity.
        </Highlight>
        <P marginBottom='none' size='lg'>
          These findings highlight the importance of implementing the United Nations Standard
          Minimum Rules for the Treatment of Prisoners (the Nelson Mandela Rules), including
          measures to reduce unnecessary pre-trial detention and expand alternatives to
          imprisonment.
        </P>
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
        <P marginBottom='none' size='lg'>
          Illicit financial flows (IFFs) are a global phenomenon that drain national resources that
          could otherwise be invested in public services, institutions and development. Their
          impacts are particularly severe in countries facing political instability, weak
          institutions and state capture. Both outflows and inflows can deplete a country's
          resources, instead fuelling corruption, organized crime and terrorism.
        </P>
        <Highlight color={justiceMeta.color}>
          If redirected to the formal economy, illicit flows could serve as a vital source of
          funding for sustainable development initiatives and help bridge the financing gap.
        </Highlight>
        <P marginBottom='none' size='lg'>
          To date, official estimates of crime-related IFFs have been produced for nine countries.
        </P>
        <P marginBottom='none' size='lg'>
          For example, in Myanmar, the opiates economy generated an estimated US$564 million to
          US$974 million in potential inward IFFs in 2025, equivalent to 0.8 to 1.3 per cent of GDP.
          Along the Balkan drug trafficking route, proceeds from trafficking in opiates and
          methamphetamine were estimated to generate between US$3.4 billion and US$6.9 billion
          annually between 2019 and 2022.
        </P>
        <P marginBottom='none' size='lg'>
          The first official estimates of tax and commercial IFFs also point to substantial losses.
          Pilot studies in{' '}
          <Footnote
            note='Pilot studies were undertaken on 23 countries globally, with UN support prioritized in developing countries. 14 countries of Africa led the way on the measurement of tax and commercial IFFs, and only a handful are reporting data for SDGs.'
            color={justiceMeta.color}
          >
            selected African countries
          </Footnote>{' '}
          indicate that trade-related IFFs account for between 5 and 30 per cent of the official
          value of goods trade.
        </P>
        <P marginBottom='none' size='lg'>
          Effective responses require a whole-of-government approach that combines stronger legal
          and regulatory frameworks, enhanced tax transparency, and robust enforcement mechanisms.
          Equally important is enhanced cooperation and information exchange among domestic agencies
          as well as across borders through international frameworks.
        </P>
        <PlaceholderBlock
          label='Data to impact story'
          title='Ghana Turns Illicit Financial Flows Data into Policy Action'
        />
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
        <P marginBottom='none' size='lg'>
          Tracing firearms, the process of identifying the illicit origin of seized, found, and
          surrendered arms, is a critical tool for combating illicit arms trafficking. Successful
          tracing helps authorities identify trafficking routes, detect diversion points, uncover
          criminal networks and prevent firearms from being used in future crimes.
        </P>
        <Highlight color={justiceMeta.color}>
          Only 46% of seized firearms were successfully traced between 2016 and 2024
        </Highlight>
        <P marginBottom='none' size='lg'>
          Tracing rates varied considerably across countries, regions and reporting years,
          reflecting differences in national tracing capacities, the volume of firearms seized, and
          the complexity of establishing the illicit origin of individual firearms.
        </P>
        <PlaceholderBlock label='Figure' />
        <Highlight color={justiceMeta.color}>
          Tracing has become increasingly challenging, limiting the ability to identify diversion
          patterns and reduce illicit arms flows.
        </Highlight>
        <P marginBottom='none' size='lg'>
          To conceal the origin of firearms, criminal groups increasingly rely on illicit
          manufacturing methods, including counterfeit production, artisanal manufacture as well as
          the modification of non-lethal/less-lethal weapons (e.g. gas and blank firing, alarm or
          signal weapons) into firearms. This is often accompanied by the alteration and
          falsification of original markings. In conflict settings, the diversion of weapons through
          battlefield capture further complicates tracing efforts.
        </P>
        <P marginBottom='none' size='lg'>
          Progress in tracing depends heavily on robust marking and record-keeping systems. However,
          even in regions with relatively strong reporting systems, such as Europe, Northern America
          and Latin America and the Caribbean, more than half of reporting countries recorded
          tracing rates below the global average of 46 per cent.
        </P>
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
        <P marginBottom='none' size='lg'>
          Bribery can undermine trust in public institutions, distort access to public services and
          weaken confidence that laws are applied fairly. In half of the 139 countries and
          territories with available data, at least 17 per cent of people who had contact with a
          public official during the previous 12 months either paid a bribe or were asked to pay
          one.
        </P>
        <P marginBottom='none' size='lg'>
          This global picture masks large differences across regions. The highest median prevalence
          was recorded in Sub-Saharan Africa with 24 per cent and Central and Southern Asia with
          22.5 per cent. In contrast, Europe and Northern America recorded the lowest median
          prevalence with only 9 per cent.
        </P>
        <Highlight color={justiceMeta.color}>
          Considerable variation within region and income group suggests that economic development
          alone does not determine corruption risks
        </Highlight>
        <P marginBottom='none' size='lg'>
          Bribery was most prevalent in low-income countries, where the median prevalence reached 27
          per cent, compared with 9 per cent in high-income countries. Nevertheless, substantial
          variation exists within each income group, suggesting that economic development alone does
          not determine corruption risks. The quality of governance, institutional integrity and the
          effectiveness of anti-corruption measures also play an important role.
        </P>
        <PlaceholderBlock label='Figure' />
        <P marginBottom='none' size='lg' className='gender-lens'>
          Data collection on SDG Indicator 16.5.1 – Bribery among the population is measured through
          household surveys, where survey frequency remains uneven. For this reason,
          sex-disaggregated data are only available for 23 countries between 2010 and 2024. Among
          them, the median prevalence was 12 per cent for women and 17 per cent for men.
        </P>
        <Highlight color={justiceMeta.color}>
          Looking at bribery among the population over time reveals that, among the 63 countries
          with comparable data, the global median prevalence of bribery has remained relatively
          stable.
        </Highlight>
        <P marginBottom='none' size='lg'>
          Comparing the earliest available data point in the period 2010–2017 with the latest
          available data point in the period 2018–2025 shows a slight increase from 12.1 per cent to
          14 per cent.
        </P>
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
        <P marginBottom='none' size='lg'>
          Corruption can increase the cost of doing business, distort competition and discourage
          investment. Evidence suggests that bribery is generally less common among businesses than
          among individuals interacting with public officials. However, concerns about legal or
          reputational consequences may lead to underreporting. As a result, estimates should be
          interpreted as a minimum estimate of the true extent of business bribery.
        </P>
        <P marginBottom='none' size='lg'>
          The prevalence of bribery among businesses varies considerably across regions and income
          groups. Sub-Saharan Africa and Eastern and South-Eastern Asia recorded the highest median
          levels of business bribery, while Europe and Northern America recorded the lowest.
          Businesses operating in low-income countries reported the highest median prevalence of
          bribery at 18.6 per cent, compared with 2.4 per cent in high-income countries.
        </P>
        <P marginBottom='none' size='lg'>
          These differences suggest that businesses operating in lower-income settings are more
          likely to encounter bribery when dealing with public officials. Countries reporting higher
          levels of bribery affecting businesses also tend to{' '}
          <Footnote
            note='In the sample of 121 countries and territories with at least one data point on population bribery prevalence and one data point on business bribery incidence in the period 2010-2025, the correlation is 0.6 and statistically significant (p < 0.001).'
            color={justiceMeta.color}
          >
            report higher levels of bribery experienced among the population
          </Footnote>
          . This suggests that corruption affecting businesses and households often reflects the
          same underlying governance and accountability challenges.
        </P>
        <Highlight color={justiceMeta.color}>Business bribery has declined over time</Highlight>
        <P marginBottom='none' size='lg'>
          Available trend data suggest a moderate decline in business bribery across all income
          groups between 2010–2016 and 2017–2024. The largest improvements were observed in
          low-income countries, where the median prevalence fell from 21.0 per cent to 12.3 per
          cent, and in lower-middle-income countries, where it declined from 25.6 per cent to 16.8
          per cent. Although these trends point to gradual progress and that efforts towards
          transparent governance and reducing corruption are paying off globally, bribery continues
          to affect businesses in many countries.
        </P>
        <PlaceholderBlock label='Figure' />
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
        <P marginBottom='none' size='lg'>
          In 2025, 89 countries had National Human Rights Institutions that were fully compliant
          with the Paris Principles, the internationally agreed standards that define their
          independence, mandate, effectiveness, and functioning. This represents 46 per cent of UN
          Member States and observers and covers 55 per cent of the world's population. A further 26
          countries had institutions with partial compliance.
        </P>
        <P marginBottom='none' size='lg'>
          The number of fully compliant institutions has increased from 70 countries in 2015.
          However, there was no net increase between 2024 and 2025, indicating that progress has
          stalled, as gains in some countries were offset by setbacks in others.
        </P>
        <PlaceholderBlock label='Figure' />
        <Highlight color={justiceMeta.color}>
          Current progress is too slow to achieve universal coverage
        </Highlight>
        <P marginBottom='none' size='lg'>
          Despite steady long-term gains, progress remains too slow to achieve universal coverage of
          fully compliant institutions by 2030. Since 2015, the number of fully compliant
          institutions has increased by an average of only two countries per year. Additionally,
          accreditation status alone does not fully capture how effectively institutions function in
          practice. Important aspects such as operational independence, resources, accessibility,
          responsiveness, and impact on human rights outcomes remain difficult to measure
          systematically and across different countries' contexts. Accelerating progress will
          require not only establishing National Human Rights Institutions where they do not yet
          exist but also strengthening the evidence base on institutional performance. In this way,
          one can ensure that full compliance translates into meaningful protection of human rights.
        </P>
      </>
    ),
  },
  {
    number: '09',
    title: 'The role of Institutions',
    heading: 'Building just societies through accessible, fair and accountable institutions',
    anchor: 'role-of-institutions',
    image: '/imgs/icons/the-role-of-institutions.png',
    content: (
      <>
        <P marginBottom='none' size='lg'>
          Content goes here
        </P>
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

      <div className='mx-auto max-w-2xl px-4 py-12 md:px-8 lg:px-16'>
        <P marginBottom='none' size='lg'>
          {justiceIntro}
        </P>
      </div>

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

      <ChapterEndNav
        label='Next chapter'
        title='Inclusion'
        to={ROUTES.inclusion}
        color={justiceMeta.color}
      />
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
