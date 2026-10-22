import React, { useState } from 'react';
import Card from '../common/Card';
import { INITIAL_GEOGRAPHIC } from '../../data/initialData';
import { MapPin, Globe2, Info, ChevronRight } from 'lucide-react';
import { formatNumber } from '../../utils/analyticsHelpers';

export default function GeographicAnalytics() {
  const [selectedCountry, setSelectedCountry] = useState(INITIAL_GEOGRAPHIC[0]);

  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Geographic Distribution
            </h3>
            <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400">
              Top 10 Countries
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            IP-based visitor geolocation traffic estimates
          </p>
        </div>

        <Globe2 className="w-5 h-5 text-slate-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
        {/* Country ranking list (left) */}
        <div className="lg:col-span-7 space-y-2 max-h-80 overflow-y-auto pr-1">
          {INITIAL_GEOGRAPHIC.map(geo => {
            const isSelected = selectedCountry?.code === geo.code;
            return (
              <div
                key={geo.code}
                onClick={() => setSelectedCountry(geo)}
                className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition border ${
                  isSelected
                    ? 'bg-brand-50/80 dark:bg-brand-950/40 border-brand-200 dark:border-brand-800/80 shadow-xs'
                    : 'bg-white dark:bg-slate-900/60 border-slate-100 dark:border-slate-800/60 hover:border-slate-200 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl leading-none">{geo.flag}</span>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">
                      {geo.country}
                    </p>
                    <div className="w-24 sm:w-36 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="bg-brand-600 dark:bg-brand-500 h-full rounded-full"
                        style={{ width: `${geo.share}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                      {formatNumber(geo.clicks)}
                    </span>
                    <p className="text-[10px] text-slate-400">{geo.share}%</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Country Details / Regional Drilldown (right) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200/70 dark:border-slate-800/70">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200/80 dark:border-slate-800">
              <span className="text-2xl">{selectedCountry.flag}</span>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {selectedCountry.country}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {formatNumber(selectedCountry.clicks)} clicks ({selectedCountry.share}% total)
                </p>
              </div>
            </div>

            <div className="mt-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Top Cities & Regions
              </span>

              {selectedCountry.regions?.length ? (
                <div className="mt-2 space-y-2">
                  {selectedCountry.regions.map(r => (
                    <div
                      key={r.name}
                      className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-brand-500" />
                        {r.city}, {r.name}
                      </span>
                      <span className="font-mono text-slate-900 dark:text-white font-semibold">
                        {formatNumber(r.clicks)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 mt-2">
                  No granular regional data available for this territory.
                </p>
              )}
            </div>
          </div>

          {/* Privacy disclaimer */}
          <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-start gap-2 text-[11px] text-slate-400 leading-tight">
            <Info className="w-3.5 h-3.5 shrink-0 text-slate-400 mt-0.5" />
            <span>
              Location data is derived from IP geolocation tables and is approximate. VPNs, iCloud Private Relay, and proxies may obscure exact cities.
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
