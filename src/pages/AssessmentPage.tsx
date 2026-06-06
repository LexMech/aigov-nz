import { useState } from 'react';
import type { AppStore } from '../store';
import type { Question, AssessmentResult, MaturityLevel } from '../types';

function computeResult(
  questions: Question[],
  answers: Record<string, string | string[]>,
  userId: string,
): AssessmentResult {
  const scores: Record<string, number> = {};
  let total = 0;
  let maxTotal = 0;

  for (const q of questions) {
    const answer = answers[q.id];
    if (!answer) continue;
    const selectedValue = Array.isArray(answer) ? answer[0] : answer;
    const option = q.options.find(o => o.value === selectedValue);
    const score = option?.score ?? 0;
    const maxScore = Math.max(...q.options.map(o => o.score ?? 0));
    scores[q.id] = score;
    total += score;
    maxTotal += maxScore;
  }

  const pct = maxTotal > 0 ? total / maxTotal : 0;
  let maturityLevel: MaturityLevel;
  if (pct < 0.2) maturityLevel = 'initial';
  else if (pct < 0.4) maturityLevel = 'developing';
  else if (pct < 0.6) maturityLevel = 'defined';
  else if (pct < 0.8) maturityLevel = 'managed';
  else maturityLevel = 'optimizing';

  return {
    id: `result_${Date.now()}`,
    userId,
    completedAt: new Date(),
    answers,
    scores,
    totalScore: total,
    maturityLevel,
  };
}

export default function AssessmentPage({ store }: { store: AppStore }) {
  const liveQuestions = store.getLiveQuestions();
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [currentStep, setCurrentStep] = useState(0);


  const tierConfig = store.getTierConfig();

  if (!store.currentUser || !tierConfig?.canAccessAssessment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Members Only</h2>
          <p className="text-gray-500 mb-4">Please sign in or redeem a trial code to access the assessment.</p>
          <button onClick={() => store.setPage('login')} className="bg-blue-700 text-white px-6 py-2 rounded font-semibold">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // Group questions by category
  const categories = store.categories
    .filter(cat => liveQuestions.some(q => q.categoryId === cat.id))
    .sort((a, b) => a.order - b.order);

  const steps = categories.map(cat => ({
    category: cat,
    questions: liveQuestions.filter(q => q.categoryId === cat.id),
  }));

  if (liveQuestions.length === 0) {
    return (
      <PageShell store={store}>
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No questions are currently available. Check back soon.</p>
        </div>
      </PageShell>
    );
  }

  function setAnswer(questionId: string, value: string) {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }

  function canProceed() {
    const step = steps[currentStep];
    return step.questions.every(q => !q.required || answers[q.id]);
  }

  function handleSubmit() {
    if (!store.currentUser) return;
    const result = computeResult(liveQuestions, answers, store.currentUser.id);
    store.saveResult(result);
    store.setPage('results');
  }

  const progress = (currentStep / steps.length) * 100;

  return (
    <PageShell store={store}>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentStep) / steps.length) * 100}%` }}
          />
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          {steps.map((s, i) => (
            <span
              key={s.category.id}
              className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                i < currentStep
                  ? 'bg-green-50 border-green-300 text-green-700'
                  : i === currentStep
                  ? 'bg-blue-50 border-blue-400 text-blue-700'
                  : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}
            >
              {s.category.name}
            </span>
          ))}
        </div>
      </div>

      {/* Current step */}
      {steps[currentStep] && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-3 h-8 rounded"
              style={{ backgroundColor: steps[currentStep].category.color }}
            />
            <div>
              <h2 className="text-xl font-bold">{steps[currentStep].category.name}</h2>
              <p className="text-sm text-gray-500">{steps[currentStep].category.description}</p>
            </div>
          </div>

          <div className="space-y-8">
            {steps[currentStep].questions.map((q, qi) => (
              <QuestionCard
                key={q.id}
                question={q}
                index={qi + 1}
                answer={answers[q.id]}
                onAnswer={setAnswer}
              />
            ))}
          </div>

          <div className="flex justify-between mt-10">
            <button
              onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
              disabled={currentStep === 0}
              className="px-5 py-2 border border-gray-300 rounded text-sm font-medium disabled:opacity-40 hover:bg-gray-50"
            >
              ← Previous
            </button>
            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => { if (canProceed()) setCurrentStep(s => s + 1); }}
                disabled={!canProceed()}
                className="px-5 py-2 bg-blue-700 text-white rounded text-sm font-medium hover:bg-blue-800 disabled:opacity-40 transition-colors"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="px-6 py-2 bg-green-700 text-white rounded text-sm font-semibold hover:bg-green-800 disabled:opacity-40 transition-colors"
              >
                Submit Assessment ✓
              </button>
            )}
          </div>
        </div>
      )}
    </PageShell>
  );
}

function QuestionCard({
  question,
  index,
  answer,
  onAnswer,
}: {
  question: Question;
  index: number;
  answer: string | string[] | undefined;
  onAnswer: (id: string, value: string) => void;
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-5">
      <div className="flex gap-3 mb-4">
        <span className="text-xs font-bold text-gray-400 bg-gray-100 rounded px-2 py-0.5 self-start mt-0.5">Q{index}</span>
        <div className="flex-1">
          <p className="font-medium text-gray-900">{question.text}</p>
          {question.helpText && (
            <p className="text-xs text-gray-400 mt-1">{question.helpText}</p>
          )}
          {question.required && <span className="text-xs text-red-400">Required</span>}
        </div>
      </div>

      <div className="space-y-2 ml-8">
        {question.options.map(opt => {
          const isSelected = answer === opt.value;
          return (
            <label
              key={opt.id}
              className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition-colors ${
                isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={opt.value}
                checked={isSelected}
                onChange={() => onAnswer(question.id, opt.value)}
                className="accent-blue-600"
              />
              <span className="text-sm">{opt.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function PageShell({ store, children }: { store: AppStore; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between">
        <button onClick={() => store.setPage('landing')} className="text-xl font-bold tracking-tight">
          AI<span className="text-blue-700">Gov</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium ml-2">Maturity</span>
        </button>
        <div className="flex items-center gap-4">
          {store.isAdmin && (
            <button
              onClick={() => store.setPage('admin')}
              className="text-xs bg-amber-50 border border-amber-300 text-amber-700 px-3 py-1 rounded font-medium hover:bg-amber-100"
            >
              Admin Panel
            </button>
          )}
          {store.currentUser && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">{store.currentUser.name}</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded capitalize">{store.currentUser.tier}</span>
              <button onClick={store.logout} className="text-sm text-gray-400 hover:text-gray-700">Sign out</button>
            </div>
          )}
        </div>
      </nav>
      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-2">AI Governance Maturity Assessment</h1>
        <p className="text-gray-500 text-sm mb-8">Answer each question to receive your personalised maturity profile.</p>
        {children}
      </main>
    </div>
  );
}
