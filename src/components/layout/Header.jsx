import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useWallet } from '../../context/WalletContext.jsx';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { wallet, connect, disconnect } = useWallet();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLanding = location.pathname === '/';

  useEffect(() => {
    const handleClickOutside = event => {
      const headerEl = document.querySelector('.site-header');
      if (!headerEl) return;
      if (mobileOpen && !headerEl.contains(event.target)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen]);

  const handleNavClick = path => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleConnectClick = () => {
    if (wallet.connected) {
      disconnect();
      setMobileOpen(false);
    } else {
      connect('MetaMask');
      navigate('/connect-wallet');
      setMobileOpen(false);
    }
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <button
          className="brand"
          type="button"
          onClick={() => navigate('/')}
        >
          <div className="brand-mark" />
          <span className="brand-text">EduChain</span>
        </button>

        <nav className="main-nav">
          <NavLink to="/" className="nav-link">
            How it Works
          </NavLink>
          <NavLink to="/institutions" className="nav-link">
            Institutions
          </NavLink>
          <NavLink to="/students" className="nav-link">
            Students
          </NavLink>
          <NavLink to="/verify" className="nav-link">
            Verify
          </NavLink>
          <NavLink to="/api" className="nav-link">
            API
          </NavLink>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleConnectClick}
          >
            {wallet.connected && wallet.address
              ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`
              : 'Connect Wallet'}
          </button>
          <button
            type="button"
            className="avatar-circle"
            aria-label="Open profile registration"
            onClick={() => navigate('/register')}
          >
            <span>AR</span>
          </button>
        </div>

        <button
          type="button"
          className="mobile-toggle"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMobileOpen(open => !open)}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          <button type="button" className="mobile-link" onClick={() => handleNavClick('/')}>
            How it Works
          </button>
          <button
            type="button"
            className="mobile-link"
            onClick={() => handleNavClick('/institutions')}
          >
            Institutions
          </button>
          <button
            type="button"
            className="mobile-link"
            onClick={() => handleNavClick('/students')}
          >
            Students
          </button>
          <button type="button" className="mobile-link" onClick={() => handleNavClick('/verify')}>
            Verify
          </button>
          <button type="button" className="mobile-link" onClick={() => handleNavClick('/api')}>
            API
          </button>
          <button
            type="button"
            className="mobile-connect"
            onClick={handleConnectClick}
          >
            {wallet.connected && wallet.address
              ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`
              : 'Connect Wallet'}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;

