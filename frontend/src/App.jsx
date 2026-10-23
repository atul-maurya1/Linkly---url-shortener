import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';

// Public pages
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import VerifyEmailPage from './pages/auth/VerifyEmailPage';
import SessionExpiredPage from './pages/auth/SessionExpiredPage';

// Authenticated layout & views
import AppLayout from './components/dashboard/AppLayout';
import DashboardPage from './pages/DashboardPage';
import MyLinksPage from './pages/MyLinksPage';
import CreateLinkPage from './pages/CreateLinkPage';
import LinkAnalyticsPage from './pages/LinkAnalyticsPage';
import HistoryPage from './pages/HistoryPage';
import CustomDomainsPage from './pages/CustomDomainsPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <AppProvider>
      <AuthProvider>
          <BrowserRouter>
        <Routes>
          {/* Public Marketing & Pricing */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />

          {/* Authentication Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/session-expired" element={<SessionExpiredPage />} />

          {/* Authenticated Dashboard Shell */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/links" element={<MyLinksPage />} />
            <Route path="/links/new" element={<CreateLinkPage />} />
            <Route path="/links/:id" element={<LinkAnalyticsPage />} />
            <Route path="/links/:id/analytics" element={<LinkAnalyticsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/domains" element={<CustomDomainsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </AppProvider>
  );
}
