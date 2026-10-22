// Initial realistic mock datasets for Linkly

export const INITIAL_USER = {
  name: "Alex Rivera",
  email: "alex.rivera@acmelabs.io",
  role: "Growth Lead",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
  plan: "Pro Plan",
  planUsage: {
    linksUsed: 42,
    linksLimit: 500,
    clicksUsed: 84920,
    clicksLimit: 250000,
    domainsUsed: 2,
    domainsLimit: 5
  },
  preferences: {
    theme: "light",
    timezone: "UTC - 05:00 (Eastern Time)",
    defaultRange: "30d",
    defaultDomain: "linkly.app",
    emailReports: true,
    productUpdates: true,
    securityAlerts: true
  }
};

export const INITIAL_DOMAINS = [
  {
    id: "dom-1",
    domain: "go.acme.co",
    status: "verified", // verified | pending | error
    createdAt: "2026-03-15",
    isDefault: true,
    linksCount: 28,
    dnsRecord: {
      type: "CNAME",
      host: "go",
      value: "cname.linkly.app",
      ttl: "Auto"
    }
  },
  {
    id: "dom-2",
    domain: "links.alexrivera.dev",
    status: "verified",
    createdAt: "2026-05-10",
    isDefault: false,
    linksCount: 14,
    dnsRecord: {
      type: "CNAME",
      host: "links",
      value: "cname.linkly.app",
      ttl: "Auto"
    }
  },
  {
    id: "dom-3",
    domain: "track.growthpilot.io",
    status: "pending",
    createdAt: "2026-10-12",
    isDefault: false,
    linksCount: 0,
    dnsRecord: {
      type: "CNAME",
      host: "track",
      value: "cname.linkly.app",
      ttl: "3600"
    }
  }
];

export const INITIAL_LINKS = [
  {
    id: "link-1",
    title: "Linkly v2 Product Launch on Product Hunt",
    description: "Launch campaign for the new intelligent analytics release.",
    originalUrl: "https://www.producthunt.com/posts/linkly-v2-analytics-url-shortener",
    shortCode: "launch-2026",
    shortUrl: "https://linkly.app/launch-2026",
    customAlias: "launch-2026",
    domain: "linkly.app",
    createdAt: "2026-09-28T09:30:00Z",
    lastClickedAt: "2026-10-18T11:45:00Z",
    status: "active",
    tags: ["Product Hunt", "Launch", "Marketing"],
    clicks: 14850,
    uniqueVisitors: 11920,
    clicksToday: 412,
    clicksThisWeek: 2840,
    clicksThisMonth: 12100,
    avgDailyClicks: 742,
    peakTrafficDay: "Tuesday",
    passwordProtected: false,
    expiresAt: null,
    utm: {
      source: "producthunt",
      medium: "social",
      campaign: "v2-launch",
      content: "banner-cta"
    }
  },
  {
    id: "link-2",
    title: "Black Friday & Cyber Week 40% Off Promotion",
    description: "Global promo code landing page for SaaS subscription discounts.",
    originalUrl: "https://acmelabs.io/pricing?discount=CYBER40&ref=linkly",
    shortCode: "cyber-40",
    shortUrl: "https://go.acme.co/cyber-40",
    customAlias: "cyber-40",
    domain: "go.acme.co",
    createdAt: "2026-10-01T14:15:00Z",
    lastClickedAt: "2026-10-18T12:02:00Z",
    status: "active",
    tags: ["Sales", "Promo", "Pricing"],
    clicks: 28430,
    uniqueVisitors: 23150,
    clicksToday: 890,
    clicksThisWeek: 6420,
    clicksThisMonth: 28430,
    avgDailyClicks: 1579,
    peakTrafficDay: "Friday",
    passwordProtected: false,
    expiresAt: "2026-11-30T23:59:59Z",
    utm: {
      source: "newsletter",
      medium: "email",
      campaign: "cyber-week",
      content: "header-btn"
    }
  },
  {
    id: "link-3",
    title: "Developer Documentation & REST API Reference",
    description: "SDK guides and OpenAPI specification for enterprise integrations.",
    originalUrl: "https://docs.acmelabs.io/api/v2/webhooks-and-events",
    shortCode: "api-docs",
    shortUrl: "https://linkly.app/api-docs",
    customAlias: "api-docs",
    domain: "linkly.app",
    createdAt: "2026-08-14T08:00:00Z",
    lastClickedAt: "2026-10-18T10:15:00Z",
    status: "active",
    tags: ["Dev", "API", "Docs"],
    clicks: 9640,
    uniqueVisitors: 7890,
    clicksToday: 135,
    clicksThisWeek: 980,
    clicksThisMonth: 3410,
    avgDailyClicks: 148,
    peakTrafficDay: "Wednesday",
    passwordProtected: false,
    expiresAt: null,
    utm: {
      source: "github",
      medium: "readme",
      campaign: "open-source",
      content: ""
    }
  },
  {
    id: "link-4",
    title: "Figma UI Kit & Design System 2.0 Download",
    description: "Community file for design tokens, typography, and SaaS components.",
    originalUrl: "https://www.figma.com/community/file/149827461938/design-tokens-v2",
    shortCode: "figma-v2",
    shortUrl: "https://links.alexrivera.dev/figma-v2",
    customAlias: "figma-v2",
    domain: "links.alexrivera.dev",
    createdAt: "2026-09-05T16:20:00Z",
    lastClickedAt: "2026-10-17T22:10:00Z",
    status: "active",
    tags: ["Design", "Figma", "Freebie"],
    clicks: 6810,
    uniqueVisitors: 5400,
    clicksToday: 82,
    clicksThisWeek: 610,
    clicksThisMonth: 2790,
    avgDailyClicks: 162,
    peakTrafficDay: "Monday",
    passwordProtected: false,
    expiresAt: null,
    utm: {
      source: "twitter",
      medium: "thread",
      campaign: "design-system",
      content: "slide-1"
    }
  },
  {
    id: "link-5",
    title: "Podcast Episode 42: Scaling SaaS to $10M ARR",
    description: "In-depth conversation on retention loops and viral link mechanics.",
    originalUrl: "https://open.spotify.com/episode/3Kx9q0L1a2Z9m8N7B6v5C4",
    shortCode: "pod-42",
    shortUrl: "https://linkly.app/pod-42",
    customAlias: "pod-42",
    domain: "linkly.app",
    createdAt: "2026-10-08T11:00:00Z",
    lastClickedAt: "2026-10-18T08:30:00Z",
    status: "active",
    tags: ["Podcast", "Audio", "Interviews"],
    clicks: 4290,
    uniqueVisitors: 3670,
    clicksToday: 110,
    clicksThisWeek: 1250,
    clicksThisMonth: 4290,
    avgDailyClicks: 429,
    peakTrafficDay: "Thursday",
    passwordProtected: false,
    expiresAt: null,
    utm: {
      source: "linkedin",
      medium: "post",
      campaign: "podcast-tour",
      content: "audio-snippet"
    }
  },
  {
    id: "link-6",
    title: "Private Investor Deck Q3 Review",
    description: "Confidential slides and metrics deck for seed and Series A investors.",
    originalUrl: "https://pitch.com/v/acme-q3-investor-review-98317x",
    shortCode: "inv-q3",
    shortUrl: "https://go.acme.co/inv-q3",
    customAlias: "inv-q3",
    domain: "go.acme.co",
    createdAt: "2026-10-02T18:00:00Z",
    lastClickedAt: "2026-10-16T15:20:00Z",
    status: "active",
    tags: ["Investors", "Private", "Pitch"],
    clicks: 142,
    uniqueVisitors: 118,
    clicksToday: 4,
    clicksThisWeek: 28,
    clicksThisMonth: 142,
    avgDailyClicks: 9,
    peakTrafficDay: "Tuesday",
    passwordProtected: true,
    expiresAt: "2026-12-31T23:59:59Z",
    utm: {
      source: "email",
      medium: "direct",
      campaign: "fundraising",
      content: ""
    }
  },
  {
    id: "link-7",
    title: "Summer Internship Hiring Portal 2026",
    description: "Career applications for engineering, product, and design interns.",
    originalUrl: "https://jobs.lever.co/acme-innovations/internships-2026",
    shortCode: "summer-jobs",
    shortUrl: "https://linkly.app/summer-jobs",
    customAlias: "summer-jobs",
    domain: "linkly.app",
    createdAt: "2026-06-01T10:00:00Z",
    lastClickedAt: "2026-08-30T17:00:00Z",
    status: "expired",
    tags: ["Hiring", "Jobs", "Summer"],
    clicks: 11340,
    uniqueVisitors: 8900,
    clicksToday: 0,
    clicksThisWeek: 0,
    clicksThisMonth: 0,
    avgDailyClicks: 126,
    peakTrafficDay: "Wednesday",
    passwordProtected: false,
    expiresAt: "2026-08-31T23:59:59Z",
    utm: {
      source: "university",
      medium: "jobboard",
      campaign: "campus-recruitment",
      content: ""
    }
  }
];

// Time-series click data generator
export const GENERATE_TIME_SERIES = (days = 30) => {
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const dayOfWeek = d.getDay(); // 0 is Sunday, 6 is Saturday
    
    // Higher on weekdays, dip slightly on weekend
    const multiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.65 : 1.15;
    const baseClicks = Math.floor((320 + Math.sin(i / 2) * 120 + Math.random() * 80) * multiplier);
    const unique = Math.floor(baseClicks * (0.78 + Math.random() * 0.08));
    
    data.push({
      date: dateStr,
      fullDate: d.toISOString().split("T")[0],
      clicks: baseClicks,
      uniqueVisitors: unique
    });
  }
  return data;
};

// Hourly click data for 24h view
export const GENERATE_HOURLY_DATA = () => {
  const hours = [];
  for (let h = 0; h < 24; h++) {
    const hourLabel = `${h.toString().padStart(2, "0")}:00`;
    // Work hours traffic curve peaking between 13:00 and 17:00
    let factor = 0.2;
    if (h >= 8 && h <= 18) factor = 1.0 + Math.sin((h - 8) / 10 * Math.PI) * 0.8;
    else if (h > 18 && h <= 23) factor = 0.5;
    
    const clicks = Math.max(8, Math.floor(factor * (40 + Math.random() * 25)));
    const unique = Math.floor(clicks * 0.82);
    hours.push({
      hour: hourLabel,
      clicks,
      uniqueVisitors: unique
    });
  }
  return hours;
};

// Device breakdown data
export const INITIAL_DEVICES = [
  { name: "Mobile", value: 58, clicks: 49250, color: "#4f46e5", growth: "+12.4%" },
  { name: "Desktop", value: 34, clicks: 28870, color: "#06b6d4", growth: "+4.1%" },
  { name: "Tablet", value: 6, clicks: 5095, color: "#8b5cf6", growth: "-1.8%" },
  { name: "Other / Bots", value: 2, clicks: 1705, color: "#94a3b8", growth: "0.0%" }
];

// Browser breakdown data
export const INITIAL_BROWSERS = [
  { name: "Google Chrome", share: 64.2, clicks: 54520, icon: "chrome" },
  { name: "Apple Safari", share: 22.8, clicks: 19360, icon: "safari" },
  { name: "Mozilla Firefox", share: 5.4, clicks: 4585, icon: "firefox" },
  { name: "Microsoft Edge", share: 5.1, clicks: 4330, icon: "edge" },
  { name: "Brave & Others", share: 2.5, clicks: 2125, icon: "browser" }
];

// Operating Systems breakdown data
export const INITIAL_OPERATING_SYSTEMS = [
  { name: "iOS", share: 36.5, clicks: 31000 },
  { name: "Android", share: 32.1, clicks: 27260 },
  { name: "macOS", share: 15.4, clicks: 13080 },
  { name: "Windows", share: 13.8, clicks: 11720 },
  { name: "Linux / Other", share: 2.2, clicks: 1860 }
];

// Country & Geographic breakdown data
export const INITIAL_GEOGRAPHIC = [
  { country: "United States", code: "US", flag: "🇺🇸", clicks: 38450, share: 45.3, regions: [
    { name: "California", clicks: 14200, city: "San Francisco" },
    { name: "New York", clicks: 9400, city: "New York City" },
    { name: "Texas", clicks: 6800, city: "Austin" },
    { name: "Washington", clicks: 4200, city: "Seattle" }
  ]},
  { country: "United Kingdom", code: "GB", flag: "🇬🇧", clicks: 11840, share: 13.9, regions: [
    { name: "Greater London", clicks: 7600, city: "London" },
    { name: "Manchester", clicks: 2100, city: "Manchester" }
  ]},
  { country: "Germany", code: "DE", flag: "🇩🇪", clicks: 8120, share: 9.6, regions: [
    { name: "Berlin", clicks: 4500, city: "Berlin" },
    { name: "Bavaria", clicks: 2200, city: "Munich" }
  ]},
  { country: "India", code: "IN", flag: "🇮🇳", clicks: 7680, share: 9.0, regions: [
    { name: "Karnataka", clicks: 3900, city: "Bengaluru" },
    { name: "Maharashtra", clicks: 2400, city: "Mumbai" }
  ]},
  { country: "Canada", code: "CA", flag: "🇨🇦", clicks: 5210, share: 6.1, regions: [
    { name: "Ontario", clicks: 3100, city: "Toronto" },
    { name: "British Columbia", clicks: 1500, city: "Vancouver" }
  ]},
  { country: "France", code: "FR", flag: "🇫🇷", clicks: 3940, share: 4.6, regions: [
    { name: "Île-de-France", clicks: 2800, city: "Paris" }
  ]},
  { country: "Australia", code: "AU", flag: "🇦🇺", clicks: 3180, share: 3.7, regions: [
    { name: "New South Wales", clicks: 1900, city: "Sydney" }
  ]},
  { country: "Japan", code: "JP", flag: "🇯🇵", clicks: 2650, share: 3.1, regions: [
    { name: "Kanto", clicks: 2100, city: "Tokyo" }
  ]},
  { country: "Netherlands", code: "NL", flag: "🇳🇱", clicks: 2100, share: 2.5, regions: [
    { name: "North Holland", clicks: 1600, city: "Amsterdam" }
  ]},
  { country: "Others", code: "XX", flag: "🌐", clicks: 1750, share: 2.2, regions: [] }
];

// Traffic sources
export const INITIAL_TRAFFIC_SOURCES = [
  { source: "Twitter / X", type: "Social", clicks: 26840, share: 31.6, change: "+18.2%" },
  { source: "Direct / QR / Untracked", type: "Direct", clicks: 20120, share: 23.7, change: "+8.4%" },
  { source: "Product Hunt", type: "Referral", clicks: 14200, share: 16.7, change: "+42.1%" },
  { source: "LinkedIn", type: "Social", clicks: 10450, share: 12.3, change: "+15.6%" },
  { source: "Google Search", type: "Organic", clicks: 7650, share: 9.0, change: "+3.2%" },
  { source: "GitHub", type: "Referral", clicks: 3820, share: 4.5, change: "+24.8%" },
  { source: "Reddit & Hacker News", type: "Community", clicks: 1840, share: 2.2, change: "-4.1%" }
];

// Granular Click Events Log
export const INITIAL_CLICK_EVENTS = [
  {
    id: "evt-01",
    timestamp: "2026-10-18T12:02:18Z",
    linkId: "link-2",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    region: "California",
    city: "San Francisco",
    device: "Mobile",
    browser: "Chrome Mobile 128",
    os: "Android 15",
    referrer: "Twitter / X",
    campaign: "cyber-week",
    destination: "https://acmelabs.io/pricing?discount=CYBER40"
  },
  {
    id: "evt-02",
    timestamp: "2026-10-18T11:58:45Z",
    linkId: "link-1",
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    region: "London",
    city: "London",
    device: "Desktop",
    browser: "Safari 18.1",
    os: "macOS 15.2",
    referrer: "Product Hunt",
    campaign: "v2-launch",
    destination: "https://www.producthunt.com/posts/linkly-v2"
  },
  {
    id: "evt-03",
    timestamp: "2026-10-18T11:52:10Z",
    linkId: "link-2",
    country: "Germany",
    countryCode: "DE",
    flag: "🇩🇪",
    region: "Berlin",
    city: "Berlin",
    device: "Desktop",
    browser: "Firefox 132",
    os: "Linux",
    referrer: "Direct",
    campaign: "cyber-week",
    destination: "https://acmelabs.io/pricing?discount=CYBER40"
  },
  {
    id: "evt-04",
    timestamp: "2026-10-18T11:47:33Z",
    linkId: "link-3",
    country: "India",
    countryCode: "IN",
    flag: "🇮🇳",
    region: "Karnataka",
    city: "Bengaluru",
    device: "Desktop",
    browser: "Chrome 129",
    os: "Windows 11",
    referrer: "GitHub",
    campaign: "open-source",
    destination: "https://docs.acmelabs.io/api/v2"
  },
  {
    id: "evt-05",
    timestamp: "2026-10-18T11:39:05Z",
    linkId: "link-5",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    region: "New York",
    city: "New York City",
    device: "Mobile",
    browser: "Mobile Safari",
    os: "iOS 18.0",
    referrer: "LinkedIn",
    campaign: "podcast-tour",
    destination: "https://open.spotify.com/episode/3Kx9q0L1a2Z9m8N7B6v5C4"
  },
  {
    id: "evt-06",
    timestamp: "2026-10-18T11:30:22Z",
    linkId: "link-4",
    country: "Canada",
    countryCode: "CA",
    flag: "🇨🇦",
    region: "Ontario",
    city: "Toronto",
    device: "Desktop",
    browser: "Chrome 129",
    os: "macOS 15.0",
    referrer: "Twitter / X",
    campaign: "design-system",
    destination: "https://www.figma.com/community/file/149827461938"
  },
  {
    id: "evt-07",
    timestamp: "2026-10-18T11:21:40Z",
    linkId: "link-1",
    country: "Japan",
    countryCode: "JP",
    flag: "🇯🇵",
    region: "Tokyo",
    city: "Tokyo",
    device: "Mobile",
    browser: "Mobile Safari",
    os: "iOS 18.1",
    referrer: "Product Hunt",
    campaign: "v2-launch",
    destination: "https://www.producthunt.com/posts/linkly-v2"
  },
  {
    id: "evt-08",
    timestamp: "2026-10-18T11:15:12Z",
    linkId: "link-2",
    country: "Australia",
    countryCode: "AU",
    flag: "🇦🇺",
    region: "New South Wales",
    city: "Sydney",
    device: "Tablet",
    browser: "Safari iPadOS",
    os: "iPadOS 18",
    referrer: "Newsletter",
    campaign: "cyber-week",
    destination: "https://acmelabs.io/pricing"
  },
  {
    id: "evt-09",
    timestamp: "2026-10-18T10:55:00Z",
    linkId: "link-1",
    country: "France",
    countryCode: "FR",
    flag: "🇫🇷",
    region: "Île-de-France",
    city: "Paris",
    device: "Desktop",
    browser: "Chrome 129",
    os: "macOS 15.1",
    referrer: "Twitter / X",
    campaign: "v2-launch",
    destination: "https://www.producthunt.com/posts/linkly-v2"
  },
  {
    id: "evt-10",
    timestamp: "2026-10-18T10:42:30Z",
    linkId: "link-3",
    country: "Netherlands",
    countryCode: "NL",
    flag: "🇳🇱",
    region: "North Holland",
    city: "Amsterdam",
    device: "Desktop",
    browser: "Brave 1.68",
    os: "Linux",
    referrer: "GitHub",
    campaign: "open-source",
    destination: "https://docs.acmelabs.io/api/v2"
  }
];

// Heatmap matrix: 7 days x 24 hours
export const GENERATE_HEATMAP_DATA = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const matrix = [];
  
  days.forEach((day, dayIndex) => {
    for (let h = 0; h < 24; h++) {
      const isWeekday = dayIndex >= 1 && dayIndex <= 5;
      const isPeakHour = h >= 10 && h <= 18;
      let level = 1;
      
      if (isWeekday && isPeakHour) {
        level = Math.floor(Math.random() * 3) + 3; // 3 to 5
      } else if (isWeekday || isPeakHour) {
        level = Math.floor(Math.random() * 3) + 1; // 1 to 3
      } else {
        level = Math.random() > 0.6 ? 1 : 0; // 0 to 1
      }
      
      matrix.push({
        day,
        hour: h,
        level,
        clicks: level * 35 + Math.floor(Math.random() * 15)
      });
    }
  });
  
  return matrix;
};
