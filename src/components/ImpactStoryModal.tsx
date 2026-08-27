import { MarkdownRenderer } from '@undp/design-system-react/MarkdownRenderer';
import { Modal } from '@undp/design-system-react/Modal';
import { H3 } from '@undp/design-system-react/Typography';
import Tag from '@/components/Tag';
import type { ChapterKey, ImpactStoryDataType } from '@/types';
import { getChapterColor } from '@/Utils/getChapterColor';
import BigNumber from './BigNumber';

interface ImpactStoryModalProps {
  story: ImpactStoryDataType | undefined;
  onClose: () => void;
}

const CHAPTER_WAVE_IMAGE: Record<ChapterKey, string> = {
  peace: '/imgs/dividers/peace-02.webp',
  justice: '/imgs/dividers/justice-01.webp',
  inclusion: '/imgs/dividers/inclusion-01.webp',
};

export default function ImpactStoryModal({ story, onClose }: ImpactStoryModalProps) {
  const color = getChapterColor(story?.chapter);

  return (
    <Modal
      title={story?.title || 'Data to impact stories'}
      titleClassName='sr-only'
      open={!!story}
      onClose={onClose}
      overlayClassName='bg-surface/95 backdrop-blur-[32px]'
    >
      {story ? (
        <div className='flex flex-col gap-6'>
          <Tag
            color={color}
            content={`Data to impact stories · SDG ${story.indicatorCode} · ${story.indicatorTitle}`}
          />
          <H3 weight='semibold' marginBottom='none' className='w-[75%] font-heading leading-tight'>
            {story.title}
          </H3>
          <div className='flex flex-col gap-10 md:flex-row md:items-start md:gap-14'>
            <div className='flex min-w-0 flex-1 flex-col gap-6'>
              <MarkdownRenderer text={story.story} />
            </div>
            {story.stats && (
              <div className='flex w-full shrink-0 flex-col gap-8 bg-background-soft p-8 md:w-72'>
                <Tag color={color} content='Key numbers' />
                <div className='flex flex-col gap-8'>
                  {story.stats.map((stat) => (
                    <BigNumber
                      key={stat.label}
                      value={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                      color={color}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <img
            src={CHAPTER_WAVE_IMAGE[story.chapter]}
            alt={`${story.chapter} divider`}
            aria-hidden='true'
            className='pointer-events-none h-24 w-full object-cover object-center opacity-90 md:h-32'
          />
        </div>
      ) : null}
    </Modal>
  );
}
