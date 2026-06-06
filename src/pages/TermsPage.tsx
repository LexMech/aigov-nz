import type { AppStore } from '../store';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export default function TermsPage({ store }: { store: AppStore }) {
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
        <h1 className="text-3xl font-bold mb-2">Terms and Conditions</h1>
        <p className="text-sm text-gray-500 mb-10">Effective Date: January 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-gray-700 leading-relaxed">
          <p>These Terms and Conditions govern your use of the AiGovNZ website and AI Governance Maturity Assessment (the Services). By accessing or using these Services, you agree to be bound by these terms. If you do not agree, do not use the Services.</p>

          <Section title="1. Service Access and Eligibility">
            <p>These Services are available exclusively to business customers. By using these Services, you confirm that you are a business entity or acting on behalf of a business entity authorised to enter into contracts.</p>
            <p>As a business customer, you agree to contract out of the Consumer Guarantees Act 2023 and the Fair Trading Act 1986 to the maximum extent permitted under New Zealand law.</p>
          </Section>

          <Section title="2. Disclaimer of Warranties">
            <p>These Services do not constitute legal advice. Nothing contained in these Services should be construed as legal or professional advice. Please consult with qualified professionals regarding your specific circumstances.</p>
            <p>We make no warranties whatsoever regarding these Services. All warranties are excluded, including (but not limited to):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Accuracy, completeness, or reliability of any information or assessment results</li>
              <li>Availability</li>
            </ul>
            <p>These Services are provided "as is" and "as available" without any guarantees.</p>
          </Section>

          <Section title="3. Limitation of Liability">
            <p>To the maximum extent permitted by law, we exclude all liability for any losses, damages, or claims arising from your use of or inability to use these Services, including but not limited to indirect, incidental, special, consequential, or punitive damages. For avoidance of doubt, liability for loss of profits, loss of data, and reputational damage is excluded.</p>
            <p>The benefit of this clause applies to the Company, as well as its employees, staff, officers and advisors.</p>
            <p>Where liability cannot be excluded by law, the maximum liability of the Company (and any of its employees, staff, officers or advisors) is limited to the amount you paid for the Services in the last 12 months.</p>
            <p>This limitation applies to all claims, whether arising in contract, tort, negligence, or otherwise.</p>
          </Section>

          <Section title="4. Intellectual Property">
            <p>All copyright, design rights, and other intellectual property rights in the materials (including the AI Maturity Assessment), website design, and content are owned by the Company.</p>
            <p>You are granted a limited, non-exclusive, non-transferable licence to access and use these Services for your internal business purposes only. You may not:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Reproduce, modify, distribute, or create derivative works from any materials without our prior written consent</li>
              <li>Copy or extract material from the website or the AI Maturity Assessment</li>
              <li>Use the website or Services to create any competing product or assessment tool</li>
              <li>Reverse-engineer, disassemble, or attempt to derive the underlying methodology, algorithms, or assessment framework</li>
            </ul>
            <p>We really do appreciate your feedback — it helps us improve our Services. However, your feedback becomes our Intellectual Property and you are not entitled to any compensation (we will of course anonymise any data).</p>
          </Section>

          <Section title="5. Confidentiality">
            <p>Both parties agree to use reasonable care to protect each other's confidential information.</p>
            <p>Assessment Results and Data: The assessment results, analysis, and any data generated through your use of the AI Governance Maturity Assessment application are the confidential information of the Company. You agree not to disclose, reproduce, or share these results without our prior written consent, except as required by law.</p>
          </Section>

          <Section title="6. Use of Information">
            <p>The Company may use information provided through your use of the Services as set out in our Privacy Statement. This includes the right to use anonymised data and aggregated data to develop benchmarks, improve the Services, and conduct research related to AI governance maturity.</p>
            <p>We will not use your name for publicity or marketing purposes without your prior written consent.</p>
          </Section>

          <Section title="7. Pricing">
            <p>All prices for the Services are in New Zealand Dollars (NZD) and include Goods and Services Tax (GST).</p>
          </Section>

          <Section title="8. Governing Law and Jurisdiction">
            <p>These Terms and Conditions are governed by and construed in accordance with the laws of New Zealand, without regard to its conflict of law principles.</p>
            <p>Both parties irrevocably submit to the exclusive jurisdiction of the New Zealand courts for any disputes arising from or relating to these Services or these Terms and Conditions. You consent to the personal jurisdiction of these courts and waive any objections based on inconvenient forum.</p>
          </Section>

          <Section title="9. Contact">
            <p>For questions about these Terms and Conditions or the Services, please contact:</p>
            <p>Email: <a href="mailto:info@aigov.co.nz" className="text-blue-700 hover:underline">info@aigov.co.nz</a></p>
          </Section>

          <Section title="10. Beta or Trial">
            <p>These Terms and Conditions apply to beta (or trial) use. Admittedly, while we are in the beta phase of this product, there will likely be a few more "gremlins" — your feedback to identify these will be appreciated, so we can smooth those out more quickly!</p>
          </Section>

          <Section title="11. Definitions">
            <p><strong>Company, we, us, or our</strong> means Do Something Limited trading as AiGovNZ.</p>
            <p><strong>Services or product</strong> means the AiGovNZ website and AI Governance Maturity Assessment, including all content, features, and functionality provided therein.</p>
          </Section>

          <p className="text-xs text-gray-400 pt-4 border-t border-gray-100">Copyright 2025 AI Governance NZ</p>
        </div>
      </main>
    </div>
  );
}
