import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USER,
  INITIAL_LINKS,
  INITIAL_DOMAINS,
  INITIAL_CLICK_EVENTS,
  GENERATE_TIME_SERIES
} from '../data/initialData';
import { generateShortCode, validateAlias, normalizeUrl } from '../utils/analyticsHelpers';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('linkly_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('linkly_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // // Auth State
  // const [user, setUser] = useState(() => {
  //   const saved = localStorage.getItem('linkly_user');
  //   return saved ? JSON.parse(saved) : INITIAL_USER;
  // });

  // const [isAuthenticated, setIsAuthenticated] = useState(() => {
  //   const saved = localStorage.getItem('linkly_auth');
  //   return saved ? JSON.parse(saved) : true;
  // });

  // useEffect(() => {
  //   localStorage.setItem('linkly_user', JSON.stringify(user));
  // }, [user]);

  // useEffect(() => {
  //   localStorage.setItem('linkly_auth', JSON.stringify(isAuthenticated));
  // }, [isAuthenticated]);

  // Links State
  const [links, setLinks] = useState(() => {
    const saved = localStorage.getItem('linkly_links');
    return saved ? JSON.parse(saved) : INITIAL_LINKS;
  });

  useEffect(() => {
    localStorage.setItem('linkly_links', JSON.stringify(links));
  }, [links]);

  // Domains State
  const [domains, setDomains] = useState(() => {
    const saved = localStorage.getItem('linkly_domains');
    return saved ? JSON.parse(saved) : INITIAL_DOMAINS;
  });

  useEffect(() => {
    localStorage.setItem('linkly_domains', JSON.stringify(domains));
  }, [domains]);

  // Click Events State
  const [clickEvents, setClickEvents] = useState(() => {
    const saved = localStorage.getItem('linkly_click_events');
    return saved ? JSON.parse(saved) : INITIAL_CLICK_EVENTS;
  });

  useEffect(() => {
    localStorage.setItem('linkly_click_events', JSON.stringify(clickEvents));
  }, [clickEvents]);

  // Global Date Range
  const [dateRange, setDateRange] = useState('30d');

  // Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Toast System
  const [toasts, setToasts] = useState([]);

  const addToast = ({ type = 'info', title, message, duration = 4000 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = id => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Link Operations
  const createLink = ({
    originalUrl,
    customAlias = '',
    title = '',
    description = '',
    domain = 'linkly.app',
    tags = [],
    passwordProtected = false,
    expiresAt = null,
    utm = {}
  }) => {
    const cleanUrl = normalizeUrl(originalUrl);
    const code = customAlias.trim() ? customAlias.trim() : generateShortCode();

    // Check alias availability
    const existing = links.map(l => l.customAlias?.toLowerCase() || l.shortCode?.toLowerCase());
    if (customAlias.trim()) {
      const val = validateAlias(customAlias, existing);
      if (!val.isValid) {
        addToast({ type: 'error', title: 'Invalid Alias', message: val.error });
        return { success: false, error: val.error };
      }
    }

    const shortUrl = `https://${domain}/${code}`;

    const newLink = {
      id: `link-${Date.now()}`,
      title: title.trim() || cleanUrl.replace(/^https?:\/\//i, '').split('/')[0],
      description: description.trim(),
      originalUrl: cleanUrl,
      shortCode: code,
      shortUrl,
      customAlias: customAlias.trim() || null,
      domain,
      createdAt: new Date().toISOString(),
      lastClickedAt: null,
      status: 'active',
      tags: tags.length ? tags : ['General'],
      clicks: 0,
      uniqueVisitors: 0,
      clicksToday: 0,
      clicksThisWeek: 0,
      clicksThisMonth: 0,
      avgDailyClicks: 0,
      peakTrafficDay: 'N/A',
      passwordProtected: Boolean(passwordProtected),
      expiresAt: expiresAt || null,
      utm: utm || {}
    };

    setLinks(prev => [newLink, ...prev]);
    addToast({
      type: 'success',
      title: 'Short Link Created!',
      message: `${shortUrl} is ready to share.`
    });

    return { success: true, link: newLink };
  };

  const updateLink = (id, fields) => {
    setLinks(prev =>
      prev.map(item => {
        if (item.id === id) {
          const updated = { ...item, ...fields };
          if (fields.customAlias && fields.customAlias !== item.customAlias) {
            updated.shortCode = fields.customAlias;
            updated.shortUrl = `https://${updated.domain}/${fields.customAlias}`;
          }
          return updated;
        }
        return item;
      })
    );
    addToast({
      type: 'success',
      title: 'Link Updated',
      message: 'Changes saved successfully.'
    });
  };

  const deleteLink = id => {
    const target = links.find(l => l.id === id);
    setLinks(prev => prev.filter(l => l.id !== id));
    addToast({
      type: 'info',
      title: 'Link Deleted',
      message: target ? `"${target.title}" was removed.` : 'Link removed.'
    });
  };

  // Simulate a realistic live click (interactive demo)
  const simulateClick = linkId => {
    const target = links.find(l => l.id === linkId) || links[0];
    if (!target) return;

    const countries = [
      { name: 'United States', code: 'US', flag: '🇺🇸', cities: ['San Francisco', 'New York', 'Austin'] },
      { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', cities: ['London', 'Manchester'] },
      { name: 'Germany', code: 'DE', flag: '🇩🇪', cities: ['Berlin', 'Munich'] },
      { name: 'India', code: 'IN', flag: '🇮🇳', cities: ['Bengaluru', 'Mumbai', 'Delhi'] },
      { name: 'Canada', code: 'CA', flag: '🇨🇦', cities: ['Toronto', 'Vancouver'] },
      { name: 'Japan', code: 'JP', flag: '🇯🇵', cities: ['Tokyo', 'Osaka'] }
    ];
    const devices = ['Mobile', 'Desktop', 'Tablet'];
    const browsers = ['Chrome 129', 'Safari 18', 'Firefox 132', 'Edge 128'];
    const oss = ['iOS 18', 'Android 15', 'macOS 15', 'Windows 11'];
    const referrers = ['Twitter / X', 'LinkedIn', 'Product Hunt', 'Direct', 'Google Search', 'GitHub'];

    const country = countries[Math.floor(Math.random() * countries.length)];
    const city = country.cities[Math.floor(Math.random() * country.cities.length)];
    const device = devices[Math.floor(Math.random() * devices.length)];
    const browser = browsers[Math.floor(Math.random() * browsers.length)];
    const os = oss[Math.floor(Math.random() * oss.length)];
    const referrer = referrers[Math.floor(Math.random() * referrers.length)];

    const newEvent = {
      id: `evt-${Date.now()}`,
      timestamp: new Date().toISOString(),
      linkId: target.id,
      country: country.name,
      countryCode: country.code,
      flag: country.flag,
      region: city,
      city: city,
      device,
      browser,
      os,
      referrer,
      campaign: target.utm?.campaign || 'general',
      destination: target.originalUrl
    };

    setClickEvents(prev => [newEvent, ...prev.slice(0, 49)]);

    setLinks(prev =>
      prev.map(l => {
        if (l.id === target.id) {
          return {
            ...l,
            clicks: l.clicks + 1,
            uniqueVisitors: l.uniqueVisitors + (Math.random() > 0.3 ? 1 : 0),
            clicksToday: l.clicksToday + 1,
            clicksThisWeek: l.clicksThisWeek + 1,
            clicksThisMonth: l.clicksThisMonth + 1,
            lastClickedAt: new Date().toISOString()
          };
        }
        return l;
      })
    );

    addToast({
      type: 'info',
      title: 'Simulated Click Recorded! ⚡',
      message: `Click from ${country.flag} ${city}, ${country.name} (${device} / ${browser})`
    });
  };

  // Domain Management
  const addDomain = domainName => {
    const cleanDomain = domainName.toLowerCase().trim().replace(/^https?:\/\//i, '');
    const newDom = {
      id: `dom-${Date.now()}`,
      domain: cleanDomain,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      isDefault: false,
      linksCount: 0,
      dnsRecord: {
        type: 'CNAME',
        host: cleanDomain.split('.')[0],
        value: 'cname.linkly.app',
        ttl: '3600'
      }
    };
    setDomains(prev => [...prev, newDom]);
    addToast({
      type: 'success',
      title: 'Domain Added',
      message: `Please configure DNS for ${cleanDomain}`
    });
  };

  const deleteDomain = id => {
    setDomains(prev => prev.filter(d => d.id !== id));
    addToast({
      type: 'info',
      title: 'Domain Removed',
      message: 'Custom domain configuration deleted.'
    });
  };

  const setDefaultDomain = domainName => {
    setDomains(prev =>
      prev.map(d => ({
        ...d,
        isDefault: d.domain === domainName
      }))
    );
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        defaultDomain: domainName
      }
    }));
    addToast({
      type: 'success',
      title: 'Default Domain Changed',
      message: `${domainName} is now your default short domain.`
    });
  };

  // Auth Operations
  const login = (email, password) => {
    setIsAuthenticated(true);
    setUser(prev => ({ ...prev, email: email || prev.email }));
    addToast({
      type: 'success',
      title: 'Welcome Back!',
      message: `Logged in as ${email || user.email}`
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    addToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been safely signed out.'
    });
  };

  const updateUserProfile = updatedFields => {
    setUser(prev => ({ ...prev, ...updatedFields }));
    addToast({
      type: 'success',
      title: 'Settings Saved',
      message: 'Your profile has been updated.'
    });
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
       
        login,
        logout,
        updateUserProfile,
        links,
        createLink,
        updateLink,
        deleteLink,
        simulateClick,
        domains,
        addDomain,
        deleteDomain,
        setDefaultDomain,
        clickEvents,
        dateRange,
        setDateRange,
        toasts,
        addToast,
        removeToast,
        isCreateModalOpen,
        setIsCreateModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
