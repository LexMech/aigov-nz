import type { AppStore } from '../store';

export default function LandingPage({ store }: { store: AppStore }) {
  const features = [
    {
      icon: '🏛️',
      title: 'Governance Structure',
      desc: 'Assess your policies, oversight mechanisms, and accountability frameworks.',
    },
    {
      icon: '⚠️',
      title: 'Risk Management',
      desc: 'Evaluate how your organisation identifies, assesses, and mitigates AI risks.',
    },
    {
      icon: '🔍',
      title: 'Transparency & Explainability',
      desc: 'Measure your AI systems\' interpretability and documentation maturity.',
    },
    {
      icon: '🗄️',
      title: 'Data Governance',
      desc: 'Examine data quality, privacy controls, and lineage practices.',
    },
    {
      icon: '⚖️',
      title: 'Ethics & Fairness',
      desc: 'Evaluate bias testing, equity considerations, and ethical AI principles.',
    },
    {
      icon: '📊',
      title: 'Actionable Results',
      desc: 'Get a detailed maturity profile with clear next steps for improvement.',
    },
  ];

  const tiers = [
    {
      name: 'Free Trial',
      price: 'Free',
      features: ['Full assessment access', 'On-screen results', 'Basic maturity score', 'Trial code required'],
      cta: 'Start Free Trial',
      action: () => store.setPage('login'),
      highlight: false,
    },
    {
      name: 'Professional',
      price: '$49/mo',
      features: ['Full assessment access', 'PDF download', 'Email results', 'Category breakdowns', 'Priority support'],
      cta: 'Get Started',
      action: () => store.setPage('login'),
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: ['Everything in Professional', 'Team assessments', 'Custom questions', 'API access', 'Dedicated support'],
      cta: 'Contact Us',
      action: () => store.setPage('login'),
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Nav */}
      <nav className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">AI<span className="text-blue-700">Gov</span></span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">Maturity</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => store.setPage('privacy')} className="text-sm text-gray-500 hover:text-gray-900">Privacy</button>
          <button onClick={() => store.setPage('login')} className="text-sm border border-gray-300 px-4 py-1.5 rounded hover:bg-gray-50">Sign in</button>
          <button onClick={() => store.setPage('login')} className="text-sm bg-blue-700 text-white px-4 py-1.5 rounded hover:bg-blue-800">Get started</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded mb-6">
          AI Governance Assessment
        </div>
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight mb-6 text-gray-900">
          Know exactly where your<br />
          <span className="text-blue-700">AI governance</span> stands.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          The AI Governance Maturity Assessment gives you a clear, structured picture of your organisation's AI governance capabilities — and a roadmap to strengthen them.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => store.setPage('login')}
            className="bg-blue-700 text-white px-8 py-3 rounded text-base font-semibold hover:bg-blue-800 transition-colors"
          >
            Take the Assessment
          </button>
          <button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-gray-600 px-6 py-3 text-base hover:text-gray-900"
          >
            Learn more ↓
          </button>
        </div>
      </section>

      {/* Maturity Scale Preview */}
      <section className="bg-gray-50 border-y border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-gray-500 text-center mb-6 font-semibold">The 5-Level Maturity Scale</p>
          <div className="grid grid-cols-5 gap-3">
            {[
              { level: '1', name: 'Initial', color: 'bg-red-100 border-red-300 text-red-800' },
              { level: '2', name: 'Developing', color: 'bg-orange-100 border-orange-300 text-orange-800' },
              { level: '3', name: 'Defined', color: 'bg-yellow-100 border-yellow-300 text-yellow-800' },
              { level: '4', name: 'Managed', color: 'bg-green-100 border-green-300 text-green-800' },
              { level: '5', name: 'Optimizing', color: 'bg-blue-100 border-blue-300 text-blue-800' },
            ].map(l => (
              <div key={l.level} className={`border rounded p-3 text-center ${l.color}`}>
                <div className="text-2xl font-bold">{l.level}</div>
                <div className="text-xs font-semibold mt-1">{l.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-2">What we assess</h2>
        <p className="text-gray-500 text-center mb-12">Five core domains of AI governance maturity.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => (
            <div key={f.title} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 border-y border-gray-200 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-2">Pricing</h2>
          <p className="text-gray-500 text-center mb-12">Choose the plan that fits your organisation.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map(t => (
              <div
                key={t.name}
                className={`rounded-lg p-6 border ${t.highlight ? 'border-blue-500 bg-white shadow-lg' : 'border-gray-200 bg-white'}`}
              >
                {t.highlight && (
                  <div className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded inline-block mb-3">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1">{t.name}</h3>
                <div className="text-3xl font-extrabold mb-4">{t.price}</div>
                <ul className="space-y-2 mb-6">
                  {t.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-500 mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={t.action}
                  className={`w-full py-2 rounded font-semibold text-sm transition-colors ${t.highlight ? 'bg-blue-700 text-white hover:bg-blue-800' : 'border border-gray-300 hover:bg-gray-50'}`}
                >
                  {t.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to assess your AI governance?</h2>
        <p className="text-gray-500 mb-8">Have a trial code? Start immediately at no cost.</p>
        <button
          onClick={() => store.setPage('login')}
          className="bg-blue-700 text-white px-8 py-3 rounded font-semibold hover:bg-blue-800 transition-colors"
        >
          Begin Assessment →
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-8 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-semibold text-gray-700">AIGov Maturity</div>
        <div className="flex gap-6">
          <button onClick={() => store.setPage('privacy')} className="hover:text-gray-900">Privacy Policy</button>
          <button onClick={() => store.setPage('login')} className="hover:text-gray-900">Sign In</button>
        </div>
        <div>© {new Date().getFullYear()} AIGov Maturity. All rights reserved.</div>
      </footer>
    </div>
  );
}
