import React from 'react';

const FooterSection = () => {
  return (
    <footer className="footer-section">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>ChainVerify</h3>
          <p>
            Building the future of trust in educational and professional
            credentials through decentralized technology.
          </p>
        </div>
        <div className="footer-columns">
          <div className="footer-column">
            <h4>Platform</h4>
            <ul>
              <li>Issuance Tool</li>
              <li>Verification Hub</li>
              <li>Network Status</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li>Documentation</li>
              <li>API Reference</li>
              <li>Case Studies</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Connect</h4>
            <ul>
              <li>Community</li>
              <li>Email</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

