import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
          <span className="brand-text">ChainVerify</span>
        </button>

        <nav className="main-nav">
          <NavLink to="/" className="nav-link">
            How it Works
          </NavLink>
          <NavLink to="/" className="nav-link">
            Institutions
          </NavLink>
          <NavLink to="/" className="nav-link">
            Students
          </NavLink>
          <NavLink to="/verify" className="nav-link">
            Verify
          </NavLink>
        </nav>

        <div className="header-actions">
          <button type="button" className="btn btn-ghost" disabled={!isLanding}>
            API
          </button>
          <button type="button" className="btn btn-primary">
            Connect Wallet
          </button>
          <div className="avatar-circle">
            <span>AR</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

