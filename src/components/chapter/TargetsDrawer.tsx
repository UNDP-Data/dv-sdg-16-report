import { Drawer, DrawerContent, DrawerTrigger } from '@undp/design-system-react/Drawer';
import { InfoIcon } from 'lucide-react';
import { FONT_HEADING } from '../../constants';
import type { ChapterTarget } from '../../types';

interface TargetsDrawerProps {
  chapterTitle: string;
  color: string;
  targets: ChapterTarget[];
}

export default function TargetsDrawer({ chapterTitle, color, targets }: TargetsDrawerProps) {
  return (
    <Drawer direction='right'>
      <DrawerTrigger asChild>
        <button
          type='button'
          className='fixed right-0 bottom-8 z-20 flex items-center gap-2 rounded-l-[8px] py-3 pr-6 pl-5 text-left text-sm text-white leading-snug shadow-lg transition-[padding-right] duration-300 ease-out hover:pr-12'
          style={{
            backgroundImage: "url('/imgs/chapters/texture-peace.png')",
            backgroundSize: 'cover',
          }}
        >
          Discover targets
          <br />
          behind this
          <br />
          chapter
        </button>
      </DrawerTrigger>

      <DrawerContent
        className='w-full max-w-xl border-white/10 bg-[#010C19] text-white'
        closeButtonClassName='!bg-white/10 !text-white hover:!bg-white/20'
      >
        <div className='flex h-screen flex-col overflow-y-auto px-6 pt-16 pb-12 md:px-12 md:pt-20'>
          <InfoIcon color={color} />
          <p className='mb-6 font-normal text-5xl text-white' style={{ fontFamily: FONT_HEADING }}>
            {chapterTitle}: Targets and indicators
          </p>
          <p>
            This chapter explores one dimension of SDG 16. Indicators are grouped by target to show
            how each measure contributes to peaceful, just and inclusive societies.
          </p>

          <div className='mt-10 flex flex-col gap-10'>
            {targets.map((target) => (
              <div key={target.code}>
                <p className='font-semibold text-sm uppercase tracking-wide' style={{ color }}>
                  Target {target.code}
                </p>
                <p className='mt-2 text-gray-300'>{target.description}</p>
                <div className='mt-4 rounded-md border border-white/10'>
                  {target.indicators.map((indicator, index) => (
                    <div
                      key={indicator.code}
                      className={`flex items-baseline gap-6 px-4 py-3 ${
                        index > 0 ? 'border-white/10 border-t' : ''
                      }`}
                    >
                      <span className='w-32 shrink-0 font-semibold text-sm' style={{ color }}>
                        {indicator.code}
                      </span>
                      <span className='text-white'>{indicator.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
