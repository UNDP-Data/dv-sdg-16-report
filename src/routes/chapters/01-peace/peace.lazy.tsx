import { createLazyRoute } from '@tanstack/react-router';
import { Spacer } from '@undp/design-system-react/Spacer';
import { P } from '@undp/design-system-react/Typography';
import { useMemo } from 'react';
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
import DefenderKillingsLineChart from './charts/DefenderKillingsLineChart';
import DefendersKilledByGroupRegionWaffle from './charts/DefendersKilledByGroupRegionWaffle';
import FeelSafeWalkingAloneByPeriodDumbbellChart from './charts/FeelSafeWalkingAloneByPeriodDumbbellChart';
import FeelSafeWalkingAloneBySexDumbbellChart from './charts/FeelSafeWalkingAloneBySexDumbbellChart';
import HomicideGenderedPatternsBigNumbers from './charts/HomicideGenderedPatternsBigNumbers';
import HomicideRateByRegionBarChart from './charts/HomicideRateByRegionBarChart';
import HomicideRateBySexLineChart from './charts/HomicideRateBySexLineChart';
import NonLethalViolenceByTypeSexStripChart from './charts/NonLethalViolenceByTypeSexStripChart';
import SexualViolenceInChildhoodUnitChart from './charts/SexualViolenceInChildhoodUnitChart';
import TraffickingByExploitationFormBigNumbers from './charts/TraffickingByExploitationFormBigNumbers';
import TraffickingVictimsBySexAgeStackedBar from './charts/TraffickingVictimsBySexAgeStackedBar';
import ViolentDisciplineByRegionBarChart from './charts/ViolentDisciplineByRegionBarChart';
import ScrollyTellingViz from './ScrollyTellingViz';

export function Peace() {
  const isGenderLensActive = useIsGenderLensActive();
  const sections = useMemo(
    () => [
      {
        id: '01',
        title: 'Conflict-related deaths',
        indicatorCode: '16.1.2',
        heading: 'A civilian dies every 14 minutes in armed conflict',
        anchor: 'conflict-related-deaths',
        isGenderLens: true,
        content: (
          <>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Following three consecutive years of rising conflict-related deaths, documented
                civilian fatalities declined by 23 per cent in 2025. Nevertheless, the human cost of
                armed conflict remained severe: at least 37,163 civilian deaths were documented
                across{' '}
                <InfoTooltip
                  trigger='20 situations of armed conflict'
                  content='For the 2015-2025 period, UN Human Rights could document conflict-related deaths, with a focus on civilian deaths, for 20 internationally recognized armed conflicts: Afghanistan, Burkina Faso, Cameroon, Central African Republic, Colombia, Democratic Republic of the Congo, Ethiopia, Iraq, Lebanon, Libya, Mali, Myanmar, Philippines, the Occupied Palestinian Territory and Israel, Somalia, South Sudan, Sudan, Syrian Arab Republic, Ukraine and Yemen. This list is compiled solely for reporting on SDG indicator 16.1.2 (Conflict-related deaths) and is based on the methodology established for that indicator. Inclusion or exclusion of a context from this list does not constitute a legal determination or official position regarding its classification as an armed conflict or the applicability of international humanitarian law.'
                  color='primary'
                />
                , equivalent to one civilian killed every 14 minutes. While documentation of
                conflict-related deaths has improved significantly over the past decade, important
                challenges remain, particularly in determining civilian status during active
                hostilities. In 2025, the status of more than 13,000 conflict-related deaths could
                not be established, meaning the reported figures should be interpreted as a minimum
                estimate of civilian deaths.
              </P>
            </TextContainer>
            <ScrollyTellingViz />
            <TextContainer>
              <P marginBottom='none' size='lg'>
                While a downward trend in the total number of conflict-related deaths was recorded
                in most covered conflicts, hostilities in Sudan and the Democratic Republic of the
                Congo saw significant increases in civilian deaths in 2025.
              </P>
              <P marginBottom='none' size='lg'>
                Conflict undermines development far beyond the loss of life. It weakens state
                capacity, destroys critical infrastructure, undermines economic growth, diverts
                scarce resources away from development, weakens institutions and erodes human
                security, often with consequences that last long after conflict ends. The frequency,
                duration and intensity of armed conflicts also drive displacement and destroy
                livelihoods.
              </P>
            </TextContainer>
            <WaveDivider src='/imgs/dividers/peace-01.webp' align='right' />
          </>
        ),
      },
      {
        id: '02',
        title: 'Homicide',
        indicatorCode: '16.1.1',
        heading:
          'Global homicide rates continue to decline, but the world remains off track to significantly reduce violence by 2030',
        anchor: 'homicide',
        isGenderLens: true,
        content: (
          <>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Between 2015 and 2024, the global homicide rate declined by 13.2 per cent, from 5.9
                to 5.1 victims per 100,000 population. If current trends continue, the rate is
                projected to fall to around 4.5 victims per 100,000 population by 2030. While this
                would represent important progress, it would fall short of the ambition of SDG 16 to{' '}
                <InfoTooltip
                  trigger='significantly reduce'
                  content='For SDG goals, a significant reduction is defined as a 50 per cent reduction from the 2015 baseline by 2030.'
                  color='primary'
                />{' '}
                all forms of violence and related deaths everywhere, which would require the global
                homicide rate to fall below 3 victims per 100,000 population by 2030.
              </P>
            </TextContainer>
            <GraphContainer>
              <HomicideRateBySexLineChart />
            </GraphContainer>
            <TextContainer>
              <Highlight
                color='primary'
                content='Latin America and the Caribbean and Sub-Saharan Africa account for two-thirds of all homicide victims'
              />
              <P marginBottom='none' size='lg'>
                In 2024, Latin America and the Caribbean recorded the highest homicide rate
                globally, at 19.3 victims per 100,000 population, almost four times the global
                average, and accounted for just above 30 per cent of all estimated homicide victims
                worldwide. The region continues to be disproportionately affected by organized crime
                and gang-related violence. Sub-Saharan Africa recorded the second highest homicide
                rate, at an estimated 11.7 victims per 100,000 population, although estimates remain
                subject to greater uncertainty due to data gaps.
              </P>
            </TextContainer>
            <GraphContainer>
              <HomicideRateByRegionBarChart />
            </GraphContainer>
            <TextContainer isGenderLensActive={isGenderLensActive}>
              <Highlight
                color='primary'
                content='Nearly 60 per cent of all women killed in 2024 were victims of an intimate partner or family member'
              />
              <P marginBottom='none' size='lg'>
                While men are disproportionately affected by lethal violence in public settings,
                women continue to face the greatest risk of lethal violence within their own homes.
                The share of women victims of an intimate partner or family member was highest in
                Africa, followed by Oceania, and lowest in the Americas.
              </P>
            </TextContainer>
            <GraphContainer isGenderLensActive={isGenderLensActive}>
              <HomicideGenderedPatternsBigNumbers />
            </GraphContainer>
            <WaveDivider src='/imgs/dividers/peace-02.webp' />
          </>
        ),
      },
      {
        id: '03',
        title: 'Attacks on defenders',
        indicatorCode: '16.10.1',
        heading:
          'One human rights defender, journalist or trade unionist is killed or disappeared every 10 hours',
        anchor: 'attacks-on-defenders',
        isGenderLens: true,
        content: (
          <>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                New evidence shows that{' '}
                <InfoTooltip
                  trigger='verified killings'
                  content='The term “verified” refers to a reported case that contains a minimum set of relevant information on a person, which have been reviewed by mandated bodies, mechanisms, and institutions and provided them with reasonable grounds to believe that that person was a victim of human rights violations or abuses. The verified counts captured by this indicator should therefore be distinguished from true incidence of attacks, which remains unobserved and is likely higher than documented figures.'
                  color='primary'
                />{' '}
                of human rights defenders, journalists, and trade unionists have increased globally
                since 2015, signalling that the world is moving further away from the ambition to
                protect those who defend and promote fundamental freedoms.
              </P>
              <P marginBottom='none' size='lg'>
                Since 2015, at least 5,995 defenders have been killed, and more than half of all UN
                Member States (115 countries) have recorded at least one killing. In 2024, a record
                686 defenders were killed and 202 disappeared, the equivalent to one defender,
                journalist or trade unionist being killed or disappeared every 10 hours, compared
                with every 19 hours in 2015. Based on historical patterns in the discovery and
                recording of human rights violations, the final number of documented cases for 2025
                is expected to reach an estimated 743 killings and 202 disappearances.
              </P>
            </TextContainer>
            <GraphContainer>
              <DefenderKillingsLineChart />
            </GraphContainer>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Violence against defenders is a global phenomenon, but the burden remains highly
                concentrated. Over the last decade, Latin America and the Caribbean accounted for
                roughly 60 per cent of all verified killings recorded. In the same period, Northern
                Africa and Western Asia experienced a rapid escalation, with their share of global
                killings nearly doubling to 27 per cent in 2025.
              </P>
            </TextContainer>
            <TextContainer isGenderLensActive={isGenderLensActive}>
              <P marginBottom='none' size='lg'>
                Over the 2023–2025 period, one in ten defenders killed or disappeared worldwide was
                a woman. Defenders working on environmental and land issues accounted for nearly
                three in ten recorded cases, while one in five victims belonged to indigenous or
                minority groups.
              </P>
            </TextContainer>
            <GraphContainer>
              <DefendersKilledByGroupRegionWaffle />
            </GraphContainer>
            <Spacer size='2xl' />
            <ImpactStoryEl id='peace-detained-hrd-release' />
            <Spacer size='6xl' />
          </>
        ),
      },
      {
        id: '04',
        title: 'Physical, sexual and psychological violence',
        indicatorCode: '16.1.3',
        heading:
          'Millions of people experience non-lethal violence, with distinct regional and gendered patterns of victimization',
        anchor: 'non-lethal-violence',
        isGenderLens: true,
        content: (
          <>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Non-lethal violence affects millions of people each year and has wide-ranging
                negative impacts on individuals and societies. Beyond the immediate harm,
                experiences of violence can cause lasting physical and mental health issues,
                generate adverse economic effects such as lower educational outcomes or increased
                poverty, and limit victims’ social participation and economic life, with effects
                that often persist throughout victims’ lives.
              </P>
              <P marginBottom='none' size='lg'>
                Unlike homicide and conflict-related deaths, most experiences of non-lethal violence
                are never reported to the police or other authorities. Household victimization
                surveys therefore play a critical role in revealing experiences of violence that
                remain largely invisible in official administrative records.
              </P>
              <P marginBottom='none' size='lg'>
                The available evidence suggests that levels of experience of physical assault are
                relatively similar across regions, with median prevalence rates ranging from 0.9 to
                1.5 per cent of the population. Robbery shows a different pattern. In Latin America
                and the Caribbean, the median prevalence rate reached 3.1 per cent, more than three
                times the levels recorded in other regions, where median prevalence rates remained
                below 1 per cent.
              </P>
            </TextContainer>
            <TextContainer isGenderLensActive={isGenderLensActive}>
              <P marginBottom='none' size='lg'>
                Patterns of victimization differ markedly between women and men. Across 18 countries
                with available data, women were consistently more likely than men to experience
                sexual violence. The median prevalence of sexual violence among women was 2.9 per
                cent, compared with 0.4 per cent among men. By contrast, men experienced slightly
                higher levels of physical violence, with a median prevalence of 4.2 per cent
                compared with 3.2 per cent among women in the 51 countries with data globally. Data
                on psychological violence remain too limited for global analysis. Available
                evidence, however, suggests relatively similar prevalence levels among women and
                men.
              </P>
            </TextContainer>
            <GraphContainer isGenderLensActive={isGenderLensActive}>
              <NonLethalViolenceByTypeSexStripChart />
            </GraphContainer>
            <Spacer size='2xl' />
            <ImpactStoryEl id='peace-panama-victimization-surveys' />
            <Spacer size='6xl' />
          </>
        ),
      },
      {
        id: '05',
        title: 'Violence against children',
        indicatorCode: '16.2.1 & 16.2.3',
        heading:
          'Violence begins early in life, with 1.6 billion children experiencing violent discipline at home',
        anchor: 'violence-against-children',
        isGenderLens: true,
        content: (
          <>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Violence remains a pervasive reality for millions of children around the world,
                cutting across geographical, cultural and economic boundaries. It can take many
                forms and occurs in any setting where children spend time.
              </P>
            </TextContainer>
            <TextContainer isGenderLensActive={isGenderLensActive}>
              <P marginBottom='none' size='lg'>
                An estimated 1.6 billion children, around two in three globally, experience violent
                punishment by caregivers at home. While physical punishment or psychological
                aggression in the context of discipline at home is widespread across all regions,
                Central and Southern Asia and Sub-Saharan Africa together account for more than half
                of all affected children worldwide. In most countries, boys and girls are equally
                likely to experience violent discipline at home.
              </P>
            </TextContainer>
            <GraphContainer isGenderLensActive={isGenderLensActive}>
              <ViolentDisciplineByRegionBarChart />
            </GraphContainer>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Violence experienced during childhood extends beyond violent discipline in the home.
              </P>
            </TextContainer>
            <TextContainer isGenderLensActive={isGenderLensActive}>
              <Highlight
                color='primary'
                content='Globally, more than 370 million women and girls, around one in eight alive today,
              experienced rape or sexual assault as children.'
              />
              <P marginBottom='none' size='lg'>
                Among men and boys, an estimated 240 to 310 million, or around one in eleven,
                experienced rape or sexual assault in childhood. The risks are even greater in
                fragile settings, where more than one in four girls has experienced rape or sexual
                assault in childhood.
              </P>
            </TextContainer>
            <GraphContainer isGenderLensActive={isGenderLensActive}>
              <SexualViolenceInChildhoodUnitChart />
            </GraphContainer>
            <WaveDivider src='/imgs/dividers/peace-03.webp' />
          </>
        ),
      },
      {
        id: '06',
        title: 'Trafficking in persons',
        indicatorCode: '16.2.2',
        heading: 'More than one in three detected victims of human trafficking is a child',
        anchor: 'trafficking-in-persons',
        isGenderLens: true,
        content: (
          <>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Human trafficking continues to affect women, men and children in every region of the
                world. Yet it remains one of the most hidden forms of crime, making it inherently
                difficult to measure. Many victims never come to the attention of authorities, and
                official statistics capture only detected cases. The figures presented here should
                therefore be interpreted as a minimum estimate of the true scale of trafficking.
              </P>
            </TextContainer>
            <TextContainer isGenderLensActive={isGenderLensActive}>
              <P marginBottom='none' size='lg'>
                Following a temporary decline during the first year of the Covid-19 pandemic, the
                number of detected victims of trafficking has continued to increase globally.
                Children accounted for 37 per cent of all detected victims in 2024, nearly three
                times the share recorded two decades earlier (13 per cent in 2004). Among child
                victims, girls represented a slightly larger share than boys. Among adults, women
                continued to account for a significantly larger share of victims than men.
              </P>
            </TextContainer>
            <GraphContainer
              isGenderLensActive={isGenderLensActive}
              id='TraffickingVictimsBySexAgeStackedBar'
            >
              <TraffickingVictimsBySexAgeStackedBar />
            </GraphContainer>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Sexual exploitation and forced labour remained the two most commonly detected forms
                of trafficking, accounting for roughly 39 per cent and 38 per cent of detected
                victims, respectively. The remaining victims were trafficked for other forms of
                exploitation, including organ removal, forced criminality, forced marriage and
                forced begging.
              </P>
            </TextContainer>
            <GraphContainer>
              <TraffickingByExploitationFormBigNumbers />
            </GraphContainer>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Human trafficking is a clear example of a challenge that no institution can address
                alone. Effective responses require national and international cooperation, as well
                as cross-border data sharing, as trafficking networks often operate across
                jurisdictions. At the same time, because trafficking remains hidden, continued
                investment in administrative data systems, statistical methods and victims’ surveys
                is critical to better understand its scale, identify those at greatest risk and
                strengthen evidence-based responses.
              </P>
            </TextContainer>
            <WaveDivider src='/imgs/dividers/peace-04.webp' align='right' />
          </>
        ),
      },
      {
        id: '07',
        title: 'Perception of safety',
        indicatorCode: '16.1.4',
        heading: 'One in three people globally do not feel safe walking alone at night',
        anchor: 'perception-of-safety',
        isGenderLens: true,
        content: (
          <>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                Peace is measured not only by the absence of violence, but also by whether people
                feel safe in their daily lives. Yet around one in three people globally do not feel
                safe walking alone in their neighbourhood after dark, a proportion that has remained
                broadly unchanged since 2017. Perceptions of safety were lowest in Latin America and
                the Caribbean, where more than half of the population reported feeling unsafe
                walking alone after dark.
              </P>
            </TextContainer>
            <GraphContainer>
              <FeelSafeWalkingAloneByPeriodDumbbellChart />
            </GraphContainer>
            <TextContainer isGenderLensActive={isGenderLensActive}>
              <Highlight
                color='primary'
                content='Women consistently indicate feeling less safe than men'
              />
              <P
                marginBottom='none'
                size='lg'
                className={isGenderLensActive ? 'gender-lens' : undefined}
              >
                Across{' '}
                <InfoTooltip
                  trigger='74 countries with sex-disaggregated data'
                  content='The number of countries with sex-disaggregated data on perception of safety is different to the sample of countries with data on the overall perception of safety in the population.'
                  color='primary'
                />
                , 59 per cent of women reported feeling safe walking alone after dark, compared with
                72 per cent of men. The gender gap was evident in every region and was particularly
                pronounced in Northern Africa and Western Asia.
              </P>
            </TextContainer>
            <GraphContainer isGenderLensActive={isGenderLensActive}>
              <FeelSafeWalkingAloneBySexDumbbellChart />
            </GraphContainer>
            <TextContainer isGenderLensActive={isGenderLensActive}>
              <P marginBottom='none' size='lg'>
                These findings suggest that perceptions of safety reflect more than exposure to
                lethal violence. Experiences and risks of non-lethal violence, including sexual
                violence, harassment and robbery, as well as broader social and environmental
                factors, may also influence how women perceive safety in everyday life.
              </P>
            </TextContainer>
            <WaveDivider src='/imgs/dividers/peace-02.webp' />
          </>
        ),
      },
      {
        id: '08',
        title: 'The role of Institutions',
        indicatorCode: '',
        heading: 'Achieving peace through capable, trustworthy and responsive institutions',
        anchor: 'role-of-institutions',
        content: (
          <>
            <TextContainer>
              <P marginBottom='none' size='lg'>
                The evidence presented across these indicators underscores the important role of
                institutions in preventing conflict and violence. While the forms of violence
                differ, from conflict-related deaths and homicide to violence against children,
                human trafficking and attacks on those defending human rights, outcomes are shaped
                by the ability of institutions to prevent violence, protect victims, enforce the
                rule of law and uphold fundamental rights.
              </P>
              <P marginBottom='none' size='lg'>
                Disagreements and competing interests are an inevitable feature of any society.
                Violence and armed conflict are not. Whether societies experience violence,
                insecurity and fear depends in large part on the ability of institutions to manage
                grievances peacefully, deliver justice fairly, provide security and safeguard
                fundamental freedoms. Effective institutions create peaceful pathways for resolving
                disputes, seeking justice and holding power to account without resorting to
                violence. When institutions are weak, inaccessible or non-inclusive, grievances are
                more likely to go unresolved, trust erodes and the risk of violence becomes more
                difficult to prevent.
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
      <ChapterSubNav
        chapterNumber={1}
        chapterTitle='Peace'
        color='primary'
        subsections={sections}
      />
      <ChapterHero
        chapterNumber={1}
        bg='/imgs/chapters/peace-hero.webp'
        title='Peace'
        intro={
          <>
            Peace is at the heart of SDG 16 and a fundamental condition for sustainable development.
            While peace is often understood as the absence of war, it extends far beyond conflict
            and lethal violence to encompass people’s everyday experiences of safety, security, and
            freedom from violence. The indicators under Goal 16 capture the different ways violence
            and insecurity affect individuals and communities, providing a multidimensional picture
            of peace.
          </>
        }
        color='primary'
        subsections={sections}
      />
      <TargetsDrawer
        chapterTitle='Peace'
        bg='/imgs/chapters/peace-texture.webp'
        color='primary'
        targets={chaptersTargetList.peace}
      />
      <Spacer size='8xl' />
      <TextContainer>
        <P marginBottom='none' size='lg'>
          At its most visible, the absence of peace is reflected in lives lost. Armed conflict and
          intentional homicide remain among the most devastating forms of violence, and in 2025
          their human toll continues to be staggering.
        </P>
      </TextContainer>
      <WaveDivider src='/imgs/dividers/peace-02.webp' />
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
            color='primary'
          >
            {section.content}
          </Section>
        ))}
      </div>
      <ChapterEndNav label='Next chapter' title='Justice' to='/chapters/justice' color='primary' />
    </>
  );
}

export const Route = createLazyRoute('/chapters/peace')({
  component: Peace,
});
