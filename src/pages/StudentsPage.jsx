import React from 'react';
import { GraduationCap, BadgeCheck, Clock3, Globe2 } from 'lucide-react';
import FooterSection from '../sections/FooterSection.jsx';

const credentials = [
  {
    degree: 'Bachelor of Computer Science',
    institution: 'Global Tech University',
    year: '2024',
    status: 'ISSUED'
  },
  {
    degree: 'Machine Learning Nanodegree',
    institution: 'Open Skills Institute',
    year: '2023',
    status: 'VERIFIED'
  },
  {
    degree: 'Blockchain Engineering Fellowship',
    institution: 'EduChain Labs',
    year: '2023',
    status: 'PENDING'
  }
];

const statusColorClasses = status => {
  switch (status) {
    case 'ISSUED':
      return 'bg-[#10b981]/15 text-[#10b981]';
    case 'VERIFIED':
      return 'bg-[#3b82f6]/15 text-[#3b82f6]';
    case 'PENDING':
      return 'bg-[#f59e0b]/15 text-[#f59e0b]';
    case 'REVOKED':
      return 'bg-[#ef4444]/15 text-[#ef4444]';
    default:
      return 'bg-white/5 text-white';
  }
};

const StudentsPage = () => {
  return (
    <>
      <main className="min-h-screen bg-[#0a0e1a] text-[#94a3b8] pt-24 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-24">
          {/* Hero */}
          <section className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
            <div className="space-y-6">
              <p className="text-xs font-semibold tracking-[0.28em] text-[#64748b] uppercase">
                FOR STUDENTS
              </p>
              <h1 className="text-4xl md:text-5xl xl:text-[56px] font-bold leading-tight text-white">
                Your credentials,
                <span className="block bg-gradient-to-r from-[#5B9FE3] to-[#4F75FF] bg-clip-text text-transparent">
                  owned by you.
                </span>
              </h1>
              <p className="max-w-2xl text-base md:text-lg text-[#94a3b8]">
                EduChain turns diplomas, certificates, and micro‑credentials into a single,
                verifiable portfolio you can share anywhere.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  className="rounded-lg bg-[#4169E1] px-8 py-3 text-sm font-semibold text-white shadow-[0_18px_35px_rgba(65,105,225,0.55)] transition hover:brightness-110"
                >
                  View sample credential
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-[#4169E1] px-8 py-3 text-sm font-semibold text-[#4169E1] bg-transparent transition hover:bg-[#4169E1]/5"
                >
                  Share verification link
                </button>
              </div>
            </div>
            <div className="rounded-2xl border border-[#2d3748] bg-[#1a1f2e] p-6 lg:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.8)]">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#0f1419] p-3">
                  <GraduationCap className="h-6 w-6 text-[#5B9FE3]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Portable web3 identity</p>
                  <p className="text-xs text-[#94a3b8]">
                    Your credentials stay verifiable even if you change jobs, emails, or countries.
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#64748b]">Verified credentials</span>
                  <span className="text-white font-semibold">6</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748b]">Organizations verified</span>
                  <span className="text-white font-semibold">14</span>
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="space-y-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.26em] text-[#64748b] uppercase">
                FEATURES
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
                Everything you need in a modern credential wallet
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  icon: BadgeCheck,
                  title: 'Instant verification',
                  body: 'Employers and schools can confirm authenticity in seconds with a single click.'
                },
                {
                  icon: Globe2,
                  title: 'Share anywhere',
                  body: 'Add your EduChain link to CVs, LinkedIn, or application portals.'
                },
                {
                  icon: Clock3,
                  title: 'Lifetime access',
                  body: 'Your credentials remain accessible and verifiable, even after graduation.'
                },
                {
                  icon: GraduationCap,
                  title: 'Multi‑institution',
                  body: 'Aggregate records from multiple universities, bootcamps, and training programs.'
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

          {/* Sample credentials */}
          <section className="space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.26em] text-[#64748b] uppercase">
                  SAMPLE CREDENTIALS
                </p>
                <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
                  See how your portfolio could look
                </h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {credentials.map(cred => (
                <article
                  key={cred.degree}
                  className="flex flex-col justify-between rounded-2xl border border-[#2d3748] bg-[#1a1f2e] p-6 shadow-[0_18px_45px_rgba(15,23,42,0.8)]"
                >
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#0f1419] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#64748b]">
                      <GraduationCap className="h-4 w-4 text-[#5B9FE3]" />
                      <span>{cred.year}</span>
                    </div>
                    <h3 className="text-base font-semibold text-white">{cred.degree}</h3>
                    <p className="text-xs text-[#94a3b8]">{cred.institution}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-bold ${statusColorClasses(
                        cred.status
                      )}`}
                    >
                      {cred.status}
                    </span>
                    <button
                      type="button"
                      className="text-xs font-semibold text-[#4169E1] hover:underline"
                    >
                      View on chain
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Getting your credentials */}
          <section className="space-y-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.26em] text-[#64748b] uppercase">
                HOW TO GET STARTED
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
                Getting your EduChain credentials
              </h2>
            </div>
            <ol className="grid gap-6 md:grid-cols-4">
              {[
                'Enroll at a partner institution',
                'Opt in to on‑chain credentials',
                'Receive your EduChain link',
                'Share with employers and schools'
              ].map((step, index) => (
                <li
                  key={step}
                  className="flex flex-col gap-3 rounded-2xl border border-[#2d3748] bg-[#1a1f2e] p-6"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0f1419] text-sm font-semibold text-white ring-2 ring-[#4169E1]/70">
                    0{index + 1}
                  </div>
                  <p className="text-sm font-semibold text-white">{step}</p>
                  <p className="text-xs text-[#94a3b8]">
                    {index === 0 &&
                      'Choose programs that support EduChain credential issuance at graduation.'}
                    {index === 1 &&
                      'Give consent for your achievements to be represented as verifiable credentials.'}
                    {index === 2 &&
                      'Receive a secure link and QR code that aggregates all your credentials.'}
                    {index === 3 &&
                      'Paste your link into applications and resumes, or share directly with reviewers.'}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default StudentsPage;

