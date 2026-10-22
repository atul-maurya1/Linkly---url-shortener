import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import QrCodeModal from '../components/common/QrCodeModal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import ClicksChart from '../components/dashboard/ClicksChart';
import DeviceChart from '../components/dashboard/DeviceChart';
import GeographicAnalytics from '../components/dashboard/GeographicAnalytics';
import TrafficSources from '../components/dashboard/TrafficSources';
import { exportToCsv } from '../utils/exportCsv';
import { formatDate, formatTimeAgo, formatNumber } from '../utils/analyticsHelpers';
import { GENERATE_HEATMAP_DATA } from '../data/initialData';
import {
  Link2,
  Copy,
  Check,
  ExternalLink,
  QrCode,
  Share2,
  Download,
  Trash2,
  MousePointerClick,
  Users,
  Calendar,
  Clock,
  TrendingUp,
  Zap,
  Shield,
  Sparkles,
  Search,
  Filter,
  Info,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Globe2,
  Smartphone,
  Flame
} from 'lucide-react';

export default function LinkAnalyticsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    links,
    clickEvents,
    deleteLink,
    simulateClick,
    addToast
  } = useApp();

  // Find target link or default to first link
  const link = links.find(l => l.id === id) || links[0];

  // Local states
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Click events search and filter
  const [eventSearch, setEventSearch] = useState('');
  const [eventDeviceFilter, setEventDeviceFilter] = useState('all');
  const [eventPage, setEventPage] = useState(1);
  const eventsPerPage = 5;

  // Heatmap dataset
  const heatmapData = useMemo(() => GENERATE_HEATMAP_DATA(), []);

  // Filter click events for this link (or fallback to all events if demo)
  const linkEvents = useMemo(() => {
    return clickEvents.filter(e => {
      const matchesSearch =
        !eventSearch ||
        e.country?.toLowerCase().includes(eventSearch.toLowerCase()) ||
        e.city?.toLowerCase().includes(eventSearch.toLowerCase()) ||
        e.referrer?.toLowerCase().includes(eventSearch.toLowerCase()) ||
        e.browser?.toLowerCase().includes(eventSearch.toLowerCase());

      const matchesDevice =
        eventDeviceFilter === 'all' || e.device?.toLowerCase() === eventDeviceFilter.toLowerCase();

      return matchesSearch && matchesDevice;
    });
  }, [clickEvents, eventSearch, eventDeviceFilter]);

  const totalEventPages = Math.ceil(linkEvents.length / eventsPerPage) || 1;
  const paginatedEvents = linkEvents.slice(
    (eventPage - 1) * eventsPerPage,
    eventPage * eventsPerPage
  );

  if (!link) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold">Link Not Found</h2>
        <Link to="/links" className="text-brand-600 mt-2 inline-block">
          Return to My Links
        </Link>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(link.shortUrl);
    setCopied(true);
    addToast({
      type: 'success',
      title: 'Copied Link!',
      message: link.shortUrl
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportEvents = () => {
    if (!linkEvents.length) return;
    const rows = linkEvents.map(e => ({
      Timestamp: e.timestamp,
      Country: e.country,
      City: e.city,
      Device: e.device,
      Browser: e.browser,
      OS: e.os,
      Referrer: e.referrer,
      Campaign: e.campaign || ''
    }));
    exportToCsv(`linkly-events-${link.shortCode}`, rows);
    addToast({
      type: 'success',
      title: 'Events Exported',
      message: `${rows.length} click events exported to CSV.`
    });
  };

  // Other related links for the user
  const relatedLinks = links.filter(l => l.id !== link.id).slice(0, 3);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top back navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link
          to="/links"
          className="flex items-center gap-1 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to all links</span>
        </Link>
      </div>

      {/* SECTION A: LINK HEADER */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-subtle space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                {link.title}
              </h1>
              <Badge variant={link.status === 'expired' ? 'danger' : 'success'} size="sm">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    link.status === 'expired' ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                />
                {link.status === 'expired' ? 'Expired' : 'Active'}
              </Badge>
              {link.passwordProtected && (
                <Badge variant="warning" size="sm">
                  <Shield className="w-3 h-3 mr-0.5" />
                  Password Protected
                </Badge>
              )}
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              {link.description || 'No description provided.'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={Zap}
              onClick={() => simulateClick(link.id)}
              title="Record a simulated live click on this specific link"
            >
              Simulate Click
            </Button>

            <Button
              variant="outline"
              size="sm"
              icon={QrCode}
              onClick={() => setShowQrModal(true)}
            >
              QR Code
            </Button>

            <Button
              variant="outline"
              size="sm"
              icon={Download}
              onClick={handleExportEvents}
            >
              Export
            </Button>

            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete
            </Button>
          </div>
        </div>

        {/* URLs strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
          {/* Short URL Box */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
            <div className="min-w-0 mr-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Short URL
              </span>
              <p className="font-mono font-semibold text-brand-600 dark:text-brand-400 truncate">
                {link.shortUrl}
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Button
                variant="outline"
                size="sm"
                icon={copied ? Check : Copy}
                onClick={handleCopy}
              >
                {copied ? 'Copied' : 'Copy'}
              </Button>
              <a href={link.shortUrl} target="_blank" rel="noreferrer">
                <Button variant="ghost" size="sm" icon={ExternalLink} />
              </a>
            </div>
          </div>

          {/* Destination URL Box */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
            <div className="min-w-0 mr-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Original Destination
              </span>
              <p className="text-slate-700 dark:text-slate-300 truncate" title={link.originalUrl}>
                {link.originalUrl}
              </p>
            </div>
            <a href={link.originalUrl} target="_blank" rel="noreferrer">
              <Button variant="ghost" size="sm" icon={ExternalLink}>
                Visit
              </Button>
            </a>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-6 pt-1 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/60">
          <div>
            Created: <strong className="text-slate-700 dark:text-slate-200">{formatDate(link.createdAt)}</strong>
          </div>
          <div>
            Last click: <strong className="text-slate-700 dark:text-slate-200">{formatTimeAgo(link.lastClickedAt)}</strong>
          </div>
          <div>
            Domain: <strong className="text-slate-700 dark:text-slate-200">{link.domain}</strong>
          </div>
          {link.customAlias && (
            <div>
              Alias: <strong className="font-mono text-slate-700 dark:text-slate-200">{link.customAlias}</strong>
            </div>
          )}
        </div>
      </div>

      {/* SECTION B: 8 KEY PERFORMANCE INDICATORS */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
          Key Performance Indicators
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <Card className="p-3.5 space-y-1">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Total Clicks</span>
            <p className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">
              {formatNumber(link.clicks)}
            </p>
            <span className="text-[10px] text-emerald-600 font-semibold">+18.2%</span>
          </Card>

          <Card className="p-3.5 space-y-1">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Unique Visitors</span>
            <p className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">
              {formatNumber(link.uniqueVisitors)}
            </p>
            <span className="text-[10px] text-emerald-600 font-semibold">80.2% ratio</span>
          </Card>

          <Card className="p-3.5 space-y-1">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Clicks Today</span>
            <p className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">
              {formatNumber(link.clicksToday)}
            </p>
            <span className="text-[10px] text-emerald-600 font-semibold">+35% vs yday</span>
          </Card>

          <Card className="p-3.5 space-y-1">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Clicks This Week</span>
            <p className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">
              {formatNumber(link.clicksThisWeek)}
            </p>
            <span className="text-[10px] text-brand-600 font-semibold">Last 7d</span>
          </Card>

          <Card className="p-3.5 space-y-1">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Clicks This Month</span>
            <p className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">
              {formatNumber(link.clicksThisMonth)}
            </p>
            <span className="text-[10px] text-brand-600 font-semibold">Last 30d</span>
          </Card>

          <Card className="p-3.5 space-y-1">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Avg Daily Clicks</span>
            <p className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">
              {formatNumber(link.avgDailyClicks)}
            </p>
            <span className="text-[10px] text-slate-400 font-medium">Rolling avg</span>
          </Card>

          <Card className="p-3.5 space-y-1">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Peak Traffic Day</span>
            <p className="text-base font-bold text-slate-900 dark:text-white truncate">
              {link.peakTrafficDay}
            </p>
            <span className="text-[10px] text-amber-500 font-semibold">Highest vol</span>
          </Card>

          <Card className="p-3.5 space-y-1">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Last Clicked</span>
            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
              {formatTimeAgo(link.lastClickedAt)}
            </p>
            <span className="text-[10px] text-emerald-600 font-semibold">Live signal</span>
          </Card>
        </div>
      </div>

      {/* SECTION I: AUTOMATED LINK PERFORMANCE SUMMARY */}
      <Card className="bg-gradient-to-r from-brand-50/70 via-indigo-50/50 to-white dark:from-brand-950/40 dark:via-slate-900/40 dark:to-[#111827] border-brand-200/80 dark:border-brand-800/60 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Automated Intelligence Summary
          </h3>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300">
            AI Generated
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400">Mobile Dominance</p>
            <p className="font-semibold text-slate-900 dark:text-white mt-1">
              📱 Mobile devices account for <strong>58.2%</strong> of recorded clicks.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400">Geographic Leader</p>
            <p className="font-semibold text-slate-900 dark:text-white mt-1">
              🇺🇸 United States is the leading market with <strong>45.3%</strong> volume.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400">Weekly Spike Pattern</p>
            <p className="font-semibold text-slate-900 dark:text-white mt-1">
              ⚡ <strong>{link.peakTrafficDay}</strong> generates peak engagement between 13:00 - 16:00 UTC.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400">Traffic Momentum</p>
            <p className="font-semibold text-slate-900 dark:text-white mt-1">
              📈 Click momentum is up <strong>18%</strong> compared with previous 30-day period.
            </p>
          </div>
        </div>
      </Card>

      {/* SECTION C: CLICK ACTIVITY CHART */}
      <ClicksChart
        title="URL Click Activity & Unique Visitors"
        subtitle={`Tracking traffic trends for ${link.shortUrl}`}
      />

      {/* SECTION D & E: GEOGRAPHY & DEVICE BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <DeviceChart />
        </div>
        <div className="lg:col-span-7">
          <GeographicAnalytics />
        </div>
      </div>

      {/* SECTION F: TRAFFIC SOURCES & UTM */}
      <TrafficSources />

      {/* SECTION G: TIME-BASED INSIGHTS HEATMAP */}
      <Card className="flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Time-Based Heatmap (Hour × Day of Week)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Identifies visitor high-traffic peak hours across global timezones
            </p>
          </div>
          <Clock className="w-5 h-5 text-slate-400" />
        </div>

        <div className="pt-4 overflow-x-auto">
          <div className="min-w-[640px]">
            {/* Hour header 0 to 23 */}
            <div className="flex text-[10px] text-slate-400 pb-2">
              <span className="w-10 shrink-0 font-medium">Day</span>
              <div className="flex-1 grid grid-cols-24 gap-1 text-center">
                {[0, 3, 6, 9, 12, 15, 18, 21].map(h => (
                  <span key={h} className="col-span-3 text-left">
                    {h}:00
                  </span>
                ))}
              </div>
            </div>

            {/* Heatmap rows for 7 days */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="flex items-center mb-1.5">
                <span className="w-10 shrink-0 text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {day}
                </span>
                <div className="flex-1 grid grid-cols-24 gap-1">
                  {Array.from({ length: 24 }).map((_, h) => {
                    const item = heatmapData.find(d => d.day === day && d.hour === h) || {
                      level: 1,
                      clicks: 12
                    };
                    const colorClasses = [
                      'bg-slate-100 dark:bg-slate-800/50',
                      'bg-brand-100 dark:bg-brand-950',
                      'bg-brand-300 dark:bg-brand-800',
                      'bg-brand-500 text-white',
                      'bg-brand-600 text-white',
                      'bg-indigo-700 text-white'
                    ];
                    return (
                      <div
                        key={h}
                        className={`h-5 rounded-xs transition-transform hover:scale-125 cursor-pointer ${
                          colorClasses[item.level] || colorClasses[0]
                        }`}
                        title={`${day} ${h}:00 — ${item.clicks} clicks`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800 mt-2">
            <span>Peak Engagement: Tuesday & Friday between 13:00 - 17:00 UTC</span>
            <div className="flex items-center gap-1.5">
              <span>Low</span>
              <span className="w-2.5 h-2.5 rounded-xs bg-slate-100 dark:bg-slate-800" />
              <span className="w-2.5 h-2.5 rounded-xs bg-brand-200 dark:bg-brand-900" />
              <span className="w-2.5 h-2.5 rounded-xs bg-brand-500" />
              <span className="w-2.5 h-2.5 rounded-xs bg-indigo-700" />
              <span>High Traffic</span>
            </div>
          </div>
        </div>
      </Card>

      {/* SECTION H: GRANULAR CLICK EVENTS TABLE */}
      <Card className="flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Detailed Click Event Logs
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                {linkEvents.length} Recorded
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Audit log of recorded click requests and device parameters
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search country, city, referrer..."
                value={eventSearch}
                onChange={e => {
                  setEventSearch(e.target.value);
                  setEventPage(1);
                }}
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            {/* Device Filter */}
            <select
              value={eventDeviceFilter}
              onChange={e => {
                setEventDeviceFilter(e.target.value);
                setEventPage(1);
              }}
              className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Devices</option>
              <option value="mobile">Mobile</option>
              <option value="desktop">Desktop</option>
              <option value="tablet">Tablet</option>
            </select>

            <Button variant="outline" size="sm" icon={Download} onClick={handleExportEvents}>
              Export CSV
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="pt-2 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Timestamp (UTC)</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Device / OS</th>
                <th className="py-2.5 px-3">Browser</th>
                <th className="py-2.5 px-3">Referrer</th>
                <th className="py-2.5 px-3">Campaign</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {paginatedEvents.map(evt => (
                <tr key={evt.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 text-slate-500 font-mono whitespace-nowrap">
                    {evt.timestamp.replace('T', ' ').substring(0, 19)}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                    <span className="mr-1.5">{evt.flag}</span>
                    <span>{evt.city}, {evt.country}</span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    <span className="font-semibold">{evt.device}</span> ({evt.os})
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">
                    {evt.browser}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300 font-medium whitespace-nowrap">
                    {evt.referrer}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                    {evt.campaign ? `#${evt.campaign}` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination & Privacy Note */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>Raw IP addresses are scrubbed and anonymized at our edge proxies.</span>
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={eventPage <= 1}
              onClick={() => setEventPage(p => p - 1)}
            >
              Previous
            </Button>
            <span>
              Page {eventPage} of {totalEventPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={eventPage >= totalEventPages}
              onClick={() => setEventPage(p => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* SECTION J: RELATED LINKS */}
      {relatedLinks.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Other Links in Your Workspace
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedLinks.map(rel => (
              <Card
                key={rel.id}
                hover
                className="p-4 cursor-pointer"
                onClick={() => navigate(`/links/${rel.id}`)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {rel.title}
                  </h4>
                  <Badge variant="neutral" size="sm">
                    {formatNumber(rel.clicks)} clicks
                  </Badge>
                </div>
                <p className="font-mono text-xs text-brand-600 dark:text-brand-400 mt-1 truncate">
                  {rel.shortUrl}
                </p>
                <p className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
                  <span>Created {formatDate(rel.createdAt)}</span>
                  <span className="text-brand-600 font-semibold flex items-center gap-0.5">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                </p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      <QrCodeModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        link={link}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          deleteLink(link.id);
          navigate('/links');
        }}
        title="Delete this short link?"
        message="This action will delete the short URL and its historical tracking records permanently."
      />
    </div>
  );
}
