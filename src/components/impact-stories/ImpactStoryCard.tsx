import { useState } from 'react';
import { chapters } from '../../constants';
import { getImpactStory } from '../../data/impactStories';
import ImpactStoryModal from './ImpactStoryModal';

interface ImpactStoryCardProps {
  id: string;
}

export default function ImpactStoryCard({ id }: ImpactStoryCardProps) {
  const { title, story, chapter } = getImpactStory(id);
  const meta = chapters[chapter];
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type='button'
        onClick={() => setOpen(true)}
        className='group flex h-full flex-col items-start gap-3 rounded-lg border border-gray-200 bg-white p-6 text-left transition-shadow hover:shadow-md'
      >
        <span className='tag' style={{ color: meta.color }}>
          {meta.title}
        </span>
        <h4 className='font-normal text-gray-900 text-xl leading-snug'>{title}</h4>
        <p className='line-clamp-3 text-gray-600 text-sm'>{story}</p>
        <span
          className='mt-auto font-semibold text-sm group-hover:underline'
          style={{ color: meta.color }}
        >
          Read full story
        </span>
      </button>

      <ImpactStoryModal title={title} story={story} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
