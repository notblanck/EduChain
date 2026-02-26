import React from 'react';

const CertificatePage = () => {
  return (
    <section className="certificate-page">
      <div className="certificate-inner">
        <div className="certificate-card">
          <div className="certificate-status-row">
            <span className="status-pill status-pill-success">
              Certificate Verified
            </span>
            <span className="status-caption">Authenticity confirmed on-chain</span>
          </div>

          <div className="certificate-grid">
            <div className="certificate-field">
              <span className="label">Issuer Name</span>
              <span className="value">Global Tech Institute</span>
            </div>
            <div className="certificate-field">
              <span className="label">Issue Date</span>
              <span className="value">October 24, 2023</span>
            </div>
            <div className="certificate-field">
              <span className="label">Blockchain Transaction Hash</span>
              <span className="value hash">
                0x9f8f...3e2d1cb89a87e6d5c4b3a2f1
              </span>
            </div>
            <div className="certificate-field">
              <span className="label">Network</span>
              <span className="value">Ethereum Mainnet</span>
            </div>
            <div className="certificate-field">
              <span className="label">Status</span>
              <span className="value status-active">Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatePage;

