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

export const DARK_BLUE = '#010C19';

export const chapters: Record<'peace' | 'justice' | 'inclusion', ChapterMeta> = {
  peace: {
    number: '1',
    title: 'Peace',
    color: '#42A1D8',
    bg: '/imgs/chapters/peace-hero.webp',
    description:
      'Peace is a fundamental condition of thriving societies, as peace indicates the absence of violence and fear. The indicators under Goal 16 measure the different ways violence and insecurity affect people, providing a multidimensional picture of peace.',
    targets: [
      {
        code: '16.1',
        description:
          'Significantly reduce all forms of violence and related death rates everywhere',
        indicators: [
          { code: '16.1.1', label: 'Homicide' },
          { code: '16.1.2', label: 'Conflict-related deaths' },
          { code: '16.1.3', label: 'Physical, sexual and psychological violence' },
          { code: '16.1.4', label: 'Perception of safety' },
        ],
      },
      {
        code: '16.2',
        description:
          'End abuse, exploitation, trafficking and all forms of violence against and torture of children',
        indicators: [
          { code: '16.2.1 & 16.2.3', label: 'Violence against children' },
          { code: '16.2.2', label: 'Human trafficking victims' },
        ],
      },
      {
        code: '16.10',
        description:
          'Ensure public access to information and protect fundamental freedoms, in accordance with national legislation and international agreements',
        indicators: [{ code: '16.10.1', label: 'Attacks on defenders' }],
      },
    ],
  },
  justice: {
    number: '2',
    title: 'Justice',
    color: '#E2501F',
    bg: '/imgs/chapters/justice-hero.webp',
    description:
      'Justice enables societies to progress by ensuring that institutional mechanisms are accessible, promote accountability and operate fairly for all people. The indicators under Goal 16 measure institutional capacity, fairness and accountability.',
    targets: [
      {
        code: '16.3',
        description:
          'Promote the rule of law at the national and international levels and ensure equal access to justice for all',
        indicators: [
          { code: '16.3.1', label: 'Access to criminal justice' },
          { code: '16.3.2', label: 'Unsentenced detention' },
          { code: '16.3.3', label: 'Access to civil justice' },
        ],
      },
      {
        code: '16.4',
        description:
          'By 2030, significantly reduce illicit financial and arms flows, strengthen the recovery and return of stolen assets and combat all forms of organized crime',
        indicators: [
          { code: '16.4.1', label: 'Illicit financial flows' },
          { code: '16.4.2', label: 'Illicit firearms flows' },
        ],
      },
      {
        code: '16.5',
        description: 'Substantially reduce corruption and bribery in all their forms',
        indicators: [
          { code: '16.5.1', label: 'Bribery among the population' },
          { code: '16.5.2', label: 'Bribery of businesses' },
        ],
      },
      {
        code: '16.a',
        description:
          'Strengthen relevant national institutions, including through international cooperation, for building capacity at all levels, in particular in developing countries, to prevent violence and combat terrorism and crime',
        indicators: [{ code: '16.a.1', label: 'National human rights institutions' }],
      },
    ],
  },
  inclusion: {
    number: '3',
    title: 'Inclusion',
    color: '#05AA8E',
    bg: '/imgs/chapters/inclusion-hero.webp',
    description:
      'Inclusion is central to societal progress, as inclusive societies enable everyone to participate meaningfully in public life. Under Goal 16, inclusion is measured through indicators that assess whether institutions represent and serve all people equally and effectively. Together, these indicators provide insight into the broader dimensions of social cohesion and institutional legitimacy.',
    targets: [
      {
        code: '16.6',
        description: 'Develop effective, accountable and transparent institutions at all levels',
        indicators: [
          { code: '16.6.1', label: 'Government expenditures' },
          { code: '16.6.2', label: 'Satisfaction with public services' },
        ],
      },
      {
        code: '16.7',
        description:
          'Ensure responsive, inclusive, participatory and representative decision-making at all levels',
        indicators: [
          { code: '16.7.1 (a)', label: 'Representation in the legislature' },
          {
            code: '16.7.1 (b) & (c)',
            label: 'Representation in public service institutions and the judiciary',
          },
          { code: '16.7.2', label: 'Political efficacy' },
        ],
      },
      {
        code: '16.8',
        description:
          'Broaden and strengthen the participation of developing countries in the institutions of global governance',
        indicators: [{ code: '16.8.1', label: 'Global governance' }],
      },
      {
        code: '16.9',
        description: 'By 2030, provide legal identity for all, including birth registration',
        indicators: [{ code: '16.9.1', label: 'Legal identity' }],
      },
      {
        code: '16.10',
        description:
          'Ensure public access to information and protect fundamental freedoms, in accordance with national legislation and international agreements',
        indicators: [{ code: '16.10.2', label: 'Access to information' }],
      },
      {
        code: '16.b',
        description:
          'Promote and enforce non-discriminatory laws and policies for sustainable development',
        indicators: [{ code: '16.b.1', label: 'Experience of Discrimination' }],
      },
    ],
  },
};

export const peaceMeta = chapters.peace;
export const justiceMeta = chapters.justice;
export const inclusionMeta = chapters.inclusion;
