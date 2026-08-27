import { createLazyRoute } from '@tanstack/react-router';
import { Badge } from '@undp/design-system-react/Badge';
import { Spacer } from '@undp/design-system-react/Spacer';
import { P } from '@undp/design-system-react/Typography';
import { useMemo } from 'react';
import PlaceholderBlock from '@/components/PlaceholderBlock';
import { CHART_PADDING } from '@/constants';
import standards from '@/data/sdg16-progress/standards.json';
import ChapterEndNav from '@/routes/chapters/components/ChapterFooter';
import { GraphContainer, TextContainer } from '@/routes/chapters/components/Containers';
import ChapterHero from '@/routes/chapters/components/HeroBanner';
import Section from '@/routes/chapters/components/Section';
import ChapterSubNav from '@/routes/chapters/components/SubNav';
import WaveDivider from '../chapters/components/WaveDivider';
import DisaggregationTable from './DisaggregationTable';

export function SDG16Progress() {
  const sections = useMemo(
    () => [
      {
        id: '01',
        title: 'Data availability',
        heading: 'Progress in data availability, but major gaps remain',
        anchor: 'data-availability',
        content: (
          <>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                The data used to monitor the SDG 16 indicators are drawn from a combination of
                administrative records and household surveys, each of which plays a distinct role in
                capturing different dimensions of peace, justice and inclusive governance.
              </P>
              <P marginBottom='none' size='lg'>
                Administrative data can provide regular, timely and cost-effective information and
                are essential for monitoring many SDG16 indicators. Over the past decade, many
                countries have strengthened administrative systems and improved reporting
                mechanisms, contributing to substantial gains in data availability. However,
                challenges remain. Data are often spread across multiple institutions with different
                mandates and information systems, while variations in definitions, recording
                practices and data-sharing arrangements can limit comparability and use. In
                addition, administrative records capture only those individuals and events that come
                into contact with public institutions. This is a particularly important limitation
                for areas such as violence, corruption and access to justice, where many incidents
                remain unreported. Furthermore, administrative data can show who uses public
                services and institutions, but they often provide limited insight into people's
                experiences, perceptions and levels of satisfaction.
              </P>
              <P marginBottom='none' size='lg'>
                Household surveys complement administrative records by capturing experiences and
                perceptions that are not reflected in official systems. They make it possible to
                understand experiences of violence and discrimination, bribery, perceptions of
                safety and trust, satisfaction with public services and whether people feel they
                have a say in government decision-making. However, nationally representative surveys
                require substantial financial resources and are often conducted infrequently.
              </P>
              <P marginBottom='none' size='lg'>
                Recognizing the important challenges around household surveys, the SDG 16 Survey
                Initiative, jointly developed by UNDP, UNODC and OHCHR, was designed to support
                countries in collecting comparable survey data across multiple SDG 16 indicators
                through a single integrated survey instrument. By reducing the need for separate
                data collection exercises, the initiative helps lower costs, improve international
                comparability and support the regular production of data on governance, justice,
                security and human rights.
              </P>
              <P marginBottom='none' size='lg'>
                Despite considerable progress over the past decade, data availability continues to
                vary significantly across SDG 16 indicators. While some indicators now have
                near-global coverage, others remain available for only a limited number of
                countries. Closing these gaps will require sustained investment in national
                statistical capacity, stronger institutional coordination, continued implementation
                of internationally agreed methodologies, and greater integration of SDG 16
                indicators into national statistical programmes.
              </P>
            </TextContainer>
            <GraphContainer>
              <PlaceholderBlock label='Figure' />
            </GraphContainer>
            <GraphContainer size='lg'>
              <div className='flex flex-col gap-4' style={{ padding: CHART_PADDING }}>
                <P marginBottom='none' className='font-heading font-semibold leading-sm'>
                  Standards, classification and methodological products
                </P>
                <div className='grid gap-x-6 md:grid-cols-[5rem_1fr_18rem]'>
                  <div className='hidden pb-3 md:contents'>
                    <P
                      size='xs'
                      marginBottom='none'
                      weight='semibold'
                      className='pb-3 text-content-secondary uppercase tracking-wider'
                    >
                      Year
                    </P>
                    <P
                      size='xs'
                      marginBottom='none'
                      weight='semibold'
                      className='pb-3 text-content-secondary uppercase tracking-wider'
                    >
                      Publication
                    </P>
                    <P
                      size='xs'
                      marginBottom='none'
                      weight='semibold'
                      className='pb-3 text-content-secondary uppercase tracking-wider'
                    >
                      Related targets
                    </P>
                  </div>
                  {standards.map((standard) => (
                    <div key={standard.publication} className='contents'>
                      <P
                        size='sm'
                        marginBottom='none'
                        className='border-content-reverse border-t py-4 text-content-secondary'
                      >
                        {standard.year}
                      </P>
                      <P
                        size='sm'
                        marginBottom='none'
                        className='border-content-reverse border-t py-4'
                      >
                        {standard.publication}
                      </P>
                      <div className='flex flex-wrap content-start items-start gap-2 border-content-reverse border-t py-4'>
                        {standard.targets.map((target) => (
                          <Badge key={target} variant='outline' size='sm' rounded='md'>
                            {target}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GraphContainer>
            <WaveDivider src='/imgs/dividers/peace-01.webp' />
          </>
        ),
      },
      {
        id: '02',
        title: 'Disaggregation',
        heading: 'Better coverage does not yet mean more inclusive data',
        anchor: 'disaggregation',
        content: (
          <>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Improvements in overall data availability have not been matched by equivalent
                progress in data disaggregation. The commitment to leave no one behind requires data
                that make it possible to identify disparities not only between countries, but also
                among population groups within countries.
              </P>
              <P marginBottom='none' size='lg'>
                The global indicator framework specifies different disaggregation requirements
                depending on the indicator and the policy issue being measured. Understanding which
                disaggregated data are currently available and reported is therefore important for
                assessing how well existing data can be used to identify inequalities and monitor
                inclusion. As shown in Table X, sex and age are the most commonly reported forms of
                disaggregation across SDG 16 indicators. By contrast, data disaggregated by
                disability status, migratory status, and population groups remain far less common.
                Consequently, countries may be able to report on overall national progress while
                lacking sufficient information needed to identify and understand inequalities
                affecting specific groups.
              </P>
              <P marginBottom='none' size='lg'>
                There are encouraging examples of progress. Several SDG 16 indicators, particularly
                those on discrimination, public service satisfaction and representation in public
                institutions increasingly support more detailed disaggregation are beginning to
                provide greater insight into inequalities within countries. Nevertheless,
                significant gaps remain.
              </P>
              <P marginBottom='none' size='lg'>
                Strengthening the availability and reporting of disaggregated data, in line with
                internationally agreed standards and principles of self-identification, privacy and
                statistical confidentiality, will be essential for ensuring that SDG 16 monitoring
                captures not only overall progress but also who is being left behind. As countries
                continue to institutionalize SDG 16 measurement, expanding the coverage and use of
                disaggregated data will be critical for informing more inclusive policies and
                decision-making.
              </P>
            </TextContainer>
            <GraphContainer size='lg'>
              <DisaggregationTable />
            </GraphContainer>
            <WaveDivider src='/imgs/dividers/peace-02.webp' align='right' />
          </>
        ),
      },
      {
        id: '03',
        title: 'The role of institutions',
        heading: 'The role of institutions in sustainable SDG 16 monitoring',
        anchor: 'role-of-institutions',
        content: (
          <>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                One of the most important achievements of the past decade has been demonstrating
                that complex dimensions of peace, justice, governance, human rights and inclusion
                can be measured through official statistics. Through sustained collaboration between
                custodian agencies, national statistical offices and other national institutions,
                methodological standards, survey instruments, implementation guidance and reporting
                mechanisms have been developed for all SDG 16 indicators. These efforts have helped
                transform areas once considered difficult to measure into areas that can
                increasingly be monitored in a systematic and internationally comparable manner.
              </P>
              <P marginBottom='none' size='lg'>
                The next challenge is sustainability. Regular production of SDG 16 data requires
                predictable financing, skilled personnel, digital infrastructure, and continued
                technical support. It also requires embedding SDG 16 indicators within routine data
                collection systems, including both household surveys and administrative records, so
                that data are produced consistently over time rather than through one-off reporting
                exercises.
              </P>
              <P marginBottom='none' size='lg'>
                Producing SDG 16 data is an inherently institutional undertaking. Unlike indicators
                that can be produced from a single statistical source, SDG 16 monitoring often
                relies on information generated by ministries of justice, police services, courts,
                prison administrations, electoral management bodies, national human rights
                institutions and other public authorities, in addition to national statistical
                offices. Producing coherent and comparable statistics therefore requires effective
                coordination, clear institutional mandates, common standards and robust mechanisms
                for data sharing and use across government.
              </P>
              <P marginBottom='none' size='lg'>
                National statistical offices play a central role in this process. As coordinators of
                national statistical systems, they help ensure the quality, consistency and
                comparability of data produced by different institutions and support the integration
                of SDG 16 indicators into national statistical programmes. Their coordinating role
                is particularly important given the cross-cutting nature of Goal 16 and the wide
                range of administrative and survey-based sources on which it depends.
              </P>
              <P marginBottom='none' size='lg'>
                Strengthening SDG 16 monitoring therefore requires investment in national
                statistical systems as a whole, rather than in individual indicators alone. Building
                sustainable capacity across data-producing institutions, strengthening partnerships
                between producers and users of data, and institutionalizing data-sharing
                arrangements will be essential for maintaining the progress achieved over the past
                decade. As 2030 approaches, ensuring that SDG 16 data are produced regularly, used
                in policymaking and embedded within national statistical systems will be critical
                for sustaining measurement of peace, justice and inclusive governance beyond 2030.
              </P>
              <Spacer size='6xl' />
            </TextContainer>
          </>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <ChapterSubNav
        chapterTitle='SDG 16 Progress'
        color='default'
        showGenderLens={false}
        subsections={sections}
      />

      <ChapterHero
        label='Global Progress Report 2026'
        bg='/imgs/chapters/peace-hero.webp'
        title='Measuring SDG 16 Progress: Remaining challenges'
        intro={
          <>
            When the 2030 Agenda for Sustainable Development was adopted in 2015, many of the issues
            covered by Goal 16 were not yet routinely measured through official statistics. A decade
            later, the monitoring landscape has changed significantly — but important data gaps
            remain.
          </>
        }
        color='default'
        subsections={sections}
      />
      <Spacer size='8xl' />
      <TextContainer>
        <P marginBottom='none' size='lg'>
          When the 2030 Agenda for Sustainable Development was adopted in 2015, many of the issues
          covered by Goal 16 were not yet routinely measured through official statistics. Areas such
          as conflict-related deaths, violence against children, discrimination and violence against
          human rights defenders, illicit financial and arms flows, representation in public
          institutions and the judiciary, and inclusive decision-making were all recognized as
          important for sustainable development, but internationally agreed statistical standards
          and methodologies for measuring these concepts were often lacking. As a result,
          significant methodological development and capacity-building efforts were needed to enable
          countries to produce comparable and reliable data.
        </P>
        <P marginBottom='none' size='lg'>
          This challenge was reflected in the initial classification of the SDG indicator framework.
          In 2016, 8 of the 23 indicators under Goal 16 were classified as Tier III, meaning that no
          internationally established methodology or standards were available to support regular
          data production and international comparability. The expansion of the framework also
          brought new measurement challenges. In 2020, indicator 16.3.3 was added to the global
          indicator framework, and at the time of its adoption, an internationally agreed
          methodology had not yet been established.
        </P>
        <P marginBottom='none' size='lg'>
          A decade later, the monitoring landscape of Goal 16 has changed significantly. Custodian
          agencies, in close collaboration with national statistical offices and other national
          institutions, have developed methodologies, survey tools, administrative data standards
          and reporting mechanisms. At the same time, countries have also expanded their capacities
          to collect and report data across a range of areas related to peace, justice, governance,
          human rights and inclusion.
        </P>
        <P marginBottom='none' size='lg'>
          These collective efforts and investments have translated into substantial improvements in
          data availability. In the 2026 reporting cycle, 58.9 per cent of countries had reported
          data for at least one indicator under each SDG 16 target since 2015, up from 40 per cent
          in 2023 and 22.4 per cent in 2019.
        </P>
        <P marginBottom='none' size='lg'>
          Despite these gains, important data gaps remain. While methodologies are now available for
          all SDG 16 indicators, many countries do not produce SDG 16 data regularly enough to
          monitor change over time. Coverage also remains uneven across indicators, particularly for
          those that rely on specialized surveys or coordination across multiple institutions. As
          2030 approaches, the priority is therefore no longer simply to measure Goal 16, but to
          institutionalize its measurement within national statistical systems and governance
          processes. Strengthening the regular production, use and dissemination of SDG 16 data will
          be essential not only for monitoring global progress, but also for informing
          evidence-based policies that advance peaceful, just and inclusive societies.
        </P>
      </TextContainer>
      <GraphContainer size='lg'>
        <div className='flex flex-col gap-4' style={{ padding: CHART_PADDING }}>
          <PlaceholderBlock label='Figure' />
        </div>
      </GraphContainer>
      <Spacer size='8xl' />
      <div className='flex flex-col'>
        {sections.map((section) => (
          <Section
            key={section.anchor}
            id={section.anchor}
            tag={section.title}
            heading={section.heading}
            color='default'
          >
            {section.content}
          </Section>
        ))}
      </div>

      <ChapterEndNav label='Back to' title='Home' to='/' color='default' />
    </>
  );
}

export const Route = createLazyRoute('/sdg16-progress')({
  component: SDG16Progress,
});
