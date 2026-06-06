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
  { id: 'governance', name: 'Governance Structure', description: 'Policies, oversight, and accountability', order: 1, color: '#2563eb' },
  { id: 'risk', name: 'Risk Management', description: 'Risk identification, assessment and mitigation', order: 2, color: '#dc2626' },
  { id: 'transparency', name: 'Transparency & Explainability', description: 'Model interpretability and documentation', order: 3, color: '#16a34a' },
  { id: 'data', name: 'Data Governance', description: 'Data quality, privacy and lineage', order: 4, color: '#ca8a04' },
  { id: 'ethics', name: 'Ethics & Fairness', description: 'Bias, equity and ethical AI principles', order: 5, color: '#7c3aed' },
];

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q1', categoryId: 'governance', order: 1, isLive: true, required: true, type: 'single_choice',
    text: 'Does your organisation have a dedicated AI governance policy?',
    helpText: 'This includes formal documented policies approved by leadership.',
    options: [
      { id: 'q1a', label: 'No policy exists', value: 'none', score: 0 },
      { id: 'q1b', label: 'Informal guidelines only', value: 'informal', score: 1 },
      { id: 'q1c', label: 'Formal policy in draft', value: 'draft', score: 2 },
      { id: 'q1d', label: 'Approved and published policy', value: 'approved', score: 3 },
      { id: 'q1e', label: 'Policy with regular review cycle', value: 'reviewed', score: 4 },
    ],
  },
  {
    id: 'q2', categoryId: 'governance', order: 2, isLive: true, required: true, type: 'single_choice',
    text: 'Is there a named AI governance owner or committee responsible for AI oversight?',
    options: [
      { id: 'q2a', label: 'No designated owner', value: 'none', score: 0 },
      { id: 'q2b', label: 'Informally assigned', value: 'informal', score: 1 },
      { id: 'q2c', label: 'Named individual responsible', value: 'individual', score: 2 },
      { id: 'q2d', label: 'Formal committee established', value: 'committee', score: 3 },
      { id: 'q2e', label: 'Committee with executive sponsorship', value: 'executive', score: 4 },
    ],
  },
  {
    id: 'q3', categoryId: 'risk', order: 1, isLive: true, required: true, type: 'single_choice',
    text: 'How does your organisation identify and assess AI-related risks?',
    options: [
      { id: 'q3a', label: 'No formal process', value: 'none', score: 0 },
      { id: 'q3b', label: 'Ad hoc risk identification', value: 'adhoc', score: 1 },
      { id: 'q3c', label: 'Risk register maintained', value: 'register', score: 2 },
      { id: 'q3d', label: 'Regular risk assessments conducted', value: 'regular', score: 3 },
      { id: 'q3e', label: 'Continuous monitoring and escalation', value: 'continuous', score: 4 },
    ],
  },
  {
    id: 'q4', categoryId: 'transparency', order: 1, isLive: true, required: true, type: 'single_choice',
    text: 'Can your organisation explain how key AI models make decisions?',
    options: [
      { id: 'q4a', label: 'No explainability capability', value: 'none', score: 0 },
      { id: 'q4b', label: 'High-level descriptions only', value: 'highlevel', score: 1 },
      { id: 'q4c', label: 'Technical documentation exists', value: 'docs', score: 2 },
      { id: 'q4d', label: 'Explainability tools implemented', value: 'tools', score: 3 },
      { id: 'q4e', label: 'Explainability embedded in processes', value: 'embedded', score: 4 },
    ],
  },
  {
    id: 'q5', categoryId: 'data', order: 1, isLive: true, required: true, type: 'single_choice',
    text: 'How does your organisation manage data quality for AI systems?',
    options: [
      { id: 'q5a', label: 'No data quality processes', value: 'none', score: 0 },
      { id: 'q5b', label: 'Basic data validation only', value: 'basic', score: 1 },
      { id: 'q5c', label: 'Data quality standards defined', value: 'standards', score: 2 },
      { id: 'q5d', label: 'Automated quality checks in place', value: 'automated', score: 3 },
      { id: 'q5e', label: 'Full data lineage and quality monitoring', value: 'full', score: 4 },
    ],
  },
  {
    id: 'q6', categoryId: 'ethics', order: 1, isLive: true, required: true, type: 'single_choice',
    text: 'Does your organisation conduct bias testing on AI systems before deployment?',
    options: [
      { id: 'q6a', label: 'No bias testing performed', value: 'none', score: 0 },
      { id: 'q6b', label: 'Informal checks only', value: 'informal', score: 1 },
      { id: 'q6c', label: 'Basic bias metrics measured', value: 'basic', score: 2 },
      { id: 'q6d', label: 'Comprehensive bias testing framework', value: 'framework', score: 3 },
      { id: 'q6e', label: 'Ongoing bias monitoring post-deployment', value: 'ongoing', score: 4 },
    ],
  },
];
