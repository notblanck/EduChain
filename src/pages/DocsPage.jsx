import React from 'react';
import FooterSection from '../sections/FooterSection.jsx';

const sections = [
  'Introduction',
  'For Institutions',
  'For Verifiers',
  'For Developers',
  'Security & Privacy'
];

const DocsPage = () => {
  return (
    <>
      <main className="min-h-screen bg-[#0a0e1a] text-[#94a3b8] pt-24 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="hidden lg:block rounded-2xl border border-[#1e293b] bg-[#0f1419] p-5 text-sm">
            <p className="text-xs font-semibold text-[#64748b] uppercase tracking-[0.18em] mb-4">
              Docs navigation
            </p>
            <nav className="space-y-2">
              {sections.map(section => (
                <button
                  key={section}
                  type="button"
                  className="block w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-[#94a3b8] hover:bg-[#1a1f2e]"
                >
                  {section}
                </button>
              ))}
            </nav>
          </aside>

          <section>
            <header className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.28em] text-[#64748b] uppercase">
                DOCUMENTATION
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-white">EduChain Documentation</h1>
              <p className="max-w-2xl text-sm md:text-base text-[#94a3b8]">
                High‑level structure for the docs site. Content is mocked and can be expanded into a
                full MDX or CMS‑backed documentation system later.
              </p>
            </header>

            <article className="mt-8 space-y-10 text-sm leading-relaxed">
              <section>
                <h2 className="text-xl font-semibold text-white">1. Introduction</h2>
                <p className="mt-3">
                  EduChain is a blockchain‑based credential platform that anchors cryptographic
                  proofs of educational achievements on Ethereum and L2 rollups. Issuers keep full
                  control of their schemas and metadata while verifiers get instant, tamper‑evident
                  checks.
                </p>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-white">2. For Institutions</h2>
                <p className="mt-3">
                  This section will cover account setup, credential issuance workflows, template
                  creation, and batch operations as described in the product spec.
                </p>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-white">3. For Verifiers</h2>
                <p className="mt-3">
                  Here you will document the verification process, API integration patterns, and QR
                  scanning flows that rely on the verification hub endpoints.
                </p>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-white">4. For Developers</h2>
                <p className="mt-3">
                  A home for architecture diagrams, smart contract descriptions, API guides, and SDK
                  usage examples.
                </p>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-white">5. Security &amp; Privacy</h2>
                <p className="mt-3">
                  Outline key management strategies, data handling policies, and compliance notes
                  such as GDPR requirements as the platform is built out.
                </p>
              </section>
            </article>
          </section>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default DocsPage;

