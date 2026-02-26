import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell.jsx';
import LandingPage from './pages/LandingPage.jsx';
import VerifyPage from './pages/VerifyPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import CertificatePage from './pages/CertificatePage.jsx';

const App = () => {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/certificate" element={<CertificatePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
};

export default App;

