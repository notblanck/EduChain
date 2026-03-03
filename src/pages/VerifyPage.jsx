const VerifyPage = () => {
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
              Instantly validate credentials issued on the Ethereum blockchain. Secure, immutable,
              and trusted verification.
            </p>
          </header>

          <section className="mt-8 rounded-2xl border border-[#4169E1]/30 bg-[#1a1f2e] p-8 md:p-10 shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
            <div className="space-y-5">
              <label className="block space-y-2" htmlFor="certificateId">
                <span className="text-xs font-semibold text-[#64748b] uppercase tracking-[0.14em]">
                  Certificate ID / Hash
                </span>
                <input
                  id="certificateId"
                  type="text"
                  className="w-full rounded-lg border border-[#2d3748] bg-[#1a1f2e] px-4 py-3 text-sm text-white placeholder:text-[#64748b] outline-none transition focus:border-[#4169E1]"
                  placeholder="dj2lje3h2l9ir21"
                />
              </label>

              <div className="rounded-xl border-2 border-dashed border-[#2d3748] bg-[#1a1f2e] px-6 py-8 text-center">
                <p className="text-sm font-semibold text-white">
                  Click to upload or drag and drop
                </p>
                <p className="mt-2 text-xs text-[#94a3b8]">JSON or PDF certificate files</p>
              </div>

              <button
                type="button"
                className="w-full rounded-xl bg-[#4169E1] px-6 py-4 text-lg font-semibold text-white transition hover:brightness-110"
              >
                Verify Now
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default VerifyPage;

