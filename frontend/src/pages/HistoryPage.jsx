import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { exportToCsv } from '../utils/exportCsv';
import { formatDate, formatTimeAgo, formatNumber } from '../utils/analyticsHelpers';
import {
  History,
  Search,
  Download,
  Copy,
  Check,
  ExternalLink,
  BarChart2,
  Trash2,
  Calendar,
  Filter,
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';

export default function HistoryPage() {
  const { links, deleteLink, setIsCreateModalOpen, addToast } = useApp();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [filterActivity, setFilterActivity] = useState('all'); // all | clicked | zero
  const [sortBy, setSortBy] = useState('created'); // created | last-clicked | clicks
  const [copiedId, setCopiedId] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const historyLinks = useMemo(() => {
    return links.filter(l => {
      const q = search.toLowerCase();
      const match =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.shortUrl.toLowerCase().includes(q) ||
        l.originalUrl.toLowerCase().includes(q) ||
        (l.customAlias && l.customAlias.toLowerCase().includes(q));

      const matchAct =
        filterActivity === 'all' ||
        (filterActivity === 'clicked' && l.clicks > 0) ||
        (filterActivity === 'zero' && l.clicks === 0);

      return match && matchAct;
    }).sort((a, b) => {
      if (sortBy === 'created') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'last-clicked') {
        const da = a.lastClickedAt ? new Date(a.lastClickedAt) : 0;
        const db = b.lastClickedAt ? new Date(b.lastClickedAt) : 0;
        return db - da;
      }
      if (sortBy === 'clicks') return (b.clicks || 0) - (a.clicks || 0);
      return 0;
    });
  }, [links, search, filterActivity, sortBy]);

  const handleCopy = link => {
    navigator.clipboard.writeText(link.shortUrl);
    setCopiedId(link.id);
    addToast({
      type: 'success',
      title: 'Copied Link!',
      message: link.shortUrl
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExport = () => {
    const rows = historyLinks.map(l => ({
      Title: l.title,
      ShortURL: l.shortUrl,
      OriginalURL: l.originalUrl,
      Clicks: l.clicks,
      CreatedAt: l.createdAt,
      LastClickedAt: l.lastClickedAt || 'Never'
    }));
    exportToCsv(`linkly-history-export`, rows);
    addToast({
      type: 'success',
      title: 'History Exported',
      message: `${rows.length} records saved to CSV.`
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Link History
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Complete audit trail of all generated URLs, creation timestamps, and activity history.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="md" icon={Download} onClick={handleExport}>
            Export Audit Log
          </Button>
          <Button
            variant="electric"
            size="md"
            icon={RotateCcw}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create Another Link
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search creation history by keyword, domain, or original URL..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterActivity}
            onChange={e => setFilterActivity(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="all">All Records</option>
            <option value="clicked">Has Recorded Clicks</option>
            <option value="zero">Zero Clicks</option>
          </select>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="created">Created (Newest First)</option>
            <option value="last-clicked">Most Recently Clicked</option>
            <option value="clicks">Highest Clicks</option>
          </select>
        </div>
      </Card>

      {/* History Records Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4">Short URL & Alias</th>
                <th className="py-3 px-4">Original Destination</th>
                <th className="py-3 px-4 text-center">Clicks Recorded</th>
                <th className="py-3 px-4">Last Click Date</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {historyLinks.map(l => (
                <tr key={l.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 text-slate-500 font-mono whitespace-nowrap">
                    {formatDate(l.createdAt)}
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <span className="font-bold text-slate-900 dark:text-white block truncate">
                      {l.title}
                    </span>
                    <span className="font-mono text-brand-600 dark:text-brand-400">
                      {l.shortUrl}
                    </span>
                  </td>
                  <td className="py-3 px-4 max-w-xs text-slate-500 truncate" title={l.originalUrl}>
                    {l.originalUrl}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-900 dark:text-white">
                    {formatNumber(l.clicks)}
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                    {formatTimeAgo(l.lastClickedAt)}
                  </td>
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <Badge variant={l.status === 'expired' ? 'danger' : 'success'} size="sm">
                      {l.status === 'expired' ? 'Expired' : 'Active'}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleCopy(l)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        title="Copy"
                      >
                        {copiedId === l.id ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => navigate(`/links/${l.id}`)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        title="View Analytics"
                      >
                        <BarChart2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(l.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => {
          if (deleteTargetId) {
            deleteLink(deleteTargetId);
            setDeleteTargetId(null);
          }
        }}
        title="Remove History Entry?"
        message="This will delete this shortened URL and remove its entry from your link history."
      />
    </div>
  );
}
