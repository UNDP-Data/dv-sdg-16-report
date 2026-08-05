import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { chapters } from '../../constants';
import { getImpactStory } from '../../data/impactStories';
import ImpactStoryModal from './ImpactStoryModal';

interface ImpactStoryProps {
  id: string;
  eyebrow?: string;
  color?: string;
  linkLabel?: string;
  className?: string;
}

export default function ImpactStory({
  id,
  eyebrow = 'Data impact story',
  color,
  linkLabel = 'Read full story',
  className = '',
}: ImpactStoryProps) {
  const { title, story, chapter } = getImpactStory(id);
  const resolvedColor = color ?? chapters[chapter].color;
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`relative isolate mx-[calc(50%-50vw+1.5rem)] w-[calc(100vw-3rem)] overflow-hidden rounded-lg bg-[#010C19] bg-cover bg-right md:mx-[calc(50%-50vw+3rem)] md:w-[calc(100vw-6rem)] ${className}`}
        style={{ backgroundImage: `url('/imgs/chapters/impact-story-bg.webp')` }}
      >
        <div className='mx-auto flex max-w-[1200px] flex-col gap-4 px-6 py-14 md:px-12 md:py-20'>
          <div className='flex max-w-xl flex-col gap-4'>
            <span className='tag' style={{ color: resolvedColor }}>
              {eyebrow}
            </span>
            <h3 className='font-normal text-white!'>{title}</h3>
            <div className='line-clamp-3 font-light text-[#EFF5F9]'>{story}</div>
            <button
              type='button'
              onClick={() => setOpen(true)}
              style={{ border: `1px solid ${resolvedColor}` }}
              className='group mt-2 inline-flex w-fit items-center gap-1.5 px-5 py-3 font-medium text-sm text-white transition-colors hover:bg-white/10'
            >
              {linkLabel}
              <ChevronRight
                size={16}
                className='transition-transform group-hover:translate-x-0.5'
              />
            </button>
          </div>
        </div>
      </div>

      <ImpactStoryModal title={title} story={story} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
