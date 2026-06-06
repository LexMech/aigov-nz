import { useState, useEffect } from 'react';
import type { User, Question, Category, AssessmentResult, MembershipTierConfig } from './types';
import { INITIAL_CATEGORIES, INITIAL_QUESTIONS, DEFAULT_TIER_CONFIGS } from './types';

// Simple in-memory store with localStorage persistence
function useLocalState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
}

export function useAppStore() {
  const [currentUser, setCurrentUser] = useLocalState<User | null>('aigov_user', null);
  const [questions, setQuestions] = useLocalState<Question[]>('aigov_questions', INITIAL_QUESTIONS);
  const [categories, setCategories] = useLocalState<Category[]>('aigov_categories', INITIAL_CATEGORIES);
  const [tierConfigs, setTierConfigs] = useLocalState<MembershipTierConfig[]>('aigov_tier_configs', DEFAULT_TIER_CONFIGS);
  const [results, setResults] = useLocalState<AssessmentResult[]>('aigov_results', []);
  const [page, setPage] = useLocalState<string>('aigov_page', 'landing');

  // Demo users
  const DEMO_USERS: User[] = [
    { id: 'admin1', email: 'admin@aigov.co.nz', name: 'Admin User', tier: 'admin', joinedAt: new Date() },
    { id: 'pro1', email: 'pro@aigov.co.nz', name: 'Pro User', tier: 'professional', joinedAt: new Date() },
    { id: 'basic1', email: 'basic@aigov.co.nz', name: 'Basic User', tier: 'basic', joinedAt: new Date() },
  ];

  const TRIAL_CODES = ['TRIAL2024', 'GOVPILOT', 'FREESTARTER'];

  function login(email: string, password: string): boolean {
    const user = DEMO_USERS.find(u => u.email === email);
    if (user && password === 'demo123') {
      setCurrentUser(user);
      return true;
    }
    return false;
  }

  function redeemTrialCode(email: string, name: string, code: string): boolean {
    if (TRIAL_CODES.includes(code.toUpperCase())) {
      const newUser: User = {
        id: `trial_${Date.now()}`,
        email,
        name,
        tier: 'free_trial',
        trialCode: code,
        joinedAt: new Date(),
      };
      setCurrentUser(newUser);
      return true;
    }
    return false;
  }

  function logout() {
    setCurrentUser(null);
    setPage('landing');
  }

  function getTierConfig() {
    if (!currentUser) return null;
    return tierConfigs.find(c => c.tier === currentUser.tier) ?? null;
  }

  function getLiveQuestions() {
    return questions.filter(q => q.isLive).sort((a, b) => {
      const catA = categories.find(c => c.id === a.categoryId)?.order ?? 0;
      const catB = categories.find(c => c.id === b.categoryId)?.order ?? 0;
      if (catA !== catB) return catA - catB;
      return a.order - b.order;
    });
  }

  function saveResult(result: AssessmentResult) {
    setResults(prev => [...prev, result]);
  }

  return {
    currentUser, setCurrentUser,
    questions, setQuestions,
    categories, setCategories,
    tierConfigs, setTierConfigs,
    results, setResults,
    page, setPage,
    login, redeemTrialCode, logout,
    getTierConfig, getLiveQuestions,
    saveResult,
    isAdmin: currentUser?.tier === 'admin',
  };
}

export type AppStore = ReturnType<typeof useAppStore>;
