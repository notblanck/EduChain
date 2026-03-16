import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState({
    connected: false,
    address: '',
    provider: ''
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWallet({
        connected: true,
        address: savedAddress,
        provider: 'MetaMask'
      });
    }
  }, []);

  const handleAccountsChanged = useCallback((accounts) => {
    if (accounts.length === 0) {
      // User disconnected
      disconnect();
    } else {
      const newAddress = accounts[0];
      setWallet({
        connected: true,
        address: newAddress,
        provider: 'MetaMask'
      });
      localStorage.setItem('walletAddress', newAddress);
    }
  }, []);

  const handleChainChanged = useCallback(() => {
    window.location.reload();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [handleAccountsChanged, handleChainChanged]);

  const connect = async (providerName = 'MetaMask') => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          const address = accounts[0];
          setWallet({
            connected: true,
            address,
            provider: providerName
          });
          localStorage.setItem('walletAddress', address);
        }
      } catch (err) {
        console.error('Failed to connect wallet:', err);
        alert('Failed to connect wallet. See console for details.');
      }
    } else {
      alert('Please install MetaMask to use this app.');
    }
  };

  const disconnect = () => {
    setWallet({
      connected: false,
      address: '',
      provider: ''
    });
    localStorage.removeItem('walletAddress');
  };

  const value = useMemo(
    () => ({
      wallet,
      connect,
      disconnect
    }),
    [wallet, connect, disconnect] // Recreate if these functions change, though disconnect could be useCallback too if needed
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

