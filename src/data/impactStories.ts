import type { ChapterKey } from '../types';

export interface ImpactStoryEntry {
  /** Unique, stable slug — referenced by `<ImpactStory id="..." />` and `<ImpactStoryCard id="..." />`. */
  id: string;
  /** Chapter the story belongs to — drives the accent color and grouping on the index page. */
  chapter: ChapterKey;
  /** Anchor of the chapter section the story illustrates, used to link back to it. */
  anchor: string;
  title: string;
  /** Full story text. Paragraphs are separated by a blank line; the first ~3 lines show as a
   * truncated preview in the banner/card, the full text renders in the modal. */
  story: string;
}

const placeholderStory =
  'Full story copy is being finalized. This preview shows how the card and banner display the beginning of the write-up, truncated to three lines, before readers open the full story in a modal.\n\nThe complete narrative — including context, data sources and outcomes — will replace this placeholder once the story is ready for publication.';

export const impactStories: ImpactStoryEntry[] = [
  {
    id: 'peace-detained-hrd-release',
    chapter: 'peace',
    anchor: 'attacks-on-defenders',
    title:
      'Data on detained human rights defenders drives action that may help secure earlier release',
    story: placeholderStory,
  },
  {
    id: 'peace-panama-victimization-surveys',
    chapter: 'peace',
    anchor: 'non-lethal-violence',
    title: 'How Victimization Surveys Are Shaping Citizen Security Policies in Panama',
    story: placeholderStory,
  },
  {
    id: 'justice-ghana-iffs',
    chapter: 'justice',
    anchor: 'illicit-financial-flows',
    title: 'Ghana Turns Illicit Financial Flows Data into Policy Action',
    story: placeholderStory,
  },
  {
    id: 'inclusion-benin-womens-representation',
    chapter: 'inclusion',
    anchor: 'representation-in-the-legislature',
    title: "Advancing Women's Representation in Benin's National Assembly",
    story: placeholderStory,
  },
  {
    id: 'inclusion-armenia-representation-data',
    chapter: 'inclusion',
    anchor: 'representation-in-public-service-and-judiciary',
    title: 'Using representation data to inform more inclusive public institutions in Armenia',
    story: placeholderStory,
  },
  {
    id: 'inclusion-bosnia-herzegovina-institutional-change',
    chapter: 'inclusion',
    anchor: 'representation-in-public-service-and-judiciary',
    title: 'Turning Representation Data into Institutional Change in Bosnia and Herzegovina',
    story: placeholderStory,
  },
  {
    id: 'inclusion-bangladesh-judicial-leadership',
    chapter: 'inclusion',
    anchor: 'representation-in-public-service-and-judiciary',
    title: "Advancing Women's Judicial Leadership in Bangladesh",
    story: placeholderStory,
  },
  {
    id: 'inclusion-mexico-discrimination-data',
    chapter: 'inclusion',
    anchor: 'experience-of-discrimination',
    title: 'Using Data to Strengthen Institutional Responses to Discrimination in Mexico',
    story: placeholderStory,
  },
];

export function getImpactStory(id: string): ImpactStoryEntry {
  const entry = impactStories.find((story) => story.id === id);
  if (!entry) {
    throw new Error(`Unknown impact story id: "${id}"`);
  }
  return entry;
}

export function getImpactStoriesByChapter(chapter: ChapterKey): ImpactStoryEntry[] {
  return impactStories.filter((story) => story.chapter === chapter);
}
