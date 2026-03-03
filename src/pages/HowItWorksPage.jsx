import React from 'react';
import { ArrowRight, ShieldCheck, Database, Sparkles, Network } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FooterSection from '../sections/FooterSection.jsx';

const steps = [
  {
    icon: ShieldCheck,
    label: 'Step 01',
    title: 'Issue On‑Chain Certificates',
    body: 'Institutions mint tamper‑proof credentials directly to the EduChain network with a single API call.'
  },
  {
    icon: Database,
    label: 'Step 02',
    title: 'Anchor to Blockchain',
    body: 'Each credential is hashed and anchored to an immutable ledger with verifiable provenance.'
  },
  {
    icon: Network,
    label: 'Step 03',
    title: 'Share Verifiable Links',
    body: 'Graduates receive shareable URLs and QR codes that resolve to real‑time on‑chain proof.'
  },
  {
    icon: Sparkles,
    label: 'Step 04',
    title: 'Instant Global Verification',
    body: 'Employers and partners validate in seconds without ever contacting the issuing institution.'
  }
];

const HowItWorksPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className="min-h-screen bg-[#0a0e1a] text-[#94a3b8] pt-24 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Hero */}
          <section className="grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
            <div className="space-y-8">
              <p className="text-xs font-semibold tracking-[0.28em] text-[#64748b] uppercase">
                WEB3 INFRASTRUCTURE
              </p>
              <h1 className="text-4xl md:text-5xl xl:text-[72px] font-bold leading-tight text-white">
                Secure{' '}
                <span className="bg-gradient-to-r from-[#5B9FE3] to-[#4F75FF] bg-clip-text text-transparent">
                  Blockchain‑Based
                </span>{' '}
                Certificate Verification
              </h1>
              <p className="max-w-xl text-base md:text-lg text-[#94a3b8]">
                EduChain turns academic credentials into programmable, verifiable assets—eliminating
                manual checks, fraud, and paper‑based processes.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/issue')}
                  className="rounded-lg bg-[#4169E1] px-8 py-3 text-sm font-semibold text-white shadow-[0_18px_35px_rgba(65,105,225,0.55)] transition hover:brightness-110"
                >
                  Issue Certificate
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/verify')}
                  className="rounded-lg border border-[#4169E1] px-8 py-3 text-sm font-semibold text-[#4169E1] bg-transparent transition hover:bg-[#4169E1]/5"
                >
                  Verify Certificate
                </button>
              </div>
              <div className="flex flex-wrap gap-6 text-xs text-[#64748b]">
                <div>
                  <p className="font-semibold text-white">35+ Institutions</p>
                  <p>Already issuing on EduChain</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Sub‑second Checks</p>
                  <p>For any credential worldwide</p>
                </div>
              </div>
            </div>

            {/* 3D orb visual */}
            <div className="flex justify-end">
              <div className="relative aspect-[4/5] w-full max-w-sm rounded-[32px] bg-[#1a1f2e] p-8 shadow-[0_24px_80px_rgba(15,23,42,0.9)] border border-[#1e293b] overflow-hidden">
                <div className="pointer-events-none absolute -top-20 -left-10 h-56 w-56 rounded-full bg-gradient-to-br from-[#14b8a6] via-[#10b981] to-[#a855f7] opacity-60 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 right-0 h-56 w-56 rounded-full bg-gradient-to-br from-[#4F75FF] via-[#5B9FE3] to-[#14b8a6] opacity-60 blur-3xl" />

                <div className="relative flex h-full items-center justify-center">
                  <div className="absolute inset-10 rounded-full border border-white/10 shadow-[0_0_60px_rgba(56,189,248,0.45)]" />
                  <div className="relative aspect-square w-3/4 rounded-full bg-[radial-gradient(circle_at_30%_20%,#f9fafb_0,#5B9FE3_35%,#0a0e1a_75%)] shadow-[0_18px_55px_rgba(15,23,42,0.95)]" />
                </div>

                <div className="absolute inset-x-8 bottom-6 flex items-center justify-between text-xs text-[#94a3b8]">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748b]">
                      LIVE STATUS
                    </p>
                    <p className="mt-1 text-white text-sm">1,284 certificates on‑chain</p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium text-white ring-1 ring-white/10 backdrop-blur"
                  >
                    View Explorer
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 4‑step process */}
          <section className="mt-24 space-y-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.26em] text-[#64748b] uppercase">
                  HOW IT WORKS
                </p>
                <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
                  From issuance to instant verification in four steps
                </h2>
              </div>
              <p className="max-w-md text-sm text-[#94a3b8]">
                EduChain abstracts the blockchain layer, exposing a clean credential API while
                preserving full cryptographic guarantees.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {steps.map(step => (
                <div
                  key={step.title}
                  className="group rounded-2xl border border-[#2d3748] bg-[#1a1f2e] p-6 lg:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.8)] transition hover:border-[#4169E1]/50"
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#1e293b] bg-[#0f1419] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[#64748b]">
                    <step.icon size={16} className="text-[#4169E1]" />
                    <span>{step.label}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm text-[#94a3b8]">{step.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technical architecture */}
          <section className="mt-24 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold tracking-[0.26em] text-[#64748b] uppercase">
                TECHNICAL ARCHITECTURE
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
                Built for auditors, not just interfaces
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#94a3b8]">
                Every credential on EduChain is represented as a hashed payload anchored to a
                transparent, append‑only ledger. Off‑chain metadata is signed and versioned, so
                auditors can independently reconstruct and verify the full history of a record.
              </p>
            </div>
            <div className="grid gap-4 rounded-2xl border border-[#2d3748] bg-[#1a1f2e] p-6 lg:p-8 text-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748b]">
                    LEDGER LAYER
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">Ethereum + L2 rollups</p>
                  <p className="mt-1 text-xs text-[#94a3b8]">
                    Optimized for low‑cost credential anchoring with configurable confirmation
                    thresholds.
                  </p>
                </div>
                <span className="rounded-full bg-[#10b981]/10 px-3 py-1 text-[11px] font-semibold text-[#10b981]">
                  ISSUED
                </span>
              </div>
              <div className="h-px bg-[#1e293b]" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748b]">
                    VERIFICATION ENGINE
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">Deterministic certificate checks</p>
                  <p className="mt-1 text-xs text-[#94a3b8]">
                    Stateless API that recomputes credential hashes and compares them against on‑chain
                    proofs.
                  </p>
                </div>
                <span className="rounded-full bg-[#3b82f6]/10 px-3 py-1 text-[11px] font-semibold text-[#3b82f6]">
                  VERIFIED
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default HowItWorksPage;

