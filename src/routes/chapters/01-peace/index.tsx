import type { AnyRootRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { Spacer } from '@undp/design-system-react/Spacer';
import { P } from '@undp/design-system-react/Typography';
import { useState } from 'react';
import Tag from '@/components/Tag';
import ImpactStory from '@/routes/chapters/components/ImpactStorySection';
import { useIsGenderLensActive } from '@/stores/chapterStore';
import ChapterEndNav from '../components/ChapterFooter';
import ChapterHero from '../components/HeroBanner';
import Highlight from '../components/Highlight';
import InfoTooltip from '../components/InfoTooltip';
import PlaceholderBlock from '../components/PlaceholderBlock';
import SectionHeading from '../components/SectionHeading';
import ChapterSubNav from '../components/SubNav';
import WaveDivider from '../components/WaveDivider';

export function Peace() {
  const isGenderLensActive = useIsGenderLensActive();
  const [isDataConsiderationExpanded, setIsDataConsiderationExpanded] = useState(false);
  const sections = [
    {
      id: '01',
      title: 'Conflict-related deaths',
      indicatorCode: '16.1.2',
      heading: 'A civilian dies every 14 minutes in armed conflict',
      anchor: 'conflict-related-deaths',
      isGenderLens: true,
      content: (
        <>
          <P marginBottom='none' size='lg'>
            After three consecutive years of rising conflict-related deaths, documented civilian
            deaths declined by 23 per cent. Nonetheless, the overall situation remains alarming.
          </P>
          <div className='-mx-8 flex flex-col gap-3 rounded-md bg-[#EFF5F9] p-8'>
            <Tag color='primary' content='Data consideration' />
            <P
              marginBottom='none'
              size='lg'
              className={isDataConsiderationExpanded ? undefined : 'line-clamp-5'}
            >
              For the 2015-2025 period, UN Human Rights could document conflict-related deaths, with
              a focus on civilian deaths, for 20 armed conflicts: Afghanistan, Burkina Faso,
              Cameroon, Central African Republic, Colombia, Democratic Republic of the Congo,
              Ethiopia, Iraq, Lebanon, Libya, Mali, Myanmar, Philippines, the Occupied Palestinian
              Territory and Israel, Somalia, South Sudan, Sudan, Syrian Arab Republic, Ukraine and
              Yemen. This list of conflicts was produced only for the compilation of SDG indicator
              16.1.2 – Conflict related deaths and does not imply any further legal determinations
              for other purposes, including in relation to the question of applicability of
              international humanitarian law.
            </P>
            <button
              type='button'
              onClick={() => setIsDataConsiderationExpanded((prev) => !prev)}
              className='w-fit cursor-pointer text-primary text-sm underline underline-offset-2'
            >
              {isDataConsiderationExpanded ? 'Read less' : 'Read more'}
            </button>
          </div>
          <PlaceholderBlock label='Scrollytelling' />
          <P
            marginBottom='none'
            size='lg'
            className={isGenderLensActive ? 'gender-lens' : undefined}
          >
            Violence remains unevenly distributed, where patterns of exposure and risk differ across
            conflict settings. In Myanmar, for example, women and girls accounted for 43 per cent of
            documented civilian deaths, compared with a global average of 25 per cent. And, while a
            downward trend was recorded in most covered conflicts, hostilities in Sudan and the
            Democratic Republic of the Congo saw significant increases in civilian deaths.
          </P>
          <P marginBottom='none' size='lg'>
            Documentation of conflict-related deaths has improved significantly over the past
            decade, but important challenges remain. Accurately identifying whether the victims are
            civilians or not, especially during intense hostilities, is often difficult. In 2025,
            the status of more than 13,000 conflict-related deaths could not be established. As a
            result, the figures presented should be interpreted as a minimum count of civilian
            deaths.
          </P>
          <WaveDivider src='/imgs/dividers/peace-01.webp' />
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
          <P
            marginBottom='none'
            size='lg'
            className={isGenderLensActive ? 'gender-lens' : undefined}
          >
            Between 2015 and 2024, the global homicide rate declined by 13.2 per cent, from 5.9 to
            5.1 victims per 100,000 population. Nevertheless, progress remains highly uneven across
            regions, with Latin America and the Caribbean, and Sub-Saharan Africa recording the
            highest rates of intentional homicide globally. There are also distinct gendered
            patterns. While men are disproportionately affected by lethal violence in public
            settings, women continue to face the greatest risk of lethal violence within their own
            homes.
          </P>
          <PlaceholderBlock label='Big numbers' />
          <PlaceholderBlock label='Big numbers' />
          <P marginBottom='none' size='lg'>
            If current trends of homicide continue, the rate is projected to fall to around 4.5
            victims per 100,000 population by 2030. While this would represent important progress,
            it would fall short of the ambition of SDG 16 to{' '}
            <InfoTooltip
              trigger='significantly reduce'
              content='For SDG goals, a significant reduction is defined as a 50 per cent reduction from the 2015 baseline by 2030.'
              color='primary'
            />{' '}
            all forms of violence and related deaths everywhere. Achieving that ambition would
            require the global homicide rate to fall below 3 victims per 100,000 population by 2030.
          </P>
          <PlaceholderBlock label='Figure' />
          <WaveDivider src='/imgs/dividers/peace-02.webp' align='right' />
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
          <P marginBottom='none' size='lg'>
            Novel evidence indicates that{' '}
            <InfoTooltip
              trigger='verified killings'
              content='Underreporting, due to significant risk of retaliation and/or human capacity, remains a challenge for the documentation of attacks against human rights defenders. Verified counts, therefore, reflect institutional capacity, which can often signal a stronger civil society, independent media, and national human rights institutions, while low or absent data frequently indicate restricted civic space rather than an absence of violations. The numbers presented are, therefore, likely to underestimate the true scale of attacks.'
              color='primary'
            />{' '}
            of human rights defenders, journalists, and trade unionists have increased globally
            since 2015, where annual verified numbers of killings are now at least 61 per cent
            higher than a decade ago. This signals that the world is moving further away from the
            target under Goal 16 - to protect those who defend and promote fundamental freedoms.
          </P>
          <P marginBottom='none' size='lg'>
            Since 2015, at least 5,995 defenders have been killed, where 115 countries have recorded
            at least one killing. In 2024, a record 686 defenders were killed and 202 disappeared,
            this is equivalent to one defender, journalist or trade unionist being killed or
            disappeared every 10 hours, compared with every 19 hours in 2015. Based on historical
            patterns in human rights violation discovery and recording, the final number of
            documented cases for 2025 is expected to reach an estimated 743 killings and 202
            disappearances.
          </P>
          <PlaceholderBlock label='Figure' />
          <P marginBottom='none' size='lg'>
            The burden remains highly concentrated within Latin America and the Caribbean. The
            region accounts for roughly 60 per cent of all verified killings recorded over the past
            decade. Over the same time period, Northern Africa and Western Sahara have experienced a
            rapid escalation, with their share of global killings nearly doubling to 27 per cent in
            2025.
          </P>
          <P
            marginBottom='none'
            size='lg'
            className={isGenderLensActive ? 'gender-lens' : undefined}
          >
            Across 2023 - 2025, one in ten defenders killed or disappeared worldwide was a woman.
            Defenders working on environmental and land issues accounted for nearly three in ten
            recorded cases, while one in five victims belonged to indigenous or minority groups.
            These patterns highlight how structural inequalities intersect with risks faced by
            marginalised groups defending fundamental freedoms.
          </P>
          <PlaceholderBlock label='Figure' />
          <Spacer size='2xl' />
          <ImpactStory id='peace-detained-hrd-release' />
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
          <P marginBottom='none' size='lg'>
            Experiences of violence can have lasting effects on people’s physical and mental health,
            lower educational outcomes or increased poverty, and limit victims’ social participation
            and economic life. Most experiences of non-lethal violence are never reported to the
            police or other authorities. Household victimization surveys therefore play a critical
            role in revealing experiences of violence that remain largely invisible in official
            administrative records.
          </P>
          <P marginBottom='none' size='lg'>
            Regional differences were most pronounced for robbery, where the median prevalence
            reached 3.1 per cent in Latin America and the Caribbean, compared with less than 1 per
            cent in other regions.
          </P>
          <P
            marginBottom='none'
            size='lg'
            className={isGenderLensActive ? 'gender-lens' : undefined}
          >
            Patterns of victimization differ markedly between women and men. Women face higher risk
            of sexual violence than men. The median prevalence of sexual violence among women was
            3.0 per cent, compared with 0.4 per cent among men.
          </P>
          <P
            marginBottom='none'
            size='lg'
            className={isGenderLensActive ? 'gender-lens' : undefined}
          >
            By contrast, men experienced slightly higher levels of physical violence, with a median
            prevalence of 4.2 per cent compared with 3.2 per cent among women.
          </P>
          <PlaceholderBlock label='Figure' />
          <P marginBottom='none' size='lg'>
            Country coverage of non-lethal violence remains uneven across regions and across
            different forms of violence. Since 2015, 95 countries have reported data for at least
            one form of non-lethal violence. Robbery and physical assault are available for the
            largest number of countries, with 80 countries having reported data. However,
            sex-disaggregated data are available for only 51 countries. By contrast, since 2015,
            only 18 countries have reported data on psychological violence for at least one year,
            providing insufficient evidence to identify a clear global pattern.
          </P>
          <Spacer size='2xl' />
          <ImpactStory id='peace-panama-victimization-surveys' />
          <Spacer size='6xl' />
        </>
      ),
    },
    {
      id: '05',
      title: 'Violence against children',
      indicatorCode: '16.2.1 & 16.2.3',
      heading:
        'Violence begins early in life, with two in three children experiencing violent discipline at home',
      anchor: 'violence-against-children',
      isGenderLens: true,
      content: (
        <>
          <P
            marginBottom='none'
            size='lg'
            className={isGenderLensActive ? 'gender-lens' : undefined}
          >
            Violence remains a pervasive reality for millions of children around the world, cutting
            across geographical, cultural and economic boundaries. An estimated 1.6 billion children
            globally experience violent punishment by caregivers at home. In most countries, boys
            and girls are equally likely to experience violent discipline at home.
          </P>
          <PlaceholderBlock label='Figure' />
          <P
            marginBottom='none'
            size='lg'
            className={isGenderLensActive ? 'gender-lens' : undefined}
          >
            Violence experienced during childhood extends far beyond violent discipline in the home.
            Globally it’s estimated that more than 370 million women and girls experienced rape or
            sexual assault as children. Among men and boys, an estimated 240 to 310 million
            experienced rape or sexual assault in childhood. The risks are even greater in fragile
            settings, where more than one in four girls has experienced rape or sexual assault in
            childhood.
          </P>
          <PlaceholderBlock label='Big numbers' />
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
          <P marginBottom='none' size='lg'>
            Human trafficking continues to affect women, men and children in every region of the
            world. Yet it remains one of the most hidden forms of crime, making it inherently
            difficult to measure. Many victims never come to the attention of authorities, and
            official statistics capture only detected cases. As a result, the figures presented here
            are only the minimum estimate of the true scale of trafficking.
          </P>
          <P
            marginBottom='none'
            size='lg'
            className={isGenderLensActive ? 'gender-lens' : undefined}
          >
            Children accounted for 37 per cent of all detected victims in 2024, nearly three times
            the share recorded two decades earlier. Women and girls accounted for a larger share of
            detected trafficking victims than men and boys, with the gender gap particularly
            pronounced among adults.
          </P>
          <PlaceholderBlock label='Figure' />
          <P marginBottom='none' size='lg'>
            Sexual exploitation and forced labour remained the two most commonly detected forms of
            trafficking.
          </P>
          <PlaceholderBlock label='Big numbers' />
          <P marginBottom='none' size='lg'>
            Human trafficking is a clear example of a challenge that no institution can address
            alone. Effective responses require international cooperation and cross-border data
            sharing, as trafficking networks often operate across jurisdictions. At the same time,
            because trafficking remains hidden, continued investment in administrative data systems,
            statistical methods and victims’ surveys is critical to better understand its scale,
            identify those at greatest risk and strengthen evidence-based responses.
          </P>
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
          <P marginBottom='none' size='lg'>
            Peace is measured not only by the absence of violence, but also by whether people feel
            safe in their daily lives. Around one in three people globally do not feel safe walking
            alone in their neighbourhood after dark, a proportion that has remained broadly
            unchanged since 2017. Perceptions of safety were lowest in Latin America and the
            Caribbean, where more than half of the population reported feeling unsafe walking alone
            after dark.
          </P>
          <Highlight
            color='primary'
            className={isGenderLensActive ? 'gender-lens' : undefined}
            content='Women consistently reported feeling less safe than men.'
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
            , 41 per cent of women reported feeling unsafe walking alone after dark, compared with
            28 per cent of men. The gender gap was evident in every region and was particularly
            pronounced in Northern Africa and Western Asia.
          </P>
          <PlaceholderBlock label='Figure' />
          <P
            marginBottom='none'
            size='lg'
            className={isGenderLensActive ? 'gender-lens' : undefined}
          >
            These findings suggest that perceptions of safety reflect more than exposure to lethal
            violence. Experiences and risks of non-lethal violence, including sexual violence,
            harassment and robbery, as well as broader social and environmental factors, may
            influence the gendered difference in perceived safety.
          </P>
          <WaveDivider src='/imgs/dividers/peace-02.webp' />
        </>
      ),
    },
    {
      id: '08',
      title: 'The role of Institutions',
      indicatorCode: 'The role of Institutions',
      heading: 'Achieving peace through capable, trustworthy and responsive institutions',
      anchor: 'role-of-institutions',
      content: (
        <>
          <P marginBottom='none' size='lg'>
            Content goes here
          </P>
          <Spacer size='6xl' />
        </>
      ),
    },
  ];
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
            Peace is a fundamental condition of thriving societies, as peace indicates the absence
            of violence and fear. The indicators under Goal 16 measure the different ways violence
            and insecurity affect people, providing a multidimensional picture of peace.
          </>
        }
        color='primary'
        subsections={sections}
      />

      <div className='mx-auto max-w-2xl px-4 py-12 md:px-8 lg:px-16'>
        <P marginBottom='none' size='lg'>
          At its most visible, the lack of peace appears in lives lost in conflicts and intentional
          homicides. Yet, peace, or the absence of it, emerges when looking at people’s everyday
          experience. We see that non-lethal violence can begin early in life and continue
          throughout adulthood, leaving a lasting impact on individuals, families and communities,
          by reducing social and civic participation, decreasing institutional trust, and
          suppressing economic activity. Thus, the absence of peace gives fear authority over
          people’s lives to a detrimental effect on progress.
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
            color='primary'
          >
            {section.content}
          </SectionHeading>
        ))}
      </div>

      <ChapterEndNav label='Next chapter' title='Justice' to='/chapters/justice' color='primary' />
    </>
  );
}

export default function createPeaceRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/chapters/peace',
    component: Peace,
    getParentRoute: () => parentRoute,
  });
}
