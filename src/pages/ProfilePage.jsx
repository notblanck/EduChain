import React from 'react';
import FooterSection from '../sections/FooterSection.jsx';
import { useWallet } from '../context/WalletContext.jsx';

const activity = [
  {
    color: 'dot-green',
    text: 'Credential #CR-90412 verified by Global Tech HR',
    time: '5 minutes ago'
  },
  {
    color: 'dot-blue',
    text: 'New credential issued by Global Tech University',
    time: '2 days ago'
  },
  {
    color: 'dot-yellow',
    text: 'Employer access link generated for Data Science program',
    time: '1 week ago'
  }
];

const credentials = [
  {
    id: '#CR-90412',
    name: 'Bachelor of Computer Science',
    issuer: 'Global Tech University',
    year: '2024',
    status: 'VERIFIED'
  },
  {
    id: '#CR-88210',
    name: 'Machine Learning Nanodegree',
    issuer: 'Open Skills Institute',
    year: '2023',
    status: 'ISSUED'
  }
];

const statusClass = status => {
  switch (status) {
    case 'ISSUED':
      return 'badge badge-issued';
    case 'VERIFIED':
      return 'badge badge-verified';
    case 'PENDING':
      return 'badge badge-pending';
    case 'REVOKED':
      return 'badge badge-revoked';
    default:
      return 'badge';
  }
};

const ProfilePage = () => {
  const { wallet } = useWallet();

  const address = wallet.address || '0xA1B2...C3D4';

  return (
    <>
      <main className="dashboard-page bg-[#0a0e1a] text-[#94a3b8]">
        <div className="dashboard-shell">
          {/* Sidebar reused from dashboard style */}
          <aside className="dashboard-sidebar">
            <div className="sidebar-brand">
              <div className="sidebar-logo">E</div>
              <div>
                <h2>EduChain</h2>
                <p>Profile</p>
              </div>
            </div>
            <nav className="sidebar-nav">
              <button type="button" className="sidebar-link active">
                Overview
              </button>
              <button type="button" className="sidebar-link">
                Credentials
              </button>
              <button type="button" className="sidebar-link">
                Activity
              </button>
              <button type="button" className="sidebar-link">
                Settings
              </button>
            </nav>
            <div className="sidebar-profile">
              <div className="avatar-circle avatar-sm">
                <span>AR</span>
              </div>
              <div>
                <p className="profile-name">Alex Rivers</p>
                <p className="profile-role">Wallet owner</p>
              </div>
            </div>
          </aside>

          {/* Main profile content */}
          <div className="dashboard-main">
            <header className="dashboard-header">
              <h1>Profile</h1>
            </header>

            <div className="dashboard-content">
              {/* Left column: wallet + credentials */}
              <div className="dashboard-card">
                <div className="table-header">
                  <h2>Wallet & credentials</h2>
                </div>

                <div className="space-y-4 text-sm">
                  <div>
                    <span className="label">Wallet address</span>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="hash">
                        <code>{address}</code>
                      </span>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        style={{ paddingInline: '14px', fontSize: '11px' }}
                        onClick={() => navigator.clipboard?.writeText(address)}
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="table-wrapper">
                    <table className="cert-table">
                      <thead>
                        <tr>
                          <th>Credential</th>
                          <th>Issuer</th>
                          <th>Year</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {credentials.map(row => (
                          <tr key={row.id}>
                            <td className="link-cell">{row.name}</td>
                            <td>{row.issuer}</td>
                            <td>{row.year}</td>
                            <td>
                              <span className={statusClass(row.status)}>{row.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right column: activity + settings */}
              <div className="dashboard-right">
                <div className="dashboard-card">
                  <h2>Recent activity</h2>
                  <ul className="activity-list">
                    {activity.map(item => (
                      <li key={item.text}>
                        <span className={`dot ${item.color}`} />
                        <div>
                          <p>{item.text}</p>
                          <span className="activity-time">{item.time}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="dashboard-card">
                  <h2>Settings</h2>
                  <p className="network-caption">
                    Control how your credentials appear when you share your EduChain profile link.
                  </p>
                  <div className="network-grid">
                    <div>
                      <span className="label">Privacy mode</span>
                      <p className="metric">Employer‑friendly</p>
                    </div>
                    <div>
                      <span className="label">Default view</span>
                      <p className="metric">Credential grid</p>
                    </div>
                  </div>
                  <button type="button" className="btn btn-light full-width">
                    Manage sharing settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default ProfilePage;

