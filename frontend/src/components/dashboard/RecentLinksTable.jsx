import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import QrCodeModal from '../common/QrCodeModal';
import ConfirmDialog from '../common/ConfirmDialog';
import { useApp } from '../../context/AppContext';
import {
  Copy,
  Check,
  ExternalLink,
  BarChart2,
  Trash2,
  QrCode,
  ArrowRight,
  Shield,
  Clock
} from 'lucide-react';
import { formatDate, formatNumber } from '../../utils/analyticsHelpers';

export default function RecentLinksTable({ limit = 5 }) {
  const { links, deleteLink, addToast } = useApp();
  const navigate = useNavigate();

  const [copiedId, setCopiedId] = useState(null);
  const [selectedQrLink, setSelectedQrLink] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const displayLinks = links.slice(0, limit);

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

  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Recent Short Links
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Your most recently created and active links
          </p>
        </div>

        <Link to="/links">
          <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
            View All Links
          </Button>
        </Link>
      </div>

      <div className="pt-2 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-2">Link Details</th>
              <th className="py-3 px-2">Original Destination</th>
              <th className="py-3 px-2 text-center">Total Clicks</th>
              <th className="py-3 px-2">Created</th>
              <th className="py-3 px-2 text-center">Status</th>
              <th className="py-3 px-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {displayLinks.map(link => {
              const isExpired = link.status === 'expired';
              return (
                <tr
                  key={link.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition group"
                >
                  {/* Link Details */}
                  <td className="py-3 px-2">
                    <div className="flex flex-col max-w-xs">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                        <span className="truncate">{link.title}</span>
                        {link.passwordProtected && (
                          <Shield className="w-3.5 h-3.5 text-amber-500 shrink-0" title="Password protected" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <a
                          href={link.shortUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-brand-600 dark:text-brand-400 hover:underline font-medium flex items-center gap-1"
                        >
                          {link.shortUrl}
                        </a>
                      </div>
                    </div>
                  </td>

                  {/* Destination */}
                  <td className="py-3 px-2 max-w-xs">
                    <p className="text-slate-500 dark:text-slate-400 truncate" title={link.originalUrl}>
                      {link.originalUrl}
                    </p>
                  </td>

                  {/* Clicks */}
                  <td className="py-3 px-2 text-center font-mono font-bold text-slate-900 dark:text-white">
                    {formatNumber(link.clicks)}
                  </td>

                  {/* Date */}
                  <td className="py-3 px-2 text-slate-500 whitespace-nowrap">
                    {formatDate(link.createdAt)}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-2 text-center whitespace-nowrap">
                    <Badge variant={isExpired ? 'danger' : 'success'} size="sm">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isExpired ? 'bg-rose-500' : 'bg-emerald-500'
                        }`}
                      />
                      {isExpired ? 'Expired' : 'Active'}
                    </Badge>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3 px-2 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      {/* Copy */}
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

                      {/* QR Code */}
                      <button
                        onClick={() => setSelectedQrLink(link)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        title="View QR Code"
                      >
                        <QrCode className="w-4 h-4" />
                      </button>

                      {/* Analytics */}
                      <button
                        onClick={() => navigate(`/links/${link.id}`)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        title="View Deep Analytics"
                      >
                        <BarChart2 className="w-4 h-4" />
                      </button>

                      {/* Open Destination */}
                      <a
                        href={link.originalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        title="Open Destination"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      {/* Delete */}
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
        message="Are you sure you want to permanently delete this shortened link? Existing redirects will stop resolving."
        confirmText="Delete Link"
      />
    </Card>
  );
}
