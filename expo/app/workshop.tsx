import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useWorkshop } from '@/contexts/WorkshopContext';
import { WORKSHOP_SECTIONS } from '@/constants/workshop-content';

export default function WorkshopScreen() {
  const router = useRouter();
  const { 
    progress, 
    goToNextSlide, 
    goToPreviousSlide, 
    answerQuestion,
    isLastSlide,
    canGoBack,
    getProgressPercentage,
  } = useWorkshop();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const currentSection = WORKSHOP_SECTIONS[progress.currentSection];
  const currentSlide = currentSection.slides[progress.currentSlide];
  const hasQuiz = !!currentSlide.quiz;
  const existingAnswer = currentSlide.quiz ? progress.quizAnswers[currentSlide.quiz.id] : undefined;

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    if (currentSlide.quiz) {
      answerQuestion(currentSlide.quiz.id, index);
    }
  };

  const handleNext = () => {
    if (isLastSlide()) {
      router.push('/action-plan');
    } else {
      setSelectedAnswer(null);
      goToNextSlide();
    }
  };

  const progressPercent = getProgressPercentage();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f172a' as const, '#1e293b' as const, '#334155' as const]}
        style={styles.background}
      />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
            </View>
            <Text style={styles.progressText}>{progressPercent}% Complete</Text>
          </View>
          
          <View style={styles.sectionInfo}>
            <Text style={styles.sectionBadge}>
              Section {progress.currentSection + 1} of {WORKSHOP_SECTIONS.length}
            </Text>
            <Text style={styles.sectionTitle}>{currentSection.title}</Text>
          </View>
        </View>

        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.slideCard}>
            <Text style={styles.slideTitle}>{currentSlide.title}</Text>
            <Text style={styles.slideContent}>{currentSlide.content}</Text>

            {currentSlide.discussion && (
              <View style={styles.discussionBox}>
                <Text style={styles.discussionLabel}>💭 Discussion Point</Text>
                <Text style={styles.discussionText}>{currentSlide.discussion}</Text>
              </View>
            )}

            {currentSlide.caseStudy && currentSlide.caseStudy.sector === progress.sector && (
              <View style={styles.caseStudyBox}>
                <Text style={styles.caseStudyLabel}>📊 Case Study</Text>
                <Text style={styles.caseStudyTitle}>{currentSlide.caseStudy.title}</Text>
                <Text style={styles.caseStudyText}>{currentSlide.caseStudy.description}</Text>
              </View>
            )}

            {hasQuiz && currentSlide.quiz && (
              <View style={styles.quizContainer}>
                <Text style={styles.quizLabel}>
                  {currentSlide.quiz.type === 'quiz' ? '❓ Quick Quiz' : '📊 Poll'}
                </Text>
                <Text style={styles.quizQuestion}>{currentSlide.quiz.question}</Text>
                
                <View style={styles.optionsContainer}>
                  {currentSlide.quiz.options.map((option, index) => {
                    const isSelected = selectedAnswer === index || existingAnswer === index;
                    const isCorrect = currentSlide.quiz?.correctAnswer === index;
                    const showCorrect = currentSlide.quiz?.type === 'quiz' && 
                                       existingAnswer !== undefined && 
                                       isCorrect;
                    
                    return (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.optionButton,
                          isSelected && styles.optionButtonSelected,
                          showCorrect && styles.optionButtonCorrect,
                        ]}
                        onPress={() => handleAnswerSelect(index)}
                        activeOpacity={0.7}
                      >
                        <View style={styles.optionContent}>
                          <View style={[
                            styles.optionCircle,
                            isSelected && styles.optionCircleSelected,
                            showCorrect && styles.optionCircleCorrect,
                          ]}>
                            {(isSelected || showCorrect) && (
                              <View style={styles.optionCircleInner} />
                            )}
                          </View>
                          <Text style={[
                            styles.optionText,
                            isSelected && styles.optionTextSelected,
                          ]}>
                            {option}
                          </Text>
                        </View>
                        {showCorrect && (
                          <CheckCircle2 size={20} color="#10b981" strokeWidth={2.5} />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.navigation}>
          <TouchableOpacity
            style={[styles.navButton, !canGoBack() && styles.navButtonDisabled]}
            onPress={goToPreviousSlide}
            disabled={!canGoBack()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color={canGoBack() ? '#ffffff' : '#64748b'} />
            <Text style={[styles.navButtonText, !canGoBack() && styles.navButtonTextDisabled]}>
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navButton, 
              styles.navButtonPrimary,
              hasQuiz && existingAnswer === undefined && selectedAnswer === null && styles.navButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={hasQuiz && existingAnswer === undefined && selectedAnswer === null}
            activeOpacity={0.7}
          >
            <Text style={styles.navButtonTextPrimary}>
              {isLastSlide() ? 'View Action Plan' : 'Next'}
            </Text>
            <ArrowRight size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
    gap: 16,
  },
  progressBarContainer: {
    gap: 8,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
  },
  sectionInfo: {
    gap: 4,
  },
  sectionBadge: {
    fontSize: 12,
    color: '#60a5fa',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  slideCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 20,
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 32,
  },
  slideContent: {
    fontSize: 16,
    color: '#cbd5e1',
    lineHeight: 26,
  },
  discussionBox: {
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#a855f7',
    gap: 8,
  },
  discussionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#c084fc',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  discussionText: {
    fontSize: 15,
    color: '#e0e7ff',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  caseStudyBox: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    gap: 8,
  },
  caseStudyLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#60a5fa',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  caseStudyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  caseStudyText: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 22,
  },
  quizContainer: {
    gap: 16,
    paddingTop: 8,
  },
  quizLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10b981',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  quizQuestion: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionButtonSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderColor: '#3b82f6',
  },
  optionButtonCorrect: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: '#10b981',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  optionCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#64748b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionCircleSelected: {
    borderColor: '#3b82f6',
  },
  optionCircleCorrect: {
    borderColor: '#10b981',
  },
  optionCircleInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3b82f6',
  },
  optionText: {
    fontSize: 15,
    color: '#cbd5e1',
    lineHeight: 22,
    flex: 1,
  },
  optionTextSelected: {
    color: '#ffffff',
    fontWeight: '500',
  },
  navigation: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  navButtonPrimary: {
    backgroundColor: '#3b82f6',
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  navButtonTextDisabled: {
    color: '#64748b',
  },
  navButtonTextPrimary: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});
