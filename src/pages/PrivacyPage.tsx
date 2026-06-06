import type { AppStore } from '../store';

export default function PrivacyPage({ store }: { store: AppStore }) {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <button onClick={() => store.setPage('landing')} className="text-xl font-bold tracking-tight">
          AI<span className="text-blue-700">Gov</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium ml-2">Maturity</span>
        </button>
        <button onClick={() => store.setPage('landing')} className="text-sm text-gray-500 hover:text-gray-900">← Back</button>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: {new Date().toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-sm max-w-none space-y-8 text-gray-700 leading-relaxed">
          <Section title="1. Introduction">
            <p>
              AIGov Maturity ("we", "us", or "our") is committed to protecting the privacy of individuals who use our AI Governance Maturity Assessment platform. This Privacy Policy explains how we collect, use, disclose, and protect your personal information.
            </p>
            <p>
              We operate in accordance with the New Zealand Privacy Act 2020 and applicable data protection principles.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We may collect the following categories of information:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Account information:</strong> Name, email address, organisation name, and membership tier.</li>
              <li><strong>Assessment data:</strong> Your responses to the AI governance maturity questionnaire and the resulting scores.</li>
              <li><strong>Usage data:</strong> Pages visited, time spent, and interaction patterns within the platform.</li>
              <li><strong>Technical data:</strong> IP address, browser type, device information, and cookies.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide and operate the assessment platform.</li>
              <li>Generate and display your maturity assessment results.</li>
              <li>Send you your results by email when you request this.</li>
              <li>Manage your membership and access to paid features.</li>
              <li>Improve our questionnaire and platform.</li>
              <li>Respond to support enquiries.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </Section>

          <Section title="4. Membership and Trial Codes">
            <p>
              When you redeem a trial code, we collect your name and email address to create a temporary account. Trial access allows you to complete one assessment and view your results on screen. We may contact you once via the provided email address to offer a paid membership.
            </p>
            <p>
              Paid membership data is processed through our payment provider. We do not store your full payment card details.
            </p>
          </Section>

          <Section title="5. Assessment Results">
            <p>
              Your assessment responses and results are stored securely and associated with your account. You control how results are shared — on screen, as a downloaded PDF, or by email — subject to your membership level permissions.
            </p>
            <p>
              We may use anonymised and aggregated assessment data to produce industry benchmarks and reports. Individual responses are never disclosed without your consent.
            </p>
          </Section>

          <Section title="6. Data Sharing">
            <p>We do not sell your personal information. We may share data with:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Service providers:</strong> Hosting, email delivery, and analytics providers acting on our behalf under appropriate data processing agreements.</li>
              <li><strong>Legal compliance:</strong> Where required by law or regulation.</li>
            </ul>
          </Section>

          <Section title="7. Cookies">
            <p>
              We use essential cookies to maintain your session and remember your preferences. We may also use analytics cookies to understand how the platform is used. You can manage cookie preferences through your browser settings.
            </p>
          </Section>

          <Section title="8. Data Retention">
            <p>
              Account and assessment data is retained for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time by contacting us.
            </p>
          </Section>

          <Section title="9. Your Rights">
            <p>Under the New Zealand Privacy Act 2020, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access personal information we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your data.</li>
              <li>Opt out of marketing communications.</li>
              <li>Make a complaint to the Office of the Privacy Commissioner.</li>
            </ul>
          </Section>

          <Section title="10. Security">
            <p>
              We use industry-standard security measures to protect your information, including encryption in transit and at rest, access controls, and regular security reviews. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>
              For privacy enquiries, access requests, or to exercise your rights, please contact:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2">
              <p className="font-medium">AIGov Maturity</p>
              <p>Privacy Officer</p>
              <p className="text-blue-700">privacy@aigov.co.nz</p>
            </div>
          </Section>
        </div>
      </main>

      <footer className="border-t border-gray-200 px-6 py-6 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} AIGov Maturity. All rights reserved.
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
