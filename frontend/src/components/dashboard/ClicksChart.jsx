import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import Card from '../common/Card';
import { GENERATE_TIME_SERIES, GENERATE_HOURLY_DATA } from '../../data/initialData';
import { Calendar, TrendingUp } from 'lucide-react';
import { formatNumber } from '../../utils/analyticsHelpers';

export default function ClicksChart({
  title = 'Click Analytics',
  subtitle = 'Clicks and unique visitors over time'
}) {
  const [activeRange, setActiveRange] = useState('30d');
  const [metricView, setMetricView] = useState('both'); // both | clicks | unique

  const chartData = useMemo(() => {
    if (activeRange === '24h') {
      return GENERATE_HOURLY_DATA().map(d => ({
        label: d.hour,
        clicks: d.clicks,
        uniqueVisitors: d.uniqueVisitors
      }));
    }
    const days = activeRange === '7d' ? 7 : activeRange === '90d' ? 90 : 30;
    return GENERATE_TIME_SERIES(days).map(d => ({
      label: d.date,
      clicks: d.clicks,
      uniqueVisitors: d.uniqueVisitors
    }));
  }, [activeRange]);

  const totalClicks = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.clicks, 0);
  }, [chartData]);

  const totalUnique = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.uniqueVisitors, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
            <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200/50">
              Live Data
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {subtitle}
          </p>
        </div>

        {/* Range & series selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Metric toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-0.5 rounded-xl text-xs font-medium">
            <button
              onClick={() => setMetricView('both')}
              className={`px-2.5 py-1 rounded-lg transition ${
                metricView === 'both'
                  ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-white font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setMetricView('clicks')}
              className={`px-2.5 py-1 rounded-lg transition ${
                metricView === 'clicks'
                  ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-white font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Clicks
            </button>
            <button
              onClick={() => setMetricView('unique')}
              className={`px-2.5 py-1 rounded-lg transition ${
                metricView === 'unique'
                  ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-white font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Unique
            </button>
          </div>

          {/* Time range buttons */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-0.5 rounded-xl text-xs font-medium">
            {['24h', '7d', '30d', '90d'].map(range => (
              <button
                key={range}
                onClick={() => setActiveRange(range)}
                className={`px-2.5 py-1 rounded-lg transition ${
                  activeRange === range
                    ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-white font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Summary Strip */}
      <div className="flex items-center gap-6 py-3 text-xs text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800/60">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-600" />
          <span>Total Clicks:</span>
          <span className="font-bold text-slate-900 dark:text-white">
            {formatNumber(totalClicks)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
          <span>Unique Visitors:</span>
          <span className="font-bold text-slate-900 dark:text-white">
            {formatNumber(totalUnique)}
          </span>
        </div>
      </div>

      {/* Chart container */}
      <div className="h-72 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="brandClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="skyUnique" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              minTickGap={20}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickFormatter={value => (value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value)}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xl text-xs space-y-1.5">
                      <p className="font-bold text-slate-900 dark:text-white pb-1 border-b border-slate-100 dark:border-slate-800">
                        {label}
                      </p>
                      {payload.map((item, i) => (
                        <div key={i} className="flex items-center justify-between gap-4">
                          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            {item.name === 'clicks' ? 'Total Clicks' : 'Unique Visitors'}
                          </span>
                          <span className="font-mono font-bold text-slate-900 dark:text-white">
                            {formatNumber(item.value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />

            {(metricView === 'both' || metricView === 'clicks') && (
              <Area
                type="monotone"
                dataKey="clicks"
                stroke="#4f46e5"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#brandClicks)"
              />
            )}

            {(metricView === 'both' || metricView === 'unique') && (
              <Area
                type="monotone"
                dataKey="uniqueVisitors"
                stroke="#0ea5e9"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#skyUnique)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
