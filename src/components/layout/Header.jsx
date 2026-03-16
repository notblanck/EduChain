import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useWallet } from '../../context/WalletContext.jsx';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { wallet, connect, disconnect } = useWallet();

  const isLanding = location.pathname === '/';

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
            onClick={() => {
              if (wallet.connected) {
                disconnect();
              } else {
                connect('MetaMask');
                navigate('/connect-wallet');
              }
            }}
          >
            {wallet.connected ? 'Wallet Connected' : 'Connect Wallet'}
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
      </div>
    </header>
  );
};

export default Header;

