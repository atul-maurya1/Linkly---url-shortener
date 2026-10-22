import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import QrCodeModal from '../components/common/QrCodeModal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Modal from '../components/common/Modal';
import { exportToCsv } from '../utils/exportCsv';
import { formatDate, formatNumber, formatTimeAgo, isValidUrl } from '../utils/analyticsHelpers';
import {
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  Download,
  Copy,
  Check,
  ExternalLink,
  BarChart2,
  Trash2,
  QrCode,
  Edit2,
  LayoutGrid,
  List,
  Shield,
  Tag,
  Calendar,
  MousePointerClick
} from 'lucide-react';

export default function MyLinksPage() {
  const { links, deleteLink, updateLink, setIsCreateModalOpen, addToast } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Filter and sort states
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [statusFilter, setStatusFilter] = useState('all'); // all | active | expired
  const [sortBy, setSortBy] = useState('newest'); // newest | oldest | most-clicked | least-clicked
  const [viewMode, setViewMode] = useState('table'); // table | grid

  // Action modals
  const [copiedId, setCopiedId] = useState(null);
  const [selectedQrLink, setSelectedQrLink] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [editLinkItem, setEditLinkItem] = useState(null);

  // Edit form state
  const [editTitle, setEditTitle] = useState('');
  const [editOriginalUrl, setEditOriginalUrl] = useState('');
  const [editTags, setEditTags] = useState('');

  // Filtered and sorted links
  const filteredLinks = useMemo(() => {
    return links.filter(link => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        link.title?.toLowerCase().includes(q) ||
        link.shortUrl?.toLowerCase().includes(q) ||
        link.originalUrl?.toLowerCase().includes(q) ||
        link.customAlias?.toLowerCase().includes(q) ||
        link.tags?.some(t => t.toLowerCase().includes(q));

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && link.status === 'active') ||
        (statusFilter === 'expired' && link.status === 'expired');

      return matchesSearch && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'most-clicked') return (b.clicks || 0) - (a.clicks || 0);
      if (sortBy === 'least-clicked') return (a.clicks || 0) - (b.clicks || 0);
      return 0;
    });
  }, [links, searchTerm, statusFilter, sortBy]);

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

  const handleExportCsv = () => {
    if (!filteredLinks.length) return;
    const rows = filteredLinks.map(l => ({
      ID: l.id,
      Title: l.title,
      ShortURL: l.shortUrl,
      OriginalURL: l.originalUrl,
      CustomAlias: l.customAlias || '',
      TotalClicks: l.clicks,
      UniqueVisitors: l.uniqueVisitors,
      Status: l.status,
      CreatedAt: l.createdAt,
      LastClickedAt: l.lastClickedAt || ''
    }));
    exportToCsv(`linkly-links-export-${new Date().toISOString().split('T')[0]}`, rows);
    addToast({
      type: 'success',
      title: 'CSV Export Complete',
      message: `${rows.length} links exported.`
    });
  };

  const openEditModal = link => {
    setEditLinkItem(link);
    setEditTitle(link.title);
    setEditOriginalUrl(link.originalUrl);
    setEditTags(link.tags?.join(', ') || '');
  };

  const handleSaveEdit = e => {
    e.preventDefault();
    if (!editLinkItem) return;
    if (!isValidUrl(editOriginalUrl)) {
      addToast({
        type: 'error',
        title: 'Invalid URL',
        message: 'Please provide a valid destination URL.'
      });
      return;
    }

    const updatedTags = editTags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    updateLink(editLinkItem.id, {
      title: editTitle.trim() || editLinkItem.title,
      originalUrl: editOriginalUrl.trim(),
      tags: updatedTags
    });

    setEditLinkItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            My Links
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage, organize, and analyze all your shortened URLs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="md"
            icon={Download}
            onClick={handleExportCsv}
            disabled={!filteredLinks.length}
          >
            Export CSV
          </Button>

          <Button
            variant="electric"
            size="md"
            icon={Plus}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create New Link
          </Button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <Card className="p-4 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, short URL, alias, or tags..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-500 transition"
          />
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 hidden lg:inline">Status:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Links</option>
              <option value="active">Active Only</option>
              <option value="expired">Expired Only</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 hidden lg:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most-clicked">Most Clicked</option>
              <option value="least-clicked">Least Clicked</option>
            </select>
          </div>

          {/* View Toggle (Table / Grid) */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-0.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
              title="Table view"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
              title="Grid cards view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* Main Content: Table or Grid */}
      {filteredLinks.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No links found"
          description={
            searchTerm
              ? `No shortened links matched "${searchTerm}". Try tweaking your filters or search keyword.`
              : 'You have not created any short links yet. Start shortening URLs now!'
          }
          actionLabel="Create Short Link"
          onAction={() => setIsCreateModalOpen(true)}
        />
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Title & Short URL</th>
                  <th className="py-3 px-4">Destination</th>
                  <th className="py-3 px-4 text-center">Clicks</th>
                  <th className="py-3 px-4">Created</th>
                  <th className="py-3 px-4">Last Click</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredLinks.map(link => {
                  const isExpired = link.status === 'expired';
                  return (
                    <tr
                      key={link.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition group"
                    >
                      {/* Title & Short URL */}
                      <td className="py-3 px-4 max-w-xs">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                            <span className="truncate">{link.title}</span>
                            {link.passwordProtected && (
                              <Shield
                                className="w-3.5 h-3.5 text-amber-500 shrink-0"
                                title="Password Protected"
                              />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-mono text-brand-600 dark:text-brand-400 font-medium">
                              {link.shortUrl}
                            </span>
                            {link.tags?.length > 0 && (
                              <span className="text-[10px] text-slate-400">
                                #{link.tags[0]}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Destination */}
                      <td className="py-3 px-4 max-w-xs truncate text-slate-500 dark:text-slate-400">
                        <span title={link.originalUrl}>{link.originalUrl}</span>
                      </td>

                      {/* Clicks */}
                      <td className="py-3 px-4 text-center font-mono font-bold text-slate-900 dark:text-white">
                        {formatNumber(link.clicks)}
                      </td>

                      {/* Created */}
                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                        {formatDate(link.createdAt)}
                      </td>

                      {/* Last Click */}
                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                        {formatTimeAgo(link.lastClickedAt)}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <Badge variant={isExpired ? 'danger' : 'success'} size="sm">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isExpired ? 'bg-rose-500' : 'bg-emerald-500'
                            }`}
                          />
                          {isExpired ? 'Expired' : 'Active'}
                        </Badge>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleCopy(link)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            title="Copy Short URL"
                          >
                            {copiedId === link.id ? (
                              <Check className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>

                          <button
                            onClick={() => setSelectedQrLink(link)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            title="QR Code"
                          >
                            <QrCode className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => navigate(`/links/${link.id}`)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            title="Deep Analytics"
                          >
                            <BarChart2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => openEditModal(link)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            title="Edit Link"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <a
                            href={link.originalUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            title="Open Target Destination"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>

                          <button
                            onClick={() => setDeleteTargetId(link.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                            title="Delete Link"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing {filteredLinks.length} of {links.length} links
            </span>
            <span>Sorted by: {sortBy.replace('-', ' ')}</span>
          </div>
        </Card>
      ) : (
        /* GRID CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLinks.map(link => {
            const isExpired = link.status === 'expired';
            return (
              <Card key={link.id} hover className="flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant={isExpired ? 'danger' : 'success'} size="sm">
                      {isExpired ? 'Expired' : 'Active'}
                    </Badge>
                    <span className="text-[11px] text-slate-400">
                      {formatDate(link.createdAt)}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 truncate">
                    {link.title}
                  </h3>

                  <div className="mt-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-brand-600 dark:text-brand-400 truncate">
                      {link.shortUrl}
                    </span>
                    <button
                      onClick={() => handleCopy(link)}
                      className="p-1 rounded-md text-slate-400 hover:text-brand-600 transition"
                      title="Copy URL"
                    >
                      {copiedId === link.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-slate-500 truncate" title={link.originalUrl}>
                    ↳ {link.originalUrl}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs">
                    <MousePointerClick className="w-4 h-4 text-brand-500" />
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {formatNumber(link.clicks)}
                    </span>
                    <span className="text-slate-400">clicks</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSelectedQrLink(link)}
                      className="p-1.5 text-slate-400 hover:text-brand-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      title="QR Code"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => navigate(`/links/${link.id}`)}
                      className="p-1.5 text-slate-400 hover:text-brand-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      title="Analytics"
                    >
                      <BarChart2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => openEditModal(link)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setDeleteTargetId(link.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* QR Code Modal */}
      <QrCodeModal
        isOpen={Boolean(selectedQrLink)}
        onClose={() => setSelectedQrLink(null)}
        link={selectedQrLink}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => {
          if (deleteTargetId) {
            deleteLink(deleteTargetId);
            setDeleteTargetId(null);
          }
        }}
        title="Delete Short Link?"
        message="This will permanently delete the shortened URL and all of its associated click tracking history."
        confirmText="Delete Link"
      />

      {/* Edit Link Modal */}
      {editLinkItem && (
        <Modal
          isOpen={Boolean(editLinkItem)}
          onClose={() => setEditLinkItem(null)}
          title="Edit Short Link"
          description={`Update metadata and destination for ${editLinkItem.shortUrl}`}
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleSaveEdit} className="space-y-4 pt-2 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Link Title
              </label>
              <input
                type="text"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Destination URL
              </label>
              <input
                type="text"
                value={editOriginalUrl}
                onChange={e => setEditOriginalUrl(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={editTags}
                onChange={e => setEditTags(e.target.value)}
                placeholder="Product, Marketing, Sale"
                className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-200 dark:border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setEditLinkItem(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
