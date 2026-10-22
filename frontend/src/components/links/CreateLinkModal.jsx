import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { QRCodeSVG } from 'qrcode.react';
import { useApp } from '../../context/AppContext';
import { validateAlias, generateShortCode, isValidUrl } from '../../utils/analyticsHelpers';
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
  Tag,
  Shuffle,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function CreateLinkModal() {
  const {
    isCreateModalOpen,
    setIsCreateModalOpen,
    createLink,
    domains,
    links,
    addToast
  } = useApp();

  const navigate = useNavigate();

  // Form states
  const [destinationUrl, setDestinationUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('linkly.app');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [linkPassword, setLinkPassword] = useState('');
  const [expiresAt, setExpiresAt] = useState('');

  // UTM parameters
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [utmContent, setUtmContent] = useState('');

  // Submission & Success state
  const [isLoading, setIsLoading] = useState(false);
  const [createdLink, setCreatedLink] = useState(null);
  const [copied, setCopied] = useState(false);

  // Validation
  const [urlError, setUrlError] = useState('');
  const [aliasError, setAliasError] = useState('');

  const resetForm = () => {
    setDestinationUrl('');
    setCustomAlias('');
    setTitle('');
    setDescription('');
    setSelectedDomain('linkly.app');
    setTags([]);
    setTagInput('');
    setPasswordProtected(false);
    setLinkPassword('');
    setExpiresAt('');
    setUtmSource('');
    setUtmMedium('');
    setUtmCampaign('');
    setUtmContent('');
    setUrlError('');
    setAliasError('');
    setCreatedLink(null);
    setCopied(false);
    setShowAdvanced(false);
  };

  const handleClose = () => {
    setIsCreateModalOpen(false);
    resetForm();
  };

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
      setUrlError('Please enter a valid web URL (e.g. https://example.com/page)');
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
      // Build final destination with UTM if present
      let finalUrl = destinationUrl.trim();
      const utmObj = {};
      if (utmSource.trim()) utmObj.source = utmSource.trim();
      if (utmMedium.trim()) utmObj.medium = utmMedium.trim();
      if (utmCampaign.trim()) utmObj.campaign = utmCampaign.trim();
      if (utmContent.trim()) utmObj.content = utmContent.trim();

      const result = createLink({
        originalUrl: finalUrl,
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
    }, 400);
  };

  const handleCopyLink = () => {
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
    <Modal
      isOpen={isCreateModalOpen}
      onClose={handleClose}
      title={createdLink ? 'Link Created Successfully! 🎉' : 'Create New Short Link'}
      description={
        createdLink
          ? 'Your branded short URL is live and tracking analytics.'
          : 'Shorten any link, assign custom aliases, and configure campaign tags.'
      }
      maxWidth="max-w-2xl"
    >
      {/* SUCCESS STATE */}
      {createdLink ? (
        <div className="pt-2 space-y-6">
          <div className="p-4 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200/80 dark:border-brand-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Short URL
              </span>
              <p className="font-mono text-lg font-bold text-slate-900 dark:text-white truncate mt-0.5">
                {createdLink.shortUrl}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-1">
                Redirects to: {createdLink.originalUrl}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="electric"
                size="sm"
                icon={copied ? Check : Copy}
                onClick={handleCopyLink}
              >
                {copied ? 'Copied' : 'Copy'}
              </Button>
              <a href={createdLink.shortUrl} target="_blank" rel="noreferrer">
                <Button variant="secondary" size="sm" icon={ExternalLink}>
                  Open
                </Button>
              </a>
            </div>
          </div>

          {/* QR Code and Quick Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
              <QRCodeSVG value={createdLink.shortUrl} size={110} level="M" />
              <span className="text-[11px] text-slate-400 mt-2 font-mono">
                {createdLink.shortCode}
              </span>
            </div>

            <div className="sm:col-span-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs space-y-2.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Domain:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {createdLink.domain}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Custom Alias:</span>
                <span className="font-semibold font-mono text-slate-800 dark:text-slate-200">
                  {createdLink.customAlias || 'Auto-generated'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Protection:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {createdLink.passwordProtected ? 'Password Enabled' : 'Public'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tags:</span>
                <span className="font-semibold text-brand-600 dark:text-brand-400">
                  {createdLink.tags?.join(', ') || 'None'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
            <Button variant="outline" size="sm" onClick={resetForm}>
              Create Another Link
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={BarChart2}
              onClick={() => {
                handleClose();
                navigate(`/links/${createdLink.id}`);
              }}
            >
              View Detailed Analytics
            </Button>
          </div>
        </div>
      ) : (
        /* FORM STATE */
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* Destination URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Destination URL <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="https://example.com/my-long-landing-page?with=query-params"
                value={destinationUrl}
                onChange={e => {
                  setDestinationUrl(e.target.value);
                  if (urlError) setUrlError('');
                }}
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border ${
                  urlError
                    ? 'border-rose-500 focus:ring-rose-500/30'
                    : 'border-slate-200 dark:border-slate-800 focus:border-brand-500'
                } text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition`}
              />
            </div>
            {urlError && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {urlError}
              </p>
            )}
          </div>

          {/* Domain and Custom Alias */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Domain
              </label>
              <select
                value={selectedDomain}
                onChange={e => setSelectedDomain(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition"
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
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Custom Alias (Optional)
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

              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. spring-sale-2026"
                  value={customAlias}
                  onChange={e => handleAliasChange(e.target.value)}
                  className={`w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border ${
                    aliasError
                      ? 'border-rose-500 focus:ring-rose-500/30'
                      : 'border-slate-200 dark:border-slate-800 focus:border-brand-500'
                  } text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition`}
                />
              </div>

              {aliasError ? (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {aliasError}
                </p>
              ) : (
                <p className="mt-1 text-[11px] text-slate-400 font-mono">
                  Preview: https://{selectedDomain}/{customAlias || 'abc123'}
                </p>
              )}
            </div>
          </div>

          {/* Title and Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Link Title (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Q4 Growth Report"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Tags (Press Enter to add)
              </label>
              <input
                type="text"
                placeholder="Marketing, Newsletter..."
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-500 transition"
              />
            </div>
          </div>

          {/* Tag Pills */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.map(t => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800"
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

          {/* Advanced Accordion Toggle */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                Advanced Settings (UTM Tracking, Expiration, Password)
              </span>
              {showAdvanced ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {showAdvanced && (
              <div className="mt-3 space-y-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 animate-in fade-in duration-200 text-xs">
                {/* UTM Tracking Fields */}
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    UTM Campaign Parameters
                  </h4>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] text-slate-500">utm_source</label>
                      <input
                        type="text"
                        placeholder="twitter, google, newsletter"
                        value={utmSource}
                        onChange={e => setUtmSource(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500">utm_medium</label>
                      <input
                        type="text"
                        placeholder="cpc, social, email"
                        value={utmMedium}
                        onChange={e => setUtmMedium(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500">utm_campaign</label>
                      <input
                        type="text"
                        placeholder="summer-promo, v2-launch"
                        value={utmCampaign}
                        onChange={e => setUtmCampaign(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500">utm_content</label>
                      <input
                        type="text"
                        placeholder="cta-button, hero-banner"
                        value={utmContent}
                        onChange={e => setUtmContent(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Expiration and Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div>
                    <label className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Link Expiration Date
                    </label>
                    <input
                      type="date"
                      value={expiresAt}
                      onChange={e => setExpiresAt(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      Password Protection
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="pwd-check"
                        checked={passwordProtected}
                        onChange={e => setPasswordProtected(e.target.checked)}
                        className="rounded text-brand-600 focus:ring-brand-500"
                      />
                      <label htmlFor="pwd-check" className="text-xs text-slate-600 dark:text-slate-400">
                        Require password to open
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-200 dark:border-slate-800">
            <Button variant="outline" size="sm" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="electric"
              size="md"
              loading={isLoading}
              icon={Link2}
            >
              Shorten URL
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
