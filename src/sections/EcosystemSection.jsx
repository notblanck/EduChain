import React from 'react';

const cards = [
  {
    title: 'Institutions',
    description:
      'Issue tamper-proof certificates to your graduates instantly. Reduce administrative overhead and prevent credential fraud.',
    cta: 'Learn More'
  },
  {
    title: 'Students',
    description:
      'Take ownership of your academic achievements. Store and share your verified credentials with employers securely.',
    cta: 'Manage Profile'
  },
  {
    title: 'Verifiers',
    description:
      'Instant verification with zero-knowledge proofs. Ensure the authenticity of any claim in seconds without extra costs.',
    cta: 'Start Verifying'
  }
];

const EcosystemSection = () => {
  return (
    <section className="ecosystem-section">
      <div className="ecosystem-inner">
        <h2 className="section-title">Our Ecosystem</h2>
        <p className="section-subtitle">
          Tailored solutions for every stakeholder in the educational and
          professional verification process.
        </p>
        <div className="ecosystem-grid">
          {cards.map(card => (
            <article key={card.title} className="ecosystem-card">
              <div className="ecosystem-icon" />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <button type="button" className="link-button">
                {card.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;

