import React from 'react';

const VerifyPage = () => {
  return (
    <section className="verify-page">
      <div className="verify-inner">
        <header className="verify-header">
          <h1>Verify Blockchain Certificate</h1>
          <p>
            Instantly validate credentials issued on the Ethereum blockchain.
            Secure, immutable, and trusted verification.
          </p>
        </header>

        <div className="verify-card">
          <label className="field-label" htmlFor="certificateId">
            Certificate ID / Hash
          </label>
          <input
            id="certificateId"
            type="text"
            className="text-input"
            placeholder="dj2lje3h2l9ir21"
          />

          <div className="file-upload">
            <p className="file-upload-title">Click to upload or drag and drop</p>
            <p className="file-upload-subtitle">JSON or PDF certificate files</p>
          </div>

          <button type="button" className="btn btn-primary verify-btn">
            Verify Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default VerifyPage;

