import React from 'react';
import FooterSection from '../sections/FooterSection.jsx';

const CommunityPage = () => {
  return (
    <>
      <main className="min-h-screen bg-[#0a0e1a] text-[#94a3b8] pt-24 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-10">
          <header className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.28em] text-[#64748b] uppercase">
              COMMUNITY
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Build with EduChain</h1>
            <p className="max-w-2xl text-sm md:text-base text-[#94a3b8]">
              Hub page for developer, institutional, and contributor communities. Links and counts
              are placeholders until real data sources are wired in.
            </p>
          </header>

          <section className="grid gap-6 md:grid-cols-3">
            {[
              { title: 'Discord', description: 'Real‑time chat with the EduChain team.' },
              { title: 'GitHub', description: 'Issues, pull requests, and open‑source repos.' },
              { title: 'Forum', description: 'Asynchronous feature discussion and support.' }
            ].map(item => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#2d3748] bg-[#1a1f2e] p-6 shadow-[0_18px_45px_rgba(15,23,42,0.8)]"
              >
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <p className="mt-2 text-xs text-[#94a3b8]">{item.description}</p>
                <p className="mt-3 text-[11px] text-[#64748b]">Member count coming soon</p>
                <button
                  type="button"
                  className="mt-4 text-xs font-semibold text-[#4169E1] hover:underline"
                >
                  Open {item.title}
                </button>
              </article>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)] items-start">
            <div className="rounded-2xl border border-[#2d3748] bg-[#1a1f2e] p-6 lg:p-8 text-sm">
              <h2 className="text-lg font-semibold text-white">Upcoming events</h2>
              <p className="mt-2 text-xs text-[#94a3b8]">
                Placeholder schedule for webinars, AMAs, and community calls.
              </p>
              <ul className="mt-4 space-y-3 text-xs">
                <li>
                  <strong className="text-white">EduChain Developer Onboarding</strong>
                  <p className="text-[#94a3b8]">Intro to the credential registry smart contracts.</p>
                </li>
                <li>
                  <strong className="text-white">Registrar Roundtable</strong>
                  <p className="text-[#94a3b8]">
                    Discussion of issuance workflows and policy considerations.
                  </p>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[#2d3748] bg-[#1a1f2e] p-6 lg:p-8 text-sm">
              <h2 className="text-lg font-semibold text-white">Newsletter</h2>
              <p className="mt-2 text-xs text-[#94a3b8]">
                Join the EduChain newsletter for release notes, case studies, and event invites.
              </p>
              <form className="mt-4 space-y-3">
                <input
                  type="email"
                  placeholder="you@example.edu"
                  className="w-full rounded-lg border border-[#2d3748] bg-[#0f1419] px-4 py-3 text-xs text-white placeholder:text-[#64748b] outline-none focus:border-[#4169E1]"
                />
                <button
                  type="button"
                  className="w-full rounded-xl bg-[#4169E1] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default CommunityPage;

