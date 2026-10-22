import React from 'react';
import { Link } from 'react-router-dom';
import { Link2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-[#070a11] border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-accent flex items-center justify-center text-white shadow-md shadow-brand-500/25">
                <Link2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Linkly
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Modern link intelligence platform. Shorten URLs, brand your links with custom domains, and understand every click with real-time privacy-friendly analytics.
            </p>
            <div className="flex items-center gap-4 mt-6 text-slate-400 dark:text-slate-500">
              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-600 dark:hover:text-brand-400 transition"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-600 dark:hover:text-brand-400 transition"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-600 dark:hover:text-brand-400 transition"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 1 0 0 3.32 1.66 1.66 0 0 0 0-3.32z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Product
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link to="/dashboard" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/links" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Link Management
                </Link>
              </li>
              <li>
                <Link to="/domains" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Custom Domains
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Analytics & Tech */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Analytics
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <a href="#analytics-preview" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Geographic Insights
                </a>
              </li>
              <li>
                <a href="#analytics-preview" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Device & Browser Data
                </a>
              </li>
              <li>
                <a href="#analytics-preview" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Referrer Tracking
                </a>
              </li>
              <li>
                <a href="#analytics-preview" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Hourly Heatmaps
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Company & Legal
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <a href="#faq" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Help & FAQs
                </a>
              </li>
              <li>
                <Link to="/settings" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Privacy Controls
                </Link>
              </li>
              <li>
                <span className="cursor-pointer hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Linkly, Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for modern creators & teams
          </p>
        </div>
      </div>
    </footer>
  );
}
