import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ConfirmDialog from '../components/common/ConfirmDialog';
import {
  User,
  Shield,
  Sliders,
  Bell,
  Database,
  Lock,
  Download,
  Trash2,
  Check,
  Moon,
  Sun,
  Globe,
  Clock
} from 'lucide-react';

export default function SettingsPage() {
  const {
    user,
    setUser,
    updateUserProfile,
    theme,
    toggleTheme,
    domains,
    links,
    clickEvents,
    logout,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('profile'); // profile | security | preferences | notifications | privacy

  // Profile fields
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  // Security password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Preference fields
  const [timezone, setTimezone] = useState(user.preferences?.timezone || 'UTC - 05:00 (Eastern Time)');
  const [defaultRange, setDefaultRange] = useState(user.preferences?.defaultRange || '30d');
  const [defaultDomain, setDefaultDomain] = useState(user.preferences?.defaultDomain || 'linkly.app');

  // Notifications
  const [emailReports, setEmailReports] = useState(user.preferences?.emailReports ?? true);
  const [productUpdates, setProductUpdates] = useState(user.preferences?.productUpdates ?? true);
  const [securityAlerts, setSecurityAlerts] = useState(user.preferences?.securityAlerts ?? true);

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleProfileSubmit = e => {
    e.preventDefault();
    updateUserProfile({ name, email, role });
  };

  const handlePasswordSubmit = e => {
    e.preventDefault();
    if (newPassword.length < 8) {
      addToast({
        type: 'error',
        title: 'Weak Password',
        message: 'Password must be at least 8 characters long.'
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast({
        type: 'error',
        title: 'Password Mismatch',
        message: 'New password and confirmation do not match.'
      });
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    addToast({
      type: 'success',
      title: 'Password Updated',
      message: 'Your account password has been changed securely.'
    });
  };

  const handlePreferencesSubmit = e => {
    e.preventDefault();
    updateUserProfile({
      preferences: {
        ...user.preferences,
        timezone,
        defaultRange,
        defaultDomain
      }
    });
  };

  const handleNotificationsSubmit = e => {
    e.preventDefault();
    updateUserProfile({
      preferences: {
        ...user.preferences,
        emailReports,
        productUpdates,
        securityAlerts
      }
    });
  };

  const handleExportData = () => {
    const backup = {
      exportDate: new Date().toISOString(),
      user: { name: user.name, email: user.email, plan: user.plan },
      linksCount: links.length,
      links,
      clickEventsCount: clickEvents.length,
      clickEvents,
      domains
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', `linkly-account-backup-${new Date().toISOString().split('T')[0]}.json`);
    dl.click();

    addToast({
      type: 'success',
      title: 'Account Exported',
      message: 'Complete workspace JSON archive generated.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Settings & Preferences
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your personal profile, security credentials, reporting preferences, and data privacy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Settings Navigation Tabs (Left) */}
        <div className="md:col-span-3 space-y-1">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'security', label: 'Security & Auth', icon: Shield },
            { id: 'preferences', label: 'Preferences', icon: Sliders },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'privacy', label: 'Privacy & Data', icon: Database }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition text-left ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400 border border-brand-200/60 dark:border-brand-800/60'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels (Right) */}
        <div className="md:col-span-9">
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <Card className="space-y-6">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Personal Profile
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update your contact info and public avatar details.
                </p>
              </div>

              {/* Avatar Preview */}
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-4 ring-brand-500/20"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {user.name}
                  </h4>
                  <p className="text-xs text-slate-500">{user.role} · {user.plan}</p>
                  <Button variant="outline" size="sm" className="mt-2 text-xs">
                    Change Avatar
                  </Button>
                </div>
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-4 pt-2 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Role / Job Title
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <Button type="submit" variant="primary" size="sm">
                    Save Profile
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <Card className="space-y-6">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Security & Authentication
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update your account password and manage active login sessions.
                </p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button type="submit" variant="primary" size="sm">
                    Update Password
                  </Button>
                </div>
              </form>

              {/* Active Sessions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Active Login Sessions
                </h4>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Chrome 129 on macOS (Current Device)
                    </p>
                    <p className="text-slate-500 mt-0.5">
                      San Francisco, United States · IP: 198.51.100.24 · Active now
                    </p>
                  </div>
                  <Badge variant="success" size="sm">
                    This Session
                  </Badge>
                </div>
              </div>
            </Card>
          )}

          {/* PREFERENCES TAB */}
          {activeTab === 'preferences' && (
            <Card className="space-y-6">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Application Preferences
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure default reporting timezone, analytics windows, and interface theme.
                </p>
              </div>

              <form onSubmit={handlePreferencesSubmit} className="space-y-4 text-xs">
                {/* Theme mode */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Appearance Theme</p>
                    <p className="text-slate-500 mt-0.5">Currently active: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={toggleTheme} icon={theme === 'dark' ? Sun : Moon}>
                    Switch to {theme === 'dark' ? 'Light' : 'Dark'}
                  </Button>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Reporting Timezone
                  </label>
                  <select
                    value={timezone}
                    onChange={e => setTimezone(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="UTC - 05:00 (Eastern Time)">UTC - 05:00 (Eastern Time - US/New York)</option>
                    <option value="UTC - 08:00 (Pacific Time)">UTC - 08:00 (Pacific Time - US/Los Angeles)</option>
                    <option value="UTC + 00:00 (London / GMT)">UTC + 00:00 (London / GMT)</option>
                    <option value="UTC + 01:00 (Central Europe)">UTC + 01:00 (Central European Time)</option>
                    <option value="UTC + 05:30 (India Standard Time)">UTC + 05:30 (India Standard Time - IST)</option>
                    <option value="UTC + 09:00 (Tokyo / JST)">UTC + 09:00 (Tokyo / JST)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Default Analytics Date Range
                    </label>
                    <select
                      value={defaultRange}
                      onChange={e => setDefaultRange(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
                    >
                      <option value="24h">Last 24 Hours</option>
                      <option value="7d">Last 7 Days</option>
                      <option value="30d">Last 30 Days (Recommended)</option>
                      <option value="90d">Last 90 Days</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Default Short Domain
                    </label>
                    <select
                      value={defaultDomain}
                      onChange={e => setDefaultDomain(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
                    >
                      <option value="linkly.app">linkly.app</option>
                      {domains.map(d => (
                        <option key={d.id} value={d.domain}>
                          {d.domain}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <Button type="submit" variant="primary" size="sm">
                    Save Preferences
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <Card className="space-y-6">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Email & Alert Notifications
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Choose which emails and reporting digests you want to receive.
                </p>
              </div>

              <form onSubmit={handleNotificationsSubmit} className="space-y-4 text-xs">
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailReports}
                      onChange={e => setEmailReports(e.target.checked)}
                      className="mt-0.5 rounded text-brand-600 focus:ring-brand-500"
                    />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        Weekly Analytics Digests
                      </p>
                      <p className="text-slate-500 mt-0.5">
                        Receive a consolidated summary of top-performing short URLs and visitor trends every Monday.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productUpdates}
                      onChange={e => setProductUpdates(e.target.checked)}
                      className="mt-0.5 rounded text-brand-600 focus:ring-brand-500"
                    />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        Product & Feature Updates
                      </p>
                      <p className="text-slate-500 mt-0.5">
                        Be the first to learn about new API additions, custom domain features, and speed improvements.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securityAlerts}
                      onChange={e => setSecurityAlerts(e.target.checked)}
                      className="mt-0.5 rounded text-brand-600 focus:ring-brand-500"
                    />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        Security & Domain Notifications
                      </p>
                      <p className="text-slate-500 mt-0.5">
                        Immediate alerts if a custom domain DNS goes offline or a password-protected link expires.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <Button type="submit" variant="primary" size="sm">
                    Save Notification Settings
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* PRIVACY & DATA TAB */}
          {activeTab === 'privacy' && (
            <Card className="space-y-6">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Privacy & Data Management
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Export your complete link history or permanently purge account assets.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {/* Export Card */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      Export Workspace Data
                    </h4>
                    <p className="text-slate-500 mt-0.5">
                      Download a JSON backup of your links, click events, tags, and custom domain configs.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" icon={Download} onClick={handleExportData}>
                    Export JSON
                  </Button>
                </div>

                {/* Privacy Retention */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Analytics Retention Policy
                  </h4>
                  <p className="text-slate-500 leading-relaxed">
                    Linkly does not log visitor PII or raw IP addresses. IP strings are truncated and hashed at the edge for unique visitor estimation, and discarded immediately.
                  </p>
                  <p className="text-slate-500">
                    Current retention tier: <strong>Unlimited Historical Retention (Pro Plan)</strong>
                  </p>
                </div>

                {/* Delete Account */}
                <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-rose-700 dark:text-rose-400">
                      Delete Account
                    </h4>
                    <p className="text-rose-600/80 dark:text-rose-400/80 mt-0.5">
                      Permanently delete your account, custom domains, and all {links.length} shortened URLs.
                    </p>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={Trash2}
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          logout();
          window.location.href = '/';
        }}
        title="Permanently Delete Account?"
        message="This action is immediate and non-reversible. All active redirects will fail permanently."
        confirmText="Confirm Deletion"
      />
    </div>
  );
}
