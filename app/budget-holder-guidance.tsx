import { useRouter } from 'expo-router';
import { ArrowLeft, ChevronDown, AlertTriangle, CheckSquare, FileText, Shield, Users, Check, Award } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useWorkshop } from '@/contexts/WorkshopContext';

type ChecklistItem = {
  id: string;
  text: string;
};

type Section = {
  id: string;
  title: string;
  emoji: string;
  description: string;
  icon: any;
  subsections: {
    id: string;
    title: string;
    content: string[];
    checklistItems?: ChecklistItem[];
  }[];
};

const GUIDANCE_SECTIONS: Section[] = [
  {
    id: 'intro',
    title: 'Welcome & Introduction',
    emoji: '',
    description: 'Learn who you are and why this matters',
    icon: FileText,
    subsections: [
      {
        id: 'purpose',
        title: 'Why This Guide Exists',
        content: [
          'This guide is your companion for managing fraud risks effectively.',
          'Think of it as your fraud prevention toolkit - practical, easy to follow, and actionable.',
        ],
      },
      {
        id: 'who',
        title: 'Is This Guide for You?',
        content: [
          'You\'re in the right place if you:',
          '• Approve purchases or spending',
          '• Manage budgets',
          '• Sign off on supplier payments',
          '• Approve timesheets or expenses',
          '• Make buying decisions',
          '• Handle contracts',
          '',
          'Key fact: 85% of workplace fraud happens in budget-holder functions. You are the front line of defense.',
        ],
        checklistItems: [
          { id: 'intro-role-1', text: 'I understand my role as a budget-holder' },
          { id: 'intro-role-2', text: 'I know why fraud prevention matters' },
        ],
      },
    ],
  },
  {
    id: 'legal',
    title: 'Legal & Ethical Responsibilities',
    emoji: '',
    description: 'The rules that protect you and your organization',
    icon: Shield,
    subsections: [
      {
        id: 'legal-duties',
        title: 'Legal Framework',
        content: [
          'The Economic Crime Act 2023 establishes clear requirements:',
          '',
          'For Your Organization:',
          'Without proper fraud controls, organizations face:',
          '• Unlimited fines',
          '• Director disqualification',
          '• Criminal conviction',
          '',
          'For You Personally:',
          'If you knowingly participate in or facilitate fraud:',
          '• Criminal charges',
          '• Dismissal',
          '• Financial liability',
          '• Professional disqualification',
          '',
          'Following this guide and proper procedures keeps you protected.',
        ],
        checklistItems: [
          { id: 'legal-understand', text: 'I understand the legal framework' },
          { id: 'legal-commit', text: 'I commit to following proper procedures' },
        ],
      },
      {
        id: 'ethical-duties',
        title: 'Ethical Duties',
        content: [
          'STEWARDSHIP:',
          'You manage stakeholder resources (taxpayers, donors, shareholders). This is a position of trust.',
          '',
          'ROLE MODELING:',
          'Your team observes your behavior. Your actions set the standard for acceptable conduct.',
          '',
          'FIDUCIARY DUTY:',
          'Always act in your organization\'s best interests. When in doubt, ask yourself: "Is this the right thing to do?"',
        ],
        checklistItems: [
          { id: 'ethical-commit', text: 'I will lead by example' },
          { id: 'ethical-steward', text: 'I take my stewardship seriously' },
        ],
      },
    ],
  },
  {
    id: 'fraud-triangle',
    title: 'Understanding Fraud',
    emoji: '',
    description: 'The psychology behind fraud',
    icon: AlertTriangle,
    subsections: [
      {
        id: 'triangle',
        title: 'The Fraud Triangle',
        content: [
          'Fraud occurs when three elements align:',
          '',
          '1. PRESSURE',
          'Financial stress, unrealistic targets, personal problems',
          '',
          '2. OPPORTUNITY',
          'Weak controls, lack of oversight, inadequate segregation of duties',
          '',
          '3. RATIONALIZATION',
          '"Everyone does it," "I deserve this," "I\'ll pay it back"',
          '',
          'YOUR CONTROL POINT: OPPORTUNITY',
          '',
          'You cannot control employee financial pressures or their ability to rationalize. But you CAN remove opportunities through robust controls.',
        ],
        checklistItems: [
          { id: 'triangle-understand', text: 'I understand the fraud triangle' },
          { id: 'triangle-role', text: 'I know I can remove opportunities for fraud' },
        ],
      },
    ],
  },
  {
    id: 'scenarios',
    title: 'Real-World Fraud Scenarios',
    emoji: '',
    description: 'Learn what to watch out for',
    icon: AlertTriangle,
    subsections: [
      {
        id: 'procurement',
        title: 'Scenario 1: Fake Supplier Invoice',
        content: [
          'THE SCAM:',
          '• Fraudster creates a fake company',
          '• Submits professional-looking invoice',
          '• Payment made for goods/services never delivered',
          '• Money diverted to fraudulent account',
          '',
          'RED FLAGS:',
          '• New supplier with no prior relationship',
          '• Generic email (Gmail, Hotmail vs. corporate domain)',
          '• Vague or missing address',
          '• Payment urgency',
          '• Round numbers (£5,000.00 vs. £4,847.23)',
          '',
          'CONTROLS:',
          '• Verify ALL new suppliers',
          '• Check Companies House registration',
          '• Call supplier using independently verified phone number',
          '• Require purchase order before invoice submission',
        ],
        checklistItems: [
          { id: 'procurement-verify', text: 'I will verify all new suppliers' },
          { id: 'procurement-po', text: 'I will require purchase orders' },
        ],
      },
      {
        id: 'kickbacks',
        title: 'Scenario 2: Inflated Pricing & Kickbacks',
        content: [
          'THE SCAM:',
          '• Employee teams up with a supplier',
          '• Supplier charges above market rate',
          '• Employee approves overpriced invoices',
          '• Supplier pays kickback to employee',
          '',
          'RED FLAGS:',
          '• Single supplier used repeatedly without competitive quotes',
          '• Pricing significantly above market rate',
          '• Employee resistant to changing suppliers',
          '• Unusually close relationship between employee and supplier',
          '• Employee lifestyle inconsistent with salary',
          '',
          'CONTROLS:',
          '• Get quotes from multiple suppliers',
          '• Compare prices to market rates',
          '• Rotate suppliers periodically',
          '• Segregate duties (requisitioner ≠ approver)',
        ],
        checklistItems: [
          { id: 'kickbacks-quotes', text: 'I will get competitive quotes' },
          { id: 'kickbacks-benchmark', text: 'I will check if prices are reasonable' },
        ],
      },
      {
        id: 'email-fraud',
        title: 'Scenario 3: Email Impersonation (Business Email Compromise)',
        content: [
          'THE SCAM:',
          '• Email received appearing to be from supplier',
          '• "We\'ve changed bank details—please update for future payments"',
          '• Email looks identical to legitimate supplier communication',
          '• If details updated, payment diverted to fraudulent account',
          '',
          'RED FLAGS:',
          '• Unexpected bank detail change request',
          '• Urgency language',
          '• Slight misspelling in sender email address',
          '• Generic greeting',
          '',
          'CRITICAL RULE:',
          'NEVER update bank details via email alone.',
          'Always verify by phone using contact information from original contract.',
          'Never use contact details provided in the email.',
        ],
        checklistItems: [
          { id: 'email-verify', text: 'I will always verify bank changes by phone' },
          { id: 'email-contact', text: 'I will use independently sourced contact info' },
        ],
      },
      {
        id: 'payroll',
        title: 'Scenario 4: Ghost Employees',
        content: [
          'THE SCAM:',
          '• Fictitious employee added to payroll system',
          '• Salary payments made to fraudulent bank account',
          '• Undetected due to poor headcount oversight',
          '',
          'RED FLAGS:',
          '• Employee with no personnel file',
          '• Same bank account for multiple employees',
          '• Employee never taking leave',
          '• Employee unreachable or never seen',
          '• No emergency contact information',
          '',
          'CONTROLS:',
          '• Monthly headcount reconciliation (payroll vs. actual staff)',
          '• HR verifies all starters and leavers',
          '• Bank account uniqueness checks',
          '• Mandatory annual leave',
        ],
        checklistItems: [
          { id: 'payroll-reconcile', text: 'I will reconcile headcount monthly' },
          { id: 'payroll-leave', text: 'I will ensure mandatory leave is taken' },
        ],
      },
      {
        id: 'expenses',
        title: 'Scenario 5: False Expense Claims',
        content: [
          'THE SCAM:',
          '• Personal expenses claimed as business',
          '• Receipts fabricated or altered',
          '• Same receipt submitted multiple times',
          '• Claims for events that did not occur',
          '',
          'RED FLAGS:',
          '• Receipts from unusual sources',
          '• Mileage claims inconsistent with diary',
          '• High-value claims with vague descriptions',
          '• Weekend/holiday expenses claimed as business',
          '• Sequential receipt numbers across different vendors',
          '',
          'CONTROLS:',
          '• Require original, itemized receipts',
          '• Check mileage against diary',
          '• Randomly audit some claims',
          '• Be specific about what\'s allowed',
        ],
        checklistItems: [
          { id: 'expenses-receipts', text: 'I will require proper receipts' },
          { id: 'expenses-audit', text: 'I will spot-check expense claims' },
        ],
      },
    ],
  },
  {
    id: 'daily-habits',
    title: 'Daily Fraud Prevention Checklist',
    emoji: '',
    description: 'Essential checks for budget-holders',
    icon: CheckSquare,
    subsections: [
      {
        id: 'daily',
        title: 'Every Day, Before Approving Payments',
        content: [
          'Make these quick checks a habit:',
        ],
        checklistItems: [
          { id: 'daily-1', text: 'Goods/services were actually received' },
          { id: 'daily-2', text: 'Supplier is legitimate (especially if new)' },
          { id: 'daily-3', text: 'Invoice amount matches what was agreed' },
          { id: 'daily-4', text: 'Proper authorization was obtained' },
          { id: 'daily-5', text: 'Bank details checked if new account' },
          { id: 'daily-6', text: 'Nothing seems rushed or unusual' },
        ],
      },
      {
        id: 'daily-timesheets',
        title: 'Every Day, Before Approving Timesheets/Expenses',
        content: [
          'Quick sanity checks:',
        ],
        checklistItems: [
          { id: 'timesheet-1', text: 'Hours/expenses look reasonable' },
          { id: 'timesheet-2', text: 'Receipts are original and itemized' },
          { id: 'timesheet-3', text: 'Business purpose makes sense' },
          { id: 'timesheet-4', text: 'Dates match when they were actually working' },
        ],
      },
      {
        id: 'weekly',
        title: 'Weekly Check-Ins',
        content: [
          'Once a week, take a few minutes to:',
        ],
        checklistItems: [
          { id: 'weekly-1', text: 'Review any budget variances' },
          { id: 'weekly-2', text: 'Look for unusual transaction patterns' },
          { id: 'weekly-3', text: 'Reconcile supplier statements' },
          { id: 'weekly-4', text: 'Check overdue payments' },
          { id: 'weekly-5', text: 'Spot-check some transactions' },
        ],
      },
      {
        id: 'monthly',
        title: 'Monthly Reviews',
        content: [
          'Once a month:',
        ],
        checklistItems: [
          { id: 'monthly-1', text: 'Review total spending per supplier' },
          { id: 'monthly-2', text: 'Check if costs match the market' },
          { id: 'monthly-3', text: 'Reconcile headcount to payroll' },
          { id: 'monthly-4', text: 'Review exception reports' },
          { id: 'monthly-5', text: 'Update your fraud risk register' },
        ],
      },
    ],
  },
  {
    id: 'reporting',
    title: 'Reporting Suspected Fraud',
    emoji: '',
    description: 'How to report concerns safely',
    icon: Users,
    subsections: [
      {
        id: 'do-not-confront',
        title: 'Step 1: Do Not Confront the Individual',
        content: [
          'Why confrontation should be avoided:',
          '• Fraudster may destroy evidence',
          '• May pose personal safety risk',
          '• May intimidate witnesses',
          '• Could constitute defamation if wrong',
          '',
          'What to do instead:',
          '• Write down what you observed (facts only)',
          '• Make copies of evidence (don\'t take originals)',
          '• Report through proper channels',
        ],
        checklistItems: [
          { id: 'report-document', text: 'I know how to document concerns' },
          { id: 'report-no-confront', text: 'I understand why not to confront' },
        ],
      },
      {
        id: 'report-channels',
        title: 'Step 2: Report Through Proper Channels',
        content: [
          'Internal Reporting Options:',
          '',
          '1. Your Manager',
          '   Best for: Concerns about team members',
          '',
          '2. Fraud Risk Owner',
          '   Best for: Concerns about your manager',
          '',
          '3. Whistleblowing Hotline',
          '   Best for: Wanting to stay anonymous',
          '',
          '4. Internal Audit',
          '   Best for: System-wide issues',
          '',
          'External Reporting Options (if internal channels ineffective):',
          '• Action Fraud: 0300 123 2040',
          '• Serious Fraud Office',
          '• HMRC (for tax fraud)',
        ],
        checklistItems: [
          { id: 'report-know-channels', text: 'I know who to contact' },
          { id: 'report-commit', text: 'I will report concerns promptly' },
        ],
      },
      {
        id: 'protection',
        title: 'Whistleblower Protection',
        content: [
          'Legal protections apply when you report in good faith:',
          '',
          'You are protected from:',
          '• Dismissal',
          '• Disciplinary action',
          '• Demotion',
          '• Harassment or victimization',
          '',
          'Your duty is to the organization. Report concerns through proper channels.',
          '',
          'Remember: Detecting fraud is a success, not a failure. You are protecting your organization.',
        ],
        checklistItems: [
          { id: 'protection-understand', text: 'I know I\'m protected when reporting' },
          { id: 'protection-confident', text: 'I feel confident speaking up' },
        ],
      },
    ],
  },
  {
    id: 'case-studies',
    title: 'Case Studies',
    emoji: '',
    description: 'Learn from actual fraud cases',
    icon: FileText,
    subsections: [
      {
        id: 'case1',
        title: 'Case Study 1: The Trusted Administrator',
        content: [
          'BACKGROUND:',
          'Finance administrator, 12 years service, highly trusted, never took leave.',
          '',
          'THE FRAUD:',
          '• Created fake supplier "Office Solutions Pro"',
          '• Submitted 47 invoices over 3 years',
          '• Each invoice just under £5,000 (below approval threshold)',
          '• Total loss: £232,650',
          '',
          'HOW DETECTED:',
          'Administrator went on sick leave. Temporary cover questioned unfamiliar supplier.',
          '',
          'KEY LESSONS:',
          '• Mandatory leave is a fraud control',
          '• Verify ALL suppliers, not just large ones',
          '• Segregation of duties prevents single-person fraud',
        ],
        checklistItems: [
          { id: 'case1-learned', text: 'I learned from this case' },
        ],
      },
      {
        id: 'case2',
        title: 'Case Study 2: Email Impersonation',
        content: [
          'BACKGROUND:',
          'Finance team received email from "building contractor": "Our bank has changed. Update payment details for £87,000 final invoice."',
          '',
          'OUTCOME:',
          'Finance officer took proper steps:',
          '• Called contractor using number from original contract',
          '• Contractor confirmed they had NOT sent email',
          '• Payment blocked',
          '• Police notified',
          '',
          'AMOUNT SAVED: £87,000',
          '',
          'KEY LESSONS:',
          '• Email is not secure for bank detail changes',
          '• Phone verification using known contact details is essential',
          '• Staff training on impersonation is critical',
        ],
        checklistItems: [
          { id: 'case2-learned', text: 'I learned from this case' },
        ],
      },
      {
        id: 'case3',
        title: 'Case Study 3: Split Purchases',
        content: [
          'BACKGROUND:',
          'Department manager had £10,000 single-transaction authority.',
          '',
          'THE FRAUD:',
          '• Made 60+ purchases from same IT supplier over 18 months',
          '• Each purchase: £9,500-£9,900 (just below threshold)',
          '• Total spending: £580,000',
          '• Prices 35% above market rate',
          '• Manager receiving kickbacks disguised as "consulting fees"',
          '',
          'TOTAL LOSS: £203,000',
          '',
          'HOW DETECTED:',
          'Finance team ran supplier spend analysis. Concentration risk flagged.',
          '',
          'KEY LESSONS:',
          '• Analyze transaction patterns, not just individual transactions',
          '• Require competitive quotes periodically',
          '• Mandatory conflict of interest declarations',
        ],
        checklistItems: [
          { id: 'case3-learned', text: 'I learned from this case' },
        ],
      },
    ],
  },
  {
    id: 'myths',
    title: 'Common Myths About Fraud',
    emoji: '',
    description: 'Common misconceptions debunked',
    icon: AlertTriangle,
    subsections: [
      {
        id: 'myths-list',
        title: 'Fraud Myths Debunked',
        content: [
          'MYTH 1: "Fraud only happens in large organizations"',
          'REALITY: Small organizations lose more (as % of revenue) due to fewer controls.',
          '',
          'MYTH 2: "Trusted, long-serving employees won\'t commit fraud"',
          'REALITY: Average fraudster tenure is 8+ years. Trust without controls creates opportunity.',
          '',
          'MYTH 3: "Auditors would detect fraud"',
          'REALITY: Auditors sample transactions. Only 15% of fraud detected by audits vs. 40% by whistleblowers.',
          '',
          'MYTH 4: "Fraud prevention is Finance\'s responsibility"',
          'REALITY: Budget-holders approve 85% of fraud transactions. You are the front line.',
          '',
          'MYTH 5: "Small amounts don\'t matter"',
          'REALITY: £100/week = £5,200/year per fraudster. Small frauds escalate and signal weak controls.',
        ],
        checklistItems: [
          { id: 'myths-busted', text: 'I won\'t fall for these myths' },
          { id: 'myths-frontline', text: 'I know I\'m the front line of defense' },
        ],
      },
    ],
  },
  {
    id: 'faqs',
    title: 'Frequently Asked Questions',
    emoji: '',
    description: 'Common questions answered',
    icon: FileText,
    subsections: [
      {
        id: 'faq-list',
        title: 'Common Questions',
        content: [
          'Q: "I approved a payment but now suspect it might be fraudulent. What should I do?"',
          'A: Report immediately. The sooner fraud is detected, the better the chance of recovery. Detecting fraud is a success, not a failure.',
          '',
          'Q: "A supplier is pressuring me to bypass procedures due to urgency. Can I do this?"',
          'A: No. Urgency is a common fraud indicator. If genuinely urgent, escalate to senior management or procurement.',
          '',
          'Q: "Can I approve my own expenses?"',
          'A: No. Self-approval is a fundamental control weakness. All transactions require independent approval.',
          '',
          'Q: "Budget is tight. Can we skip controls?"',
          'A: No. Weak controls cost more in fraud losses than they save. Budget constraints make controls MORE important.',
          '',
          'Q: "What if I\'m wrong about my suspicions?"',
          'A: Report concerns; let investigators determine facts. You are protected when reporting in good faith.',
        ],
        checklistItems: [
          { id: 'faq-read', text: 'I read the FAQs' },
          { id: 'faq-clear', text: 'My questions are answered' },
        ],
      },
    ],
  },
];

export default function BudgetHolderGuidanceScreen() {
  const router = useRouter();
  const { budgetHolderProgress, toggleBudgetHolderItem, toggleBudgetHolderSection } = useWorkshop();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const getSectionProgress = (section: Section) => {
    const allItems = section.subsections.flatMap(sub => sub.checklistItems || []);
    if (allItems.length === 0) return 100;
    const checkedCount = allItems.filter(item => 
      budgetHolderProgress.checkedItems.includes(item.id)
    ).length;
    return Math.round((checkedCount / allItems.length) * 100);
  };

  const getTotalProgress = () => {
    const allItems = GUIDANCE_SECTIONS.flatMap(section =>
      section.subsections.flatMap(sub => sub.checklistItems || [])
    );
    if (allItems.length === 0) return 0;
    const checkedCount = allItems.filter(item =>
      budgetHolderProgress.checkedItems.includes(item.id)
    ).length;
    return Math.round((checkedCount / allItems.length) * 100);
  };

  const isSectionComplete = (section: Section) => {
    return budgetHolderProgress.completedSections.includes(section.id);
  };

  const totalProgress = getTotalProgress();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f172a' as const, '#1e293b' as const]}
        style={styles.background}
      />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Budget-Holder Guidance</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroCard}>
            <View style={styles.heroIconContainer}>
              <Award size={32} color="#fbbf24" strokeWidth={2} />
            </View>
            <Text style={styles.heroTitle}>Budget-Holder Fraud Risk Guidance</Text>
            <Text style={styles.heroSubtitle}>
              Essential fraud risk management guidance for financial decision-makers. This interactive guide provides practical, actionable steps for fraud prevention.
            </Text>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Your Progress</Text>
                <Text style={styles.progressPercent}>{totalProgress}%</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View 
                  style={[
                    styles.progressBarFill, 
                    { width: `${totalProgress}%` }
                  ]} 
                />
              </View>
              {totalProgress === 100 && (
                <Text style={styles.completeText}>Excellent! You have completed all sections.</Text>
              )}
            </View>
          </View>

          {GUIDANCE_SECTIONS.map((section) => {
            const isExpanded = expandedSection === section.id;
            const sectionProgress = getSectionProgress(section);
            const isComplete = isSectionComplete(section);

            return (
              <View key={section.id} style={styles.sectionContainer}>
                <TouchableOpacity
                  style={styles.sectionHeader}
                  onPress={() => toggleSection(section.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.sectionHeaderLeft}>
                    <View style={[
                      styles.sectionIconContainer,
                      isComplete && styles.sectionIconContainerComplete
                    ]}>
                      {isComplete ? (
                        <Check size={20} color="#10b981" strokeWidth={3} />
                      ) : (
                        <section.icon size={20} color="#60a5fa" strokeWidth={2} />
                      )}
                    </View>
                    <View style={styles.sectionTitleContainer}>
                      <Text style={styles.sectionTitle}>{section.title}</Text>
                      <Text style={styles.sectionDescription}>{section.description}</Text>
                    </View>
                  </View>
                  <View style={styles.sectionHeaderRight}>
                    {sectionProgress > 0 && sectionProgress < 100 && (
                      <Text style={styles.sectionProgress}>{sectionProgress}%</Text>
                    )}
                    <ChevronDown
                      size={20}
                      color="#94a3b8"
                      style={{
                        transform: [{ rotate: isExpanded ? '180deg' : '0deg' }],
                      }}
                    />
                  </View>
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.sectionContent}>
                    {section.subsections.map((subsection) => (
                      <View key={subsection.id} style={styles.subsection}>
                        <Text style={styles.subsectionTitle}>{subsection.title}</Text>
                        {subsection.content.map((paragraph, idx) => (
                          <Text
                            key={idx}
                            style={[
                              styles.subsectionText,
                              paragraph === '' && styles.paragraphBreak,
                            ]}
                          >
                            {paragraph}
                          </Text>
                        ))}
                        
                        {subsection.checklistItems && subsection.checklistItems.length > 0 && (
                          <View style={styles.checklistContainer}>
                            {subsection.checklistItems.map((item) => {
                              const isChecked = budgetHolderProgress.checkedItems.includes(item.id);
                              return (
                                <TouchableOpacity
                                  key={item.id}
                                  style={styles.checklistItem}
                                  onPress={() => toggleBudgetHolderItem(item.id)}
                                  activeOpacity={0.7}
                                >
                                  <View style={[
                                    styles.checkbox,
                                    isChecked && styles.checkboxChecked
                                  ]}>
                                    {isChecked && (
                                      <Check size={16} color="#ffffff" strokeWidth={3} />
                                    )}
                                  </View>
                                  <Text style={[
                                    styles.checklistText,
                                    isChecked && styles.checklistTextChecked
                                  ]}>
                                    {item.text}
                                  </Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        )}
                      </View>
                    ))}
                    
                    <TouchableOpacity
                      style={[
                        styles.markCompleteButton,
                        isComplete && styles.markCompleteButtonComplete
                      ]}
                      onPress={() => toggleBudgetHolderSection(section.id)}
                      activeOpacity={0.8}
                    >
                      <CheckSquare 
                        size={20} 
                        color={isComplete ? '#10b981' : '#60a5fa'} 
                        strokeWidth={2} 
                      />
                      <Text style={[
                        styles.markCompleteText,
                        isComplete && styles.markCompleteTextComplete
                      ]}>
                        {isComplete ? 'Section Completed' : 'Mark Section as Complete'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}

          <View style={styles.footerCard}>
            <Text style={styles.footerTitle}>Completion</Text>
            <Text style={styles.footerText}>
              You now have the knowledge and tools to effectively manage fraud risks as a budget-holder. Remember: fraud prevention is about protecting everyone in your organization through strong controls and ethical stewardship.
            </Text>
            <Text style={[styles.footerText, { marginTop: 12 }]}>
              Keep this guide accessible and refer to it as needed in your daily responsibilities.
            </Text>
          </View>
        </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#ffffff',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
    alignItems: 'center',
  },
  heroIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#cbd5e1',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    width: '100%',
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#94a3b8',
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#60a5fa',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#60a5fa',
    borderRadius: 4,
  },
  completeText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#10b981',
    marginTop: 8,
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  sectionHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionIconContainerComplete: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  sectionEmoji: {
    fontSize: 24,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: '#ffffff',
    marginBottom: 2,
  },
  sectionDescription: {
    fontSize: 13,
    color: '#94a3b8',
  },
  sectionProgress: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#60a5fa',
  },
  sectionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 20,
  },
  subsection: {
    gap: 12,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#60a5fa',
  },
  subsectionText: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 22,
  },
  paragraphBreak: {
    height: 4,
  },
  checklistContainer: {
    marginTop: 12,
    gap: 10,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#475569',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  checklistText: {
    flex: 1,
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
  },
  checklistTextChecked: {
    color: '#10b981',
    fontWeight: '600' as const,
  },
  markCompleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 14,
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.3)',
    marginTop: 8,
  },
  markCompleteButtonComplete: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  markCompleteText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: '#60a5fa',
  },
  markCompleteTextComplete: {
    color: '#10b981',
  },
  footerCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 20,
    padding: 24,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  footerTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#ffffff',
    marginBottom: 12,
  },
  footerText: {
    fontSize: 15,
    color: '#cbd5e1',
    lineHeight: 24,
  },
});
