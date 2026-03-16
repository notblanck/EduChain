import React from 'react';
import { Link } from 'react-router-dom';

const FooterSection = () => {
  return (
    <footer className="footer-section">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>EduChain</h3>
          <p>
            Building the future of trust in educational and professional
            credentials through decentralized technology.
          </p>
        </div>
        <div className="footer-columns">
          <div className="footer-column">
            <h4>Platform</h4>
            <ul>
              <li>
                <Link to="/insurance">Insurance Tool</Link>
              </li>
              <li>
                <Link to="/verify">Verification Hub</Link>
              </li>
              <li>
                <Link to="/network-status">Network Status</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li>
                <Link to="/docs">Documentation</Link>
              </li>
              <li>
                <Link to="/api-reference">API Reference</Link>
              </li>
              <li>
                <Link to="/case-studies">Case Studies</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Connect</h4>
            <ul>
              <li>
                <a href="#community" target="_blank" rel="noopener noreferrer">
                  Community
                </a>
              </li>
              <li>
                <a href="mailto:contact@educhain.com">Email Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

