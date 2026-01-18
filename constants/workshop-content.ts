import { Section, SectorType } from '@/types/workshop';

export const WORKSHOP_SECTIONS: Section[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    icon: 'shield-alert',
    slides: [
      {
        id: 'intro-1',
        title: 'The Failure to Prevent Fraud Offence',
        content: 'A new era of accountability begins September 2025. The Economic Crime and Corporate Transparency Act 2023 introduces organisational criminal liability for fraud. Your organisation can face unlimited fines, director disqualification, and severe reputational damage—even if senior leadership had no knowledge of the fraud.\n\nThe only defence: proving reasonable prevention procedures were in place.',
        quiz: {
          id: 'q1',
          type: 'poll',
          question: 'How many have reviewed fraud risk in the past 12 months?',
          options: ['Yes, comprehensive review', 'Partial review', 'Planning to review', 'Not yet reviewed'],
        },
      },
      {
        id: 'intro-2',
        title: 'Is Your Organisation in Scope?',
        content: 'Large organisations must meet 2 of 3 criteria:\n• Annual turnover > £36 million\n• Balance sheet total > £18 million\n• 250+ employees\n\nHowever, even smaller organisations face fraud liability, insurer expectations, regulatory scrutiny, and stakeholder demands. Best practice applies to ALL organisations regardless of size.',
        quiz: {
          id: 'q2',
          type: 'quiz',
          question: 'Can smaller organisations be prosecuted for fraud committed for their benefit?',
          options: ['No, only large organisations', 'Yes, if the fraud occurred', 'Only if above thresholds', 'Only with director knowledge'],
          correctAnswer: 1,
        },
      },
    ],
  },
  {
    id: 'understanding-fraud',
    title: 'Understanding Fraud',
    icon: 'alert-triangle',
    slides: [
      {
        id: 'fraud-1',
        title: 'The Fraud Triangle',
        content: 'Fraud occurs when three elements align:\n\n1. PRESSURE/MOTIVATION: Financial stress, unrealistic targets, personal crisis\n\n2. OPPORTUNITY: Weak controls, lack of oversight, access to assets\n\n3. RATIONALIZATION: "Everyone does it," "I deserve this," "Just borrowing"\n\nYou can\'t control pressure or rationalization, but you CAN remove opportunity through robust controls.',
        discussion: 'Which element of the fraud triangle is easiest for your organisation to address?',
      },
      {
        id: 'fraud-2',
        title: 'Common Fraud Types',
        content: 'PROCUREMENT: Fake suppliers, kickbacks, bid rigging, split purchases\n\nPAYROLL: Ghost employees, timesheet manipulation, unauthorized overtime\n\nREVENUE: Sales inflation, premature recognition, cash theft\n\nEXPENSES: False claims, personal use of funds, inflated mileage\n\nCYBER: Email impersonation, invoice fraud, ransomware',
        quiz: {
          id: 'q3',
          type: 'quiz',
          question: 'What percentage of occupational fraud involves budget-holder functions?',
          options: ['45%', '65%', '85%', '95%'],
          correctAnswer: 2,
        },
        caseStudy: {
          title: 'NHS Trust Procurement Fraud',
          description: 'Finance team received £8,500 invoice from "IT Solutions Ltd" for software licenses. Checked Companies House—company dissolved 2 years ago. Avoided £8,500 loss through simple verification.',
          sector: 'public',
        },
      },
    ],
  },
  {
    id: 'defence',
    title: 'Defence & Prevention',
    icon: 'shield-check',
    slides: [
      {
        id: 'def-1',
        title: 'Your Legal Shield: Reasonable Procedures',
        content: 'The ONLY defence is proving reasonable prevention procedures based on six principles:\n\n1. Top-level commitment (board demonstrates zero tolerance)\n2. Risk assessment (systematic identification)\n3. Proportionate procedures (controls matched to risk)\n4. Due diligence (third-party vetting)\n5. Communication & training (awareness at all levels)\n6. Monitoring & review (continuous improvement)\n\n"Reasonable" means proportionate, documented, and regularly reviewed.',
        quiz: {
          id: 'q4',
          type: 'poll',
          question: 'Which principle is your organisation strongest in?',
          options: ['Top-level commitment', 'Risk assessment', 'Due diligence', 'Training & communication'],
        },
      },
      {
        id: 'def-2',
        title: 'Financial & Reputational Consequences',
        content: 'DIRECT COSTS:\n• Average fraud loss: 5% of annual revenue\n• Investigation costs (legal, forensic)\n• Unlimited regulatory fines\n\nINDIRECT COSTS:\n• Reputational damage\n• Increased insurance premiums\n• Lost contracts and partnerships\n• Employee morale decline\n• Director disqualification',
        caseStudy: {
          title: 'Charity Sector Fraud Impact',
          description: 'National charity discovered £250k internal fraud. Direct loss plus £150k investigation costs. Donor confidence dropped 30%, taking 18 months to recover. CEO resigned under pressure.',
          sector: 'charity',
        },
      },
    ],
  },
  {
    id: 'leadership',
    title: 'Leadership Responsibilities',
    icon: 'users',
    slides: [
      {
        id: 'lead-1',
        title: 'Board & Leadership Duties',
        content: 'NON-DELEGABLE RESPONSIBILITIES:\n\n1. Approve fraud risk strategy (board-level ownership)\n2. Allocate adequate resources (budget for prevention)\n3. Set the tone (model ethical behavior)\n4. Receive regular reports (minimum quarterly)\n5. Challenge & scrutinize (ask difficult questions)\n\nRed flags: No fraud risk on board agenda in 12 months, no designated fraud risk owner, untested response plan, no budget-holder training.',
        discussion: 'When did your board last receive a comprehensive fraud risk report?',
      },
      {
        id: 'lead-2',
        title: 'Budget-Holder Accountability',
        content: 'Budget-holders are the front line. You control spending, approve transactions, and manage relationships.\n\nYOUR OBLIGATIONS:\n• Know your delegated authority limits\n• Question unusual requests immediately\n• Follow procurement procedures (no shortcuts)\n• Report suspicions NOW (not tomorrow)\n\nScenario: A trusted 10-year supplier emails "Urgent—update bank details for payment." What do you do?\n\nAnswer: STOP. Call supplier using known phone number. Verify. Email impersonation is the #1 fraud vector.',
        quiz: {
          id: 'q5',
          type: 'quiz',
          question: 'Should you update supplier bank details based on email requests?',
          options: ['Yes, if from trusted supplier', 'Yes, if urgent', 'No, always verify by phone', 'Only with manager approval'],
          correctAnswer: 2,
        },
        caseStudy: {
          title: 'Private Sector Email Impersonation',
          description: 'Finance received email from "construction supplier" requesting bank change for £127,000 payment. Followed policy: called supplier using contract number. Supplier had NOT sent email. Avoided complete loss.',
          sector: 'private',
        },
      },
    ],
  },
  {
    id: 'implementation',
    title: 'Implementation',
    icon: 'clipboard-check',
    slides: [
      {
        id: 'impl-1',
        title: 'Conducting a Fraud Risk Assessment',
        content: 'FIVE-STEP PROCESS:\n\n1. Identify fraud risk areas (where could fraud occur?)\n2. Assess inherent risk (Impact × Likelihood)\n3. Review existing controls (what prevents fraud now?)\n4. Calculate residual risk (risk after controls)\n5. Prioritize gaps (focus on high-residual risks)\n\nTime required: Small organisations 2-4 weeks, Medium/large 6-8 weeks.\n\nYou don\'t need perfection on day one. Start with basic assessment and iterate.',
        quiz: {
          id: 'q6',
          type: 'poll',
          question: 'What is your biggest barrier to conducting a fraud risk assessment?',
          options: ['Lack of resources', 'Don\'t know how to start', 'Too complex', 'Competing priorities'],
        },
      },
      {
        id: 'impl-2',
        title: 'Your 90-Day Implementation Roadmap',
        content: 'PHASE 1 (Weeks 1-4): Foundation\n• Board resolution committing to fraud risk management\n• Appoint fraud risk owner\n• Budget allocation\n• Communicate to all staff\n\nPHASE 2 (Weeks 5-8): Assessment\n• Conduct fraud risk assessment\n• Identify top 5-10 priority risks\n• Review existing policies\n• Gap analysis\n\nPHASE 3 (Weeks 9-12): Action\n• Draft/update fraud response plan\n• Implement priority controls\n• Schedule mandatory training\n• Establish quarterly board reporting',
        discussion: 'Who in your organisation will lead the fraud risk assessment?',
      },
    ],
  },
  {
    id: 'next-steps',
    title: 'Your Next Steps',
    icon: 'arrow-right',
    slides: [
      {
        id: 'next-1',
        title: 'Resources & Support',
        content: 'INTERNAL RESOURCES:\n• Stop FRA platform (automated, GovS-013 aligned)\n• Internal audit function\n• Legal/compliance team\n• HR department\n\nEXTERNAL RESOURCES:\n• "Failure to Prevent Fraud" guidance (v1.5)\n• GovS-013 Counter-Fraud Standard\n• Sector-specific guides (NHS CFA, Charity Commission, FCA)\n• Professional advisors',
        quiz: {
          id: 'q7',
          type: 'poll',
          question: 'What support do you need most?',
          options: ['Assessment tools', 'Training materials', 'Policy templates', 'Expert guidance'],
        },
      },
      {
        id: 'next-2',
        title: 'Commitments & Actions',
        content: 'Before you leave, commit to:\n\nBOARD COMMITMENT:\n• Fraud risk as standing quarterly agenda item\n• Quarterly fraud risk report to board\n\nLEADERSHIP ACTION:\n• Appoint fraud risk owner by [date]\n• Allocate budget for assessment\n\nIMMEDIATE NEXT STEP:\n• Who will lead your fraud risk assessment?\n• Target completion date?\n\n"Fraud risk management isn\'t about assuming the worst of people. It\'s about building robust systems that protect everyone—our organisation, our employees, and those we serve."',
        discussion: 'What is ONE action you will personally commit to in the next 30 days?',
      },
    ],
  },
];

export const getSectorCaseStudies = (sector: SectorType) => {
  return WORKSHOP_SECTIONS.flatMap(section =>
    section.slides
      .filter(slide => slide.caseStudy && slide.caseStudy.sector === sector)
      .map(slide => slide.caseStudy!)
  );
};
