import React from 'react';
import FooterSection from '../sections/FooterSection.jsx';

const InsurancePage = () => {
  return (
    <>
      <main className="min-h-screen bg-[#0a0e1a] text-[#94a3b8] pt-24 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <header className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.28em] text-[#64748b] uppercase">
                PLATFORM
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Insurance Tool</h1>
              <p className="text-sm md:text-base text-[#94a3b8]">
                Placeholder page. This route exists so the footer navigation is complete.
              </p>
            </header>

            <section className="mt-8 rounded-2xl border border-[#2d3748] bg-[#1a1f2e] p-8 md:p-10 shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
              <p className="text-sm text-[#94a3b8]">
                Add underwriting, credential risk scoring, or verification insurance workflows here.
              </p>
            </section>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default InsurancePage;

