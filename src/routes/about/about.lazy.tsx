import { createLazyRoute } from '@tanstack/react-router';
import { Grid } from '@undp/design-system-react/Grid';
import { Spacer } from '@undp/design-system-react/Spacer';
import { H1, H4, H5, P } from '@undp/design-system-react/Typography';
import { ArrowDown, Mail } from 'lucide-react';
import { SectionContainer } from '@/components/Containers';

export function About() {
  return (
    <>
      <section
        className='bg-bottom-right bg-cover bg-foreground-soft px-6 py-16 md:px-12 md:py-24'
        style={{ backgroundImage: `url('/imgs/chapters/default-hero.webp')` }}
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
            About
          </H1>
        </div>
      </section>

      <section className='px-6 py-8 md:px-12 md:py-10'>
        <SectionContainer>
          <div className='flex max-w-180 flex-col'>
            <P marginBottom='xs' size='lg'>
              The Global Progress Report on SDG 16 is an annual United Nations inter-agency
              publication jointly produced by UNDP, OHCHR, UNICEF and UNODC, with contributions from
              IPU, UNCTAD, UNESCO, DESA, UNODA, PEFA, the World Bank Group and WHO. The report
              brings together the latest available data and evidence to provide a global assessment
              of progress towards peaceful, just and inclusive societies. Drawing on the global SDG
              indicator framework, it examines progress and setbacks across Goal 16, highlights
              emerging trends and persistent inequalities, and identifies areas where significant
              data gaps remain.
            </P>
            <P marginBottom='xs' size='lg'>
              By bringing evidence from across Goal 16 together in one place, the report provides
              Member States, United Nations entities, civil society, researchers and other
              stakeholders with a shared evidence base for understanding where progress is being
              made, where challenges remain, and where greater attention is needed.
            </P>
            <P marginBottom='xs' size='lg'>
              At a time when the very foundations of peace, justice and inclusion are under strain,
              the urgency of advancing, and monitoring SDG 16, has never been clearer. Without
              credible data, injustice remains invisible, exclusion goes unchallenged, and
              institutions cannot be held to account. Measuring Goal 16 is therefore not only a
              statistical exercise of tracking global targets, but also essential to understanding
              who is being reached, where gaps persist, and where greater attention and action are
              needed.
            </P>
          </div>
        </SectionContainer>
      </section>

      <section className='px-6 pb-8 md:px-12 md:pb-10'>
        <SectionContainer className='border-stroke-sm border-y'>
          <div className='flex flex-col gap-y-2 py-4 md:flex-row md:items-center md:gap-x-10'>
            <P
              size='sm'
              marginBottom='none'
              className='shrink-0 text-content-quaternary md:w-44 lg:w-52'
            >
              Produced by
            </P>
            <div className='flex min-h-24 flex-wrap items-center gap-x-10 gap-y-4'>
              <img
                src='/imgs/logos/ohchr.svg'
                alt='United Nations Human Rights, Office of the High Commissioner'
                className='h-20'
              />
              <img
                src='/imgs/logos/undp.svg'
                alt='United Nations Development Programme'
                className='h-24'
              />
              <img src='/imgs/logos/unicef.svg' alt='UNICEF, for every child' className='h-22' />
              <img
                src='/imgs/logos/unodc.svg'
                alt='United Nations Office on Drugs and Crime'
                className='h-23'
              />
            </div>
          </div>

          <div className='flex flex-col gap-y-2 border-stroke-sm border-t py-4 md:flex-row md:items-center md:gap-x-10'>
            <P
              size='sm'
              marginBottom='none'
              className='shrink-0 text-content-quaternary md:w-44 lg:w-52'
            >
              In collaboration with
            </P>
            <div className='flex min-h-24 flex-wrap items-center gap-x-10 gap-y-4'>
              <img
                src='/imgs/logos/unesco.svg'
                alt='United Nations Educational, Scientific and Cultural Organization'
                className='h-12'
              />
              <img
                src='/imgs/logos/pefa.png'
                alt='Public Expenditure and Financial Accountability Program'
                className='h-16'
              />
            </div>
          </div>
        </SectionContainer>
      </section>

      <section className='px-6 py-8 md:px-12 md:py-10'>
        <SectionContainer>
          <H4 weight='semibold' marginBottom='none' className='font-heading text-foreground'>
            Publications
          </H4>
          <Spacer size='3xl' />
          <P
            marginBottom='none'
            size='sm'
            weight='semibold'
            className='text-content-quaternary uppercase tracking-wider'
          >
            New edition
          </P>
          <Spacer size='lg' />
          <Grid gap='16px' noOfCol={{ base: 1, lg: 2 }}>
            <a
              // biome-ignore lint/a11y/useValidAnchor: <TBA>
              href='#'
              aria-label='Download the 2026 Global Progress Report on SDG 16 (PDF)'
              className='group flex gap-6 border border-stroke-sm p-6 transition-colors hover:bg-background-soft'
            >
              <div className='flex aspect-[1/1.414] w-24 shrink-0 items-center justify-center border border-gray-300 border-dashed bg-gray-50'>
                <P
                  marginBottom='none'
                  size='xs'
                  weight='semibold'
                  className='text-gray-400 uppercase tracking-widest'
                >
                  Cover
                </P>
              </div>
              <div className='flex flex-col gap-2'>
                <P
                  marginBottom='none'
                  size='sm'
                  weight='semibold'
                  className='text-content-secondary uppercase tracking-wider'
                >
                  2026
                </P>
                <H5
                  weight='medium'
                  marginBottom='none'
                  className='font-heading text-foreground text-lg! leading-[130%]'
                >
                  Global Progress Report on SDG 16: Peace, Justice, Inclusion
                </H5>
                <span className='mt-auto flex w-fit items-center gap-2 pt-2 font-semibold text-blue-500 text-sm uppercase tracking-wider'>
                  Download PDF
                  <ArrowDown
                    size={16}
                    aria-hidden='true'
                    className='shrink-0 transition-transform group-hover:translate-x-1'
                  />
                </span>
              </div>
            </a>
          </Grid>

          <Spacer size='3xl' />
          <P
            marginBottom='none'
            size='sm'
            weight='semibold'
            className='text-content-quaternary uppercase tracking-wider'
          >
            Previous editions
          </P>
          <Spacer size='lg' />
          <Grid gap='16px' noOfCol={{ base: 1, lg: 2 }}>
            <a
              href='/downloads/global-progress-report-sdg16-2025.pdf'
              target='_blank'
              rel='noreferrer'
              aria-label='2025 Global Progress Report on Sustainable Development Goal 16: Indicators on Peaceful, Just and Inclusive Societies (opens in a new tab)'
              className='group flex gap-6 border border-stroke-sm p-6 transition-colors hover:bg-background-soft'
            >
              <img
                src='/imgs/covers/cover-2025.webp'
                alt='Cover of the 2025 Global Progress Report on SDG 16'
                className='aspect-[1/1.414] w-24 shrink-0 object-cover'
              />
              <div className='flex flex-col gap-2'>
                <P
                  marginBottom='none'
                  size='sm'
                  weight='semibold'
                  className='text-content-secondary uppercase tracking-wider'
                >
                  2025
                </P>
                <H5
                  weight='medium'
                  marginBottom='none'
                  className='font-heading text-foreground text-lg! leading-[130%]'
                >
                  Global Progress Report on Sustainable Development Goal 16: Indicators on Peaceful,
                  Just and Inclusive Societies
                </H5>
                <span className='mt-auto flex w-fit items-center gap-2 pt-2 font-semibold text-blue-500 text-sm uppercase tracking-wider'>
                  Download PDF
                  <ArrowDown
                    size={16}
                    aria-hidden='true'
                    className='shrink-0 transition-transform group-hover:translate-x-1'
                  />
                </span>
              </div>
            </a>
            <a
              href='/downloads/global-progress-report-sdg16-2024.pdf'
              target='_blank'
              rel='noreferrer'
              aria-label='2024 At the Crossroads: Breakdown or Breakthrough for Peace, Justice and Strong Institutions (opens in a new tab)'
              className='group flex gap-6 border border-stroke-sm p-6 transition-colors hover:bg-background-soft'
            >
              <img
                src='/imgs/covers/cover-2024.webp'
                alt='Cover of the 2024 Global Progress Report on SDG 16'
                className='aspect-[1/1.414] w-24 shrink-0 object-cover'
              />
              <div className='flex flex-col gap-2'>
                <P
                  marginBottom='none'
                  size='sm'
                  weight='semibold'
                  className='text-content-secondary uppercase tracking-wider'
                >
                  2024
                </P>
                <H5
                  weight='medium'
                  marginBottom='none'
                  className='font-heading text-foreground text-lg! leading-[130%]'
                >
                  Global Progress Report on Sustainable Development Goal 16 Indicators – At the
                  Crossroads: Breakdown or Breakthrough for Peace, Justice and Strong Institutions
                </H5>
                <span className='mt-auto flex w-fit items-center gap-2 pt-2 font-semibold text-blue-500 text-sm uppercase tracking-wider'>
                  Download PDF
                  <ArrowDown
                    size={16}
                    aria-hidden='true'
                    className='shrink-0 transition-transform group-hover:translate-x-1'
                  />
                </span>
              </div>
            </a>
            <a
              href='/downloads/global-progress-report-sdg16-2023.pdf'
              target='_blank'
              rel='noreferrer'
              aria-label='2023 Global Progress Report on Sustainable Development Goal 16 Indicators: A Wake-Up Call for Action on Peace, Justice and Inclusion (opens in a new tab)'
              className='group flex gap-6 border border-stroke-sm p-6 transition-colors hover:bg-background-soft'
            >
              <img
                src='/imgs/covers/cover-2023.webp'
                alt='Cover of the 2023 Global Progress Report on SDG 16'
                className='aspect-[1/1.414] w-24 shrink-0 object-cover'
              />
              <div className='flex flex-col gap-2'>
                <P
                  marginBottom='none'
                  size='sm'
                  weight='semibold'
                  className='text-content-secondary uppercase tracking-wider'
                >
                  2023
                </P>
                <H5
                  weight='medium'
                  marginBottom='none'
                  className='font-heading text-foreground text-lg! leading-[130%]'
                >
                  Global Progress Report on Sustainable Development Goal 16 Indicators: A Wake-Up
                  Call for Action on Peace, Justice and Inclusion
                </H5>
                <span className='mt-auto flex w-fit items-center gap-2 pt-2 font-semibold text-blue-500 text-sm uppercase tracking-wider'>
                  Download PDF
                  <ArrowDown
                    size={16}
                    aria-hidden='true'
                    className='shrink-0 transition-transform group-hover:translate-x-1'
                  />
                </span>
              </div>
            </a>
          </Grid>

          <Spacer size='3xl' />
          <P
            marginBottom='none'
            size='sm'
            weight='semibold'
            className='text-content-quaternary uppercase tracking-wider'
          >
            Regional focus
          </P>
          <Spacer size='lg' />
          <Grid gap='16px' noOfCol={{ base: 1, lg: 2 }}>
            <div className='flex gap-6 border border-stroke-sm p-6'>
              <img
                src='/imgs/covers/cover-LAC.webp'
                alt='Cover of the Global Progress Report on SDG 16: Latin America and the Caribbean'
                className='aspect-[1/1.414] w-24 shrink-0 object-cover'
              />
              <div className='flex flex-col gap-2'>
                <P
                  marginBottom='none'
                  size='sm'
                  weight='semibold'
                  className='text-content-secondary uppercase tracking-wider'
                >
                  2026
                </P>
                <H5
                  weight='medium'
                  marginBottom='none'
                  className='font-heading text-foreground text-lg! leading-[130%]'
                >
                  Global Progress Report on Sustainable Development Goal 16 — Latin America and the
                  Caribbean: Indicators on Peaceful, Just and Inclusive Societies
                </H5>
                <div className='mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-2'>
                  <P
                    size='sm'
                    marginBottom='none'
                    className='text-content-quaternary uppercase tracking-wider'
                  >
                    Download PDF in
                  </P>
                  <a
                    href='/downloads/global-progress-report-sdg16-lac.pdf'
                    target='_blank'
                    rel='noreferrer'
                    aria-label='Download the Latin America and the Caribbean regional snapshot in English (PDF)'
                    className='group flex w-fit items-center gap-2 font-semibold text-blue-500 text-sm uppercase tracking-wider'
                  >
                    English
                    <ArrowDown
                      size={16}
                      aria-hidden='true'
                      className='shrink-0 transition-transform group-hover:translate-x-1'
                    />
                  </a>
                  <a
                    href='/downloads/global-progress-report-sdg16-lac-es.pdf'
                    target='_blank'
                    rel='noreferrer'
                    aria-label='Descargar el informe regional de América Latina y el Caribe en español (PDF)'
                    className='group flex w-fit items-center gap-2 font-semibold text-blue-500 text-sm uppercase tracking-wider'
                  >
                    Español
                    <ArrowDown
                      size={16}
                      aria-hidden='true'
                      className='shrink-0 transition-transform group-hover:translate-x-1'
                    />
                  </a>
                </div>
              </div>
            </div>
          </Grid>
        </SectionContainer>
      </section>

      <section className='px-6 py-8 md:px-12 md:py-10'>
        <SectionContainer>
          <div className='flex max-w-180 flex-col'>
            <H4 weight='semibold' marginBottom='none' className='font-heading text-foreground'>
              Acknowledgements
            </H4>
            <Spacer size='2xl' />
            <P marginBottom='xs' size='lg'>
              This report was prepared jointly by the Human Rights Statistics Unit of the Innovation
              and Analytics Hub in the Office of the United Nations High Commissioner for Human
              Rights (OHCHR); the Global Policy Centre for Governance (GPCG) of the United Nations
              Development Programme (UNDP); the Data and Analytics Section of the United Nations
              Children’s Fund (UNICEF), and the Data, Analytics and Statistics Section (DASS) of the
              Research and Trend Analysis Branch, the United Nations Office on Drugs and Crime
              (UNODC).
            </P>
            <P marginBottom='xs' size='lg'>
              Analyses of indicators and the corresponding sections of this report were prepared by
              these four agencies, in collaboration with the other custodian agencies responsible
              for supporting and coordinating global data collection and reporting for Goal 16
              indicators. Special appreciation is extended to the Inter-Parliamentary Union (IPU);
              the Public Expenditure and Financial Accountability Program (PEFA); the World Bank
              Group; the United Nations Educational, Scientific and Cultural Organization Institute
              for Statistics (UNESCO-UIS); the United Nations Financing for Sustainable Development
              Office (FSDO); the United Nations Office for Disarmament Affairs (UNODA); the United
              Nations Trade and Development (UNCTAD); and the World Health Organization (WHO). The
              authors further acknowledge the United Nations Statistics Division (UNSD) of the
              United Nations Department of Economic and Social Affairs (UN DESA) for its leadership
              in compiling and disseminating global SDG indicators data.
            </P>
            <P marginBottom='xs' size='lg'>
              The agencies wish to express their sincere appreciation to national institutions that
              contribute to the production and validation of the data underpinning the indicators,
              including especially national statistical offices but also National Human Rights
              Institutions, ministries of justice, courts, prosecution services, police and law
              enforcement authorities, prison and correctional administrations, anti-corruption
              bodies, electoral management authorities, civil registration agencies, parliamentary
              institutions, and other public sector entities. Their continued commitment to
              producing, sharing, and improving high-quality data is essential for monitoring
              progress towards peaceful, just, and inclusive societies. Particular gratitude is
              extended also to the many United Nations Country Teams, agencies’ country and regional
              offices that contribute to the production and validation of the data included in this
              report.
            </P>
          </div>
        </SectionContainer>
      </section>

      <section className='px-6 pt-8 pb-16 md:px-12 md:pt-10 md:pb-24'>
        <SectionContainer className='bg-background-soft p-8 md:p-12'>
          <H4 weight='semibold' marginBottom='none' className='font-heading text-foreground'>
            Get in touch with us
          </H4>
          <Spacer size='3xl' />
          <Grid gap='16px' noOfCol={{ base: 1, md: 2, lg: 4 }}>
            <div className='flex flex-col gap-2 border-stroke-sm border-t pt-4'>
              <P marginBottom='none' size='base' weight='semibold' className='text-foreground'>
                OHCHR
              </P>
              <a
                href='mailto:OHCHR-SDGindicators@un.org'
                className='flex items-start gap-2 break-all text-blue-500 text-sm hover:underline'
              >
                <Mail size={16} aria-hidden='true' className='mt-0.5 shrink-0' />
                OHCHR-SDGindicators@un.org
              </a>
            </div>

            <div className='flex flex-col gap-2 border-stroke-sm border-t pt-4'>
              <P marginBottom='none' size='base' weight='semibold' className='text-foreground'>
                UNDP GPCG
              </P>
              <a
                href='mailto:sdg16indicators@undp.org'
                className='flex items-start gap-2 break-all text-blue-500 text-sm hover:underline'
              >
                <Mail size={16} aria-hidden='true' className='mt-0.5 shrink-0' />
                sdg16indicators@undp.org
              </a>
            </div>

            <div className='flex flex-col gap-2 border-stroke-sm border-t pt-4'>
              <P marginBottom='none' size='base' weight='semibold' className='text-foreground'>
                UNICEF
              </P>
              <a
                href='mailto:data@unicef.org'
                className='flex items-start gap-2 break-all text-blue-500 text-sm hover:underline'
              >
                <Mail size={16} aria-hidden='true' className='mt-0.5 shrink-0' />
                data@unicef.org
              </a>
            </div>

            <div className='flex flex-col gap-2 border-stroke-sm border-t pt-4'>
              <P marginBottom='none' size='base' weight='semibold' className='text-foreground'>
                UNODC
              </P>
              <a
                href='mailto:unodc-stats@un.org'
                className='flex items-start gap-2 break-all text-blue-500 text-sm hover:underline'
              >
                <Mail size={16} aria-hidden='true' className='mt-0.5 shrink-0' />
                unodc-stats@un.org
              </a>
            </div>
          </Grid>
        </SectionContainer>
      </section>
    </>
  );
}

export const Route = createLazyRoute('/about')({
  component: About,
});
