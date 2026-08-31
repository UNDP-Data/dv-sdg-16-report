import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export type ChapterKey = 'peace' | 'justice' | 'inclusion';

export type SectionColorType = 'primary' | 'secondary' | 'tertiary' | 'default';

export interface ChapterMetaDataType {
  number: string;
  title: string;
  color: string;
  bg: string;
  description: string;
}

export interface ChapterSectionDataType {
  id: string;
  title: string;
  indicatorCode?: string;
  heading: string;
  anchor: string;
  image?: string;
  icon?: LucideIcon;
  content?: ReactNode;
  isGenderLens?: boolean;
}

export interface ImpactStoryDataType {
  id: string;
  chapter: ChapterKey;
  anchor: string;
  indicatorCode: string;
  indicatorTitle: string;
  title: string;
  stats?: {
    value: string;
    suffix?: string;
    label: string;
  }[];
  story: string;
}

export interface ChapterOfficialIndicatorType {
  code: string;
  description: string;
}

export interface ChapterTargetIndicatorType {
  code: string;
  label: string;
  officialIndicators: ChapterOfficialIndicatorType[];
  dataReporter: string;
}

export interface ChapterTargetDataType {
  code: string;
  description: string;
  indicators: ChapterTargetIndicatorType[];
}

export interface PublicationRow {
  'Publication title': string;
  Agency: string;
  'Publication year': number;
  Indicators: string | null;
  Link: string;
  Type: string;
  Chapter: string | null;
}
