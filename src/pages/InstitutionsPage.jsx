import React from 'react';
import { Building2, ShieldCheck, Clock3, Globe2, CheckCircle2 } from 'lucide-react';
import FooterSection from '../sections/FooterSection.jsx';

const tiers = [
  {
    name: 'Starter',
    price: '$299/mo',
    description: 'For pilot programs and single‑department rollouts.',
    highlighted: false,
    features: [
      'Up to 5,000 credentials / year',
      'Single institution workspace',
      'Email & community support',
      'CSV + dashboard issuance'
    ]
  },
  {
    name: 'Professional',
    price: '$799/mo',
    description: 'Multi‑campus credential programs with API access.',
    highlighted: true,
    features: [
      'Up to 50,000 credentials / year',
      'Multi‑institution management',
      'Priority support & SLA',
      'Full REST + webhook API'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Talk to us',
    description: 'Nation‑scale deployments and custom integrations.',
    highlighted: false,
    features: [
      'Unlimited credential volume',
      'Dedicated infrastructure',
      'Custom attestations & schemas',
      'On‑prem or VPC deployment'
    ]
  }
];

const InstitutionsPage = () => {
  return (
    <>
      <main className="min-h-screen bg-[#0a0e1a] text-[#94a3b8] pt-24 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-24">
          {/* Hero */}
          <section className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
            <div className="space-y-6">
              <p className="text-xs font-semibold tracking-[0.28em] text-[#64748b] uppercase">
                FOR INSTITUTIONS
              </p>
              <h1 className="text-4xl md:text-5xl xl:text-[56px] font-bold leading-tight text-white">
                Make every diploma
                <span className="block bg-gradient-to-r from-[#5B9FE3] to-[#4F75FF] bg-clip-text text-transparent">
                  instantly verifiable.
                </span>
              </h1>
              <p className="max-w-2xl text-base md:text-lg text-[#94a3b8]">
                Replace manual checks, PDF attachments, and paper letters with cryptographically
                verifiable credentials that travel with your graduates for life.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  className="rounded-lg bg-[#4169E1] px-8 py-3 text-sm font-semibold text-white shadow-[0_18px_35px_rgba(65,105,225,0.55)] transition hover:brightness-110"
                >
                  Book a demo
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-[#4169E1] px-8 py-3 text-sm font-semibold text-[#4169E1] bg-transparent transition hover:bg-[#4169E1]/5"
                >
                  Download implementation guide
                </button>
              </div>
            </div>
            <div className="grid gap-4 rounded-2xl border border-[#2d3748] bg-[#1a1f2e] p-6 lg:p-8 text-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#0f1419] p-3">
                  <Building2 className="h-6 w-6 text-[#5B9FE3]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Built for registrars</p>
                  <p className="text-xs text-[#94a3b8]">
                    Map your existing workflows to EduChain without rewriting your SIS.
                  </p>
                </div>
              </div>
              <div className="h-px bg-[#1e293b]" />
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#0f1419] p-3">
                  <ShieldCheck className="h-6 w-6 text-[#10b981]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Auditable by design</p>
                  <p className="text-xs text-[#94a3b8]">
                    Every credential includes a cryptographic trail from issuer to verification.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="space-y-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.26em] text-[#64748b] uppercase">
                  BENEFITS
                </p>
                <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
                  Designed for modern credential offices
                </h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  icon: Globe2,
                  title: 'Global verification',
                  body: 'Employers worldwide can verify in seconds—no logins or portal accounts required.'
                },
                {
                  icon: Clock3,
                  title: 'Faster processing',
                  body: 'Automate issuance from your SIS or LMS, with approvals encoded as workflows.'
                },
                {
                  icon: ShieldCheck,
                  title: 'Fraud‑proof records',
                  body: 'Block‑level integrity guarantees make tampering and forgery immediately detectable.'
                },
                {
                  icon: Building2,
                  title: 'Institution‑grade controls',
                  body: 'Role‑based access, revocation, and audit logs built for governance teams.'
                }
              ].map(item => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#2d3748] bg-[#1a1f2e] p-6 lg:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.8)] transition hover:border-[#4169E1]/50"
                >
                  <item.icon className="h-6 w-6 text-[#5B9FE3]" />
                  <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm text-[#94a3b8]">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Getting started timeline */}
          <section className="space-y-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.26em] text-[#64748b] uppercase">
                GETTING STARTED
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
                From sandbox to production in weeks
              </h2>
            </div>
            <ol className="grid gap-6 md:grid-cols-3">
              {['Design your schemas', 'Connect your systems', 'Launch your first cohort'].map(
                (label, index) => (
                  <li
                    key={label}
                    className="flex flex-col gap-3 rounded-2xl border border-[#2d3748] bg-[#1a1f2e] p-6 lg:p-8"
                  >
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0f1419] text-sm font-semibold text-white ring-2 ring-[#4169E1]/70">
                      0{index + 1}
                    </div>
                    <p className="text-sm font-semibold text-white">{label}</p>
                    <p className="text-xs text-[#94a3b8]">
                      {index === 0 &&
                        'Model degrees, micro‑credentials, and attestations with your governance team.'}
                      {index === 1 &&
                        'Use webhooks or batch imports to sync from your SIS, LMS, or HR systems.'}
                      {index === 2 &&
                        'Issue live credentials to a pilot cohort and share verification links with employers.'}
                    </p>
                  </li>
                )
              )}
            </ol>
          </section>

          {/* Pricing */}
          <section className="space-y-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.26em] text-[#64748b] uppercase">
                  PRICING
                </p>
                <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
                  Simple tiers for any scale
                </h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {tiers.map(tier => (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl border bg-[#1a1f2e] p-6 lg:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.8)] ${
                    tier.highlighted ? 'border-[#4169E1]' : 'border-[#2d3748]'
                  }`}
                >
                  {tier.highlighted && (
                    <span className="absolute -top-3 right-4 rounded-full bg-[#4169E1] px-3 py-1 text-[11px] font-semibold text-white">
                      Most popular
                    </span>
                  )}
                  <p className="text-sm font-semibold text-white">{tier.name}</p>
                  <p className="mt-2 text-2xl font-bold text-white">{tier.price}</p>
                  <p className="mt-2 text-xs text-[#94a3b8]">{tier.description}</p>
                  <ul className="mt-5 space-y-2 text-sm text-[#94a3b8]">
                    {tier.features.map(feature => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className={`mt-6 w-full rounded-xl px-6 py-3 text-sm font-semibold transition ${
                      tier.highlighted
                        ? 'bg-[#4169E1] text-white hover:brightness-110'
                        : 'border border-[#4169E1] text-[#4169E1] hover:bg-[#4169E1]/5'
                    }`}
                  >
                    {tier.highlighted ? 'Start Professional plan' : 'Talk to sales'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default InstitutionsPage;

