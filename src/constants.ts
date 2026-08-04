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
      'Peace is a fundamental condition of thriving societies, as peace indicates the absence of violence and fear. The indicators under Goal 16 measure the different ways violence and insecurity affect people, providing a multidimensional picture of peace.',
  },
  justice: {
    number: '2',
    title: 'Justice',
    color: '#E2501F',
    bg: '/imgs/chapters/justice-hero.webp',
    description:
      'Justice enables societies to progress by ensuring that institutional mechanisms are accessible, promote accountability and operate fairly for all people. The indicators under Goal 16 measure institutional capacity, fairness and accountability.',
  },
  inclusion: {
    number: '3',
    title: 'Inclusion',
    color: '#05AA8E',
    bg: '/imgs/chapters/inclusion-hero.webp',
    description:
      'Inclusion is central to societal progress, as inclusive societies enable everyone to participate meaningfully in public life. Under Goal 16, inclusion is measured through indicators that assess whether institutions represent and serve all people equally and effectively. Together, these indicators provide insight into the broader dimensions of social cohesion and institutional legitimacy.',
  },
};

export const peaceMeta = chapters.peace;
export const justiceMeta = chapters.justice;
export const inclusionMeta = chapters.inclusion;
