import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { blockchain } from '../../blockchain.js';

const VerifyPage = () => {
  const [searchParams] = useSearchParams();
  const [input, setInput] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

  const hashFromQuery = searchParams.get('hash') || '';

  useEffect(() => {
    if (hashFromQuery) {
      setInput(hashFromQuery);
      handleVerify(hashFromQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hashFromQuery]);

  const handleVerify = value => {
    const target = (value ?? input).trim();
    if (!target) return;

    setVerifying(true);
    setResult(null);

    // Slight delay to mimic async call / show loading state
    setTimeout(() => {
      const verification = blockchain.verifyCredential(target);

      if (verification.valid) {
        setResult({ status: 'valid', data: verification });
      } else {
        setResult({ status: 'invalid' });
      }
      setVerifying(false);
    }, 400);
  };

  const onSubmit = e => {
    e.preventDefault();
    handleVerify();
  };

  const onFileChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setUploadedImage({
      name: file.name,
      size: file.size,
      url
    });
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <main className="min-h-screen bg-[#0a0e1a] text-[#94a3b8] pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <header className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.28em] text-[#64748b] uppercase">
              VERIFICATION
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Verify Blockchain Certificate
            </h1>
            <p className="text-sm md:text-base text-[#94a3b8]">
              Instantly validate credentials issued on the EduChain blockchain. Secure, immutable,
              and trusted verification.
            </p>
          </header>

          <section className="mt-8 rounded-2xl border border-[#4169E1]/30 bg-[#1a1f2e] p-8 md:p-10 shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
            <form onSubmit={onSubmit} className="space-y-5">
              <label className="block space-y-2" htmlFor="certificateId">
                <span className="text-xs font-semibold text-[#64748b] uppercase tracking-[0.14em]">
                  Certificate ID / Hash
                </span>
                <input
                  id="certificateId"
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className="w-full rounded-lg border border-[#2d3748] bg-[#1a1f2e] px-4 py-3 text-sm text-white placeholder:text-[#64748b] outline-none transition focus:border-[#4169E1]"
                  placeholder="Paste certificate hash or ID"
                />
              </label>

              <div
                className="rounded-xl border-2 border-dashed border-[#2d3748] bg-[#1a1f2e] px-6 py-8 text-center cursor-pointer"
                onClick={openFilePicker}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onFileChange}
                />
                <p className="text-sm font-semibold text-white">
                  Click to upload or drag and drop
                </p>
                <p className="mt-2 text-xs text-[#94a3b8]">
                  Upload a certificate image (PNG, JPG, JPEG)
                </p>

                {uploadedImage && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs text-[#64748b]">
                      Previewing: <span className="text-[#e2e8f0]">{uploadedImage.name}</span>
                    </p>
                    <div className="mx-auto max-w-xs overflow-hidden rounded-lg border border-[#2d3748] bg-black/20">
                      <img
                        src={uploadedImage.url}
                        alt="Uploaded certificate preview"
                        className="w-full object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#4169E1] px-6 py-4 text-lg font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
                disabled={verifying || !input.trim()}
              >
                {verifying ? 'Verifying…' : 'Verify Now'}
              </button>
            </form>

            {result && (
              <div
                className={`mt-6 rounded-xl border p-5 text-sm ${
                  result.status === 'valid'
                    ? 'border-[#10b981]/60 bg-[#022c22]'
                    : 'border-[#ef4444]/60 bg-[#2b0b0b]'
                }`}
              >
                {result.status === 'valid' ? (
                  <>
                    <p className="text-base font-semibold text-[#bbf7d0]">✅ Verified</p>
                    <p className="mt-1 text-xs text-[#a5b4fc]">
                      This certificate exists on the EduChain ledger.
                    </p>
                    <div className="mt-4 grid gap-2 text-xs text-[#e5e7eb]">
                      <DetailRow label="Student" value={result.data.credential.studentName} />
                      <DetailRow label="Institution" value={result.data.credential.institution} />
                      <DetailRow label="Degree" value={result.data.credential.degree} />
                      <DetailRow label="Field" value={result.data.credential.field} />
                      <DetailRow
                        label="Issue date"
                        value={new Date(result.data.credential.issueDate).toLocaleDateString()}
                      />
                      <DetailRow
                        label="Credential hash"
                        value={result.data.credential.hash}
                        mono
                      />
                      <DetailRow label="Block index" value={String(result.data.blockIndex)} />
                      <DetailRow label="Block hash" value={result.data.blockHash} mono />
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-base font-semibold text-[#fecaca]">❌ Not Verified</p>
                    <p className="mt-1 text-xs text-[#fda4af]">
                      No credential matching this hash or ID was found. Please confirm the value and
                      try again.
                    </p>
                  </>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

const DetailRow = ({ label, value, mono }) => {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-[0.16em] text-[#9ca3af]">{label}</span>
      <span
        className={`text-xs text-white ${
          mono ? 'font-mono break-all bg-black/20 rounded px-2 py-1' : ''
        }`}
      >
        {value}
      </span>
    </div>
  );
};

export default VerifyPage;

