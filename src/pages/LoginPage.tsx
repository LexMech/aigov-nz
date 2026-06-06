import { useState } from 'react';
import type { AppStore } from '../store';

type Mode = 'login' | 'trial';

export default function LoginPage({ store }: { store: AppStore }) {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [trialCode, setTrialCode] = useState('');
  const [error, setError] = useState('');

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (store.login(email, password)) {
      store.setPage('assessment');
    } else {
      setError('Invalid credentials. Try: admin@aigov.co.nz / demo123');
    }
  }

  function handleTrial(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email.');
      return;
    }
    if (store.redeemTrialCode(email, name, trialCode)) {
      store.setPage('assessment');
    } else {
      setError('Invalid trial code. Try: TRIAL2024, GOVPILOT, or FREESTARTER');
    }
  }

  const demoAccounts = [
    { label: 'Admin', email: 'admin@aigov.co.nz', password: 'demo123' },
    { label: 'Professional', email: 'pro@aigov.co.nz', password: 'demo123' },
    { label: 'Basic', email: 'basic@aigov.co.nz', password: 'demo123' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between">
        <button onClick={() => store.setPage('landing')} className="text-xl font-bold tracking-tight">
          AI<span className="text-blue-700">Gov</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium ml-2">Maturity</span>
        </button>
        <button onClick={() => store.setPage('landing')} className="text-sm text-gray-500 hover:text-gray-900">← Back</button>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
            {/* Mode tabs */}
            <div className="flex border border-gray-200 rounded-lg p-1 mb-6">
              <button
                onClick={() => { setMode('login'); setError(''); }}
                className={`flex-1 py-2 text-sm font-medium rounded transition-colors ${mode === 'login' ? 'bg-blue-700 text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setMode('trial'); setError(''); }}
                className={`flex-1 py-2 text-sm font-medium rounded transition-colors ${mode === 'trial' ? 'bg-blue-700 text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Trial Code
              </button>
            </div>

            {mode === 'login' ? (
              <>
                <h1 className="text-2xl font-bold mb-1">Sign in</h1>
                <p className="text-gray-500 text-sm mb-6">Access your AI governance assessment.</p>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>}
                  <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800 transition-colors">
                    Sign In
                  </button>
                </form>

                {/* Demo accounts */}
                <div className="mt-6 border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide font-semibold">Demo accounts (password: demo123)</p>
                  <div className="flex flex-col gap-1">
                    {demoAccounts.map(a => (
                      <button
                        key={a.email}
                        onClick={() => { setEmail(a.email); setPassword(a.password); }}
                        className="text-left text-xs text-gray-500 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50"
                      >
                        <span className="font-medium">{a.label}:</span> {a.email}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-1">Redeem trial code</h1>
                <p className="text-gray-500 text-sm mb-6">Have a trial code? Get immediate access to the assessment.</p>
                <form onSubmit={handleTrial} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Trial Code</label>
                    <input
                      type="text"
                      value={trialCode}
                      onChange={e => setTrialCode(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      placeholder="e.g. TRIAL2024"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">Try: TRIAL2024, GOVPILOT, FREESTARTER</p>
                  </div>
                  {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>}
                  <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800 transition-colors">
                    Redeem & Access Assessment
                  </button>
                </form>
              </>
            )}

            <div className="mt-4 text-center">
              <button onClick={() => store.setPage('privacy')} className="text-xs text-gray-400 hover:text-gray-600">Privacy Policy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
