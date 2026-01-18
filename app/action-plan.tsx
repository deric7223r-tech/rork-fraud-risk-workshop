import { useRouter } from 'expo-router';
import { Download, ArrowRight } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useWorkshop } from '@/contexts/WorkshopContext';
import { ActionItem } from '@/types/workshop';

export default function ActionPlanScreen() {
  const router = useRouter();
  const { progress } = useWorkshop();

  const actionPlan = useMemo(() => {
    const plan: ActionItem[] = [];

    plan.push({
      title: 'Conduct Comprehensive Risk Assessment',
      description: 'Map all potential fraud vulnerabilities across your organization, including procurement, payroll, and digital systems.',
      priority: 'high',
      timeframe: 'Week 1-2',
    });

    if (progress.sector === 'public') {
      plan.push({
        title: 'Review Public Sector Compliance',
        description: 'Ensure alignment with government fraud standards and public accountability frameworks.',
        priority: 'high',
        timeframe: 'Week 2-3',
      });
    } else if (progress.sector === 'charity') {
      plan.push({
        title: 'Update Charity Commission Requirements',
        description: 'Review and enhance donor fund protection measures and transparency reporting.',
        priority: 'high',
        timeframe: 'Week 2-3',
      });
    } else {
      plan.push({
        title: 'Strengthen Corporate Governance',
        description: 'Implement board-level fraud oversight and financial control mechanisms.',
        priority: 'high',
        timeframe: 'Week 2-3',
      });
    }

    plan.push({
      title: 'Establish Fraud Response Team',
      description: 'Designate cross-functional team members responsible for fraud detection, investigation, and response.',
      priority: 'high',
      timeframe: 'Week 3-4',
    });

    plan.push({
      title: 'Update Policies and Procedures',
      description: 'Review and revise fraud prevention policies, whistleblowing procedures, and incident response protocols.',
      priority: 'medium',
      timeframe: 'Week 4-6',
    });

    plan.push({
      title: 'Implement Monitoring Technology',
      description: 'Deploy automated transaction monitoring and anomaly detection systems.',
      priority: 'medium',
      timeframe: 'Week 6-8',
    });

    plan.push({
      title: 'Launch Staff Training Program',
      description: 'Roll out comprehensive fraud awareness training for all staff levels, including scenario-based exercises.',
      priority: 'medium',
      timeframe: 'Week 8-10',
    });

    plan.push({
      title: 'Establish Reporting Channels',
      description: 'Set up anonymous whistleblowing hotlines and secure reporting mechanisms.',
      priority: 'low',
      timeframe: 'Week 10-12',
    });

    plan.push({
      title: 'Schedule Regular Reviews',
      description: 'Implement quarterly fraud risk assessments and annual policy reviews.',
      priority: 'low',
      timeframe: 'Ongoing',
    });

    return plan;
  }, [progress]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f172a' as const, '#1e293b' as const]}
        style={styles.background}
      />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Your 90-Day Action Plan</Text>
            <Text style={styles.subtitle}>
              Personalized roadmap for implementing fraud risk management in your organization
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Workshop Summary</Text>
            <View style={styles.summaryStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{progress.completedSlides.length}</Text>
                <Text style={styles.statLabel}>Slides Completed</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{Object.keys(progress.quizAnswers).length}</Text>
                <Text style={styles.statLabel}>Questions Answered</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{progress.sector?.toUpperCase()}</Text>
                <Text style={styles.statLabel}>Sector Focus</Text>
              </View>
            </View>
          </View>

          <View style={styles.actionSection}>
            <Text style={styles.actionHeader}>Implementation Roadmap</Text>
            
            {actionPlan.map((item, index) => (
              <ActionItemCard key={index} item={item} index={index} />
            ))}
          </View>

          <View style={styles.resourcesCard}>
            <Text style={styles.resourcesTitle}>Additional Resources</Text>
            <TouchableOpacity 
              style={styles.resourceButton} 
              activeOpacity={0.7}
              onPress={() => router.push('/budget-holder-guidance')}
            >
              <Download size={20} color="#60a5fa" />
              <View style={styles.resourceTextContainer}>
                <Text style={styles.resourceButtonTitle}>Budget-Holder Guidance Document</Text>
                <Text style={styles.resourceButtonDesc}>Essential guide for financial decision-makers</Text>
              </View>
              <ArrowRight size={16} color="#94a3b8" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.resourceButton} activeOpacity={0.7}>
              <Download size={20} color="#60a5fa" />
              <View style={styles.resourceTextContainer}>
                <Text style={styles.resourceButtonTitle}>Fraud Risk Self-Assessment Checklist</Text>
                <Text style={styles.resourceButtonDesc}>Comprehensive evaluation tool</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.certificateButton}
            onPress={() => router.push('/certificate')}
            activeOpacity={0.8}
          >
            <Text style={styles.certificateButtonText}>View Certificate</Text>
            <ArrowRight size={20} color="#ffffff" />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function ActionItemCard({ item, index }: { item: ActionItem; index: number }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#64748b';
    }
  };

  return (
    <View style={styles.actionCard}>
      <View style={styles.actionCardHeader}>
        <View style={styles.actionNumber}>
          <Text style={styles.actionNumberText}>{index + 1}</Text>
        </View>
        <View style={[styles.priorityBadge, { backgroundColor: `${getPriorityColor(item.priority)}20` }]}>
          <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
            {item.priority.toUpperCase()}
          </Text>
        </View>
      </View>
      <Text style={styles.actionTitle}>{item.title}</Text>
      <Text style={styles.actionDescription}>{item.description}</Text>
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
    alignItems: 'center',
    marginBottom: 32,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 24,
  },
  summaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 20,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#3b82f6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionSection: {
    marginBottom: 32,
    gap: 16,
  },
  actionHeader: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  actionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 12,
  },
  actionCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 22,
  },
  actionDescription: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 22,
  },

  resourcesCard: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
    gap: 12,
  },
  resourcesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  resourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  resourceTextContainer: {
    flex: 1,
    gap: 2,
  },
  resourceButtonTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  resourceButtonDesc: {
    fontSize: 13,
    color: '#94a3b8',
  },
  certificateButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  certificateButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
  },
});
