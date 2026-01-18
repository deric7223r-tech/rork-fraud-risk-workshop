import { useRouter } from 'expo-router';
import { Award, CheckCircle2, Home, RotateCcw } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useWorkshop } from '@/contexts/WorkshopContext';

export default function CertificateScreen() {
  const router = useRouter();
  const { progress, resetWorkshop } = useWorkshop();

  const completionDate = progress.completedAt || new Date();
  const formattedDate = completionDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleRestart = async () => {
    await resetWorkshop();
    router.replace('/');
  };

  const handleHome = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f172a' as const, '#1e293b' as const, '#334155' as const]}
        style={styles.background}
      />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.certificateContainer}>
            <LinearGradient
              colors={['#1e3a8a' as const, '#3b82f6' as const]}
              style={styles.certificateCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.certificateBorder}>
                <View style={styles.certificateContent}>
                  <View style={styles.awardIcon}>
                    <Award size={48} color="#fbbf24" strokeWidth={2.5} />
                  </View>
                  
                  <Text style={styles.certificateTitle}>Certificate of Completion</Text>
                  
                  <View style={styles.divider} />
                  
                  <Text style={styles.certificationText}>
                    This certifies that the participant has successfully completed
                  </Text>
                  
                  <Text style={styles.workshopName}>
                    Fraud Risk Awareness Briefing
                  </Text>
                  
                  <Text style={styles.workshopDetails}>
                    A comprehensive 30-minute interactive workshop covering regulatory compliance,
                    fraud identification, defense strategies, and implementation planning
                  </Text>
                  
                  <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                      <CheckCircle2 size={20} color="#10b981" strokeWidth={2} />
                      <Text style={styles.statText}>
                        {progress.completedSlides.length} Slides Completed
                      </Text>
                    </View>
                    <View style={styles.statBox}>
                      <CheckCircle2 size={20} color="#10b981" strokeWidth={2} />
                      <Text style={styles.statText}>
                        {Object.keys(progress.quizAnswers).length} Questions Answered
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.dateSection}>
                    <Text style={styles.dateLabel}>Date of Completion</Text>
                    <Text style={styles.dateValue}>{formattedDate}</Text>
                  </View>
                  
                  <View style={styles.sectorBadge}>
                    <Text style={styles.sectorBadgeText}>
                      {progress.sector?.toUpperCase()} SECTOR FOCUS
                    </Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.achievementSection}>
            <Text style={styles.achievementTitle}>Key Achievements</Text>
            <AchievementItem 
              icon={<CheckCircle2 size={20} color="#10b981" strokeWidth={2.5} />}
              text="Completed comprehensive fraud risk assessment training"
            />
            <AchievementItem 
              icon={<CheckCircle2 size={20} color="#10b981" strokeWidth={2.5} />}
              text="Gained sector-specific fraud prevention insights"
            />
            <AchievementItem 
              icon={<CheckCircle2 size={20} color="#10b981" strokeWidth={2.5} />}
              text="Developed personalized 90-day action plan"
            />
            <AchievementItem 
              icon={<CheckCircle2 size={20} color="#10b981" strokeWidth={2.5} />}
              text="Acquired knowledge of current regulatory requirements"
            />
          </View>

          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.homeButton}
              onPress={handleHome}
              activeOpacity={0.8}
            >
              <Home size={20} color="#3b82f6" />
              <Text style={styles.homeButtonText}>Return Home</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.restartButton}
              onPress={handleRestart}
              activeOpacity={0.8}
            >
              <RotateCcw size={20} color="#ffffff" />
              <Text style={styles.restartButtonText}>Restart Workshop</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function AchievementItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <View style={styles.achievementItem}>
      {icon}
      <Text style={styles.achievementText}>{text}</Text>
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
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  certificateContainer: {
    marginBottom: 32,
  },
  certificateCard: {
    borderRadius: 20,
    padding: 4,
  },
  certificateBorder: {
    borderRadius: 18,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    padding: 3,
  },
  certificateContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 32,
    alignItems: 'center',
    gap: 16,
  },
  awardIcon: {
    marginBottom: 8,
  },
  certificateTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1e293b',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  divider: {
    width: 80,
    height: 3,
    backgroundColor: '#3b82f6',
    borderRadius: 1.5,
  },
  certificationText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 8,
  },
  workshopName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    marginTop: 4,
  },
  workshopDetails: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  statText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },
  dateSection: {
    marginTop: 16,
    alignItems: 'center',
    gap: 4,
  },
  dateLabel: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  sectorBadge: {
    marginTop: 12,
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  sectorBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1,
  },
  achievementSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 16,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  achievementText: {
    flex: 1,
    fontSize: 15,
    color: '#cbd5e1',
    lineHeight: 22,
  },
  actions: {
    gap: 12,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3b82f6',
  },
  restartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  restartButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
