import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import {
  Globe2,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  Check,
  Trash2,
  Star,
  ExternalLink,
  ShieldCheck,
  Server
} from 'lucide-react';

export default function CustomDomainsPage() {
  const { domains, addDomain, deleteDomain, setDefaultDomain, addToast } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDomainInput, setNewDomainInput] = useState('');
  const [domainError, setDomainError] = useState('');
  const [copiedValue, setCopiedValue] = useState(null);
  const [deleteDomainId, setDeleteDomainId] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(key);
    addToast({
      type: 'success',
      title: 'Copied to Clipboard!',
      message: text
    });
    setTimeout(() => setCopiedValue(null), 2000);
  };

  const handleAddSubmit = e => {
    e.preventDefault();
    setDomainError('');

    const trimmed = newDomainInput.trim().toLowerCase().replace(/^https?:\/\//i, '');
    if (!trimmed) {
      setDomainError('Please enter a domain or subdomain');
      return;
    }

    if (!trimmed.includes('.')) {
      setDomainError('Domain must contain a valid TLD or subdomain (e.g. links.mybrand.com)');
      return;
    }

    if (domains.some(d => d.domain.toLowerCase() === trimmed)) {
      setDomainError('This domain is already registered in your account');
      return;
    }

    addDomain(trimmed);
    setNewDomainInput('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Custom Domains
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Brand your short links with your own domain name (e.g., go.yourbrand.com/promo) to boost trust.
          </p>
        </div>

        <Button
          variant="electric"
          size="md"
          icon={Plus}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Custom Domain
        </Button>
      </div>

      {/* Domains List */}
      <div className="space-y-4">
        {domains.map(dom => {
          const isVerified = dom.status === 'verified';
          const isPending = dom.status === 'pending';

          return (
            <Card key={dom.id} className="p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-brand-600 dark:text-brand-400">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono">
                        {dom.domain}
                      </h3>
                      {dom.isDefault && (
                        <Badge variant="purple" size="sm">
                          Default Domain
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Connected on {dom.createdAt} · {dom.linksCount || 0} active links
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant={isVerified ? 'success' : isPending ? 'warning' : 'danger'}
                    size="sm"
                  >
                    {isVerified && <CheckCircle2 className="w-3 h-3 mr-0.5 text-emerald-500" />}
                    {isPending && <Clock className="w-3 h-3 mr-0.5 text-amber-500" />}
                    {!isVerified && !isPending && <AlertCircle className="w-3 h-3 mr-0.5 text-rose-500" />}
                    {isVerified ? 'Verified & Active' : isPending ? 'Pending Verification' : 'Config Error'}
                  </Badge>

                  {!dom.isDefault && isVerified && (
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Star}
                      onClick={() => setDefaultDomain(dom.domain)}
                    >
                      Make Default
                    </Button>
                  )}

                  <button
                    onClick={() => setDeleteDomainId(dom.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                    title="Remove Domain"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* DNS Instructions Strip */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-brand-500" />
                    DNS Configuration (Point CNAME to Linkly Edge)
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Automatic SSL certificate provisioning included
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
                  <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400 block text-[9px] uppercase">Type</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {dom.dnsRecord.type}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400 block text-[9px] uppercase">Host / Name</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {dom.dnsRecord.host}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 sm:col-span-2 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">Points To / Target</span>
                      <span className="font-bold text-brand-600 dark:text-brand-400">
                        {dom.dnsRecord.value}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(dom.dnsRecord.value, `dns-${dom.id}`)}
                      className="p-1 rounded text-slate-400 hover:text-brand-600"
                    >
                      {copiedValue === `dns-${dom.id}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Domain Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Connect Custom Domain"
        description="Add a branded subdomain to create links with your company brand."
        maxWidth="max-w-md"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 pt-2 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Domain or Subdomain
            </label>
            <input
              type="text"
              placeholder="e.g. go.acme.co or links.mybrand.com"
              value={newDomainInput}
              onChange={e => {
                setNewDomainInput(e.target.value);
                if (domainError) setDomainError('');
              }}
              className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
            />
            {domainError && (
              <p className="mt-1 text-xs text-rose-500">{domainError}</p>
            )}
            <p className="mt-1.5 text-slate-400">
              We recommend using a subdomain like <code>go.domain.com</code> or <code>links.domain.com</code>.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-200 dark:border-slate-800">
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="electric" size="sm">
              Add Domain
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Domain Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteDomainId)}
        onClose={() => setDeleteDomainId(null)}
        onConfirm={() => {
          if (deleteDomainId) {
            deleteDomain(deleteDomainId);
            setDeleteDomainId(null);
          }
        }}
        title="Remove Custom Domain?"
        message="Are you sure you want to remove this domain? Existing shortened links configured on this domain will stop redirecting."
      />
    </div>
  );
}
