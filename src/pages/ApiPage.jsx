import React, { useState } from 'react';
import { Code2, KeyRound, Network, BookOpenText } from 'lucide-react';
import FooterSection from '../sections/FooterSection.jsx';

const tabs = [
  { id: 'overview', label: 'Overview', icon: BookOpenText },
  { id: 'auth', label: 'Authentication', icon: KeyRound },
  { id: 'endpoints', label: 'Endpoints', icon: Network },
  { id: 'examples', label: 'Examples', icon: Code2 }
];

const ApiPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      <main className="min-h-screen bg-[#0a0e1a] text-[#94a3b8] pt-24 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
          {/* Hero */}
          <section className="space-y-4">
            <p className="text-xs font-semibold tracking-[0.28em] text-[#64748b] uppercase">
              DEVELOPER API
            </p>
            <h1 className="text-3xl md:text-4xl xl:text-[40px] font-bold leading-tight text-white">
              A single API for on‑chain academic credentials
            </h1>
            <p className="max-w-2xl text-sm md:text-base text-[#94a3b8]">
              Issue, verify, and revoke credentials programmatically using EduChain&apos;s REST
              interface. Designed for registrars, SIS vendors, and developer teams.
            </p>
          </section>

          {/* Tabs */}
          <section className="space-y-6">
            <div className="inline-flex rounded-full border border-[#1e293b] bg-[#0f1419] p-1 text-xs">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const active = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-medium transition ${
                      active ? 'bg-[#1a1f2e] text-white' : 'text-[#64748b] hover:text-white'
                    }`}
                  >
                    <Icon size={14} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)] items-start">
              {/* Content */}
              <div className="space-y-6">
                {activeTab === 'overview' && (
                  <>
                    <h2 className="text-lg font-semibold text-white">Base URL</h2>
                    <div className="rounded-xl bg-[#0f1419] p-4 text-xs text-[#e5e7eb] border border-[#1e293b] font-mono">
                      <p>https://api.educhain.network/v1</p>
                    </div>
                    <div className="grid gap-4 text-sm">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748b]">
                          RATE LIMITS
                        </p>
                        <p className="mt-1 text-white">1,000 write ops / min per tenant</p>
                        <p className="mt-1 text-xs text-[#94a3b8]">
                          Soft limits with automatic burst handling for large graduation batches.
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748b]">
                          ENVIRONMENTS
                        </p>
                        <p className="mt-1 text-white">Sandbox &amp; production</p>
                        <p className="mt-1 text-xs text-[#94a3b8]">
                          Fully isolated networks so you can test integrations before going live.
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'auth' && (
                  <>
                    <h2 className="text-lg font-semibold text-white">Authentication</h2>
                    <p className="text-sm text-[#94a3b8]">
                      Authenticate every request with a tenant‑scoped API key sent via the
                      <code className="mx-1 rounded bg-white/5 px-1 py-0.5 text-[11px] text-[#e5e7eb]">
                        Authorization
                      </code>
                      header.
                    </p>
                    <div className="rounded-xl bg-[#0f1419] p-4 text-xs text-[#e5e7eb] border border-[#1e293b] font-mono space-y-1">
                      <p>// Example header</p>
                      <p>Authorization: Bearer sk_live_your_key_here</p>
                    </div>
                  </>
                )}

                {activeTab === 'endpoints' && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-white">Core endpoints</h2>
                    <div className="space-y-3">
                      {[
                        {
                          method: 'POST',
                          path: '/credentials',
                          desc: 'Issue a new on‑chain credential'
                        },
                        {
                          method: 'GET',
                          path: '/credentials/{id}',
                          desc: 'Fetch credential details and chain status'
                        },
                        {
                          method: 'POST',
                          path: '/verify',
                          desc: 'Verify a credential hash or payload'
                        },
                        {
                          method: 'POST',
                          path: '/credentials/{id}/revoke',
                          desc: 'Revoke a credential with audit reason'
                        }
                      ].map(endpoint => (
                        <div
                          key={endpoint.path}
                          className="flex items-start justify-between gap-4 rounded-2xl border border-[#2d3748] bg-[#1a1f2e] p-4"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold ${
                                endpoint.method === 'GET'
                                  ? 'bg-[#3b82f6]/15 text-[#3b82f6]'
                                  : 'bg-[#10b981]/15 text-[#10b981]'
                              }`}
                            >
                              {endpoint.method}
                            </span>
                            <code className="text-xs text-white">{endpoint.path}</code>
                          </div>
                          <p className="text-[11px] text-[#94a3b8]">{endpoint.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'examples' && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-white">Issuing a credential</h2>
                    <p className="text-sm text-[#94a3b8]">
                      Create a credential by POSTing a signed payload to the
                      <code className="mx-1 rounded bg-white/5 px-1 py-0.5 text-[11px] text-[#e5e7eb]">
                        /credentials
                      </code>
                      endpoint.
                    </p>
                  </div>
                )}
              </div>

              {/* Code panel */}
              <div className="rounded-2xl border border-[#1e293b] bg-[#0f1419] p-4 md:p-6 text-xs text-[#e5e7eb] font-mono space-y-4">
                {activeTab === 'overview' && (
                  <pre className="whitespace-pre-wrap">
{`GET /v1/health

{
  "status": "ok",
  "network": "ethereum-mainnet",
  "latency_ms": 42
}`}
                  </pre>
                )}
                {activeTab === 'auth' && (
                  <pre className="whitespace-pre-wrap">
{`curl https://api.educhain.network/v1/credentials \\
  -H "Authorization: Bearer sk_live_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{ "student_name": "Jordan Smith", "degree": "BSc Computer Science" }'`}
                  </pre>
                )}
                {activeTab === 'endpoints' && (
                  <pre className="whitespace-pre-wrap">
{`GET /v1/credentials/{id}

{
  "id": "cr_90412",
  "status": "VERIFIED",
  "network": "ethereum-mainnet",
  "tx_hash": "0x9f8f...3e2d",
  "issued_at": "2024-10-12T18:24:03Z"
}`}
                  </pre>
                )}
                {activeTab === 'examples' && (
                  <pre className="whitespace-pre-wrap">
{`POST /v1/credentials

{
  "student_name": "Jordan Smith",
  "institution": "Global Tech University",
  "degree": "Bachelor of Computer Science",
  "graduation_year": 2024,
  "metadata": {
    "student_id": "GT-39284",
    "program_track": "Honours"
  }
}`}
                  </pre>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default ApiPage;

