import React from 'react';

const rows = [
  { id: '#CR-90412', name: 'Jordan Smith', date: 'Oct 12, 2023', status: 'ISSUED' },
  { id: '#CR-90413', name: 'Maya Kaur', date: 'Oct 14, 2023', status: 'VERIFIED' },
  { id: '#CR-90414', name: 'Liam Brown', date: 'Oct 15, 2023', status: 'PENDING' },
  { id: '#CR-90415', name: 'Alice Wong', date: 'Oct 15, 2023', status: 'ISSUED' },
  { id: '#CR-90416', name: 'Tom Riddle', date: 'Oct 16, 2023', status: 'REVOKED' }
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

const DashboardPage = () => {
  return (
    <section className="dashboard-page">
      <div className="dashboard-shell">
        <aside className="dashboard-sidebar">
          <div className="sidebar-brand">
            <div className="sidebar-logo">C</div>
            <div>
              <h2>CertifyChain</h2>
              <p>Admin Dashboard</p>
            </div>
          </div>
          <nav className="sidebar-nav">
            <button type="button" className="sidebar-link active">
              Dashboard
            </button>
            <button type="button" className="sidebar-link">
              Issue
            </button>
            <button type="button" className="sidebar-link">
              Verify
            </button>
            <button type="button" className="sidebar-link">
              Records
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
              <p className="profile-name">Dr. Alex Rivers</p>
              <p className="profile-role">Academic Dean</p>
            </div>
          </div>
        </aside>

        <div className="dashboard-main">
          <header className="dashboard-header">
            <h1>Dashboard</h1>
          </header>

          <div className="dashboard-content">
            <div className="dashboard-card">
              <div className="table-header">
                <h2>Recent Certificates</h2>
                <span className="table-caption">Showing 5 of 1,284 results</span>
              </div>
              <div className="table-wrapper">
                <table className="cert-table">
                  <thead>
                    <tr>
                      <th>Certificate ID</th>
                      <th>Student Name</th>
                      <th>Date Issued</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(row => (
                      <tr key={row.id}>
                        <td className="link-cell">{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.date}</td>
                        <td>
                          <span className={statusClass(row.status)}>{row.status}</span>
                        </td>
                        <td>
                          <button type="button" className="link-button">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-pagination">
                <span>1</span>
                <span>2</span>
                <span>3</span>
              </div>
            </div>

            <div className="dashboard-right">
              <div className="dashboard-card">
                <h2>Verification Activity</h2>
                <ul className="activity-list">
                  <li>
                    <span className="dot dot-green" />
                    <div>
                      <p>
                        Global Tech HR verified certificate <strong>#CR-8821</strong>
                      </p>
                      <span className="activity-time">2 minutes ago</span>
                    </div>
                  </li>
                  <li>
                    <span className="dot dot-blue" />
                    <div>
                      <p>New batch of 45 certificates minted successfully</p>
                      <span className="activity-time">1 hour ago</span>
                    </div>
                  </li>
                  <li>
                    <span className="dot dot-yellow" />
                    <div>
                      <p>System maintenance scheduled for tonight at 12 PM</p>
                      <span className="activity-time">3 hours ago</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="dashboard-card">
                <h2>Blockchain Network Status</h2>
                <p className="network-caption">
                  Connected to Ethereum Mainnet via Infura Node #821
                </p>
                <div className="network-grid">
                  <div>
                    <span className="label">Avg Gas Price</span>
                    <p className="metric">18.4 Gwei</p>
                  </div>
                  <div>
                    <span className="label">Block Confirmations</span>
                    <p className="metric">128+</p>
                  </div>
                </div>
                <button type="button" className="btn btn-light full-width">
                  View Explorer Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;

