import { useState } from 'react';
import type { AppStore } from '../store';
import { MATURITY_LEVELS } from '../types';
import type { MaturityLevel, AssessmentResult } from '../types';

function getLatestResult(results: AssessmentResult[], userId: string): AssessmentResult | null {
  const userResults = results.filter(r => r.userId === userId);
  if (!userResults.length) return null;
  return userResults.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())[0];
}

function getCategoryScore(
  result: AssessmentResult,
  categoryId: string,
  questions: ReturnType<AppStore['getLiveQuestions']>,
): { score: number; max: number; pct: number } {
  const catQuestions = questions.filter(q => q.categoryId === categoryId);
  let score = 0;
  let max = 0;
  for (const q of catQuestions) {
    score += result.scores[q.id] ?? 0;
    max += Math.max(...q.options.map(o => o.score ?? 0));
  }
  return { score, max, pct: max > 0 ? score / max : 0 };
}

export default function ResultsPage({ store }: { store: AppStore }) {
  const [emailSent, setEmailSent] = useState(false);
  const [emailAddress, setEmailAddress] = useState(store.currentUser?.email ?? '');

  if (!store.currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Please sign in to view results.</p>
          <button onClick={() => store.setPage('login')} className="bg-blue-700 text-white px-6 py-2 rounded">Sign In</button>
        </div>
      </div>
    );
  }

  const result = getLatestResult(store.results, store.currentUser.id);

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar store={store} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-4">No assessment completed yet.</p>
            <button onClick={() => store.setPage('assessment')} className="bg-blue-700 text-white px-6 py-2 rounded font-semibold">
              Take Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tierConfig = store.getTierConfig();
  const allowedOptions = tierConfig?.allowedResultsOptions ?? ['screen'];
  const maturity = MATURITY_LEVELS[result.maturityLevel];
  const liveQuestions = store.getLiveQuestions();

  const catScores = store.categories
    .filter(cat => liveQuestions.some(q => q.categoryId === cat.id))
    .sort((a, b) => a.order - b.order)
    .map(cat => ({
      category: cat,
      ...getCategoryScore(result, cat.id, liveQuestions),
    }));

  const overallMax = catScores.reduce((sum, c) => sum + c.max, 0);
  const overallScore = catScores.reduce((sum, c) => sum + c.score, 0);
  const overallPct = overallMax > 0 ? overallScore / overallMax : 0;

  function handlePrint() {
    window.print();
  }

  function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    // Simulated email send
    setTimeout(() => setEmailSent(true), 600);
  }

  const MaturityBadge = ({ level }: { level: MaturityLevel }) => {
    const m = MATURITY_LEVELS[level];
    return (
      <span
        className="inline-block px-3 py-1 rounded font-semibold text-white text-sm"
        style={{ backgroundColor: m.color }}
      >
        {m.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      <Navbar store={store} />
      <main className="max-w-3xl mx-auto px-6 py-10 print:px-0">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-6 print:border-0 print:shadow-none">
          <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">AI Governance Maturity Report</h1>
              <p className="text-sm text-gray-500">{store.currentUser.name} · {new Date(result.completedAt).toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <MaturityBadge level={result.maturityLevel} />
          </div>

          {/* Overall Score */}
          <div className="border border-gray-100 rounded-lg p-5 mb-6 bg-gray-50">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-semibold text-gray-700">Overall Score</span>
              <span className="text-2xl font-bold">{overallScore}<span className="text-base text-gray-400 font-normal">/{overallMax}</span></span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${overallPct * 100}%`, backgroundColor: maturity.color }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-3 italic">"{maturity.description}"</p>
          </div>

          {/* Category Breakdown */}
          <h2 className="text-base font-semibold mb-4">Category Breakdown</h2>
          <div className="space-y-4">
            {catScores.map(({ category, score, max, pct }) => (
              <div key={category.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium" style={{ color: category.color }}>{category.name}</span>
                  <span className="text-gray-500">{score}/{max}</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct * 100}%`, backgroundColor: category.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 print:border-0">
          <h2 className="text-base font-semibold mb-4">Recommended Next Steps</h2>
          <div className="space-y-3">
            {catScores
              .sort((a, b) => a.pct - b.pct)
              .slice(0, 3)
              .map(({ category, pct }) => (
                <div key={category.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: category.color }} />
                  <div>
                    <p className="text-sm font-medium">{category.name}</p>
                    <p className="text-xs text-gray-500">
                      Current score: {Math.round(pct * 100)}% — Focus on strengthening {category.description.toLowerCase()}.
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Output Options */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 print:hidden">
          <h2 className="text-base font-semibold mb-4">Export Your Results</h2>
          <div className="flex flex-col gap-4">
            {allowedOptions.includes('pdf') && (
              <button
                onClick={handlePrint}
                className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium"
              >
                <span className="text-xl">📄</span>
                <span>Download as PDF</span>
                <span className="text-gray-400 text-xs ml-auto">Opens print dialog</span>
              </button>
            )}
            {allowedOptions.includes('email') && (
              <div>
                {emailSent ? (
                  <div className="flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 font-medium">
                    <span className="text-xl">✅</span>
                    Results sent to {emailAddress}
                  </div>
                ) : (
                  <form onSubmit={handleEmail} className="flex gap-2">
                    <input
                      type="email"
                      value={emailAddress}
                      onChange={e => setEmailAddress(e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Email address"
                      required
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-700 text-white rounded text-sm font-medium hover:bg-blue-800"
                    >
                      📧 Email Results
                    </button>
                  </form>
                )}
              </div>
            )}
            {!allowedOptions.includes('pdf') || !allowedOptions.includes('email') ? (
              <div className="border border-dashed border-gray-200 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Upgrade your membership to unlock PDF download and email options.</p>
                <button onClick={() => store.setPage('login')} className="text-sm text-blue-600 font-medium mt-2 hover:underline">
                  View plans →
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {/* Retake */}
        <div className="text-center mt-6 print:hidden">
          <button
            onClick={() => store.setPage('assessment')}
            className="text-sm text-blue-600 hover:underline"
          >
            Retake assessment
          </button>
        </div>
      </main>
    </div>
  );
}

function Navbar({ store }: { store: AppStore }) {
  return (
    <nav className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between print:hidden">
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
            <button onClick={store.logout} className="text-sm text-gray-400 hover:text-gray-700">Sign out</button>
          </div>
        )}
      </div>
    </nav>
  );
}
