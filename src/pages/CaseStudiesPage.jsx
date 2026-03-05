import React from 'react';
import FooterSection from '../sections/FooterSection.jsx';

const cases = [
  {
    name: 'University of XYZ',
    metric: '50,000+ diplomas issued',
    challenge: 'Manual verification backlog and paper‑based workflows.',
    result: 'Reduced verification turnaround from days to seconds.'
  },
  {
    name: 'ABC Bootcamp',
    metric: 'Real‑time skill certifications',
    challenge: 'Difficulty proving short‑course outcomes to employers.',
    result: 'Automated issuance of verifiable micro‑credentials on completion.'
  },
  {
    name: 'Government Agency',
    metric: 'National license registry',
    challenge: 'Fragmented license data across multiple agencies.',
    result: 'Unified on‑chain registry with audit‑ready logs.'
  }
];

const CaseStudiesPage = () => {
  return (
    <>
      <main className="min-h-screen bg-[#0a0e1a] text-[#94a3b8] pt-24 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-10">
          <header className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.28em] text-[#64748b] uppercase">
              CASE STUDIES
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Real‑world EduChain deployments
            </h1>
            <p className="max-w-2xl text-sm md:text-base text-[#94a3b8]">
              Skeleton layout for institution case studies. Each card can expand into a dedicated
              detail page as content is produced.
            </p>
          </header>

          <section className="grid gap-6 md:grid-cols-3">
            {cases.map(item => (
              <article
                key={item.name}
                className="rounded-2xl border border-[#2d3748] bg-[#1a1f2e] p-6 lg:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.8)]"
              >
                <h2 className="text-lg font-semibold text-white">{item.name}</h2>
                <p className="mt-2 text-xs font-semibold text-[#5B9FE3]">{item.metric}</p>
                <p className="mt-4 text-xs text-[#94a3b8]">
                  <strong className="text-[#e5e7eb]">Challenge:</strong> {item.challenge}
                </p>
                <p className="mt-2 text-xs text-[#94a3b8]">
                  <strong className="text-[#e5e7eb]">Result:</strong> {item.result}
                </p>
                <button
                  type="button"
                  className="mt-4 text-xs font-semibold text-[#4169E1] hover:underline"
                >
                  View case study
                </button>
              </article>
            ))}
          </section>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default CaseStudiesPage;

