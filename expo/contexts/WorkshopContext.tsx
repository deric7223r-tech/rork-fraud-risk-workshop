import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { UserProgress, SectorType, BudgetHolderProgress } from '@/types/workshop';
import { WORKSHOP_SECTIONS } from '@/constants/workshop-content';

const STORAGE_KEY = 'workshop_progress';
const BUDGET_HOLDER_KEY = 'budget_holder_progress';

export const [WorkshopProvider, useWorkshop] = createContextHook(() => {
  const [progress, setProgress] = useState<UserProgress>({
    currentSection: 0,
    currentSlide: 0,
    completedSlides: [],
    quizAnswers: {},
    sector: null,
  });

  const [isLoading, setIsLoading] = useState(true);

  const [budgetHolderProgress, setBudgetHolderProgress] = useState<BudgetHolderProgress>({
    completedSections: [],
    checkedItems: [],
  });

  const [isBudgetHolderLoading, setIsBudgetHolderLoading] = useState(true);

  useEffect(() => {
    loadProgress();
    loadBudgetHolderProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProgress({
          ...parsed,
          startedAt: parsed.startedAt ? new Date(parsed.startedAt) : undefined,
          completedAt: parsed.completedAt ? new Date(parsed.completedAt) : undefined,
        });
      }
    } catch (error) {
      console.log('Error loading progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProgress = async (newProgress: UserProgress) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.log('Error saving progress:', error);
    }
  };

  const setSector = (sector: SectorType) => {
    const newProgress = {
      ...progress,
      sector,
      startedAt: new Date(),
    };
    saveProgress(newProgress);
  };

  const goToNextSlide = () => {
    const currentSection = WORKSHOP_SECTIONS[progress.currentSection];
    const currentSlideId = currentSection.slides[progress.currentSlide].id;
    
    const updatedCompleted = progress.completedSlides.includes(currentSlideId)
      ? progress.completedSlides
      : [...progress.completedSlides, currentSlideId];

    if (progress.currentSlide < currentSection.slides.length - 1) {
      saveProgress({
        ...progress,
        currentSlide: progress.currentSlide + 1,
        completedSlides: updatedCompleted,
      });
    } else if (progress.currentSection < WORKSHOP_SECTIONS.length - 1) {
      saveProgress({
        ...progress,
        currentSection: progress.currentSection + 1,
        currentSlide: 0,
        completedSlides: updatedCompleted,
      });
    } else {
      saveProgress({
        ...progress,
        completedSlides: updatedCompleted,
        completedAt: new Date(),
      });
    }
  };

  const goToPreviousSlide = () => {
    if (progress.currentSlide > 0) {
      saveProgress({
        ...progress,
        currentSlide: progress.currentSlide - 1,
      });
    } else if (progress.currentSection > 0) {
      const previousSection = WORKSHOP_SECTIONS[progress.currentSection - 1];
      saveProgress({
        ...progress,
        currentSection: progress.currentSection - 1,
        currentSlide: previousSection.slides.length - 1,
      });
    }
  };

  const answerQuestion = (questionId: string, answer: number) => {
    saveProgress({
      ...progress,
      quizAnswers: {
        ...progress.quizAnswers,
        [questionId]: answer,
      },
    });
  };

  const resetWorkshop = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setProgress({
      currentSection: 0,
      currentSlide: 0,
      completedSlides: [],
      quizAnswers: {},
      sector: null,
    });
  };

  const getTotalSlides = () => {
    return WORKSHOP_SECTIONS.reduce((total, section) => total + section.slides.length, 0);
  };

  const getProgressPercentage = () => {
    const total = getTotalSlides();
    return Math.round((progress.completedSlides.length / total) * 100);
  };

  const isLastSlide = () => {
    return (
      progress.currentSection === WORKSHOP_SECTIONS.length - 1 &&
      progress.currentSlide === WORKSHOP_SECTIONS[progress.currentSection].slides.length - 1
    );
  };

  const canGoBack = () => {
    return progress.currentSection > 0 || progress.currentSlide > 0;
  };

  const loadBudgetHolderProgress = async () => {
    try {
      const stored = await AsyncStorage.getItem(BUDGET_HOLDER_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setBudgetHolderProgress({
          ...parsed,
          startedAt: parsed.startedAt ? new Date(parsed.startedAt) : undefined,
          completedAt: parsed.completedAt ? new Date(parsed.completedAt) : undefined,
        });
      }
    } catch (error) {
      console.log('Error loading budget holder progress:', error);
    } finally {
      setIsBudgetHolderLoading(false);
    }
  };

  const saveBudgetHolderProgress = async (newProgress: BudgetHolderProgress) => {
    try {
      await AsyncStorage.setItem(BUDGET_HOLDER_KEY, JSON.stringify(newProgress));
      setBudgetHolderProgress(newProgress);
    } catch (error) {
      console.log('Error saving budget holder progress:', error);
    }
  };

  const toggleBudgetHolderItem = (itemId: string) => {
    const newChecked = budgetHolderProgress.checkedItems.includes(itemId)
      ? budgetHolderProgress.checkedItems.filter(id => id !== itemId)
      : [...budgetHolderProgress.checkedItems, itemId];
    
    const newProgress = {
      ...budgetHolderProgress,
      checkedItems: newChecked,
      startedAt: budgetHolderProgress.startedAt || new Date(),
    };
    saveBudgetHolderProgress(newProgress);
  };

  const toggleBudgetHolderSection = (sectionId: string) => {
    const newCompleted = budgetHolderProgress.completedSections.includes(sectionId)
      ? budgetHolderProgress.completedSections.filter(id => id !== sectionId)
      : [...budgetHolderProgress.completedSections, sectionId];
    
    saveBudgetHolderProgress({
      ...budgetHolderProgress,
      completedSections: newCompleted,
    });
  };

  const resetBudgetHolderProgress = async () => {
    await AsyncStorage.removeItem(BUDGET_HOLDER_KEY);
    setBudgetHolderProgress({
      completedSections: [],
      checkedItems: [],
    });
  };

  return {
    progress,
    isLoading,
    setSector,
    goToNextSlide,
    goToPreviousSlide,
    answerQuestion,
    resetWorkshop,
    getTotalSlides,
    getProgressPercentage,
    isLastSlide,
    canGoBack,
    budgetHolderProgress,
    isBudgetHolderLoading,
    toggleBudgetHolderItem,
    toggleBudgetHolderSection,
    resetBudgetHolderProgress,
  };
});
