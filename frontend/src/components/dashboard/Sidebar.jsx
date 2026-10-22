import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Link2,
  LayoutDashboard,
  Link as LinkIcon,
  PlusCircle,
  BarChart3,
  History,
  Globe2,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout, setIsCreateModalOpen } = useApp();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Overview', to: '/dashboard', icon: LayoutDashboard },
    { label: 'My Links', to: '/links', icon: LinkIcon },
    {
      label: 'Create Link',
      action: () => setIsCreateModalOpen(true),
      icon: PlusCircle,
      highlight: true
    },
    { label: 'Analytics', to: '/links/link-1', icon: BarChart3 },
    { label: 'History', to: '/history', icon: History },
    { label: 'Custom Domains', to: '/domains', icon: Globe2 },
    { label: 'Settings', to: '/settings', icon: Settings }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Logo */}
        <div className="px-5 py-5 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-accent flex items-center justify-center text-white shadow-md shadow-brand-500/25">
              <Link2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                Linkly
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">
                Analytics Platform
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation list */}
        <div className="px-3 py-4 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            if (item.action) {
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    item.action();
                    if (onClose) onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-brand-600 dark:text-brand-400 bg-brand-50/70 hover:bg-brand-100/70 dark:bg-brand-950/40 dark:hover:bg-brand-900/50 transition duration-150 text-left border border-brand-200/60 dark:border-brand-800/40 my-2"
                >
                  <Icon className="w-4 h-4 shrink-0 text-brand-600 dark:text-brand-400" />
                  <span>{item.label}</span>
                  <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-600 text-white dark:bg-brand-500">
                    NEW
                  </span>
                </button>
              );
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition duration-150 ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white font-semibold'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Bottom section: Plan usage & User Profile */}
      <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80 space-y-3">
        {/* Usage Card */}
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/60 dark:to-slate-800/40 border border-slate-200/70 dark:border-slate-800/60 text-xs">
          <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              {user.plan}
            </span>
            <Link
              to="/pricing"
              className="text-[11px] text-brand-600 dark:text-brand-400 hover:underline"
            >
              Upgrade
            </Link>
          </div>
          
          <div className="mt-2.5 space-y-1">
            <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>Link quota</span>
              <span className="font-mono">42 / 500</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-brand-600 h-full rounded-full" style={{ width: '8.4%' }} />
            </div>
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition group">
          <Link to="/settings" className="flex items-center gap-2.5 min-w-0">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/20"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                {user.name}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {user.email}
              </p>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white dark:bg-[#0c101d] border-r border-slate-200/80 dark:border-slate-800/80 h-screen sticky top-0 transition-colors">
        {navContent}
      </aside>

      {/* Mobile drawer backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-72 bg-white dark:bg-[#0c101d] border-r border-slate-200 dark:border-slate-800 z-50 lg:hidden transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {navContent}
      </aside>
    </>
  );
}
