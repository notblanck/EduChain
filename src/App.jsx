import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell.jsx';
import LandingPage from './pages/LandingPage.jsx';
import VerifyPage from './pages/VerifyPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import CertificatePage from './pages/CertificatePage.jsx';
import HowItWorksPage from './pages/HowItWorksPage.jsx';
import InstitutionsPage from './pages/InstitutionsPage.jsx';
import StudentsPage from './pages/StudentsPage.jsx';
import ApiPage from './pages/ApiPage.jsx';
import ConnectWalletPage from './pages/ConnectWalletPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import IssueCertificatePage from './pages/IssueCertificatePage.jsx';
import NetworkStatusPage from './pages/NetworkStatusPage.jsx';
import DocsPage from './pages/DocsPage.jsx';
import CaseStudiesPage from './pages/CaseStudiesPage.jsx';
import CommunityPage from './pages/CommunityPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import InsurancePage from './pages/InsurancePage.jsx';
import ApiReferencePage from './pages/ApiReferencePage.jsx';

const App = () => {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HowItWorksPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/institutions" element={<InstitutionsPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/issue" element={<IssueCertificatePage />} />
        <Route path="/api" element={<ApiPage />} />
        <Route path="/connect-wallet" element={<ConnectWalletPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/network" element={<NetworkStatusPage />} />
        <Route path="/network-status" element={<NetworkStatusPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/insurance" element={<InsurancePage />} />
        <Route path="/api-reference" element={<ApiReferencePage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/certificate" element={<CertificatePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
};

export default App;

