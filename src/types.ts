import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export interface ChapterTargetIndicator {
  code: string;
  label: string;
}

export interface ChapterTarget {
  code: string;
  description: string;
  indicators: ChapterTargetIndicator[];
}

export interface ChapterMeta {
  number: string;
  title: string;
  color: string;
  bg: string;
  description: string;
  targets: ChapterTarget[];
}

export interface ChapterSection {
  number: string;
  title: string;
  indicatorCode?: string;
  heading: string;
  anchor: string;
  image?: string;
  icon?: LucideIcon;
  content?: ReactNode;
}
