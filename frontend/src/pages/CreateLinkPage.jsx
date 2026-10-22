import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { QRCodeSVG } from 'qrcode.react';
import { validateAlias, generateShortCode, isValidUrl } from '../utils/analyticsHelpers';
import {
  Link2,
  Copy,
  Check,
  ExternalLink,
  BarChart2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Lock,
  Calendar,
  Shuffle,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

export default function CreateLinkPage() {
  const { createLink, domains, links, addToast } = useApp();
  const navigate = useNavigate();

  const [destinationUrl, setDestinationUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('linkly.app');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [expiresAt, setExpiresAt] = useState('');

  // UTM parameters
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [utmContent, setUtmContent] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [createdLink, setCreatedLink] = useState(null);
  const [copied, setCopied] = useState(false);
  const [urlError, setUrlError] = useState('');
  const [aliasError, setAliasError] = useState('');

  const handleAliasChange = val => {
    setCustomAlias(val);
    if (!val) {
      setAliasError('');
      return;
    }
    const existing = links.map(l => l.customAlias?.toLowerCase() || l.shortCode?.toLowerCase());
    const validation = validateAlias(val, existing);
    if (!validation.isValid) {
      setAliasError(validation.error);
    } else {
      setAliasError('');
    }
  };

  const handleSuggestAlias = () => {
    const random = generateShortCode(6);
    setCustomAlias(random);
    setAliasError('');
  };

  const handleAddTag = e => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.trim().replace(/^,/, '');
      if (val && !tags.includes(val)) {
        setTags([...tags, val]);
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = tagToRemove => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUrlError('');
    setAliasError('');

    if (!destinationUrl.trim()) {
      setUrlError('Please enter a destination URL');
      return;
    }

    if (!isValidUrl(destinationUrl.trim())) {
      setUrlError('Please enter a valid website URL (e.g. https://example.com/page)');
      return;
    }

    if (customAlias.trim()) {
      const existing = links.map(l => l.customAlias?.toLowerCase() || l.shortCode?.toLowerCase());
      const validation = validateAlias(customAlias, existing);
      if (!validation.isValid) {
        setAliasError(validation.error);
        return;
      }
    }

    setIsLoading(true);

    setTimeout(() => {
      const utmObj = {};
      if (utmSource.trim()) utmObj.source = utmSource.trim();
      if (utmMedium.trim()) utmObj.medium = utmMedium.trim();
      if (utmCampaign.trim()) utmObj.campaign = utmCampaign.trim();
      if (utmContent.trim()) utmObj.content = utmContent.trim();

      const result = createLink({
        originalUrl: destinationUrl.trim(),
        customAlias: customAlias.trim(),
        title: title.trim(),
        description: description.trim(),
        domain: selectedDomain,
        tags,
        passwordProtected,
        expiresAt: expiresAt || null,
        utm: utmObj
      });

      setIsLoading(false);

      if (result.success) {
        setCreatedLink(result.link);
      }
    }, 450);
  };

  const handleCopy = () => {
    if (!createdLink) return;
    navigator.clipboard.writeText(createdLink.shortUrl);
    setCopied(true);
    addToast({
      type: 'success',
      title: 'Copied Link!',
      message: createdLink.shortUrl
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/links" className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to links</span>
        </Link>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Create New Short Link
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Turn long, complex URLs into memorable branded short links with instant analytics.
        </p>
      </div>

      {createdLink ? (
        <Card className="space-y-6 animate-in fade-in">
          <div className="p-4 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200/80 dark:border-brand-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Created Short URL
              </span>
              <p className="font-mono text-xl font-bold text-slate-900 dark:text-white truncate mt-0.5">
                {createdLink.shortUrl}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-1">
                Destination: {createdLink.originalUrl}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button variant="electric" size="sm" icon={copied ? Check : Copy} onClick={handleCopy}>
                {copied ? 'Copied' : 'Copy'}
              </Button>
              <a href={createdLink.shortUrl} target="_blank" rel="noreferrer">
                <Button variant="secondary" size="sm" icon={ExternalLink}>
                  Visit
                </Button>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center">
              <QRCodeSVG value={createdLink.shortUrl} size={120} level="M" />
              <span className="text-[11px] text-slate-400 mt-2 font-mono">{createdLink.shortCode}</span>
            </div>

            <div className="sm:col-span-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Domain:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{createdLink.domain}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Alias:</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                  {createdLink.customAlias || 'Auto-generated'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tags:</span>
                <span className="font-semibold text-brand-600 dark:text-brand-400">
                  {createdLink.tags?.join(', ') || 'None'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Security:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {createdLink.passwordProtected ? 'Password Protected' : 'Public'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCreatedLink(null);
                setDestinationUrl('');
                setCustomAlias('');
              }}
            >
              Shorten Another
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={BarChart2}
              onClick={() => navigate(`/links/${createdLink.id}`)}
            >
              Go to Link Analytics
            </Button>
          </div>
        </Card>
      ) : (
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Destination URL */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Destination URL <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="https://example.com/long-page-address..."
                value={destinationUrl}
                onChange={e => {
                  setDestinationUrl(e.target.value);
                  if (urlError) setUrlError('');
                }}
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border ${
                  urlError
                    ? 'border-rose-500'
                    : 'border-slate-200 dark:border-slate-800 focus:border-brand-500'
                } text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none`}
              />
              {urlError && <p className="mt-1 text-xs text-rose-500">{urlError}</p>}
            </div>

            {/* Domain & Alias */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-5">
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Domain
                </label>
                <select
                  value={selectedDomain}
                  onChange={e => setSelectedDomain(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="linkly.app">linkly.app (Default)</option>
                  {domains
                    .filter(d => d.status === 'verified')
                    .map(d => (
                      <option key={d.id} value={d.domain}>
                        {d.domain}
                      </option>
                    ))}
                </select>
              </div>

              <div className="sm:col-span-7">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Custom Slug / Alias
                  </label>
                  <button
                    type="button"
                    onClick={handleSuggestAlias}
                    className="text-[11px] text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                  >
                    <Shuffle className="w-3 h-3" />
                    Auto Suggest
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="e.g. cyber-promo"
                  value={customAlias}
                  onChange={e => handleAliasChange(e.target.value)}
                  className={`w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border ${
                    aliasError
                      ? 'border-rose-500'
                      : 'border-slate-200 dark:border-slate-800 focus:border-brand-500'
                  } text-slate-900 dark:text-white focus:outline-none`}
                />
                {aliasError ? (
                  <p className="mt-1 text-xs text-rose-500">{aliasError}</p>
                ) : (
                  <p className="mt-1 text-[11px] text-slate-400 font-mono">
                    Preview: https://{selectedDomain}/{customAlias || 'xyz789'}
                  </p>
                )}
              </div>
            </div>

            {/* Title & Description */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Link Title (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Autumn Product Catalogue"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Tags (Press Enter)
                </label>
                <input
                  type="text"
                  placeholder="Newsletter, Sales, Fall"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map(t => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800"
                  >
                    #{t}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(t)}
                      className="text-brand-400 hover:text-brand-700 ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Advanced UTM settings */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center justify-between w-full py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                  Advanced Settings (UTM, Password, Expiration)
                </span>
                {showAdvanced ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {showAdvanced && (
                <div className="mt-3 space-y-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] text-slate-500">utm_source</label>
                      <input
                        type="text"
                        placeholder="twitter, linkedin"
                        value={utmSource}
                        onChange={e => setUtmSource(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500">utm_medium</label>
                      <input
                        type="text"
                        placeholder="social, email"
                        value={utmMedium}
                        onChange={e => setUtmMedium(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <div>
                      <label className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Expiration Date
                      </label>
                      <input
                        type="date"
                        value={expiresAt}
                        onChange={e => setExpiresAt(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        Password Protection
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer mt-1.5">
                        <input
                          type="checkbox"
                          checked={passwordProtected}
                          onChange={e => setPasswordProtected(e.target.checked)}
                          className="rounded text-brand-600"
                        />
                        <span>Enable password prompt</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2.5">
              <Button variant="outline" size="md" onClick={() => navigate('/links')}>
                Cancel
              </Button>
              <Button type="submit" variant="electric" size="md" loading={isLoading} icon={Link2}>
                Create Short Link
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}
