import type { AppStore } from '../store';

const categories = [
  { icon: '🏛️', title: 'Governance & Accountability', desc: 'Policies, leadership roles, and organisational structures supporting responsible AI deployment.' },
  { icon: '⚖️', title: 'Bias, Fairness & Equity', desc: 'Testing protocols, diverse stakeholder input, and impact assessment frameworks.' },
  { icon: '🔍', title: 'Transparency & Explainability', desc: 'Documentation standards, disclosure practices, and decision-making clarity.' },
  { icon: '🎯', title: 'Reliability & Accuracy', desc: 'Continuous testing, performance monitoring, and benchmarking against standards.' },
  { icon: '🗺️', title: 'Risk Assessment & Mapping', desc: 'Systematic risk identification, stakeholder engagement, and mitigation planning.' },
  { icon: '🔒', title: 'Data Security & Privacy', desc: 'Privacy impact assessments, access controls, and comprehensive security measures.' },
];

const whyReasons = [
  { title: 'Regulatory Readiness', desc: 'Stay ahead of emerging AI regulations and demonstrate compliance with New Zealand\'s evolving AI governance requirements.' },
  { title: 'Risk Identification', desc: 'Uncover hidden vulnerabilities in your AI systems before they become costly problems or reputational risks.' },
  { title: 'Competitive Advantage', desc: 'Organisations with strong AI governance attract better partners, customers, and talent who value responsible AI practices.' },
  { title: 'Informed Investment', desc: 'Prioritise your governance investments where they\'ll have the greatest impact, guided by your specific maturity gaps.' },
];

const values = [
  { icon: '📊', title: 'Detailed Maturity Score', desc: 'Get a precise score for each of the six governance dimensions, so you know exactly where you stand.' },
  { icon: '🗺️', title: 'Prioritised Roadmap', desc: 'Receive a clear, actionable roadmap with recommendations ordered by impact and urgency.' },
  { icon: '📈', title: 'Benchmark Insights', desc: 'Understand how your governance maturity compares to New Zealand organisations in your sector.' },
  { icon: '📄', title: 'Exportable Report', desc: 'Download or email a professional PDF report to share with your leadership team and board.' },
  { icon: '🔄', title: 'Track Progress Over Time', desc: 'Reassess at any time and measure your improvement as you implement governance enhancements.' },
  { icon: '🛡️', title: 'NZ Context', desc: 'Built specifically for New Zealand organisations — aligned with local regulations, culture, and business practices.' },
];

const audiences = [
  { title: 'Chief Executive Officers', desc: 'Understand your organisation\'s AI risk exposure and governance posture at a strategic level.' },
  { title: 'Risk & Compliance Teams', desc: 'Identify gaps in AI governance frameworks and build a defensible compliance position.' },
  { title: 'Technology Leaders', desc: 'Align AI development and deployment practices with governance requirements and ethical standards.' },
  { title: 'Board Members', desc: 'Gain assurance that AI risks are being identified, monitored, and managed appropriately.' },
  { title: 'Legal & Privacy Officers', desc: 'Assess data handling, transparency, and accountability across AI tools and systems.' },
  { title: 'HR & People Leaders', desc: 'Evaluate bias, fairness, and equity considerations in AI-assisted people decisions.' },
];

const dashboardFeatures = [
  { title: 'Overall Maturity Score', desc: 'A single headline score showing your organisation\'s overall AI governance maturity level.' },
  { title: 'Category Breakdown', desc: 'Individual scores for each of the six governance dimensions with colour-coded maturity levels.' },
  { title: 'Visual Score Chart', desc: 'A radar chart giving you an at-a-glance view of your strengths and areas for improvement.' },
  { title: 'Priority Recommendations', desc: 'Targeted next steps ranked by impact, so you always know what to focus on first.' },
];

export default function LandingPage({ store }: { store: AppStore }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* Nav */}
      <nav className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">AI<span className="text-blue-700">Gov</span></span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">Maturity</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => store.setPage('pricing')} className="text-sm text-gray-500 hover:text-gray-900">Pricing</button>
          <button onClick={() => store.setPage('terms')} className="text-sm text-gray-500 hover:text-gray-900">Terms</button>
          <button onClick={() => store.setPage('privacy')} className="text-sm text-gray-500 hover:text-gray-900">Privacy</button>
          <button onClick={() => store.setPage('login')} className="text-sm border border-gray-300 px-4 py-1.5 rounded hover:bg-gray-50">Sign in</button>
          <button onClick={() => store.setPage('login')} className="text-sm bg-blue-700 text-white px-4 py-1.5 rounded hover:bg-blue-800">Get started</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded mb-6">
          AI Governance Assessment · New Zealand
        </div>
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight mb-6 text-gray-900">
          Know exactly where your<br />
          <span className="text-blue-700">AI governance</span> stands.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          A comprehensive evaluation tool designed to measure and strengthen AI governance practices across New Zealand organisations, ensuring responsible innovation and regulatory compliance.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => store.setPage('login')} className="bg-blue-700 text-white px-8 py-3 rounded text-base font-semibold hover:bg-blue-800 transition-colors">
            Begin Assessment Now
          </button>
          <button onClick={() => document.getElementById('what')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-600 px-6 py-3 text-base hover:text-gray-900">
            Learn more ↓
          </button>
        </div>
      </section>

      {/* Maturity Scale */}
      <section className="bg-gray-50 border-y border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-gray-500 text-center mb-6 font-semibold">The 5-Level Maturity Scale</p>
          <div className="grid grid-cols-5 gap-3">
            {[
              { level: '1', name: 'Initial', color: 'bg-red-100 border-red-300 text-red-800' },
              { level: '2', name: 'Developing', color: 'bg-orange-100 border-orange-300 text-orange-800' },
              { level: '3', name: 'Defined', color: 'bg-yellow-100 border-yellow-300 text-yellow-800' },
              { level: '4', name: 'Managed', color: 'bg-green-100 border-green-300 text-green-800' },
              { level: '5', name: 'Optimising', color: 'bg-blue-100 border-blue-300 text-blue-800' },
            ].map(l => (
              <div key={l.level} className={`border rounded p-3 text-center ${l.color}`}>
                <div className="text-2xl font-bold">{l.level}</div>
                <div className="text-xs font-semibold mt-1">{l.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is the Assessment */}
      <section id="what" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-3">What is the AI Governance Maturity Assessment?</h2>
        <p className="text-gray-500 mb-12 max-w-2xl">This powerful diagnostic tool evaluates your organisation's AI governance capabilities across six dimensions, providing actionable insights for improvement. Built specifically for the New Zealand context, it helps you understand where you stand and chart a path forward.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(f => (
            <div key={f.title} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Take This */}
      <section className="bg-gray-50 border-y border-gray-200 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-3">Why Take This Assessment?</h2>
          <p className="text-gray-500 mb-12 max-w-2xl">AI governance isn't just a compliance checkbox — it's a strategic capability. Here's why leading New Zealand organisations are assessing their maturity now.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyReasons.map(r => (
              <div key={r.title} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-blue-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{r.title}</h3>
                    <p className="text-sm text-gray-500">{r.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Value You'll Receive */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-3">The Value You'll Receive</h2>
        <p className="text-gray-500 mb-12 max-w-2xl">In 20 minutes, you'll walk away with everything you need to understand and improve your AI governance posture.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map(v => (
            <div key={v.title} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
              <div className="text-3xl mb-3">{v.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 border-y border-gray-200 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-3">How the Assessment Works</h2>
          <p className="text-gray-500 mb-12 max-w-2xl">Our streamlined process makes it easy to evaluate your AI governance maturity. Complete in under 20 minutes.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { n: '01', title: 'Complete the Questionnaire', desc: 'Answer targeted multiple-choice questions across six governance categories. Spend around 20 minutes to complete.' },
              { n: '02', title: 'Receive Your Maturity Score', desc: 'Get scored from Initial (1) to Optimising (5) for each dimension, based on recognised maturity models.' },
              { n: '03', title: 'Review Your Dashboard', desc: 'Access visualisations showing your AI governance overall posture with detailed category breakdowns.' },
              { n: '04', title: 'Implement Recommendations', desc: 'Follow prioritised guidance tailored to your maturity level to strengthen your governance framework.' },
            ].map(s => (
              <div key={s.n} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-3xl font-extrabold text-blue-100 mb-3">{s.n}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-3">Your Comprehensive Assessment Dashboard</h2>
        <p className="text-gray-500 mb-12 max-w-2xl">Once you complete the assessment, you'll receive a rich, interactive dashboard giving you a complete picture of your AI governance maturity.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {dashboardFeatures.map(d => (
            <div key={d.title} className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-700 mt-2 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{d.title}</h3>
                <p className="text-sm text-gray-500">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Score preview */}
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-4">Sample Results</p>
          <div className="space-y-3">
            {[
              { cat: 'Governance & Accountability', pct: 65, color: 'bg-blue-600' },
              { cat: 'Data Security & Privacy', pct: 45, color: 'bg-green-600' },
              { cat: 'Bias, Fairness & Equity', pct: 30, color: 'bg-purple-600' },
              { cat: 'Reliability & Accuracy', pct: 70, color: 'bg-yellow-500' },
              { cat: 'Risk Assessment & Mapping', pct: 50, color: 'bg-red-600' },
              { cat: 'Transparency & Explainability', pct: 80, color: 'bg-orange-500' },
            ].map(s => (
              <div key={s.cat} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-56 flex-shrink-0">{s.cat}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className={`${s.color} h-2 rounded-full`} style={{ width: `${s.pct}%` }} />
                </div>
                <span className="text-sm font-medium text-gray-700 w-10 text-right">{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Take This */}
      <section className="bg-gray-50 border-y border-gray-200 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-3">Who Should Take This Assessment?</h2>
          <p className="text-gray-500 mb-12 max-w-2xl">The AI Governance Maturity Assessment is designed for business leaders and professionals who are responsible for how AI is used in their organisation.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {audiences.map(a => (
              <div key={a.title} className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">{a.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-4">Begin Your AI Governance Journey</h2>
          <p className="text-blue-200 mb-8">Have a trial code? Start immediately at no cost.</p>
          <button onClick={() => store.setPage('login')} className="bg-white text-blue-700 px-8 py-3 rounded font-semibold hover:bg-blue-50 transition-colors">
            Begin Assessment Now →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-8 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-semibold text-gray-700">AIGov Maturity</div>
        <div className="flex gap-6">
          <button onClick={() => store.setPage('terms')} className="hover:text-gray-900">Terms &amp; Conditions</button>
          <button onClick={() => store.setPage('privacy')} className="hover:text-gray-900">Privacy Policy</button>
          <button onClick={() => store.setPage('login')} className="hover:text-gray-900">Sign In</button>
        </div>
        <div>© {new Date().getFullYear()} AIGov Maturity. All rights reserved.</div>
      </footer>
    </div>
  );
}
