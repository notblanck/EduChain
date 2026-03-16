import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AlertCircle, Loader2 } from 'lucide-react';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contract/config.js';

const VerifyPage = () => {
  const [searchParams] = useSearchParams();
  const [input, setInput] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);
  const objectUrlRef = useRef(null);

  const hashFromQuery = searchParams.get('hash') || '';

  // Pad/trim hex string to bytes32
  function hexToBytes32(hexStr) {
    const cleanHex = hexStr.startsWith('0x') ? hexStr.slice(2) : hexStr;
    const padded = cleanHex.padEnd(64, '0').slice(0, 64);
    return '0x' + padded;
  }

  function isValidHex(value) {
    const clean = value.startsWith('0x') ? value.slice(2) : value;
    return /^[0-9a-fA-F]{1,64}$/.test(clean);
  }

  async function handleVerify(value) {
    const target = (value ?? input).trim();
    if (!target) return;

    if (!isValidHex(target)) {
      setValidationError('Invalid hash format. Please enter a valid hex string (0x...).');
      setResult(null);
      return;
    }

    setValidationError(null);
    setVerifying(true);
    setResult(null);

    try {
      const { ethers } = await import('ethers');

      let provider;
      if (typeof window !== 'undefined' && window.ethereum) {
        provider = new ethers.BrowserProvider(window.ethereum);
      } else {
        // Fall back to localhost for testing
        provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
      }

      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const bytes32Hash = hexToBytes32(target);

      const [exists, issuer, issuedAt] = await contract.getCertificate(bytes32Hash);

      if (exists) {
        setResult({
          status: 'valid',
          hash: target,
          issuer,
          issuedAt: Number(issuedAt)
        });
      } else {
        setResult({ status: 'invalid' });
      }
    } catch (err) {
      console.error('Verification error', err);
      setResult({
        status: 'error',
        message: err.reason || err.message || 'Failed to connect to the contract.'
      });
    } finally {
      setVerifying(false);
    }
  }

  useEffect(() => {
    if (hashFromQuery) {
      setInput(hashFromQuery);
      handleVerify(hashFromQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hashFromQuery]);

  const onSubmit = e => {
    e.preventDefault();
    handleVerify();
  };

  const onFileChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setUploadedImage({ name: file.name, size: file.size, url });
  };

  const openFilePicker = () => fileInputRef.current?.click();

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, []);

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
                  Certificate Hash (0x...)
                </span>
                <input
                  id="certificateId"
                  type="text"
                  value={input}
                  onChange={e => {
                    setInput(e.target.value);
                    setValidationError(null);
                  }}
                  className="w-full rounded-lg border border-[#2d3748] bg-[#1a1f2e] px-4 py-3 text-sm text-white placeholder:text-[#64748b] outline-none transition focus:border-[#4169E1] font-mono"
                  placeholder="Paste certificate hash (0x...)"
                />
              </label>

              {validationError && (
                <div className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-900/20 px-4 py-3 text-sm text-red-300">
                  <AlertCircle size={15} className="shrink-0" />
                  {validationError}
                </div>
              )}

              <div
                className="rounded-xl border-2 border-dashed border-[#2d3748] bg-[#1a1f2e] px-6 py-8 text-center cursor-pointer"
                onClick={openFilePicker}
              >
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                <p className="text-sm font-semibold text-white">Click to upload or drag and drop</p>
                <p className="mt-2 text-xs text-[#94a3b8]">Upload a certificate image (PNG, JPG, JPEG)</p>
                {uploadedImage && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs text-[#64748b]">
                      Previewing: <span className="text-[#e2e8f0]">{uploadedImage.name}</span>
                    </p>
                    <div className="mx-auto max-w-xs overflow-hidden rounded-lg border border-[#2d3748] bg-black/20">
                      <img src={uploadedImage.url} alt="Uploaded certificate preview" className="w-full object-contain" />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#4169E1] px-6 py-4 text-lg font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
                disabled={verifying || !input.trim()}
              >
                {verifying ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Verifying…
                  </>
                ) : (
                  'Verify Now'
                )}
              </button>
            </form>

            {result && (
              <div
                className={`mt-6 rounded-xl border p-5 text-sm ${
                  result.status === 'valid'
                    ? 'border-[#10b981]/60 bg-[#022c22]'
                    : result.status === 'error'
                    ? 'border-yellow-500/60 bg-yellow-900/20'
                    : 'border-[#ef4444]/60 bg-[#2b0b0b]'
                }`}
              >
                {result.status === 'valid' ? (
                  <>
                    <p className="text-base font-semibold text-[#bbf7d0]">✅ Certificate Verified</p>
                    <p className="mt-1 text-xs text-[#a5b4fc]">
                      This certificate hash exists on the EduChain smart contract.
                    </p>
                    <div className="mt-4 grid gap-2 text-xs text-[#e5e7eb]">
                      <DetailRow label="Certificate Hash" value={result.hash} mono />
                      <DetailRow label="Issuer Address" value={result.issuer} mono />
                      <DetailRow
                        label="Issued On"
                        value={result.issuedAt > 0
                          ? new Date(result.issuedAt * 1000).toLocaleString()
                          : 'N/A'
                        }
                      />
                    </div>
                  </>
                ) : result.status === 'error' ? (
                  <>
                    <p className="text-base font-semibold text-yellow-300">⚠️ Verification Error</p>
                    <p className="mt-1 text-xs text-yellow-200">{result.message}</p>
                    <p className="mt-2 text-xs text-[#64748b]">
                      Make sure the contract is deployed and your network is correct.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-base font-semibold text-[#fecaca]">❌ Certificate Not Found</p>
                    <p className="mt-1 text-xs text-[#fda4af]">
                      No certificate matching this hash was found on-chain. Confirm the value and try again.
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

const DetailRow = ({ label, value, mono }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[10px] uppercase tracking-[0.16em] text-[#9ca3af]">{label}</span>
    <span className={`text-xs text-white ${mono ? 'font-mono break-all bg-black/20 rounded px-2 py-1' : ''}`}>
      {value}
    </span>
  </div>
);

export default VerifyPage;
