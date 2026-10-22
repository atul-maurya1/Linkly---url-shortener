import React, { useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';
import Card from '../common/Card';
import {
  INITIAL_DEVICES,
  INITIAL_BROWSERS,
  INITIAL_OPERATING_SYSTEMS
} from '../../data/initialData';
import { Smartphone, Monitor, Tablet, Globe, Laptop } from 'lucide-react';
import { formatNumber } from '../../utils/analyticsHelpers';

export default function DeviceChart() {
  const [tab, setTab] = useState('devices'); // devices | browsers | os

  const getDeviceIcon = name => {
    switch (name.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="w-4 h-4 text-brand-500" />;
      case 'desktop':
        return <Monitor className="w-4 h-4 text-cyan-500" />;
      case 'tablet':
        return <Tablet className="w-4 h-4 text-purple-500" />;
      default:
        return <Globe className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <Card className="flex flex-col">
      {/* Header with tabs */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Technology & Devices
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Platform breakdown of your visitors
          </p>
        </div>

        <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-0.5 rounded-xl text-xs font-medium">
          <button
            onClick={() => setTab('devices')}
            className={`px-2.5 py-1 rounded-lg transition ${
              tab === 'devices'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-white font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Devices
          </button>
          <button
            onClick={() => setTab('browsers')}
            className={`px-2.5 py-1 rounded-lg transition ${
              tab === 'browsers'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-white font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Browsers
          </button>
          <button
            onClick={() => setTab('os')}
            className={`px-2.5 py-1 rounded-lg transition ${
              tab === 'os'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-white font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            OS
          </button>
        </div>
      </div>

      {/* Tab 1: Devices Donut */}
      {tab === 'devices' && (
        <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
          <div className="w-44 h-44 shrink-0 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={INITIAL_DEVICES}
                  innerRadius={52}
                  outerRadius={74}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {INITIAL_DEVICES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 shadow-xl text-xs">
                          <p className="font-bold text-slate-900 dark:text-white">{data.name}</p>
                          <p className="text-slate-500 dark:text-slate-400">
                            {data.value}% ({formatNumber(data.clicks)} clicks)
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-xs text-slate-400 font-medium">Top</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">Mobile</span>
              <span className="text-[11px] text-brand-600 font-semibold">58%</span>
            </div>
          </div>

          <div className="flex-1 w-full space-y-2.5">
            {INITIAL_DEVICES.map(item => (
              <div
                key={item.name}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                    {getDeviceIcon(item.name)}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {formatNumber(item.clicks)} clicks
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                    {item.value}%
                  </span>
                  <p className="text-[10px] text-emerald-600 font-medium">{item.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Browsers Bar Chart */}
      {tab === 'browsers' && (
        <div className="pt-4 space-y-3">
          {INITIAL_BROWSERS.map(b => (
            <div key={b.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  {b.name}
                </span>
                <span className="font-mono text-slate-500 dark:text-slate-400">
                  {b.share}% ({formatNumber(b.clicks)})
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-brand-600 dark:bg-brand-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${b.share}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Operating Systems */}
      {tab === 'os' && (
        <div className="pt-4 space-y-3">
          {INITIAL_OPERATING_SYSTEMS.map(os => (
            <div key={os.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5 text-slate-400" />
                  {os.name}
                </span>
                <span className="font-mono text-slate-500 dark:text-slate-400">
                  {os.share}% ({formatNumber(os.clicks)})
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-500 dark:bg-indigo-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${os.share}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
