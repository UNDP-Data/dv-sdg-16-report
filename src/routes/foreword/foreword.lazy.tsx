import { createLazyRoute } from '@tanstack/react-router';
import { H1, P } from '@undp/design-system-react/Typography';
import PlaceholderBlock from '@/components/PlaceholderBlock';

export function Foreword() {
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
            className='font-semibold text-content-reverse uppercase tracking-widest'
          >
            Global Progress Report 2026
          </P>
          <H1 marginBottom='sm' weight='normal' className='text-content-reverse normal-case'>
            Foreword
          </H1>
        </div>
      </section>

      <section className='px-6 py-12 md:px-12 md:py-16'>
        <div className='mx-auto flex max-w-180 flex-col'>
          <P marginBottom='xs' size='lg'>
            More than a decade after Member States adopted the 2030 Agenda, the conditions for
            sustainable development have changed profoundly. Humanity possesses greater
            technological, scientific and economic capabilities than at any point in history. Yet
            growing insecurity, deepening polarization and declining trust, alongside violent
            conflicts, economic uncertainty and geopolitical fragmentation, are making hard-won
            development gains increasingly fragile. In this context, the challenge of our time is
            not only identifying solutions but ensuring that institutions are capable and resilient
            enough to turn those solutions into life-changing results.
          </P>
          <P marginBottom='xs' size='lg'>
            This report examines global progress towards Sustainable Development Goal (SDG) 16. The
            evidence presented here demonstrates that Goal 16 is not simply one of 17 goals. Peace,
            justice and inclusive institutions are the foundations on which progress across the
            entire 2030 Agenda depends.
          </P>
          <P marginBottom='xs' size='lg'>
            Drawing on the latest global evidence, the report presents a mixed picture of progress.
            Important gains have been achieved in several areas, from expanding legal identity and
            women’s representation in public institutions to the establishment of independent human
            rights institutions and access to information laws. Yet progress remains uneven.
            Violence and discrimination continue to affect millions of people, barriers to justice
            persist, and progress across several indicators has stalled or remains too slow to meet
            the ambitions of the 2030 Agenda.
          </P>
          <P marginBottom='xs' size='lg'>
            The findings of this report point to a clear lesson: lasting progress depends on
            sustained political commitment, long-term investment, strong partnerships and
            institutions that earn and maintain public trust. They also reinforce the importance of
            prevention. Investing early in children, families and communities, while strengthening
            justice systems, accountable governance, public integrity, human rights protection and
            effective public services is far less costly — and far more effective — than responding
            after violence, conflict, corruption or exclusion have already taken hold.
          </P>
          <P marginBottom='xs' size='lg'>
            As we enter the final years of the 2030 Agenda, the message is both urgent and hopeful.
            Progress is possible. But it does not happen by itself. It requires deliberate choices
            and sustained effort. The vision of the SDGs is clear: a world where peace, justice and
            strong institutions are not privileges enjoyed by some. They are the foundations of a
            future that works for all.
          </P>
        </div>
      </section>

      <section className='px-6 pb-16 md:px-12 md:pb-24'>
        <div className='mx-auto flex max-w-300 flex-col gap-16'>
          <div className='flex flex-wrap items-center justify-center gap-12 lg:justify-between'>
            <img
              src='/imgs/logos/ohchr.svg'
              alt='United Nations Human Rights, Office of the High Commissioner'
              className='h-30'
            />
            <img
              src='/imgs/logos/undp.svg'
              alt='United Nations Development Programme'
              className='h-35'
            />
            <img src='/imgs/logos/unicef.svg' alt='UNICEF, for every child' className='h-33' />
            <img
              src='/imgs/logos/unodc.svg'
              alt='United Nations Office on Drugs and Crime'
              className='h-30'
            />
          </div>

          <div className='grid lg:grid-cols-4'>
            <div className='flex flex-col gap-4 border-stroke-sm border-b pb-6 lg:border-r lg:border-b-0 lg:py-0 lg:pr-6'>
              <PlaceholderBlock label='Signature' />
              <div>
                <P marginBottom='none' weight='semibold' size='base'>
                  Name Surname
                </P>
                <P marginBottom='none' size='sm' className='text-content-secondary'>
                  Position <br />
                  Organization
                </P>
              </div>
            </div>
            <div className='flex flex-col gap-4 border-stroke-sm border-b py-6 lg:border-r lg:border-b-0 lg:px-6 lg:py-0'>
              <PlaceholderBlock label='Signature' />
              <div>
                <P marginBottom='none' weight='semibold' size='base'>
                  Name Surname
                </P>
                <P marginBottom='none' size='sm' className='text-content-secondary'>
                  Position <br />
                  Organization
                </P>
              </div>
            </div>
            <div className='flex flex-col gap-4 border-stroke-sm border-b py-6 lg:border-r lg:border-b-0 lg:px-6 lg:py-0'>
              <PlaceholderBlock label='Signature' />
              <div>
                <P marginBottom='none' weight='semibold' size='base'>
                  Name Surname
                </P>
                <P marginBottom='none' size='sm' className='text-content-secondary'>
                  Position <br />
                  Organization
                </P>
              </div>
            </div>
            <div className='flex flex-col gap-4 pt-6 lg:py-0 lg:pl-6'>
              <PlaceholderBlock label='Signature' />
              <div>
                <P marginBottom='none' weight='semibold' size='base'>
                  Name Surname
                </P>
                <P marginBottom='none' size='sm' className='text-content-secondary'>
                  Position <br />
                  Organization
                </P>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const Route = createLazyRoute('/foreword')({
  component: Foreword,
});
