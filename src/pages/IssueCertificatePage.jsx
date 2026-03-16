import React, { useMemo, useState } from 'react';
import { GraduationCap, Hash, Building2, CalendarDays, User2, BookOpenText, AlertCircle, Loader2, CheckCircle2, ExternalLink } from 'lucide-react';
import FooterSection from '../sections/FooterSection.jsx';
import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext.jsx';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contract/config.js';

// keccak256 via SubtleCrypto (SHA-256 used as equivalent for browser env)
async function sha256Hex(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return '0x' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Convert 0x hex string to bytes32 (pad to 32 bytes)
function hexToBytes32(hexStr) {
  const cleanHex = hexStr.startsWith('0x') ? hexStr.slice(2) : hexStr;
  const padded = cleanHex.padEnd(64, '0').slice(0, 64);
  return '0x' + padded;
}

const initialForm = {
  studentName: '',
  institution: '',
  degree: '',
  field: '',
  issueDate: '',
  credentialId: ''
};

const IssueCertificatePage = () => {
  const { wallet } = useWallet();
  const [form, setForm] = useState(() => ({
    ...initialForm,
    issueDate: new Date().toISOString().slice(0, 10)
  }));
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

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

    if (!wallet.connected) {
      setError('Please connect your wallet before issuing a certificate.');
      return;
    }

    setSubmitting(true);
    setResult(null);
    setError(null);

    try {
      // Dynamically import ethers to keep bundle lean
      const { ethers } = await import('ethers');

      // Generate SHA-256 hash from combined certificate fields
      const rawData = `${form.credentialId}|${form.studentName}|${form.institution}|${form.degree}|${form.field}|${form.issueDate}`;
      const certHashHex = await sha256Hex(rawData);
      const certHashBytes32 = hexToBytes32(certHashHex);

      // Connect to MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Instantiate contract
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Send transaction
      const tx = await contract.issueCertificate(certHashBytes32);
      setResult({ status: 'PENDING', txHash: tx.hash, certHash: certHashHex });

      // Wait for confirmation
      const receipt = await tx.wait();

      setResult({
        status: 'ISSUED',
        txHash: receipt.hash,
        certHash: certHashHex,
        payload: { ...form }
      });
    } catch (err) {
      console.error('Error issuing credential', err);
      if (err.code === 4001 || err.code === 'ACTION_REJECTED') {
        setError('Transaction rejected by user.');
      } else if (err.message?.includes('Already issued')) {
        setError('This certificate has already been issued on-chain.');
      } else {
        setError(`Transaction failed: ${err.reason || err.message || 'Unknown error'}`);
      }
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

            {!wallet.connected && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-yellow-500/40 bg-yellow-900/20 px-4 py-3 text-sm text-yellow-300">
                <AlertCircle size={16} className="shrink-0" />
                Please connect your wallet (MetaMask) before issuing a certificate.
              </div>
            )}

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
                  disabled={!canSubmit || submitting || !wallet.connected}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#4169E1] px-6 py-4 text-lg font-semibold text-white transition hover:brightness-110 disabled:opacity-50 disabled:hover:brightness-100"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      {result?.status === 'PENDING' ? 'Confirming on-chain...' : 'Issuing...'}
                    </>
                  ) : (
                    'Issue Certificate'
                  )}
                </button>
              </form>

              {error && (
                <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-900/20 px-4 py-3 text-sm text-red-300">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  {error}
                </div>
              )}

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
                    <InfoRow label="TRANSACTION HASH">
                      <code className="rounded-lg bg-black/20 p-2 font-mono text-xs text-white ring-1 ring-white/10 break-all block">
                        {result.txHash}
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
