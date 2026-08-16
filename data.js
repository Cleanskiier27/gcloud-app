export const INITIAL_METRICS = {
  clicks: 148920,
  impressions: 3420500,
  ctr: 0.0435,
  position: 11.2,
  changes: { clicks: 12.4, impressions: 8.1, ctr: 3.8, position: -1.4 }
};

export const INITIAL_QUERIES = [
  { id: 'q1', query: 'chrome os developer tools analytics', clicks: 14200, impressions: 185000, ctr: 0.0767, position: 2.1, intent: 'Informational', trend: 'up' },
  { id: 'q2', query: 'chrome os agi engine integration', clicks: 11800, impressions: 142000, ctr: 0.0831, position: 1.8, trend: 'up', intent: 'Transactional' },
  { id: 'q3', query: 'vertex ai proxy interceptor setup', clicks: 9400, impressions: 210000, ctr: 0.0447, position: 4.3, trend: 'up', intent: 'Navigational' },
  { id: 'q4', query: 'web search console metric overlay', clicks: 8100, impressions: 198000, ctr: 0.0409, position: 5.8, trend: 'down', intent: 'Informational' },
  { id: 'q5', query: 'gemini flash live prompt streaming', clicks: 7600, impressions: 165000, ctr: 0.0460, position: 3.2, trend: 'up', intent: 'Commercial' },
  { id: 'q6', query: 'chromeos flex enterprise management', clicks: 6200, impressions: 128000, ctr: 0.0484, position: 6.1, trend: 'stable', intent: 'Commercial' },
  { id: 'q7', query: 'realtime browser telemetry dashboard', clicks: 5400, impressions: 112000, ctr: 0.0482, position: 7.4, trend: 'up', intent: 'Informational' },
];

export const PERFORMANCE_TIMELINE = Array.from({ length: 14 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (13 - i));
  const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return {
    date: dateStr,
    clicks: Math.floor(9500 + Math.random() * 3500 + i * 300),
    impressions: Math.floor(220000 + Math.random() * 45000 + i * 5000),
    ctr: Number((0.038 + Math.random() * 0.012).toFixed(4)),
    position: Number((12.5 - (i * 0.15) + (Math.random() * 0.8 - 0.4)).toFixed(1))
  };
});

export const URL_INSPECTION_LIST = [
  { url: 'https://chromeos.dev/en/analytics/agi-overview', indexed: true, mobileUsable: true, coreWebVitals: 'Good (LCP 1.2s)', lastCrawled: '2 hours ago' },
  { url: 'https://chromeos.dev/en/docs/vertex-proxy', indexed: true, mobileUsable: true, coreWebVitals: 'Good (LCP 1.4s)', lastCrawled: '5 hours ago' },
  { url: 'https://chromeos.dev/en/insights/search-trends', indexed: true, mobileUsable: true, coreWebVitals: 'Needs Improvement', lastCrawled: '1 day ago' },
  { url: 'https://chromeos.dev/en/experimental/live-stream', indexed: false, mobileUsable: true, coreWebVitals: 'Pending', lastCrawled: 'Uncrawled' },
];