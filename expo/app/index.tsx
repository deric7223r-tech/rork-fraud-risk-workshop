import { useRouter } from 'expo-router';
import { Building2, Heart, Landmark } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useWorkshop } from '@/contexts/WorkshopContext';
import { SectorType } from '@/types/workshop';

export default function WelcomeScreen() {
  const router = useRouter();
  const { setSector, progress } = useWorkshop();

  const handleSectorSelect = (sector: SectorType) => {
    setSector(sector);
    router.push('/workshop');
  };

  const handleContinue = () => {
    router.push('/workshop');
  };

  const sectors = [
    {
      id: 'public' as SectorType,
      title: 'Public Sector',
      description: 'NHS, Local Authorities, Government Bodies',
      icon: Landmark,
      gradient: ['#1e3a8a', '#3b82f6'] as const,
    },
    {
      id: 'charity' as SectorType,
      title: 'Charity Sector',
      description: 'Registered Charities, Non-Profits, Foundations',
      icon: Heart,
      gradient: ['#7c3aed', '#a78bfa'] as const,
    },
    {
      id: 'private' as SectorType,
      title: 'Private Sector',
      description: 'Corporations, SMEs, Private Companies',
      icon: Building2,
      gradient: ['#0f766e', '#14b8a6'] as const,
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f172a', '#1e293b', '#334155']}
        style={styles.background}
      />
      
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>30-MINUTE WORKSHOP</Text>
            </View>
            <Text style={styles.title}>Fraud Risk Awareness Briefing</Text>
            <Text style={styles.subtitle}>
              An interactive workshop for Trustees, Executive Leadership, and Budget-Holders
            </Text>
          </View>

          <View style={styles.objectivesCard}>
            <Text style={styles.objectivesTitle}>Learning Objectives</Text>
            <View style={styles.objectivesList}>
              <ObjectiveItem text="Understand current fraud regulatory landscape" />
              <ObjectiveItem text="Identify key fraud risks and vulnerabilities" />
              <ObjectiveItem text="Learn practical defense strategies" />
              <ObjectiveItem text="Develop actionable implementation plans" />
            </View>
          </View>

          {progress.sector && progress.completedSlides.length > 0 ? (
            <View style={styles.continueSection}>
              <Text style={styles.sectionTitle}>Welcome Back</Text>
              <Text style={styles.continueText}>
                You&apos;ve completed {progress.completedSlides.length} slides. Continue where you left off.
              </Text>
              <TouchableOpacity 
                style={styles.continueButton}
                onPress={handleContinue}
                activeOpacity={0.8}
              >
                <Text style={styles.continueButtonText}>Continue Workshop</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.sectionTitle}>Select Your Sector</Text>
              <Text style={styles.sectionSubtitle}>
                Content will be tailored with relevant case studies and examples
              </Text>

              <View style={styles.sectorsGrid}>
                {sectors.map((sector) => {
                  const Icon = sector.icon;
                  return (
                    <TouchableOpacity
                      key={sector.id}
                      activeOpacity={0.9}
                      onPress={() => handleSectorSelect(sector.id)}
                    >
                      <LinearGradient
                        colors={sector.gradient}
                        style={styles.sectorCard}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <View style={styles.sectorIconContainer}>
                          <Icon size={32} color="#ffffff" strokeWidth={2} />
                        </View>
                        <Text style={styles.sectorTitle}>{sector.title}</Text>
                        <Text style={styles.sectorDescription}>{sector.description}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          )}

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Interactive • Self-Paced • Certificate Included
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function ObjectiveItem({ text }: { text: string }) {
  return (
    <View style={styles.objectiveItem}>
      <View style={styles.objectiveBullet} />
      <Text style={styles.objectiveText}>{text}</Text>
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
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    marginBottom: 20,
  },
  badgeText: {
    color: '#60a5fa',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  objectivesCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  objectivesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  objectivesList: {
    gap: 12,
  },
  objectiveItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  objectiveBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
  },
  objectiveText: {
    flex: 1,
    fontSize: 15,
    color: '#cbd5e1',
    lineHeight: 22,
  },
  continueSection: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
    alignItems: 'center',
  },
  continueText: {
    fontSize: 15,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  continueButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 15,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  sectorsGrid: {
    gap: 16,
    marginBottom: 32,
  },
  sectorCard: {
    borderRadius: 16,
    padding: 24,
    minHeight: 140,
    justifyContent: 'center',
  },
  sectorIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sectorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 6,
  },
  sectorDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
});
