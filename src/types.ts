import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export type ChapterKey = 'peace' | 'justice' | 'inclusion';

export interface ChapterMeta {
  number: string;
  title: string;
  color: string;
  bg: string;
  description: string;
}

export interface ChapterSection {
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

export interface ChapterOfficialIndicator {
  code: string;
  description: string;
}

export interface ChapterTargetIndicator {
  code: string;
  label: string;
  officialIndicators: ChapterOfficialIndicator[];
  dataReporter: string;
}

export interface ChapterTarget {
  code: string;
  description: string;
  indicators: ChapterTargetIndicator[];
}
