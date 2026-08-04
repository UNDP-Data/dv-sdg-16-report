import type { ChapterMeta } from './types';

export const ROUTES = {
  home: '/',
  peace: '/chapters/peace',
  justice: '/chapters/justice',
  inclusion: '/chapters/inclusion',
} as const;

export const FONT_HEADING = 'Newsreader';
export const FONT_BODY = 'Hanken Grotesk';

// Keep in sync with --gender-lens-rgb in style.css
export const GENDER_LENS_COLOR = 'rgb(123, 111, 232)';

export const chapters: Record<'peace' | 'justice' | 'inclusion', ChapterMeta> = {
  peace: {
    number: '1',
    title: 'Peace',
    color: '#42A1D8',
    bg: '/imgs/chapters/peace-hero.webp',
    description:
      'Peace is often associated with the absence of war. Under Goal 16 of the Agenda 2030, however, peace is measured more broadly through a set of complementary indicators that capture different manifestations of violence and insecurity.',
  },
  justice: {
    number: '2',
    title: 'Justice',
    color: '#E2501F',
    bg: '/imgs/chapters/justice-hero.webp',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Access to justice remains uneven across income levels and regions, with case backlogs and pre-trial detention rates that undermine trust in formal institutions.',
  },
  inclusion: {
    number: '3',
    title: 'Inclusion',
    color: '#05AA8E',
    bg: '/imgs/chapters/inclusion-hero.webp',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Inclusive institutions recognize, represent, and treat all people fairly — but participation gaps by gender, disability, and minority status persist across most public institutions.',
  },
};

export const peaceMeta = chapters.peace;
export const justiceMeta = chapters.justice;
export const inclusionMeta = chapters.inclusion;
