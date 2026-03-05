import React from 'react';
import FooterSection from '../sections/FooterSection.jsx';

const ContactPage = () => {
  return (
    <>
      <main className="min-h-screen bg-[#0a0e1a] text-[#94a3b8] pt-24 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center">
          <section className="w-full max-w-2xl rounded-2xl border border-[#2d3748] bg-[#1a1f2e] p-8 md:p-10 shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
            <header className="space-y-3 text-center md:text-left">
              <p className="text-xs font-semibold tracking-[0.28em] text-[#64748b] uppercase">
                CONTACT
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Get in touch</h1>
              <p className="text-sm text-[#94a3b8]">
                Multi‑step contact form skeleton that maps to the specified API endpoints. Backend
                hook‑up can be added later.
              </p>
            </header>

            <form className="mt-6 space-y-5 text-sm">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Name" required>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-[#2d3748] bg-[#0f1419] px-4 py-3 text-xs text-white placeholder:text-[#64748b] outline-none focus:border-[#4169E1]"
                    placeholder="Your full name"
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-[#2d3748] bg-[#0f1419] px-4 py-3 text-xs text-white placeholder:text-[#64748b] outline-none focus:border-[#4169E1]"
                    placeholder="you@example.edu"
                  />
                </Field>
              </div>

              <Field label="Institution / Organization">
                <input
                  type="text"
                  className="w-full rounded-lg border border-[#2d3748] bg-[#0f1419] px-4 py-3 text-xs text-white placeholder:text-[#64748b] outline-none focus:border-[#4169E1]"
                  placeholder="University, bootcamp, or company"
                />
              </Field>

              <Field label="Inquiry Type" required>
                <select className="w-full rounded-lg border border-[#2d3748] bg-[#0f1419] px-4 py-3 text-xs text-white outline-none focus:border-[#4169E1]">
                  <option>Technical Support</option>
                  <option>Sales</option>
                  <option>Partnership</option>
                  <option>Verification Issue</option>
                  <option>Other</option>
                </select>
              </Field>

              <Field label="Subject" required>
                <input
                  type="text"
                  className="w-full rounded-lg border border-[#2d3748] bg-[#0f1419] px-4 py-3 text-xs text-white placeholder:text-[#64748b] outline-none focus:border-[#4169E1]"
                  placeholder="How can we help?"
                />
              </Field>

              <Field label="Message" required>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border border-[#2d3748] bg-[#0f1419] px-4 py-3 text-xs text-white placeholder:text-[#64748b] outline-none focus:border-[#4169E1]"
                  placeholder="Describe your request in as much detail as possible."
                />
              </Field>

              <Field label="Attach credential (optional)">
                <div className="rounded-xl border-2 border-dashed border-[#2d3748] bg-[#0f1419] px-4 py-6 text-center">
                  <p className="text-xs font-semibold text-white">
                    Click to upload or drag and drop
                  </p>
                  <p className="mt-1 text-[11px] text-[#94a3b8]">
                    Supported formats: PDF, JSON (verification issues)
                  </p>
                </div>
              </Field>

              <div className="flex items-center justify-between text-[11px] text-[#64748b]">
                <span>reCAPTCHA placeholder</span>
                <span>Typical response time: &lt; 24 hours</span>
              </div>

              <button
                type="button"
                className="mt-2 w-full rounded-xl bg-[#4169E1] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Submit inquiry
              </button>
            </form>
          </section>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

const Field = ({ label, required, children }) => (
  <label className="block space-y-2 text-left">
    <span className="text-xs font-semibold text-[#64748b] uppercase tracking-[0.14em]">
      {label}
      {required && <span className="text-[#ef4444]"> *</span>}
    </span>
    {children}
  </label>
);

export default ContactPage;

