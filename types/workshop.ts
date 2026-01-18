export type SectorType = 'public' | 'charity' | 'private';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer?: number;
  type: 'quiz' | 'poll';
}

export interface Slide {
  id: string;
  title: string;
  content: string;
  discussion?: string;
  quiz?: QuizQuestion;
  caseStudy?: {
    title: string;
    description: string;
    sector: SectorType;
  };
}

export interface Section {
  id: string;
  title: string;
  icon: string;
  slides: Slide[];
}

export interface UserProgress {
  currentSection: number;
  currentSlide: number;
  completedSlides: string[];
  quizAnswers: Record<string, number>;
  sector: SectorType | null;
  startedAt?: Date;
  completedAt?: Date;
}

export interface BudgetHolderProgress {
  completedSections: string[];
  checkedItems: string[];
  startedAt?: Date;
  completedAt?: Date;
}

export interface ActionItem {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  timeframe: string;
}
