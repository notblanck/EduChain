import React, { createContext, useContext, useState, useMemo } from 'react';

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState({
    connected: false,
    address: '',
    provider: ''
  });

  const connect = providerName => {
    // Simulated connection – replace with real wallet integration as needed
    const mockAddress = '0xA1B2...C3D4';
    setWallet({
      connected: true,
      address: mockAddress,
      provider: providerName
    });
  };

  const disconnect = () => {
    setWallet({
      connected: false,
      address: '',
      provider: ''
    });
  };

  const value = useMemo(
    () => ({
      wallet,
      connect,
      disconnect
    }),
    [wallet]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return ctx;
};

