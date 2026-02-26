import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow">WEB3 INFRASTRUCTURE</p>
          <h1 className="hero-title">
            Secure
            <span> Blockchain-Based</span>
            <span> Certificate Verification</span>
          </h1>
          <p className="hero-subtitle">
            Empowering institutions and students with immutable, verifiable
            digital credentials on the decentralized web.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-primary hero-btn"
              onClick={() => navigate('/dashboard')}
            >
              Issue Certificate
            </button>
            <button
              type="button"
              className="btn btn-secondary hero-btn"
              onClick={() => navigate('/verify')}
            >
              Verify Certificate
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-glow" />
            <div className="hero-orb" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

