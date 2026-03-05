import React from 'react';
import FooterSection from '../sections/FooterSection.jsx';

const mockGasSeries = [18, 20, 24, 19, 21, 22, 18, 17];

const NetworkStatusPage = () => {
  return (
    <>
      <main className="min-h-screen bg-[#0a0e1a] text-[#94a3b8] pt-24 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-10">
          <header className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.28em] text-[#64748b] uppercase">
              NETWORK STATUS
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Ethereum + L2 verification health
            </h1>
            <p className="max-w-2xl text-sm md:text-base text-[#94a3b8]">
              Live view into EduChain&apos;s blockchain connectivity, gas prices, and credential
              throughput. Values below are mocked until wired to real infrastructure.
            </p>
          </header>

          <section className="grid gap-6 md:grid-cols-3">
            <StatusCard title="Network health" value="Healthy" tone="green" />
            <StatusCard title="Avg gas price" value="18.4 Gwei" tone="blue" />
            <StatusCard title="Total credentials" value="1,284" tone="default" />
          </section>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)] items-start">
            <div className="rounded-2xl border border-[#2d3748] bg-[#1a1f2e] p-6 lg:p-8">
              <h2 className="text-sm font-semibold text-white">Gas price trend (mocked)</h2>
              <p className="mt-1 text-xs text-[#94a3b8]">
                Line visualization placeholder. Integrate with real gas price API in production.
              </p>
              <div className="mt-6 h-40 rounded-xl bg-[#0f1419] p-4 text-[11px] text-[#64748b]">
                <p>18 ─</p>
                <p>20 ─</p>
                <p>22 ─</p>
                <p className="mt-2 text-xs text-[#94a3b8]">
                  Samples:{' '}
                  {mockGasSeries.map((v, idx) => (
                    <span key={v + idx} className="mr-1">
                      {v}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#2d3748] bg-[#1a1f2e] p-6 lg:p-8">
              <h2 className="text-sm font-semibold text-white">Recent transactions (mocked)</h2>
              <ul className="mt-4 space-y-3 text-xs">
                <li className="flex items-center justify-between">
                  <span className="text-[#64748b]">Credential batch #184</span>
                  <span className="rounded-full bg-[#10b981]/15 px-3 py-1 font-bold text-[#10b981]">
                    CONFIRMED
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-[#64748b]">Verification proof #9f8f…3e2d</span>
                  <span className="rounded-full bg-[#3b82f6]/15 px-3 py-1 font-bold text-[#3b82f6]">
                    VERIFIED
                  </span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

const StatusCard = ({ title, value, tone }) => {
  const toneClass =
    tone === 'green'
      ? 'bg-[#10b981]/15 text-[#10b981]'
      : tone === 'blue'
      ? 'bg-[#3b82f6]/15 text-[#3b82f6]'
      : 'bg-white/5 text-white';

  return (
    <div className="rounded-2xl border border-[#2d3748] bg-[#1a1f2e] p-6 shadow-[0_18px_45px_rgba(15,23,42,0.8)]">
      <p className="text-xs font-semibold text-[#64748b] uppercase tracking-[0.16em]">
        {title}
      </p>
      <p className="mt-3 text-xl font-semibold text-white">{value}</p>
      <span className={`mt-4 inline-flex rounded-full px-3 py-1 text-[11px] font-bold ${toneClass}`}>
        Live
      </span>
    </div>
  );
};

export default NetworkStatusPage;

