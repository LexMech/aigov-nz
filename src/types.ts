export type MembershipTier = 'free_trial' | 'basic' | 'professional' | 'enterprise' | 'admin';

export type ResultsOption = 'screen' | 'pdf' | 'email';

export interface User {
  id: string;
  email: string;
  name: string;
  tier: MembershipTier;
  trialCode?: string;
  joinedAt: Date;
}

export type QuestionType = 'single_choice' | 'multiple_choice' | 'scale' | 'text';

export interface ConditionalLogic {
  dependsOnQuestionId: string;
  showWhenValue: string;
}

export interface QuestionOption {
  id: string;
  label: string;
  value: string;
  score?: number;
}

export interface Question {
  id: string;
  categoryId: string;
  text: string;
  type: QuestionType;
  options: QuestionOption[];
  order: number;
  isLive: boolean;
  required: boolean;
  conditional?: ConditionalLogic;
  helpText?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  order: number;
  color: string;
}

export interface AssessmentResult {
  id: string;
  userId: string;
  completedAt: Date;
  answers: Record<string, string | string[]>;
  scores: Record<string, number>;
  totalScore: number;
  maturityLevel: MaturityLevel;
}

export type MaturityLevel = 'initial' | 'developing' | 'defined' | 'managed' | 'optimizing';

export interface MembershipTierConfig {
  tier: MembershipTier;
  allowedResultsOptions: ResultsOption[];
  canAccessAssessment: boolean;
}

export const MATURITY_LEVELS: Record<MaturityLevel, { label: string; description: string; color: string }> = {
  initial: {
    label: 'Initial',
    description: 'AI governance is ad hoc with minimal formal processes.',
    color: '#dc2626',
  },
  developing: {
    label: 'Developing',
    description: 'Some governance structures exist but are inconsistently applied.',
    color: '#ea580c',
  },
  defined: {
    label: 'Defined',
    description: 'Clear governance processes are documented and followed.',
    color: '#ca8a04',
  },
  managed: {
    label: 'Managed',
    description: 'Governance is measured and actively managed with metrics.',
    color: '#16a34a',
  },
  optimizing: {
    label: 'Optimizing',
    description: 'Continuous improvement drives AI governance excellence.',
    color: '#2563eb',
  },
};

export const DEFAULT_TIER_CONFIGS: MembershipTierConfig[] = [
  { tier: 'free_trial', allowedResultsOptions: ['screen'], canAccessAssessment: true },
  { tier: 'basic', allowedResultsOptions: ['screen', 'pdf'], canAccessAssessment: true },
  { tier: 'professional', allowedResultsOptions: ['screen', 'pdf', 'email'], canAccessAssessment: true },
  { tier: 'enterprise', allowedResultsOptions: ['screen', 'pdf', 'email'], canAccessAssessment: true },
  { tier: 'admin', allowedResultsOptions: ['screen', 'pdf', 'email'], canAccessAssessment: true },
];

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'governance', name: 'Governance & Accountability', description: 'Policies, frameworks, roles and accountability for AI', order: 1, color: '#2563eb' },
  { id: 'privacy', name: 'Data Security & Privacy', description: 'Privacy risk, data input controls and security practices', order: 2, color: '#16a34a' },
  { id: 'bias', name: 'Bias, Fairness & Equity', description: 'Bias training and fairness in AI decision-making', order: 3, color: '#7c3aed' },
  { id: 'reliability', name: 'Reliability & Accuracy', description: 'Accuracy targets and AI output quality', order: 4, color: '#ca8a04' },
  { id: 'risk', name: 'Risk Assessment/Mapping', description: 'Organisation-wide AI risk identification and mapping', order: 5, color: '#dc2626' },
  { id: 'transparency', name: 'Transparency & Explainability', description: 'Ability to explain AI-influenced decisions', order: 6, color: '#ea580c' },
];

export const INITIAL_QUESTIONS: Question[] = [
  // Governance & Accountability
  {
    id: 'q1', categoryId: 'governance', order: 1, isLive: true, required: true, type: 'single_choice',
    text: 'Do you have AI policies or frameworks that guide responsible AI use?',
    options: [
      { id: 'q1a', label: 'No formal policies or frameworks are in place', value: '0', score: 0 },
      { id: 'q1b', label: 'Currently developing policies', value: '1', score: 1 },
      { id: 'q1c', label: 'Some AI policies but they may not be comprehensive, or not fully implemented', value: '2', score: 2 },
      { id: 'q1d', label: 'Comprehensive AI policies, implemented across the organisation', value: '3', score: 3 },
      { id: 'q1e', label: 'In addition to the above, AI policies are regularly reviewed for effectiveness', value: '4', score: 4 },
    ],
  },
  {
    id: 'q2', categoryId: 'governance', order: 2, isLive: true, required: true, type: 'single_choice',
    text: 'Do you have clearly defined roles and accountability structures for AI-related decisions and issues?',
    options: [
      { id: 'q2a', label: 'No specific roles or accountability for AI decisions and issues', value: '0', score: 0 },
      { id: 'q2b', label: 'Informal accountability, e.g. defaulting to legal or IT team within their existing roles (ad hoc practices)', value: '1', score: 1 },
      { id: 'q2c', label: 'Formal AI roles assigned with clear accountability and escalation procedures', value: '2', score: 2 },
      { id: 'q2d', label: 'In addition, accountability effectiveness is measured and monitored (e.g. via audits)', value: '3', score: 3 },
    ],
  },
  // Bias, Fairness & Equity
  {
    id: 'q3', categoryId: 'bias', order: 1, isLive: true, required: true, type: 'single_choice',
    text: 'What bias training do you have?',
    options: [
      { id: 'q3a', label: 'No training', value: '0', score: 0 },
      { id: 'q3b', label: 'Online training only left to staff to complete', value: '1', score: 1 },
      { id: 'q3c', label: 'Managers are aware of the issue and train staff directly', value: '2', score: 2 },
    ],
  },
  // Transparency & Explainability
  {
    id: 'q4', categoryId: 'transparency', order: 1, isLive: true, required: true, type: 'single_choice',
    text: 'Can you explain decisions, where AI has been used in some part of the process?',
    options: [
      { id: 'q4a', label: 'No, the steps are not recorded so we cannot explain to the impacted person', value: '0', score: 0 },
      { id: 'q4b', label: 'We can explain in general terms, but not necessarily down to the specific decision (or person)', value: '1', score: 1 },
      { id: 'q4c', label: 'Yes, we can fully explain to the person affected by the decision', value: '2', score: 2 },
    ],
  },
  // Reliability & Accuracy
  {
    id: 'q5', categoryId: 'reliability', order: 1, isLive: true, required: true, type: 'single_choice',
    text: 'How do you think about accuracy when you implement AI?',
    options: [
      { id: 'q5a', label: "We know AI isn't always accurate, but haven't set up formal targets to assess", value: '0', score: 0 },
      { id: 'q5b', label: 'We are aware of AI accuracy issues and are working towards setting accuracy targets. In the meantime, staff know to check outputs', value: '1', score: 1 },
      { id: 'q5c', label: 'We have completed accuracy targets based on risk and use case', value: '2', score: 2 },
      { id: 'q5d', label: 'In addition, we benchmark AI results periodically against the accuracy targets', value: '3', score: 3 },
    ],
  },
  // Risk Assessment/Mapping
  {
    id: 'q6', categoryId: 'risk', order: 1, isLive: true, required: true, type: 'single_choice',
    text: 'How do you approach AI risk mapping across your organisation?',
    options: [
      { id: 'q6a', label: 'We assess individual AI tools or use cases on an ad hoc basis (targeting resources appropriately)', value: '0', score: 0 },
      { id: 'q6b', label: 'We are in the process of completing an organisation-wide risk map of various AI tools and use cases', value: '1', score: 1 },
      { id: 'q6c', label: 'We have completed an organisation-wide stock risk map of our AI tools and use cases', value: '2', score: 2 },
      { id: 'q6d', label: 'In addition, we proactively assess potential use cases and re-assess our risk map', value: '3', score: 3 },
    ],
  },
  // Data Security & Privacy
  {
    id: 'q7', categoryId: 'privacy', order: 1, isLive: true, required: true, type: 'single_choice',
    text: 'How do you assess privacy risk before deploying AI tools or systems?',
    options: [
      { id: 'q7a', label: 'No formal privacy assessment (or PIA) before deployment', value: '0', score: 0 },
      { id: 'q7b', label: 'Some initiatives are assessed based on perceived risk, but the practice is ad hoc / inconsistent', value: '1', score: 1 },
      { id: 'q7c', label: 'All AI initiatives undergo a privacy risk assessment (PIA) before deployment', value: '2', score: 2 },
      { id: 'q7d', label: 'Privacy risk assessments (PIAs) are tracked both for the initiative, and across AI initiatives more generally', value: '3', score: 3 },
      { id: 'q7e', label: 'Lessons from PIAs drive organisation-wide policy and governance improvements; continuous improvement focus', value: '4', score: 4 },
    ],
  },
  {
    id: 'q8', categoryId: 'privacy', order: 2, isLive: true, required: true, type: 'single_choice',
    text: 'How effectively do you control what personal or sensitive data can be input into AI tools and systems?',
    options: [
      { id: 'q8a', label: 'No restrictions (staff can input what they want freely)', value: '0', score: 0 },
      { id: 'q8b', label: 'Some guidelines exist, but staff may not distinguish sensitive vs non-sensitive data, or permitted uses', value: '1', score: 1 },
      { id: 'q8c', label: 'Formal policies define what data can be input, and these are reinforced (e.g. by managers and training)', value: '2', score: 2 },
      { id: 'q8d', label: 'Controls are enforced through processes or (to some extent) technical measures; compliance is monitored', value: '3', score: 3 },
      { id: 'q8e', label: 'Controls are embedded organisation-wide; staff are guided and rules continually improved based on incidents and audits', value: '4', score: 4 },
    ],
  },
  {
    id: 'q9', categoryId: 'privacy', order: 3, isLive: true, required: true, type: 'single_choice',
    text: 'What is your approach to data security when using AI tools?',
    options: [
      { id: 'q9a', label: 'No significant or regular consideration of technical (and legal) protections', value: '0', score: 0 },
      { id: 'q9b', label: 'Ad hoc consideration of technical and legal considerations', value: '1', score: 1 },
      { id: 'q9c', label: 'Comprehensive security measures considered (e.g. cyber, legal) and regularly reviewed', value: '2', score: 2 },
    ],
  },
];
