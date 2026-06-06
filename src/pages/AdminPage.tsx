import { useState } from 'react';
import type { AppStore } from '../store';
import { DEFAULT_TIER_CONFIGS } from '../types';
import type { Question, Category, QuestionOption, MembershipTier, ResultsOption } from '../types';

type AdminTab = 'questions' | 'categories' | 'tier_config';

function genId() {
  return `id_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export default function AdminPage({ store }: { store: AppStore }) {
  const [tab, setTab] = useState<AdminTab>('questions');

  if (!store.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p className="text-gray-500 mb-4">Admin access required.</p>
          <button onClick={() => store.setPage('landing')} className="text-blue-600 hover:underline">Go home</button>
        </div>
      </div>
    );
  }

  const tabs: { id: AdminTab; label: string }[] = [
    { id: 'questions', label: 'Questions' },
    { id: 'categories', label: 'Categories' },
    { id: 'tier_config', label: 'Membership Tiers' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between">
        <button onClick={() => store.setPage('landing')} className="text-xl font-bold tracking-tight">
          AI<span className="text-blue-700">Gov</span>
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-medium ml-2">Admin</span>
        </button>
        <div className="flex items-center gap-4">
          <button onClick={() => store.setPage('assessment')} className="text-sm text-gray-500 hover:text-gray-900">View Assessment</button>
          <button onClick={store.logout} className="text-sm text-gray-400 hover:text-gray-700">Sign out</button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                tab === t.id ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'questions' && <QuestionsManager store={store} />}
        {tab === 'categories' && <CategoriesManager store={store} />}
        {tab === 'tier_config' && <TierConfigManager store={store} />}
      </div>
    </div>
  );
}

/* ─── Questions Manager ─── */
function QuestionsManager({ store }: { store: AppStore }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);

  const sorted = [...store.questions].sort((a, b) => {
    const catA = store.categories.find(c => c.id === a.categoryId)?.order ?? 0;
    const catB = store.categories.find(c => c.id === b.categoryId)?.order ?? 0;
    if (catA !== catB) return catA - catB;
    return a.order - b.order;
  });

  function toggleLive(id: string) {
    store.setQuestions(prev => prev.map(q => q.id === id ? { ...q, isLive: !q.isLive } : q));
  }

  function deleteQuestion(id: string) {
    if (window.confirm('Delete this question?')) {
      store.setQuestions(prev => prev.filter(q => q.id !== id));
    }
  }

  function moveQuestion(id: string, dir: -1 | 1) {
    store.setQuestions(prev => {
      const q = prev.find(x => x.id === id)!;
      const siblings = prev.filter(x => x.categoryId === q.categoryId).sort((a, b) => a.order - b.order);
      const idx = siblings.findIndex(x => x.id === id);
      const swap = siblings[idx + dir];
      if (!swap) return prev;
      return prev.map(x => {
        if (x.id === id) return { ...x, order: swap.order };
        if (x.id === swap.id) return { ...x, order: q.order };
        return x;
      });
    });
  }

  const groupedByCategory = store.categories
    .sort((a, b) => a.order - b.order)
    .map(cat => ({
      category: cat,
      questions: sorted.filter(q => q.categoryId === cat.id),
    }))
    .filter(g => g.questions.length > 0 || true);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">{store.questions.length} questions total · {store.questions.filter(q => q.isLive).length} live</p>
        <button
          onClick={() => setShowNew(true)}
          className="bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-800"
        >
          + Add Question
        </button>
      </div>

      {showNew && (
        <QuestionForm
          categories={store.categories}
          onSave={(q) => { store.setQuestions(prev => [...prev, q]); setShowNew(false); }}
          onCancel={() => setShowNew(false)}
        />
      )}

      {groupedByCategory.map(({ category, questions }) => (
        <div key={category.id} className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{category.name}</h3>
            <span className="text-xs text-gray-400">({questions.length})</span>
          </div>

          {questions.length === 0 ? (
            <p className="text-xs text-gray-400 ml-5 italic">No questions in this category yet.</p>
          ) : (
            <div className="space-y-2">
              {questions.map((q, qi) => (
                <div key={q.id}>
                  {editingId === q.id ? (
                    <QuestionForm
                      initial={q}
                      categories={store.categories}
                      onSave={(updated) => {
                        store.setQuestions(prev => prev.map(x => x.id === q.id ? updated : x));
                        setEditingId(null);
                      }}
                      onCancel={() => setEditingId(null)}
                    />
                  ) : (
                    <div className={`border rounded-lg p-4 bg-white flex gap-3 items-start ${!q.isLive ? 'opacity-60 border-dashed' : 'border-gray-200'}`}>
                      <div className="flex flex-col gap-1">
                        <button onClick={() => moveQuestion(q.id, -1)} disabled={qi === 0} className="text-gray-300 hover:text-gray-600 disabled:opacity-20 text-xs">▲</button>
                        <button onClick={() => moveQuestion(q.id, 1)} disabled={qi === questions.length - 1} className="text-gray-300 hover:text-gray-600 disabled:opacity-20 text-xs">▼</button>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-gray-400 font-mono">#{q.order}</span>
                          {!q.isLive && <span className="text-xs bg-gray-100 text-gray-500 px-1.5 rounded">Hidden</span>}
                          {q.required && <span className="text-xs bg-red-50 text-red-500 px-1.5 rounded">Required</span>}
                        </div>
                        <p className="text-sm font-medium text-gray-900">{q.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{q.options.length} options · {q.type}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => toggleLive(q.id)}
                          className={`text-xs px-2 py-1 rounded border font-medium transition-colors ${
                            q.isLive
                              ? 'border-green-300 text-green-700 bg-green-50 hover:bg-green-100'
                              : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                          title={q.isLive ? 'Click to hide from assessment' : 'Click to show in assessment'}
                        >
                          {q.isLive ? '● Live' : '○ Hidden'}
                        </button>
                        <button onClick={() => setEditingId(q.id)} className="text-xs text-blue-600 hover:underline">Edit</button>
                        <button onClick={() => deleteQuestion(q.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function QuestionForm({
  initial,
  categories,
  onSave,
  onCancel,
}: {
  initial?: Question;
  categories: Category[];
  onSave: (q: Question) => void;
  onCancel: () => void;
}) {
  const [text, setText] = useState(initial?.text ?? '');
  const [helpText, setHelpText] = useState(initial?.helpText ?? '');
  const [categoryId, setCategoryId] = useState(initial?.categoryId ?? categories[0]?.id ?? '');
  const [isLive, setIsLive] = useState(initial?.isLive ?? true);
  const [required, setRequired] = useState(initial?.required ?? true);
  const [options, setOptions] = useState<QuestionOption[]>(
    initial?.options ?? [
      { id: genId(), label: '', value: 'opt1', score: 0 },
      { id: genId(), label: '', value: 'opt2', score: 1 },
    ]
  );

  function addOption() {
    setOptions(prev => [...prev, { id: genId(), label: '', value: `opt${prev.length + 1}`, score: prev.length }]);
  }

  function updateOption(id: string, field: keyof QuestionOption, value: string | number) {
    setOptions(prev => prev.map(o => o.id === id ? { ...o, [field]: value } : o));
  }

  function removeOption(id: string) {
    setOptions(prev => prev.filter(o => o.id !== id));
  }

  function save() {
    if (!text.trim() || !categoryId) return;
    const q: Question = {
      id: initial?.id ?? genId(),
      text: text.trim(),
      helpText: helpText.trim() || undefined,
      categoryId,
      type: 'single_choice',
      order: initial?.order ?? 99,
      isLive,
      required,
      options,
    };
    onSave(q);
  }

  return (
    <div className="border border-blue-200 rounded-xl p-5 bg-blue-50 mb-4">
      <h3 className="font-semibold text-sm mb-4 text-blue-800">{initial ? 'Edit Question' : 'New Question'}</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Question Text *</label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows={2}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Category *</label>
            <select
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
            >
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Help Text</label>
            <input
              value={helpText}
              onChange={e => setHelpText(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
              placeholder="Optional hint for respondents"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isLive} onChange={e => setIsLive(e.target.checked)} className="accent-blue-600" />
            Live (visible in assessment)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={required} onChange={e => setRequired(e.target.checked)} className="accent-blue-600" />
            Required
          </label>
        </div>

        {/* Options */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Answer Options</label>
          <div className="space-y-2">
            {options.map((opt, i) => (
              <div key={opt.id} className="flex gap-2 items-center">
                <span className="text-xs text-gray-400 w-5 text-right">{i + 1}.</span>
                <input
                  value={opt.label}
                  onChange={e => updateOption(opt.id, 'label', e.target.value)}
                  placeholder="Option label"
                  className="flex-1 border border-gray-300 rounded px-2 py-1.5 text-sm"
                />
                <input
                  type="number"
                  value={opt.score ?? 0}
                  onChange={e => updateOption(opt.id, 'score', parseInt(e.target.value) || 0)}
                  className="w-16 border border-gray-300 rounded px-2 py-1.5 text-sm text-center"
                  title="Score"
                  min={0}
                />
                <button onClick={() => removeOption(opt.id)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
              </div>
            ))}
            <button onClick={addOption} className="text-xs text-blue-600 hover:underline">+ Add option</button>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={save} className="px-4 py-1.5 bg-blue-700 text-white rounded text-sm font-medium hover:bg-blue-800">
            Save Question
          </button>
          <button onClick={onCancel} className="px-4 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Categories Manager ─── */
function CategoriesManager({ store }: { store: AppStore }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const sorted = [...store.categories].sort((a, b) => a.order - b.order);

  function deleteCategory(id: string) {
    const hasQuestions = store.questions.some(q => q.categoryId === id);
    if (hasQuestions) {
      alert('Cannot delete a category that has questions. Move or delete those questions first.');
      return;
    }
    if (window.confirm('Delete this category?')) {
      store.setCategories(prev => prev.filter(c => c.id !== id));
    }
  }

  function move(id: string, dir: -1 | 1) {
    store.setCategories(prev => {
      const arr = [...prev].sort((a, b) => a.order - b.order);
      const idx = arr.findIndex(c => c.id === id);
      const swap = arr[idx + dir];
      if (!swap) return prev;
      return prev.map(c => {
        if (c.id === id) return { ...c, order: swap.order };
        if (c.id === swap.id) return { ...c, order: arr[idx].order };
        return c;
      });
    });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">{store.categories.length} categories</p>
        <button
          onClick={() => setShowNew(true)}
          className="bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-800"
        >
          + Add Category
        </button>
      </div>

      {showNew && (
        <CategoryForm
          onSave={c => { store.setCategories(prev => [...prev, c]); setShowNew(false); }}
          onCancel={() => setShowNew(false)}
          nextOrder={Math.max(...store.categories.map(c => c.order), 0) + 1}
        />
      )}

      <div className="space-y-2">
        {sorted.map((cat, i) => (
          <div key={cat.id}>
            {editingId === cat.id ? (
              <CategoryForm
                initial={cat}
                nextOrder={cat.order}
                onSave={updated => { store.setCategories(prev => prev.map(c => c.id === cat.id ? updated : c)); setEditingId(null); }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="border border-gray-200 rounded-lg p-4 bg-white flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <button onClick={() => move(cat.id, -1)} disabled={i === 0} className="text-gray-300 hover:text-gray-600 disabled:opacity-20 text-xs">▲</button>
                  <button onClick={() => move(cat.id, 1)} disabled={i === sorted.length - 1} className="text-gray-300 hover:text-gray-600 disabled:opacity-20 text-xs">▼</button>
                </div>
                <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                <div className="flex-1">
                  <p className="font-medium text-sm">{cat.name}</p>
                  <p className="text-xs text-gray-500">{cat.description} · {store.questions.filter(q => q.categoryId === cat.id).length} questions</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingId(cat.id)} className="text-xs text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => deleteCategory(cat.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryForm({
  initial,
  nextOrder,
  onSave,
  onCancel,
}: {
  initial?: Category;
  nextOrder: number;
  onSave: (c: Category) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [color, setColor] = useState(initial?.color ?? '#2563eb');

  function save() {
    if (!name.trim()) return;
    onSave({
      id: initial?.id ?? name.toLowerCase().replace(/\s+/g, '_'),
      name: name.trim(),
      description: description.trim(),
      color,
      order: nextOrder,
    });
  }

  return (
    <div className="border border-blue-200 rounded-xl p-4 bg-blue-50 mb-3">
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-medium mb-1">Name *</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Colour</label>
          <input type="color" value={color} onChange={e => setColor(e.target.value)} className="h-9 w-full border border-gray-300 rounded cursor-pointer" />
        </div>
      </div>
      <div className="mb-3">
        <label className="block text-xs font-medium mb-1">Description</label>
        <input value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm" />
      </div>
      <div className="flex gap-2">
        <button onClick={save} className="px-4 py-1.5 bg-blue-700 text-white rounded text-sm font-medium hover:bg-blue-800">Save</button>
        <button onClick={onCancel} className="px-4 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50">Cancel</button>
      </div>
    </div>
  );
}

/* ─── Tier Config Manager ─── */
function TierConfigManager({ store }: { store: AppStore }) {
  const TIERS: MembershipTier[] = ['free_trial', 'basic', 'professional', 'enterprise'];
  const ALL_OPTIONS: ResultsOption[] = ['screen', 'pdf', 'email'];
  const OPTION_LABELS: Record<ResultsOption, string> = { screen: 'On-screen display', pdf: 'PDF download', email: 'Email results' };

  function toggleOption(tier: MembershipTier, option: ResultsOption) {
    store.setTierConfigs(prev => prev.map(c => {
      if (c.tier !== tier) return c;
      const has = c.allowedResultsOptions.includes(option);
      return {
        ...c,
        allowedResultsOptions: has
          ? c.allowedResultsOptions.filter(o => o !== option)
          : [...c.allowedResultsOptions, option],
      };
    }));
  }

  function toggleAccess(tier: MembershipTier) {
    store.setTierConfigs(prev => prev.map(c =>
      c.tier === tier ? { ...c, canAccessAssessment: !c.canAccessAssessment } : c
    ));
  }

  function reset() {
    store.setTierConfigs(DEFAULT_TIER_CONFIGS);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">Configure what each membership tier can access.</p>
        <button onClick={reset} className="text-xs text-gray-500 border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">
          Reset to defaults
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Tier</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-700">Assessment Access</th>
              {ALL_OPTIONS.map(o => (
                <th key={o} className="text-center px-4 py-3 font-semibold text-gray-700">{OPTION_LABELS[o]}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {TIERS.map(tier => {
              const config = store.tierConfigs.find(c => c.tier === tier);
              if (!config) return null;
              return (
                <tr key={tier} className="bg-white hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="font-medium capitalize">{tier.replace('_', ' ')}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleAccess(tier)}
                      className={`w-6 h-6 rounded border-2 transition-colors ${
                        config.canAccessAssessment ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                      }`}
                    >
                      {config.canAccessAssessment && <span className="text-white text-xs">✓</span>}
                    </button>
                  </td>
                  {ALL_OPTIONS.map(opt => (
                    <td key={opt} className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleOption(tier, opt)}
                        className={`w-6 h-6 rounded border-2 transition-colors ${
                          config.allowedResultsOptions.includes(opt) ? 'bg-green-500 border-green-500' : 'border-gray-300'
                        }`}
                      >
                        {config.allowedResultsOptions.includes(opt) && <span className="text-white text-xs">✓</span>}
                      </button>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 mt-3">Changes take effect immediately for all sessions.</p>
    </div>
  );
}
