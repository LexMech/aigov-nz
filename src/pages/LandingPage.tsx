import type { AppStore } from '../store';

const categories = [
  {
    title: 'Governance & Accountability',
    desc: 'Policies, leadership roles, and organisational structures supporting responsible AI deployment.',
  },
  {
    title: 'Bias, Fairness & Equity',
    desc: 'Testing protocols, diverse stakeholder input, and impact assessment frameworks.',
  },
  {
    title: 'Transparency & Explainability',
    desc: 'Documentation standards, disclosure practices, and decision-making clarity.',
  },
  {
    title: 'Reliability & Accuracy',
    desc: 'Continuous testing, performance monitoring, and benchmarking against standards.',
  },
  {
    title: 'Risk Assessment & Mapping',
    desc: 'Systematic risk identification, stakeholder engagement, and mitigation planning.',
  },
  {
    title: 'Data Security & Privacy',
    desc: 'Privacy impact assessments, access controls, and comprehensive security measures.',
  },
];

const steps = [
  { n: '01', title: 'Complete the Questionnaire', desc: 'Answer targeted multiple-choice questions across six governance categories. Spend 20 minutes to complete.' },
  { n: '02', title: 'Receive Your Maturity Score', desc: 'Get scored from Initial (1) to Optimising (5) for each dimension, based on recognised maturity models.' },
  { n: '03', title: 'Review Your Dashboard', desc: 'Access visualisations showing your AI governance overall posture with detailed category breakdowns.' },
  { n: '04', title: 'Implement Recommendations', desc: 'Follow prioritised guidance tailored to your maturity level to strengthen your governance framework.' },
];

const tiers = [
  {
    name: 'Free Trial',
    price: 'Free',
    features: ['Full assessment access', 'On-screen results', 'Basic maturity score', 'Trial code required'],
    cta: 'Start Free Trial',
    highlight: false,
  },
  {
    name: 'Professional',
    price: '$49/mo',
    features: ['Full assessment access', 'PDF download', 'Email results', 'Category breakdowns', 'Priority support'],
    cta: 'Get Started',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Everything in Professional', 'Team assessments', 'Custom questions', 'API access', 'Dedicated support'],
    cta: 'Contact Us',
    highlight: false,
  },
];

export default function LandingPage({ store }: { store: AppStore }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* Nav */}
      <nav className="px-8 py-5 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="font-serif text-2xl font-semibold tracking-tight">
            AI<span style={{ color: '#3B52E0' }}>Gov</span>
          </span>
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-sans font-medium ml-1">Maturity</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => store.setPage('terms')} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Terms</button>
          <button onClick={() => store.setPage('privacy')} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Privacy</button>
          <button
            onClick={() => store.setPage('login')}
            className="text-sm font-medium px-5 py-2 rounded-sm transition-colors text-white"
            style={{ backgroundColor: '#3B52E0' }}
          >
            Sign in
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative px-8 py-28"
        style={{
          backgroundImage: `radial-gradient(circle at 70% 50%, #e8ecfa 0%, transparent 60%), url("data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23c7cef5' stroke-width='1'%3E%3Ccircle cx='600' cy='150' r='4'/%3E%3Ccircle cx='650' cy='80' r='3'/%3E%3Ccircle cx='720' cy='200' r='4'/%3E%3Ccircle cx='560' cy='230' r='3'/%3E%3Ccircle cx='680' cy='280' r='4'/%3E%3Ccircle cx='740' cy='120' r='3'/%3E%3Cline x1='600' y1='150' x2='650' y2='80'/%3E%3Cline x1='650' y1='80' x2='720' y2='200'/%3E%3Cline x1='600' y1='150' x2='560' y2='230'/%3E%3Cline x1='720' y1='200' x2='680' y2='280'/%3E%3Cline x1='650' y1='80' x2='740' y2='120'/%3E%3Cline x1='740' y1='120' x2='720' y2='200'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right center',
        }}
      >
        <div className="max-w-2xl">
          <h1 className="font-serif text-5xl font-semibold leading-tight mb-6 text-gray-900">
            NZ AI Governance<br />Maturity Assessment
          </h1>
          <p className="text-lg text-gray-500 font-sans leading-relaxed mb-10 max-w-xl">
            A comprehensive evaluation tool designed to measure and strengthen AI governance practices across New Zealand organisations, ensuring responsible innovation and regulatory compliance.
          </p>
          <button
            onClick={() => store.setPage('login')}
            className="text-sm font-medium px-7 py-3 rounded-sm text-white transition-colors"
            style={{ backgroundColor: '#3B52E0' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2D40C0')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#3B52E0')}
          >
            Begin Assessment
          </button>
        </div>
      </section>

      {/* What is it */}
      <section className="px-8 py-24 max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl font-semibold mb-4 text-gray-900">
          What is the AI Governance Maturity Assessment?
        </h2>
        <p className="text-gray-500 mb-14 max-w-2xl leading-relaxed">
          This powerful diagnostic tool evaluates your organisation's AI governance capabilities across six dimensions, providing actionable insights for improvement. Built specifically for the New Zealand context, it helps you understand where you stand and chart a path forward.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {categories.map(c => (
            <div key={c.title}>
              <h3 className="font-sans font-semibold text-gray-900 mb-2">{c.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Maturity Scale */}
      <section className="bg-gray-50 border-y border-gray-100 py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-8 font-medium">The 5-Level Maturity Scale</p>
          <div className="grid grid-cols-5 gap-4">
            {[
              { level: '1', name: 'Initial', color: '#dc2626' },
              { level: '2', name: 'Developing', color: '#ea580c' },
              { level: '3', name: 'Defined', color: '#ca8a04' },
              { level: '4', name: 'Managed', color: '#16a34a' },
              { level: '5', name: 'Optimising', color: '#3B52E0' },
            ].map(l => (
              <div key={l.level} className="text-center py-4">
                <div className="text-3xl font-serif font-semibold mb-1" style={{ color: l.color }}>{l.level}</div>
                <div className="text-xs font-sans text-gray-500 font-medium">{l.name}</div>
                <div className="mt-2 h-0.5 rounded" style={{ backgroundColor: l.color, opacity: 0.3 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-8 py-24 max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl font-semibold mb-4 text-gray-900">How the Assessment Works</h2>
        <p className="text-gray-500 mb-14 max-w-2xl leading-relaxed">
          Our streamlined process makes it easy to evaluate your AI governance maturity. The assessment adapts to your responses, ensuring relevant questions while maintaining comprehensive coverage of critical governance areas.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {steps.map(s => (
            <div key={s.n}>
              <div className="border-t border-gray-200 mb-4" />
              <div className="text-xs font-sans text-gray-400 mb-2 font-medium">{s.n}</div>
              <h3 className="font-sans font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 border-y border-gray-100 py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-4xl font-semibold mb-4 text-gray-900">Pricing</h2>
          <p className="text-gray-500 mb-14 leading-relaxed">Choose the plan that fits your organisation.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map(t => (
              <div
                key={t.name}
                className="bg-white p-8 border"
                style={{ borderColor: t.highlight ? '#3B52E0' : '#e5e7eb' }}
              >
                {t.highlight && (
                  <div className="text-xs font-medium mb-4 font-sans" style={{ color: '#3B52E0' }}>Most Popular</div>
                )}
                <h3 className="font-serif text-2xl font-semibold mb-1 text-gray-900">{t.name}</h3>
                <div className="font-serif text-4xl font-semibold mb-6 text-gray-900">{t.price}</div>
                <ul className="space-y-2 mb-8">
                  {t.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-500 font-sans">
                      <span style={{ color: '#3B52E0' }} className="mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => store.setPage('login')}
                  className="w-full py-2.5 text-sm font-medium font-sans transition-colors"
                  style={t.highlight
                    ? { backgroundColor: '#3B52E0', color: 'white' }
                    : { border: '1px solid #d1d5db', color: '#374151', backgroundColor: 'white' }
                  }
                >
                  {t.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 max-w-3xl mx-auto">
        <h2 className="font-serif text-4xl font-semibold mb-4 text-gray-900">Begin Your AI Governance Journey</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">Have a trial code? Start immediately at no cost.</p>
        <button
          onClick={() => store.setPage('login')}
          className="text-sm font-medium px-7 py-3 text-white transition-colors font-sans"
          style={{ backgroundColor: '#3B52E0' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2D40C0')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#3B52E0')}
        >
          Begin Assessment Now →
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400 font-sans">
        <div className="font-serif text-gray-700 font-semibold text-base">AIGov Maturity</div>
        <div className="flex gap-6">
          <button onClick={() => store.setPage('terms')} className="hover:text-gray-700 transition-colors">Terms &amp; Conditions</button>
          <button onClick={() => store.setPage('privacy')} className="hover:text-gray-700 transition-colors">Privacy Policy</button>
          <button onClick={() => store.setPage('login')} className="hover:text-gray-700 transition-colors">Sign In</button>
        </div>
        <div>© {new Date().getFullYear()} AIGov Maturity</div>
      </footer>
    </div>
  );
}
