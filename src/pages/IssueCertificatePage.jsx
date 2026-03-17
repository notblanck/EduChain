import React, { useMemo, useState } from 'react';
import { GraduationCap, Hash, Building2, CalendarDays, User2, BookOpenText, CheckCircle2, ExternalLink } from 'lucide-react';
import FooterSection from '../sections/FooterSection.jsx';
import { Link } from 'react-router-dom';
import { blockchain } from '../../blockchain.js';

const initialForm = {
  studentName: '',
  institution: '',
  degree: '',
  field: '',
  issueDate: '',
  credentialId: ''
};

const IssueCertificatePage = () => {
  const [form, setForm] = useState(() => ({
    ...initialForm,
    issueDate: new Date().toISOString().slice(0, 10)
  }));
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      form.studentName.trim() &&
      form.institution.trim() &&
      form.degree.trim() &&
      form.field.trim() &&
      form.issueDate &&
      form.credentialId.trim()
    );
  }, [form]);

  const onChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setResult(null);

    try {
      // Simulate short delay for UX
      await new Promise(r => setTimeout(r, 600));

      const issued = blockchain.addCredential(form);

      setResult({
        status: 'ISSUED',
        certHash: issued.hash,
        payload: issued
      });
    } catch (err) {
      console.error('Error issuing credential', err);
      setResult(null);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-[#0a0e1a] text-[#94a3b8] pt-24 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <header className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.28em] text-[#64748b] uppercase">
                ISSUANCE
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Issue Blockchain Certificate
              </h1>
              <p className="text-sm md:text-base text-[#94a3b8]">
                Mint an immutable, verifiable academic credential on EduChain. The issued certificate
                will be anchored to the blockchain and available for instant verification.
              </p>
            </header>

            <section className="mt-8 rounded-2xl border border-[#4169E1]/30 bg-[#1a1f2e] p-8 md:p-10 shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field icon={User2} label="Student Name" name="studentName" value={form.studentName} onChange={onChange} placeholder="Enter full name" />
                  <Field icon={Building2} label="Institution" name="institution" value={form.institution} onChange={onChange} placeholder="University/College name" />
                  <Field icon={GraduationCap} label="Degree/Certificate" name="degree" value={form.degree} onChange={onChange} placeholder="e.g., Bachelor of Science" />
                  <Field icon={BookOpenText} label="Field of Study" name="field" value={form.field} onChange={onChange} placeholder="e.g., Computer Science" />
                  <Field icon={CalendarDays} label="Issue Date" name="issueDate" type="date" value={form.issueDate} onChange={onChange} />
                  <Field icon={Hash} label="Credential ID" name="credentialId" value={form.credentialId} onChange={onChange} placeholder="Unique identifier" />
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit || submitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#4169E1] px-6 py-4 text-lg font-semibold text-white transition hover:brightness-110 disabled:opacity-50 disabled:hover:brightness-100"
                >
                  {submitting ? 'Issuing...' : 'Issue Certificate'}
                </button>
              </form>

              {result?.status === 'ISSUED' && (
                <div className="mt-6 rounded-xl border border-[#2d3748] bg-[#0f1419] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="flex items-center gap-2 text-sm font-semibold text-white">
                      <CheckCircle2 size={16} className="text-[#10b981]" /> Issuance result
                    </p>
                    <span className="rounded-full bg-[#10b981]/15 px-3 py-1 text-xs font-bold text-[#10b981]">
                      ISSUED
                    </span>
                  </div>
                  <div className="mt-3 grid gap-3 text-sm">
                    <InfoRow label="CERTIFICATE HASH">
                      <code className="rounded-lg bg-black/20 p-3 font-mono text-xs text-white ring-1 ring-white/10 break-all block">
                        {result.certHash}
                      </code>
                    </InfoRow>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] uppercase tracking-[0.18em] text-[#64748b]">QUICK VERIFY LINK</span>
                      <Link
                        to={`/verify?hash=${encodeURIComponent(result.certHash)}`}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#5B9FE3] hover:underline break-all"
                      >
                        <ExternalLink size={11} />
                        Open verification for this hash
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

const Field = ({ icon: Icon, label, ...props }) => (
  <label className="block space-y-2">
    <span className="flex items-center gap-2 text-xs font-semibold text-[#64748b] uppercase tracking-[0.14em]">
      <Icon size={14} className="text-[#5B9FE3]" />
      {label}
    </span>
    <input
      {...props}
      className="w-full rounded-lg border border-[#2d3748] bg-[#1a1f2e] px-4 py-3 text-sm text-white placeholder:text-[#64748b] outline-none transition focus:border-[#4169E1]"
    />
  </label>
);

const InfoRow = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[11px] uppercase tracking-[0.18em] text-[#64748b]">{label}</span>
    {children}
  </div>
);

export default IssueCertificatePage;
