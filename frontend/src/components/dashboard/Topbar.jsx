import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  Plus,
  Zap,
  ChevronDown,
  User,
  Settings,
  Shield,
  LogOut,
  ExternalLink,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';
import Button from '../common/Button';
import { useApp } from '../../context/AppContext';

export default function Topbar({ onMenuClick }) {
  const {
    user,
    logout,
    dateRange,
    setDateRange,
    setIsCreateModalOpen,
    simulateClick,
    links
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine current page breadcrumb
  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === '/dashboard') return { title: 'Dashboard', sub: 'Overview' };
    if (path === '/links') return { title: 'Links', sub: 'All Shortened URLs' };
    if (path.startsWith('/links/')) return { title: 'Analytics', sub: 'Link Performance' };
    if (path === '/history') return { title: 'History', sub: 'Creation Timeline' };
    if (path === '/domains') return { title: 'Domains', sub: 'Custom Branded Domains' };
    if (path === '/settings') return { title: 'Settings', sub: 'Account & Preferences' };
    if (path === '/pricing') return { title: 'Pricing', sub: 'Subscription Plans' };
    return { title: 'Linkly', sub: 'App' };
  };

  const breadcrumb = getBreadcrumb();

  const notifications = [
    {
      id: 1,
      title: 'Milestone reached! 🎉',
      desc: 'Linkly v2 launch reached 14,000+ clicks.',
      time: '15m ago',
      unread: true
    },
    {
      id: 2,
      title: 'Domain verified',
      desc: 'go.acme.co DNS records successfully propagated.',
      time: '2h ago',
      unread: false
    },
    {
      id: 3,
      title: 'Weekly summary available',
      desc: 'Overall click volume increased by 24% this week.',
      time: '1d ago',
      unread: false
    }
  ];

  const handleSearchSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/links?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 dark:bg-[#0c101d]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span>Linkly</span>
              <span>/</span>
              <span className="text-slate-900 dark:text-slate-200 font-medium">
                {breadcrumb.title}
              </span>
            </div>
            <h1 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
              {breadcrumb.sub}
            </h1>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search links, aliases, domains (e.g. cyber-40)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-brand-500 dark:focus:border-brand-500 focus:bg-white dark:focus:bg-[#111827] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition"
            />
          </form>
        </div>

        {/* Right action group */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Click Simulator Button */}
          <button
            onClick={() => simulateClick(links[0]?.id)}
            className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition"
            title="Simulate a real-time click to test live analytics counters"
          >
            <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Simulate Click</span>
          </button>

          {/* Date range picker selector */}
          <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-900 rounded-xl p-0.5 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400">
            {['24h', '7d', '30d', '90d'].map(range => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-2.5 py-1 rounded-lg transition ${
                  dateRange === range
                    ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-white font-semibold shadow-sm'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Create Link button */}
          <Button
            variant="electric"
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
            icon={Plus}
          >
            <span className="hidden sm:inline">Create Link</span>
            <span className="sm:hidden">Create</span>
          </Button>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Notifications button & dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition relative border border-slate-200/60 dark:border-slate-700/60"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            </button>

            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-40 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Notifications
                    </h4>
                    <span className="text-[11px] text-brand-600 dark:text-brand-400 font-medium cursor-pointer">
                      Mark all as read
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/80 mt-1 max-h-64 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className="py-2.5 text-xs">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-slate-800 dark:text-slate-200">
                            {n.title}
                          </p>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                          {n.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User profile avatar dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/20"
              />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {showUserDropdown && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowUserDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-40 animate-in fade-in zoom-in-95 duration-150 text-xs">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-semibold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 font-semibold text-[10px]">
                      {user.plan}
                    </span>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/settings"
                      onClick={() => setShowUserDropdown(false)}
                      className="flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Profile & Account</span>
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setShowUserDropdown(false)}
                      className="flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      <Settings className="w-3.5 h-3.5 text-slate-400" />
                      <span>Preferences</span>
                    </Link>
                    <Link
                      to="/pricing"
                      onClick={() => setShowUserDropdown(false)}
                      className="flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Upgrade Plan</span>
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        logout();
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
