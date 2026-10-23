import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';
import { AuthContext } from '../../context/AuthContext';

export default function Topbar({ onMenuClick }) {
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

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
  const userInitials = user?.name
    ? user.name
        .split(' ')
        .slice(0, 2)
        .map(part => part[0])
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 dark:bg-[#0c101d]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4">
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

        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search links, aliases, domains (e.g. cyber-40)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-brand-500 dark:focus:border-brand-500 focus:bg-white dark:focus:bg-[#111827] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <div className="hidden sm:flex items-center gap-2 px-2 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-[11px] font-semibold text-white">
              {userInitials}
            </div>
            <div className="text-left leading-tight">
              <p className="text-xs font-semibold text-slate-900 dark:text-white">
                {user?.name || 'User'}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {user?.email || 'No email'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
