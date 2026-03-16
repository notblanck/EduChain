import React, { useMemo, useState } from 'react';
import FooterSection from '../sections/FooterSection.jsx';

const initialForm = {
  fullName: '',
  email: '',
  role: '',
  organization: '',
  password: ''
};

const RegisterPage = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      form.fullName.trim() &&
      form.email.trim() &&
      form.role.trim() &&
      form.organization.trim() &&
      form.password.trim().length >= 8
    );
  }, [form]);

  const onChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setSubmitted(false);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <>
      <main className="min-h-screen bg-[#0a0e1a] text-[#94a3b8] pt-24 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <header className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.28em] text-[#64748b] uppercase">
                PROFILE REGISTRATION
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Create your EduChain profile
              </h1>
              <p className="text-sm md:text-base text-[#94a3b8]">
                Set up a profile you can use to issue and verify blockchain‑backed credentials for
                your institution or as an individual.
              </p>
            </header>

            <section className="mt-8 rounded-2xl border border-[#4169E1]/30 bg-[#1a1f2e] p-8 md:p-10 shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field
                    label="Full name"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={form.fullName}
                    onChange={onChange}
                  />
                  <Field
                    label="Work email"
                    name="email"
                    type="email"
                    placeholder="you@organization.com"
                    value={form.email}
                    onChange={onChange}
                  />
                  <Field
                    label="Role"
                    name="role"
                    placeholder="e.g., Registrar, Program Lead, Student"
                    value={form.role}
                    onChange={onChange}
                  />
                  <Field
                    label="Organization / Institution"
                    name="organization"
                    placeholder="University, company, or independent"
                    value={form.organization}
                    onChange={onChange}
                  />
                  <Field
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="At least 8 characters"
                    value={form.password}
                    onChange={onChange}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit || submitting}
                  className="w-full rounded-xl bg-[#4169E1] px-6 py-4 text-lg font-semibold text-white transition hover:brightness-110 disabled:opacity-50 disabled:hover:brightness-100"
                >
                  {submitting ? 'Creating profile…' : 'Create profile'}
                </button>

                {submitted && (
                  <p className="mt-3 text-xs text-[#bbf7d0]">
                    ✅ Profile registered locally. In a production deployment this would mint or link
                    your on‑chain identity.
                  </p>
                )}
              </form>
            </section>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

const Field = ({ label, ...props }) => {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-semibold text-[#64748b] uppercase tracking-[0.14em]">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-lg border border-[#2d3748] bg-[#1a1f2e] px-4 py-3 text-sm text-white placeholder:text-[#64748b] outline-none transition focus:border-[#4169E1]"
      />
    </label>
  );
};

export default RegisterPage;

