import type { AppStore } from '../store';

const tiers = [
  {
    name: 'Free Trial',
    price: 'Free',
    sub: 'Trial code required',
    features: [
      'Full assessment access',
      'On-screen results',
      'Basic maturity score',
      'Category breakdowns',
    ],
    notIncluded: ['PDF download', 'Email results', 'Priority support'],
    cta: 'Start Free Trial',
    highlight: false,
  },
  {
    name: 'Professional',
    price: '$49',
    sub: 'per month',
    features: [
      'Full assessment access',
      'On-screen results',
      'Category breakdowns',
      'PDF download',
      'Email results',
      'Priority support',
    ],
    notIncluded: [],
    cta: 'Get Started',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    sub: 'contact us for pricing',
    features: [
      'Everything in Professional',
      'Team / multi-user assessments',
      'Custom question sets',
      'API access',
      'Dedicated account support',
    ],
    notIncluded: [],
    cta: 'Contact Us',
    highlight: false,
  },
];

const faqs = [
  {
    q: 'What is a trial code?',
    a: 'Trial codes give you free access to the full assessment. Use code TRIAL2024, GOVPILOT, or FREESTARTER at the login screen.',
  },
  {
    q: 'Can I upgrade later?',
    a: 'Yes. You can upgrade your plan at any time to unlock PDF downloads, email delivery, and other features.',
  },
  {
    q: 'How long does the assessment take?',
    a: 'Most users complete the assessment in 15–20 minutes. You can save progress and return at any time.',
  },
  {
    q: 'Is my data kept confidential?',
    a: 'Yes. Your results are stored securely and are not shared with third parties. See our Privacy Policy for details.',
  },
  {
    q: 'What is included in the Enterprise plan?',
    a: 'Enterprise plans are tailored to your organisation. Contact us at info@aigov.co.nz to discuss your requirements.',
  },
];

export default function PricingPage({ store }: { store: AppStore }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* Nav */}
      <nav className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <button onClick={() => store.setPage('landing')} className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">AI<span className="text-blue-700">Gov</span></span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">Maturity</span>
        </button>
        <div className="flex items-center gap-4">
          <button onClick={() => store.setPage('landing')} className="text-sm text-gray-500 hover:text-gray-900">Home</button>
          <button onClick={() => store.setPage('terms')} className="text-sm text-gray-500 hover:text-gray-900">Terms</button>
          <button onClick={() => store.setPage('privacy')} className="text-sm text-gray-500 hover:text-gray-900">Privacy</button>
          <button onClick={() => store.setPage('login')} className="text-sm border border-gray-300 px-4 py-1.5 rounded hover:bg-gray-50">Sign in</button>
          <button onClick={() => store.setPage('login')} className="text-sm bg-blue-700 text-white px-4 py-1.5 rounded hover:bg-blue-800">Get started</button>
        </div>
      </nav>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Simple, transparent pricing</h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Start free with a trial code, or choose a plan that matches your organisation's needs.
        </p>
      </section>

      {/* Tiers */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map(t => (
            <div key={t.name} className={`rounded-lg border p-6 flex flex-col ${t.highlight ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}>
              {t.highlight && (
                <div className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded inline-block mb-3 self-start">Most Popular</div>
              )}
              <h2 className="text-xl font-bold mb-1">{t.name}</h2>
              <div className="mb-1">
                <span className="text-4xl font-extrabold">{t.price}</span>
              </div>
              <p className="text-sm text-gray-400 mb-6">{t.sub}</p>
              <ul className="space-y-2 mb-4 flex-1">
                {t.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span> {f}
                  </li>
                ))}
                {t.notIncluded.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="mt-0.5 flex-shrink-0">–</span> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => store.setPage('login')}
                className={`w-full py-2.5 rounded font-semibold text-sm transition-colors mt-4 ${t.highlight ? 'bg-blue-700 text-white hover:bg-blue-800' : 'border border-gray-300 hover:bg-gray-50'}`}
              >
                {t.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 border-t border-gray-200 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-10">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map(f => (
              <div key={f.q} className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold text-gray-900 mb-2">{f.q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
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
