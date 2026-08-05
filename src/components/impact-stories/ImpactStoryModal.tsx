import { Modal } from '@undp/design-system-react/Modal';

interface ImpactStoryModalProps {
  title: string;
  story: string;
  open: boolean;
  onClose: () => void;
}

export default function ImpactStoryModal({ title, story, open, onClose }: ImpactStoryModalProps) {
  const paragraphs = story.split(/\n\n+/);

  return (
    <Modal title={title} open={open} onClose={onClose}>
      <div className='flex flex-col gap-4 text-base text-gray-700'>
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>
    </Modal>
  );
}
