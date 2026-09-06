import { createLazyRoute, Link } from '@tanstack/react-router';
import { CardFooter, CardTitle } from '@undp/design-system-react/Card';
import { Grid, GridItem } from '@undp/design-system-react/Grid';
import { Separator } from '@undp/design-system-react/Separator';
import { H1, P } from '@undp/design-system-react/Typography';
import { ArrowRight } from 'lucide-react';
import ContentCard from '@/components/ContentCard';

export function Report() {
  return (
    <>
      <section
        className='bg-bottom-right bg-cover bg-foreground-soft px-6 py-16 md:px-12 md:py-24'
        style={{ backgroundImage: `url('/imgs/chapters/impact-story-bg.webp')` }}
      >
        <div className='mx-auto flex max-w-300 flex-col gap-4'>
          <P
            marginBottom='none'
            size='sm'
            weight='semibold'
            className='text-content-secondary uppercase tracking-widest'
          >
            Global Progress Report on SDG 16
          </P>
          <H1 marginBottom='sm' className='font-normal text-content-reverse normal-case'>
            Report
          </H1>
        </div>
      </section>

      <section className='px-6 py-12 md:px-12 md:py-16'>
        <div className='mx-auto flex max-w-300 flex-col gap-10'>
          <Grid
            gap='16px'
            noOfCol={{
              base: 1,
              md: 2,
              lg: 3,
            }}
          >
            <GridItem
              noOfColSpan={{
                base: 1,
                md: 1,
                sm: 1,
              }}
            >
              <Link to='/report/foreword'>
                <ContentCard>
                  <CardTitle className='line-clamp-3 p-0! font-heading font-medium text-2xl! text-foreground leading-[130%]'>
                    Foreword
                  </CardTitle>
                  <CardFooter className='mt-auto gap-1 p-0! font-semibold text-accent-blue-500 text-sm uppercase tracking-wider'>
                    Learn more
                    <ArrowRight
                      size={18}
                      className='shrink-0 transition-transform group-hover:translate-x-1'
                    />
                  </CardFooter>
                </ContentCard>
              </Link>
            </GridItem>
          </Grid>
          <Separator orientation='horizontal' color='surface-md' />
          <div>
            <Grid
              gap='16px'
              noOfCol={{
                base: 1,
                md: 2,
                lg: 3,
              }}
            >
              <GridItem
                noOfColSpan={{
                  base: 1,
                  md: 1,
                  sm: 1,
                }}
              >
                <Link to='/report/peace'>
                  <ContentCard>
                    <CardTitle className='line-clamp-3 p-0! font-heading font-medium text-2xl! text-foreground leading-[130%]'>
                      Peace
                    </CardTitle>
                    <CardFooter className='mt-auto gap-1 p-0! font-semibold text-primary text-sm uppercase tracking-wider'>
                      Learn more
                      <ArrowRight
                        size={18}
                        className='shrink-0 transition-transform group-hover:translate-x-1'
                      />
                    </CardFooter>
                  </ContentCard>
                </Link>
              </GridItem>
              <GridItem
                noOfColSpan={{
                  base: 1,
                  md: 1,
                  sm: 1,
                }}
              >
                <Link to='/report/justice'>
                  <ContentCard>
                    <CardTitle className='line-clamp-3 p-0! font-heading font-medium text-2xl! text-foreground leading-[130%]'>
                      Justice
                    </CardTitle>
                    <CardFooter className='mt-auto gap-1 p-0! font-semibold text-secondary text-sm uppercase tracking-wider'>
                      Learn more
                      <ArrowRight
                        size={18}
                        className='shrink-0 transition-transform group-hover:translate-x-1'
                      />
                    </CardFooter>
                  </ContentCard>
                </Link>
              </GridItem>
              <GridItem
                noOfColSpan={{
                  base: 1,
                  md: 1,
                  sm: 1,
                }}
              >
                <Link to='/report/inclusion'>
                  <ContentCard>
                    <CardTitle className='line-clamp-3 p-0! font-heading font-medium text-2xl! text-foreground leading-[130%]'>
                      Inclusion
                    </CardTitle>
                    <CardFooter className='mt-auto gap-1 p-0! font-semibold text-sm text-tertiary uppercase tracking-wider'>
                      Learn more
                      <ArrowRight
                        size={18}
                        className='shrink-0 transition-transform group-hover:translate-x-1'
                      />
                    </CardFooter>
                  </ContentCard>
                </Link>
              </GridItem>
            </Grid>
          </div>
          <Separator orientation='horizontal' color='surface-md' />
          <Grid
            gap='16px'
            noOfCol={{
              base: 1,
              md: 2,
              lg: 3,
            }}
          >
            <GridItem
              noOfColSpan={{
                base: 1,
                md: 1,
                sm: 1,
              }}
            >
              <Link to='/report/sdg16-progress'>
                <ContentCard>
                  <CardTitle className='line-clamp-3 p-0! font-heading font-medium text-2xl! text-foreground leading-[130%]'>
                    SDG 16 Progress
                  </CardTitle>
                  <CardFooter className='mt-auto gap-1 p-0! font-semibold text-accent-blue-500 text-sm uppercase tracking-wider'>
                    Learn more
                    <ArrowRight
                      size={18}
                      className='shrink-0 transition-transform group-hover:translate-x-1'
                    />
                  </CardFooter>
                </ContentCard>
              </Link>
            </GridItem>
          </Grid>
        </div>
      </section>
    </>
  );
}

export const Route = createLazyRoute('/report')({
  component: Report,
});
