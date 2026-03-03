import React from 'react';
import { Wallet, ShieldCheck, LockKeyhole } from 'lucide-react';
import FooterSection from '../sections/FooterSection.jsx';
import { useWallet } from '../context/WalletContext.jsx';

const providers = [
  {
    id: 'metamask',
    name: 'MetaMask',
    description: 'Browser extension & mobile wallet',
    badge: 'Recommended'
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    description: 'Connect any mobile wallet',
    badge: 'Multi‑wallet'
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    description: 'For Coinbase ecosystem users',
    badge: 'Popular'
  }
];

const ConnectWalletPage = () => {
  const { wallet, connect, disconnect } = useWallet();

  return (
    <>
      <main className="min-h-screen bg-[#0a0e1a] text-[#94a3b8] pt-24 pb-24">
        <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
          <section className="w-full space-y-8 rounded-2xl border border-[#2d3748] bg-[#1a1f2e] p-8 md:p-12 shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0f1419] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748b]">
              <Wallet size={16} className="text-[#5B9FE3]" />
              <span>Connect wallet</span>
            </div>
            <div className="space-y-3">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Connect your wallet to manage EduChain credentials
              </h1>
              <p className="text-sm md:text-base text-[#94a3b8]">
                We never custody your keys. Connections are used only to prove ownership of the
                address that controls your credentials.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3 text-left">
              {providers.map(provider => (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() => connect(provider.name)}
                  className="flex flex-col items-start gap-2 rounded-xl border border-[#2d3748] bg-[#0f1419] p-4 text-left transition hover:border-[#4169E1]/60"
                >
                  <div className="flex items-center justify-between w-full">
                    <p className="text-sm font-semibold text-white">{provider.name}</p>
                    <span className="rounded-full bg-[#1a1f2e] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#64748b]">
                      {provider.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#94a3b8]">{provider.description}</p>
                  <span className="mt-1 text-xs font-semibold text-[#4169E1]">Connect</span>
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-[#1e293b] bg-[#0f1419] p-4 text-left text-xs md:text-sm flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-[#0b1120] p-2">
                  <ShieldCheck size={16} className="text-[#10b981]" />
                </div>
                <div>
                  <p className="font-semibold text-white">Security & privacy</p>
                  <p className="text-[#94a3b8]">
                    Signing a message proves wallet ownership without sharing your private key or
                    seed phrase.
                  </p>
                </div>
              </div>
              {wallet.connected && (
                <button
                  type="button"
                  onClick={disconnect}
                  className="mt-2 inline-flex items-center justify-center rounded-full border border-[#4169E1] px-4 py-2 text-xs font-semibold text-[#4169E1] hover:bg-[#4169E1]/5 md:mt-0"
                >
                  Disconnect
                </button>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-[#64748b]">
              <LockKeyhole size={14} />
              <span>
                EduChain will never ask you to share your private keys. Always verify the URL before
                connecting.
              </span>
            </div>

            {wallet.connected && (
              <div className="rounded-xl border border-[#10b981]/40 bg-[#022c22] px-4 py-3 text-xs text-left text-[#bbf7d0]">
                Connected as{' '}
                <span className="font-mono font-semibold text-white">{wallet.address}</span> via{' '}
                <span className="font-semibold">{wallet.provider}</span>.
              </div>
            )}
          </section>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default ConnectWalletPage;

