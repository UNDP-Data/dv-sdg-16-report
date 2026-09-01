import { type AnyRootRoute, createRoute, Link } from '@tanstack/react-router';
import { Button } from '@undp/design-system-react/Button';
import { CardDescription, CardFooter, CardTag, CardTitle } from '@undp/design-system-react/Card';
import { Container } from '@undp/design-system-react/Container';
import { Grid } from '@undp/design-system-react/Grid';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H1, H2, H4, P } from '@undp/design-system-react/Typography';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import FeaturedNumbers from '@/components/FeaturedNumbers';
import ImpactStoryModal from '@/components/ImpactStoryModal';
import impactStories from '@/data/impactStories.json';
import type { ChapterKey, ImpactStoryDataType } from '@/types';
import ContentCard from './components/ContentCard';
import { FEATURED_STORY_IDS } from './constants';
import { BannerContainer, SectionContainer } from './routes/chapters/components/Containers';
import { showNavigation } from './Utils/showNavigation';

function App() {
  const isLaunched = showNavigation();
  const [hoveredChapter, setHoveredChapter] = useState<ChapterKey | null>(null);
  const [selectedStory, setSelectedStory] = useState<ImpactStoryDataType | undefined>(undefined);
  const stories = impactStories as ImpactStoryDataType[];
  return (
    <>
      <Container
        backgroundColor='foreground-soft'
        width='full'
        padding='none'
        className='flex h-auto min-h-[calc(100vh-65px)] flex-col bg-center bg-cover px-6 md:h-[calc(100vh-65px)] md:px-20'
        style={{ backgroundImage: `url('imgs/hero-bg.webp')` }}
      >
        <div className='flex grow items-center'>
          <Container className='w-full md:w-1/2'>
            <H1
              marginBottom='sm'
              weight='medium'
              className='justify-start text-content-reverse normal-case'
            >
              Peace, Justice, Inclusion
            </H1>
            {isLaunched ? (
              <P size='xl' className='font-light text-2xl text-content-reverse'>
                A global look at where the world stands on building peaceful, just, and inclusive
                societies — and how far there is left to go.
              </P>
            ) : (
              <>
                <P size='xl' className='text-content-reverse' marginBottom='none'>
                  This is the official page for the 2026 Global Progress Report on SDG 16, jointly
                  produced by OHCHR, UNDP, UNICEF, and UNODC.
                  <br />
                  <br />
                  Discover what the latest data reveal about global progress toward peace, justice,
                  and inclusion, and the role of effective institutions in driving sustained change.
                  <br />
                  <br />
                  Join us for the official launch on{' '}
                  <strong>23 September 2026, 05:00PM at UNDP 304 E 45th St, New York</strong>
                </P>
                <Spacer size='3xl' />
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://forms.cloud.microsoft/pages/responsepage.aspx?id=Xtvls0QpN0iZ9XSIrOVDGU0hVM8DDcBGn_INVU5ric1UMEM0VUpJOVpSSzM4NlZVTjJQWlZDMVAzUy4u&route=shorturl'
                >
                  <Button
                    type='button'
                    variant='primary'
                    arrow={false}
                    className='w-fit gap-1.5 bg-secondary px-5 py-3 text-sm transition-colors hover:bg-secondary/90'
                  >
                    Sign up to attend the report launch
                  </Button>
                </a>
              </>
            )}
          </Container>
        </div>

        <div className='flex flex-wrap items-center gap-x-10 border-content-reverse/20 border-t py-4'>
          <P size='sm' marginBottom='none' className='text-content-quaternary'>
            Produced by
          </P>
          <img
            src='/imgs/logos/ohchr_w.svg'
            alt='United Nations Human Rights, Office of the High Commissioner'
            className='h-22'
          />
          <img
            src='/imgs/logos/undp_w.svg'
            alt='United Nations Development Programme'
            className='h-26'
          />
          <img src='/imgs/logos/unicef_w.svg' alt='UNICEF, for every child' className='h-23' />
          <img
            src='/imgs/logos/unodc_w.svg'
            alt='United Nations Office on Drugs and Crime'
            className='h-24'
          />
        </div>
      </Container>

      {isLaunched ? (
        <>
          <section className='mt-10 px-6 py-12 md:px-12 md:py-10'>
            <SectionContainer>
              <P
                marginBottom='none'
                size='sm'
                weight='semibold'
                className='text-content-quaternary uppercase tracking-wider'
              >
                Foreword
              </P>
              <Spacer size='2xl' />
              <H4
                weight='medium'
                marginBottom='none'
                className='max-w-4xl font-heading text-foreground'
              >
                Peace, justice and inclusive institutions are the foundations on which progress
                across the entire 2030 Agenda depends
              </H4>
              <Spacer size='2xl' />
              <P size='xl' marginBottom='none' className='max-w-4xl text-content-secondary'>
                More than a decade after Member States adopted the 2030 Agenda, growing insecurity,
                deepening polarization and declining trust are making hard-won development gains
                increasingly fragile. The challenge of our time is not only identifying solutions
                but ensuring that institutions are capable and resilient enough to turn those
                solutions into life-changing results.
              </P>
              <Spacer size='xl' />
              <Link
                to='/report/foreword'
                className='group mt-4 flex w-fit shrink-0 items-center gap-1 font-semibold text-blue-600 text-sm uppercase tracking-wider'
              >
                Read the full foreword
                <ArrowRight
                  size={20}
                  className='shrink-0 transition-transform group-hover:translate-x-2'
                />
              </Link>
            </SectionContainer>
          </section>

          <section
            className='relative mx-6 my-8 flex flex-col justify-center bg-bottom-right bg-cover bg-foreground-soft px-6 py-24 md:mx-12 md:my-12 md:px-12 md:py-28 lg:min-h-144'
            style={{ backgroundImage: `url('/imgs/banner-bg.webp')` }}
          >
            <BannerContainer>
              <P
                marginBottom='none'
                size='sm'
                weight='semibold'
                className='absolute inset-x-0 bottom-full mb-8 text-center text-content-secondary uppercase tracking-widest'
              >
                Chapters
              </P>
              <H2
                marginBottom='none'
                className='text-center font-heading font-normal text-white leading-tight'
              >
                Explore the three dimensions of SDG 16:{' '}
                <Link
                  to='/report/peace'
                  className='group whitespace-nowrap font-heading text-primary transition-opacity hover:opacity-80'
                  onMouseEnter={() => setHoveredChapter('peace')}
                  onMouseLeave={() => setHoveredChapter(null)}
                >
                  <span className='underline decoration-1 underline-offset-8'>Peace</span>
                  <ArrowRight
                    className='inline size-[0.6em] stroke-1 transition-transform group-hover:translate-x-1'
                    aria-hidden='true'
                  />
                </Link>
                ,{' '}
                <Link
                  to='/report/justice'
                  className='group whitespace-nowrap font-heading text-secondary transition-opacity hover:opacity-80'
                  onMouseEnter={() => setHoveredChapter('justice')}
                  onMouseLeave={() => setHoveredChapter(null)}
                >
                  <span className='underline decoration-1 underline-offset-8'>Justice</span>
                  <ArrowRight
                    className='inline size-[0.6em] stroke-1 transition-transform group-hover:translate-x-1'
                    aria-hidden='true'
                  />
                </Link>{' '}
                and{' '}
                <Link
                  to='/report/inclusion'
                  className='group whitespace-nowrap font-heading text-tertiary transition-opacity hover:opacity-80'
                  onMouseEnter={() => setHoveredChapter('inclusion')}
                  onMouseLeave={() => setHoveredChapter(null)}
                >
                  <span className='underline decoration-1 underline-offset-8'>Inclusion</span>
                  <ArrowRight
                    className='inline size-[0.6em] stroke-1 transition-transform group-hover:translate-x-1'
                    aria-hidden='true'
                  />
                </Link>
              </H2>
            </BannerContainer>

            <div
              aria-hidden='true'
              className='pointer-events-none absolute inset-x-6 mx-auto hidden min-h-21 max-w-250 md:inset-x-12 md:bottom-20 lg:block'
            >
              {hoveredChapter === 'peace' ? (
                <P marginBottom='none' className='text-center text-content-quaternary/70'>
                  Conflict-related deaths · Homicide · Attacks on defenders · Physical, sexual and
                  psychological violence · Violence against children · Trafficking in persons ·
                  Perception of safety
                </P>
              ) : null}
              {hoveredChapter === 'justice' ? (
                <P marginBottom='none' className='text-center text-content-quaternary/70'>
                  Access to criminal justice · Access to civil justice · Unsentenced detention ·
                  Illicit financial flows · Illicit firearms flows · Bribery among the population ·
                  Bribery of businesses · National human rights institutions
                </P>
              ) : null}
              {hoveredChapter === 'inclusion' ? (
                <P marginBottom='none' className='text-center text-content-quaternary/70'>
                  Legal identity · Representation in the legislature · Representation in public
                  service institutions and the judiciary · Experience of discrimination · Government
                  expenditures · Satisfaction with public services · Political voice and
                  responsiveness · Access to information · Representation of developing countries in
                  international organizations
                </P>
              ) : null}
            </div>
          </section>

          <section className='px-6 py-12 md:px-12 md:py-10'>
            <SectionContainer>
              <P
                marginBottom='none'
                size='sm'
                weight='semibold'
                className='text-content-quaternary uppercase tracking-wider'
              >
                Featured numbers
              </P>
              <Spacer size='lg' />
              <H4 weight='semibold' marginBottom='none' className='font-heading text-foreground'>
                Key figures from the report
              </H4>
              <Spacer size='base' />
              <P size='xl' marginBottom='none' className='max-w-2xl text-content-secondary'>
                Key numbers from selected SDG 16 indicators across the peace, justice and inclusion
                dimensions of the 2026 Global Progress Report.
              </P>
              <FeaturedNumbers />
            </SectionContainer>
          </section>

          <section className='mx-6 my-8 bg-background-soft px-6 py-14 md:mx-12 md:my-12 md:px-12 md:py-10'>
            <SectionContainer>
              <P
                marginBottom='none'
                size='sm'
                weight='semibold'
                className='text-content-quaternary uppercase tracking-wider'
              >
                SDG 16 progress
              </P>
              <Spacer size='lg' />
              <div className='grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-16'>
                <H4 weight='semibold' marginBottom='none' className='font-heading text-foreground'>
                  Measuring SDG 16 Progress: Remaining challenges
                </H4>
                <div>
                  <P size='xl' marginBottom='none' className='text-content-secondary'>
                    A decade after the 2030 Agenda was adopted, the monitoring landscape has changed
                    significantly &mdash; but important data gaps remain.
                  </P>
                  <Spacer size='lg' />
                  <Link
                    to='/report/sdg16-progress'
                    className='group mt-4 flex w-fit shrink-0 items-center gap-2 font-semibold text-blue-600 text-sm uppercase tracking-wider'
                  >
                    Learn more
                    <ArrowRight
                      size={20}
                      className='shrink-0 transition-transform group-hover:translate-x-2'
                    />
                  </Link>
                </div>
              </div>
              <Spacer size='5xl' />
              <Link to='/report/sdg16-progress' tabIndex={-1} className='block'>
                <img
                  src='/imgs/sdg16-progress-viz.svg'
                  alt='Share of countries with Goal 16 data for at least one year since 2015, shown as one circle per indicator.'
                  className='h-27 w-full object-cover object-left md:h-auto md:object-fill'
                />
              </Link>
              <Spacer size='2xl' />
              <Link
                to='/report/sdg16-progress'
                className='w-fit text-content-quaternary text-sm transition-colors hover:text-foreground hover:underline'
              >
                Countries with data for at least one year since 2015 – UNSD
              </Link>
            </SectionContainer>
          </section>

          <section className='px-6 py-12 md:px-12 md:py-10'>
            <SectionContainer>
              <P
                marginBottom='none'
                size='sm'
                weight='semibold'
                className='text-content-quaternary uppercase tracking-wider'
              >
                data to impact stories
              </P>
              <Spacer size='lg' />
              <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                <H4 weight='semibold' marginBottom='none' className='font-heading text-foreground'>
                  How countries use data for impact
                </H4>
                <Link
                  to='/impact-stories'
                  className='group mt-4 flex w-fit shrink-0 items-center gap-2 font-semibold text-blue-600 text-sm uppercase tracking-wider'
                >
                  Explore all stories
                  <ArrowRight
                    size={20}
                    className='shrink-0 transition-transform group-hover:translate-x-2'
                  />
                </Link>
              </div>

              <Spacer size='3xl' />

              <Grid gap='16px' noOfCol={{ base: 1, md: 2, lg: 3 }}>
                {FEATURED_STORY_IDS.map((id) => stories.find((story) => story.id === id))
                  .filter((story): story is ImpactStoryDataType => story !== undefined)
                  .map((story) => (
                    <ContentCard key={story.id} onSelect={() => setSelectedStory(story)}>
                      <CardTag className='block truncate p-0! font-semibold text-content-secondary tracking-wider'>
                        {story.chapter} &ndash; {story.indicatorCode} &ndash; {story.indicatorTitle}
                      </CardTag>
                      <CardTitle className='line-clamp-3 p-0! font-heading font-medium text-2xl! text-foreground leading-[130%]'>
                        {story.title}
                      </CardTitle>
                      <CardDescription className='line-clamp-2 p-0! text-content-secondary text-lg!'>
                        {story.story}
                      </CardDescription>
                      <CardFooter className='mt-auto gap-1 p-0! font-semibold text-blue-600 text-sm uppercase tracking-wider'>
                        Read story
                        <ArrowRight
                          size={18}
                          className='shrink-0 transition-transform group-hover:translate-x-1'
                        />
                      </CardFooter>
                    </ContentCard>
                  ))}
              </Grid>
            </SectionContainer>
          </section>

          <section
            className='-mb-px bg-bottom bg-size-[100%_auto] bg-no-repeat px-6 pt-20 pb-48 md:px-12 md:pt-32 md:pb-96'
            style={{ backgroundImage: `url('/imgs/footer-bg.webp')` }}
          >
            <SectionContainer>
              <H4 weight='semibold' marginBottom='none' className='font-heading text-foreground'>
                Download the full report
              </H4>
              <Spacer size='base' />
              <P size='xl' marginBottom='none' className='text-content-secondary'>
                Access the full publication and the underlying data in one place.
              </P>
              <Spacer size='2xl' />
              <div className='flex flex-wrap gap-4'>
                <a href='/downloads/sdg16-global-progress-report-2026.pdf'>
                  <Button
                    type='button'
                    variant='primary'
                    arrow={false}
                    className='w-fit border-2 border-transparent bg-blue-600 text-white hover:bg-blue-700'
                  >
                    Download report
                  </Button>
                </a>
                <a href='/downloads/sdg16-global-progress-report-2026-data.xlsx'>
                  <Button
                    variant='sdg-16'
                    arrow={false}
                    className='w-fit border-2 border-transparent bg-blue-100 text-blue-700 hover:bg-blue-200'
                  >
                    Download data
                  </Button>
                </a>
              </div>
            </SectionContainer>
          </section>
        </>
      ) : null}
      <ImpactStoryModal story={selectedStory} onClose={() => setSelectedStory(undefined)} />
    </>
  );
}

export default function createHomeRoute(parentRoute: AnyRootRoute) {
  return createRoute({
    path: '/',
    component: App,
    getParentRoute: () => parentRoute,
  });
}
