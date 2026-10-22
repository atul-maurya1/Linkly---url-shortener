import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ToastContainer from '../components/common/ToastContainer';
import { Check, X, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const navigate = useNavigate();

  const comparisonFeatures = [
    { name: 'Active shortened links', free: '50', pro: '500', biz: 'Unlimited' },
    { name: 'Clicks tracked per month', free: '10,000', pro: '250,000', biz: '10,000,000+' },
    { name: 'Analytics history retention', free: '30 Days', pro: 'Unlimited', biz: 'Unlimited' },
    { name: 'Custom branded domains', free: '0', pro: '3 Domains', biz: '15 Domains' },
    { name: 'QR Code generator & export', free: true, pro: true, biz: true },
    { name: 'UTM campaign parameters builder', free: false, pro: true, biz: true },
    { name: 'Geographic country & city data', free: false, pro: true, biz: true },
    { name: 'Device, browser & OS intelligence', free: false, pro: true, biz: true },
    { name: 'Password protection & expiration', free: false, pro: true, biz: true },
    { name: 'Granular click logs CSV export', free: false, pro: true, biz: true },
    { name: 'Team members & workspace seats', free: '1 Seat', pro: '3 Seats', biz: 'Unlimited' },
    { name: 'REST API & Webhook dispatch', free: false, pro: '100 req/min', biz: 'Custom Tier' },
    { name: 'SLA guarantee & priority support', free: 'Community', pro: 'Email (24h)', biz: '99.99% SLA + Slack' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge variant="default" size="sm">
              Flexible Plans
            </Badge>
            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Simple Pricing for Scalable Link Intelligence
            </h1>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
              No contracts. Change or cancel plans anytime with seamless pro-rata adjustments.
            </p>

            {/* Billing switcher */}
            <div className="mt-8 inline-flex items-center gap-3 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  !isAnnual
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                Monthly billing
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  isAnnual
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-white shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                <span>Annual billing</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <Card className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Free Plan</h3>
                <p className="text-xs text-slate-500 mt-1">Essential link shortening for individuals.</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$0</span>
                  <span className="text-xs text-slate-400">/ forever</span>
                </div>
                <ul className="mt-6 space-y-3 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>50 active shortened links</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>Basic click tracking (30 days)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>Custom aliases</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>QR Code SVG generation</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Button variant="outline" className="w-full" onClick={() => navigate('/register')}>
                  Get Started Free
                </Button>
              </div>
            </Card>

            {/* Pro Plan */}
            <Card className="relative flex flex-col justify-between border-2 border-brand-500 shadow-xl shadow-brand-500/10">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-600 text-white shadow-sm">
                Most Popular
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pro Plan</h3>
                <p className="text-xs text-slate-500 mt-1">For creators, founders & growth marketers.</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    {isAnnual ? '$12' : '$15'}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <ul className="mt-6 space-y-3 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2 font-semibold">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>500 active links</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>Unlimited analytics history</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>3 Custom branded domains</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>Full geographic & device intelligence</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>UTM builder & CSV report export</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>Password protection & expiration</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Button variant="electric" className="w-full" onClick={() => navigate('/register')}>
                  Start 14-Day Free Trial
                </Button>
              </div>
            </Card>

            {/* Business Plan */}
            <Card className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Business Plan</h3>
                <p className="text-xs text-slate-500 mt-1">For marketing agencies & growing teams.</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    {isAnnual ? '$39' : '$49'}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <ul className="mt-6 space-y-3 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>Unlimited links & clicks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>15 Custom branded domains</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>Team collaboration & workspace seats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>Full REST API & webhook access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>Dedicated 99.99% uptime SLA</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Button variant="outline" className="w-full" onClick={() => navigate('/register')}>
                  Upgrade to Business
                </Button>
              </div>
            </Card>
          </div>

          {/* Feature Comparison Matrix */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
              Compare Plan Features
            </h2>
            <Card className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 uppercase font-semibold text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Feature</th>
                      <th className="py-3 px-4 text-center">Free</th>
                      <th className="py-3 px-4 text-center bg-brand-50/50 dark:bg-brand-950/20 text-brand-600 dark:text-brand-400">
                        Pro
                      </th>
                      <th className="py-3 px-4 text-center">Business</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {comparisonFeatures.map(item => (
                      <tr key={item.name} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                        <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                          {item.name}
                        </td>
                        <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-400">
                          {typeof item.free === 'boolean' ? (
                            item.free ? (
                              <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                            )
                          ) : (
                            item.free
                          )}
                        </td>
                        <td className="py-3 px-4 text-center font-semibold text-slate-900 dark:text-white bg-brand-50/30 dark:bg-brand-950/10">
                          {typeof item.pro === 'boolean' ? (
                            item.pro ? (
                              <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                            )
                          ) : (
                            item.pro
                          )}
                        </td>
                        <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-400">
                          {typeof item.biz === 'boolean' ? (
                            item.biz ? (
                              <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                            )
                          ) : (
                            item.biz
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
}
