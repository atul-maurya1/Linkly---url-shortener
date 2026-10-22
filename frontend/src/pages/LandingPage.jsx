import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import ToastContainer from '../components/common/ToastContainer';
import { useApp } from '../context/AppContext';
import { isValidUrl, normalizeUrl, validateAlias, formatNumber } from '../utils/analyticsHelpers';
import {
  Link2,
  ArrowRight,
  Sparkles,
  BarChart3,
  Globe2,
  Smartphone,
  ShieldCheck,
  Check,
  Copy,
  ExternalLink,
  Zap,
  TrendingUp,
  Share2,
  History,
  Lock,
  Layers,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Users,
  Briefcase,
  Store,
  Terminal,
  Activity
} from 'lucide-react';

export default function LandingPage() {
  const { createLink, links, addToast } = useApp();
  const navigate = useNavigate();

  // Hero Quick Shortener Form State
  const [heroUrl, setHeroUrl] = useState('');
  const [heroAlias, setHeroAlias] = useState('');
  const [heroDomain, setHeroDomain] = useState('linkly.app');
  const [isShortening, setIsShortening] = useState(false);
  const [heroResult, setHeroResult] = useState(null);
  const [heroCopied, setHeroCopied] = useState(false);
  const [heroError, setHeroError] = useState('');

  // Pricing toggle state
  const [isAnnual, setIsAnnual] = useState(true);

  // FAQ state
  const [openFaq, setOpenFaq] = useState(0);

  const handleHeroShorten = e => {
    e.preventDefault();
    setHeroError('');

    if (!heroUrl.trim()) {
      setHeroError('Please enter a destination URL');
      return;
    }

    if (!isValidUrl(heroUrl.trim())) {
      setHeroError('Please enter a valid website URL (e.g. https://example.com/item)');
      return;
    }

    if (heroAlias.trim()) {
      const existing = links.map(l => l.customAlias?.toLowerCase() || l.shortCode?.toLowerCase());
      const val = validateAlias(heroAlias, existing);
      if (!val.isValid) {
        setHeroError(val.error);
        return;
      }
    }

    setIsShortening(true);

    setTimeout(() => {
      const res = createLink({
        originalUrl: heroUrl.trim(),
        customAlias: heroAlias.trim(),
        domain: heroDomain,
        title: 'Quick Shortened Link'
      });
      setIsShortening(false);
      if (res.success) {
        setHeroResult(res.link);
      }
    }, 450);
  };

  const handleHeroCopy = () => {
    if (!heroResult) return;
    navigator.clipboard.writeText(heroResult.shortUrl);
    setHeroCopied(true);
    addToast({
      type: 'success',
      title: 'Copied to Clipboard!',
      message: heroResult.shortUrl
    });
    setTimeout(() => setHeroCopied(false), 2000);
  };

  const features = [
    {
      title: 'Smart URL Shortening',
      desc: 'Transform complex URLs into concise, readable links instantly with high-speed 301 redirects.',
      icon: Link2
    },
    {
      title: 'Custom Branded Aliases',
      desc: 'Create memorable branded slugs like linkly.app/summer-sale to increase click-through rates by 34%.',
      icon: Sparkles
    },
    {
      title: 'Real-Time Click Analytics',
      desc: 'Monitor click traffic, unique visitors, and hourly spikes with zero delay and rich trend lines.',
      icon: BarChart3
    },
    {
      title: 'Geographic Insights',
      desc: 'Discover visitor countries, regions, and major cities worldwide with IP geolocation maps.',
      icon: Globe2
    },
    {
      title: 'Device & OS Intelligence',
      desc: 'Understand mobile, desktop, and tablet distribution alongside browser and platform breakdown.',
      icon: Smartphone
    },
    {
      title: 'Link History & Archive',
      desc: 'Full historical audit trail. Search, filter, edit destination URLs, and manage your complete catalog.',
      icon: History
    },
    {
      title: 'Traffic Sources & UTM',
      desc: 'Track referring websites, social platforms, and campaign UTM tags to measure marketing ROI.',
      icon: Share2
    },
    {
      title: 'Secure Link Management',
      desc: 'Password protection, link expiration dates, custom branded domains, and fine-grained privacy controls.',
      icon: ShieldCheck
    }
  ];

  const useCases = [
    { role: 'Content Creators', desc: 'Share tidy bio links on YouTube, TikTok, and Instagram with real engagement tracking.', icon: Sparkles },
    { role: 'Digital Marketers', desc: 'Tag multi-channel campaigns with UTM parameters and measure channel conversions.', icon: TrendingUp },
    { role: 'Developers & APIs', desc: 'Programmatic short link generation with high throughput and webhook notifications.', icon: Terminal },
    { role: 'Small Businesses', desc: 'Brand SMS promotions and print flyers with custom short links and QR codes.', icon: Store },
    { role: 'E-commerce Stores', desc: 'Track product link clicks and referral partner affiliate revenues seamlessly.', icon: Briefcase },
    { role: 'Social Media Managers', desc: 'A/B test social post variants and schedule link redirects with expiration timers.', icon: Users }
  ];

  const faqs = [
    {
      q: 'What is Linkly?',
      a: 'Linkly is a modern URL shortening and link intelligence platform that combines rapid link creation, custom domain branding, and deep analytics into one clean SaaS experience.'
    },
    {
      q: 'How does URL shortening work?',
      a: 'When you paste a long destination address, Linkly assigns a compact unique key or branded alias. When users visit the short link, our global edge network instantly redirects them to the final destination while recording anonymous click analytics.'
    },
    {
      q: 'Can I create custom aliases?',
      a: 'Yes! You can choose your own custom slug (e.g., linkly.app/black-friday) or connect custom branded domains (e.g., go.yourbrand.com/promo).'
    },
    {
      q: 'Can I track who clicks my links?',
      a: 'Linkly tracks aggregate visitor patterns such as country, city, device type, browser, referring source, and timestamps. In adherence to modern privacy regulations (GDPR/CCPA), we do not harvest personal identifiable information.'
    },
    {
      q: 'What analytics are available?',
      a: 'Every link includes total clicks, unique visitors, hourly/daily click curves, geographic heatmaps, device breakdown, browser share, and referring domains.'
    },
    {
      q: 'Can I export analytics?',
      a: 'Yes. You can export detailed click event records and link performance reports directly into CSV format for external analysis or client presentations.'
    },
    {
      q: 'Is Linkly free to use?',
      a: 'Linkly offers a generous Free plan that includes basic shortening, custom aliases, and click tracking. For high volumes, custom domains, and extended analytics history, Pro and Business plans are available.'
    },
    {
      q: 'Are my links permanent?',
      a: 'Active links remain functional indefinitely unless you set an optional expiration date or choose to delete the link from your dashboard.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-500/10 via-brand-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200/80 dark:border-brand-800/80 mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Introducing Linkly Intelligence 2.0</span>
              <span className="text-brand-400">·</span>
              <span className="text-slate-500 dark:text-slate-400">Read Changelog →</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Shorten Links.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-accent">
                Understand Every Click.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="mt-5 text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Create powerful short links, track every interaction, and discover where your audience comes from. All your link intelligence in one place.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="electric"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate('/dashboard')}
              >
                Get Started for Free
              </Button>
              <a href="#analytics-preview">
                <Button variant="secondary" size="lg" icon={BarChart3}>
                  Explore Analytics
                </Button>
              </a>
            </div>
          </div>

          {/* HERO URL SHORTENER COMPONENT */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-brand-500/5">
              <form onSubmit={handleHeroShorten} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Paste your long URL here (e.g. https://mywebsite.com/long-page)..."
                      value={heroUrl}
                      onChange={e => {
                        setHeroUrl(e.target.value);
                        if (heroError) setHeroError('');
                      }}
                      className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-500 transition"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="electric"
                    size="lg"
                    loading={isShortening}
                    icon={Link2}
                    className="shrink-0"
                  >
                    Shorten URL
                  </Button>
                </div>

                {/* Optional alias & domain inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-500">
                    <span className="text-slate-400">Domain:</span>
                    <select
                      value={heroDomain}
                      onChange={e => setHeroDomain(e.target.value)}
                      className="bg-transparent font-medium text-slate-800 dark:text-slate-200 focus:outline-none"
                    >
                      <option value="linkly.app">linkly.app (default)</option>
                      <option value="go.acme.co">go.acme.co (branded)</option>
                    </select>
                  </div>

                  <div className="flex items-center px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-slate-400 shrink-0">/{heroDomain}/</span>
                    <input
                      type="text"
                      placeholder="custom-alias (optional)"
                      value={heroAlias}
                      onChange={e => setHeroAlias(e.target.value)}
                      className="w-full ml-1 bg-transparent text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                {heroError && (
                  <p className="text-xs text-rose-500 font-medium pt-1">{heroError}</p>
                )}
              </form>

              {/* SUCCESS RESULT CARD */}
              {heroResult && (
                <div className="mt-4 p-4 rounded-xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                      Shortened Link
                    </span>
                    <p className="font-mono text-base font-bold text-slate-900 dark:text-white truncate">
                      {heroResult.shortUrl}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      Original: {heroResult.originalUrl}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="electric"
                      size="sm"
                      icon={heroCopied ? Check : Copy}
                      onClick={handleHeroCopy}
                    >
                      {heroCopied ? 'Copied' : 'Copy'}
                    </Button>
                    <a href={heroResult.shortUrl} target="_blank" rel="noreferrer">
                      <Button variant="secondary" size="sm" icon={ExternalLink}>
                        Open
                      </Button>
                    </a>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={BarChart3}
                      onClick={() => navigate(`/links/${heroResult.id}`)}
                    >
                      View Analytics
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* HERO PRODUCT VISUAL MOCKUP */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="relative rounded-2xl p-2 bg-gradient-to-b from-slate-200/60 to-slate-100 dark:from-slate-800/60 dark:to-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-2xl">
              {/* Fake browser bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-slate-900 rounded-xl mb-2 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-400/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                </div>
                <span className="font-mono text-[11px] bg-white dark:bg-slate-800 px-3 py-1 rounded-md text-slate-500">
                  https://app.linkly.io/dashboard
                </span>
                <span className="w-12 text-right">Pro Plan</span>
              </div>

              {/* Realistic dashboard preview mockup */}
              <div className="bg-white dark:bg-[#0c101d] rounded-xl p-4 sm:p-6 space-y-4 text-left">
                {/* Mini KPI row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                    <span className="text-[11px] text-slate-400">Total Clicks</span>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">84,920</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">+18.4% vs last mo</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                    <span className="text-[11px] text-slate-400">Unique Visitors</span>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">68,430</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">+14.2%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                    <span className="text-[11px] text-slate-400">Active Links</span>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">42</p>
                    <span className="text-[10px] text-brand-600 font-semibold">500 plan limit</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                    <span className="text-[11px] text-slate-400">Avg. Daily Clicks</span>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">2,830</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">Peak: Tuesday</span>
                  </div>
                </div>

                {/* Visual chart mock bars */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    <span>Click Activity Timeline (Past 30 Days)</span>
                    <span className="text-brand-600 font-mono">14,850 clicks</span>
                  </div>
                  <div className="h-28 flex items-end gap-1.5 sm:gap-2 pt-2">
                    {[45, 52, 38, 65, 80, 95, 75, 60, 48, 70, 85, 90, 110, 88, 72, 98, 120, 105, 92, 115, 130, 95, 80, 100, 125, 140, 110, 95, 120, 135].map((val, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-gradient-to-t from-brand-600 to-indigo-400 rounded-t-sm hover:opacity-80 transition"
                        style={{ height: `${(val / 140) * 100}%` }}
                        title={`${val * 20} clicks`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF SECTION */}
      <section className="py-12 border-y border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#0c101d]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                50M+
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Clicks tracked globally
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                250k+
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Short links generated
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                99.99%
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Redirect uptime SLA
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                &lt; 25ms
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Edge redirect latency
              </p>
            </div>
          </div>
          <p className="text-center text-[11px] text-slate-400 mt-4">
            * Demonstrated sample metrics illustrative of platform performance.
          </p>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="default" size="sm">Platform Capabilities</Badge>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Engineered for Modern Growth Teams
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
              Everything you need to shorten, brand, organize, and inspect every visitor touchpoint.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => {
              const Icon = f.icon;
              return (
                <Card key={f.title} hover className="flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4 border border-brand-200/60 dark:border-brand-800/60">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (3 STEPS) */}
      <section id="how-it-works" className="py-20 bg-slate-50/70 dark:bg-[#0c101d]/70 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="info">Simple 3-Step Flow</Badge>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white">
              How Linkly Works
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Get from a long messy destination to actionable analytics in under 10 seconds.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-center">
              <div className="w-12 h-12 rounded-full bg-brand-600 text-white font-extrabold text-lg flex items-center justify-center mx-auto mb-4 shadow-md shadow-brand-500/25">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Paste Your Long URL
              </h3>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Insert any complex website, blog post, or e-commerce link into the creator.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-extrabold text-lg flex items-center justify-center mx-auto mb-4 shadow-md shadow-indigo-500/25">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Customize Your Link
              </h3>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Select your verified custom domain, craft a memorable slug, or attach UTM campaign tags.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-extrabold text-lg flex items-center justify-center mx-auto mb-4 shadow-md shadow-blue-500/25">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Share & Track Clicks
              </h3>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Distribute your short URL or QR code and watch visitor geography, devices, and spikes in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ANALYTICS PREVIEW SECTION */}
      <section id="analytics-preview" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <Badge variant="purple">Deep Link Intelligence</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Every Click Tells a Story.
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Go beyond shortening URLs. Understand your audience, identify traffic patterns, and make better decisions using meaningful link analytics.
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Deduplicated unique visitor intelligence</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>IP geolocation country and city distribution</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Device, operating system, and browser share</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Full click event log with CSV export capability</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="electric"
                  size="md"
                  onClick={() => navigate('/links/link-1')}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Explore Link Analytics
                </Button>
              </div>
            </div>

            {/* Visual Analytics Card Showcase */}
            <div className="lg:col-span-7">
              <Card className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-brand-600">
                      Live Sample Report
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      linkly.app/launch-2026
                    </h4>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
                    <span className="text-slate-400">Total Clicks</span>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">14,850</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
                    <span className="text-slate-400">Unique Visitors</span>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">11,920</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
                    <span className="text-slate-400">Top Country</span>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">🇺🇸 USA (45%)</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 space-y-2 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span>Device Distribution</span>
                    <span className="text-brand-600">Mobile (58%)</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-brand-600 h-full" style={{ width: '58%' }} title="Mobile: 58%" />
                    <div className="bg-cyan-500 h-full" style={{ width: '34%' }} title="Desktop: 34%" />
                    <div className="bg-purple-500 h-full" style={{ width: '8%' }} title="Tablet: 8%" />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                    <span>📱 58% Mobile</span>
                    <span>💻 34% Desktop</span>
                    <span>📟 8% Tablet</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES SECTION */}
      <section className="py-20 bg-slate-50/70 dark:bg-[#0c101d]/70 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="neutral">Versatile Solutions</Badge>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white">
              Built for Every Digital Workflow
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              From personal creator bios to enterprise attribution campaigns.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map(uc => {
              const Icon = uc.icon;
              return (
                <div
                  key={uc.role}
                  className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-subtle hover:border-slate-300 transition"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {uc.role}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {uc.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="default">Transparent Plans</Badge>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Predictable Pricing, No Hidden Caps
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Start free, upgrade as your link volume and analytics requirements grow.
            </p>

            {/* Monthly / Annual Toggle */}
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

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free */}
            <Card className="flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Free</h3>
                <p className="text-xs text-slate-500 mt-1">For casual links and personal creators.</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">$0</span>
                  <span className="text-xs text-slate-400">/ forever</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>Up to 50 active links</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>Basic click analytics (30 days)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>Custom aliases</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>Standard QR code export</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Button variant="outline" className="w-full" onClick={() => navigate('/register')}>
                  Get Started Free
                </Button>
              </div>
            </Card>

            {/* Pro (Highlighted) */}
            <Card className="relative flex flex-col justify-between border-2 border-brand-500 shadow-xl shadow-brand-500/10">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-600 text-white shadow-sm">
                Most Popular
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Pro</h3>
                <p className="text-xs text-slate-500 mt-1">For professionals, influencers & growing startups.</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {isAnnual ? '$12' : '$15'}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2 font-semibold">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>Up to 500 active links</span>
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
                    <span>Geographic & device breakdown</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>UTM tag builder & CSV export</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>Password protection & expiration</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Button variant="electric" className="w-full" onClick={() => navigate('/register')}>
                  Start 14-Day Pro Trial
                </Button>
              </div>
            </Card>

            {/* Business */}
            <Card className="flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Business</h3>
                <p className="text-xs text-slate-500 mt-1">For marketing agencies & multi-brand enterprises.</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {isAnnual ? '$39' : '$49'}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
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
                    <span>REST API & Webhook dispatch</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-600" />
                    <span>Dedicated 99.99% uptime SLA</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Button variant="outline" className="w-full" onClick={() => navigate('/register')}>
                  Contact Sales
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 bg-slate-50/70 dark:bg-[#0c101d]/70 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="neutral">Answers</Badge>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Clear answers regarding shortening, privacy, domains, and analytics.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white hover:text-brand-600 transition"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      <ToastContainer />
    </div>
  );
}
