export function formatNumber(num) {
  if (num === null || num === undefined) return '0';
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toLocaleString();
}

export function formatDate(dateString, opts = { month: 'short', day: 'numeric', year: 'numeric' }) {
  if (!dateString) return '—';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', opts);
  } catch (e) {
    return dateString;
  }
}

export function formatTimeAgo(dateString) {
  if (!dateString) return 'Never';
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(dateString);
}

export function isValidUrl(string) {
  try {
    const url = new URL(string.startsWith('http://') || string.startsWith('https://') ? string : `https://${string}`);
    return url.hostname.includes('.');
  } catch (_) {
    return false;
  }
}

export function normalizeUrl(url) {
  if (!url) return '';
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
}

export function validateAlias(alias, existingAliases = []) {
  if (!alias) return { isValid: true, error: null };
  const trimmed = alias.trim().toLowerCase();
  
  if (trimmed.length < 3) {
    return { isValid: false, error: 'Alias must be at least 3 characters' };
  }
  if (trimmed.length > 40) {
    return { isValid: false, error: 'Alias cannot exceed 40 characters' };
  }
  if (!/^[a-zA-Z0-9-_]+$/.test(trimmed)) {
    return { isValid: false, error: 'Only letters, numbers, hyphens and underscores allowed' };
  }
  const reserved = ['login', 'register', 'dashboard', 'pricing', 'api', 'admin', 'links', 'settings', 'auth', 'terms', 'privacy', 'domains', 'history'];
  if (reserved.includes(trimmed)) {
    return { isValid: false, error: `"${trimmed}" is a reserved system path` };
  }
  if (existingAliases.includes(trimmed)) {
    return { isValid: false, error: `Alias "${trimmed}" is already taken` };
  }
  return { isValid: true, error: null };
}

export function generateShortCode(length = 6) {
  const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
