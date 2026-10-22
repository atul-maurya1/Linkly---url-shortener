import React from 'react';
import Card from '../common/Card';
import { INITIAL_TRAFFIC_SOURCES } from '../../data/initialData';
import { Share2, Info, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatNumber } from '../../utils/analyticsHelpers';

export default function TrafficSources() {
  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Traffic Sources & Referrers
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Origins and campaign referrers for incoming clicks
          </p>
        </div>
        <Share2 className="w-5 h-5 text-slate-400" />
      </div>

      <div className="pt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <th className="pb-2.5">Source Channel</th>
              <th className="pb-2.5">Channel Type</th>
              <th className="pb-2.5 text-right">Clicks</th>
              <th className="pb-2.5 text-right">Traffic Share</th>
              <th className="pb-2.5 text-right">Growth</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {INITIAL_TRAFFIC_SOURCES.map(source => {
              const isPositive = !source.change.startsWith('-');
              return (
                <tr
                  key={source.source}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition"
                >
                  <td className="py-2.5 font-semibold text-slate-900 dark:text-white">
                    {source.source}
                  </td>
                  <td className="py-2.5 text-slate-500">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-300">
                      {source.type}
                    </span>
                  </td>
                  <td className="py-2.5 text-right font-mono font-bold text-slate-900 dark:text-white">
                    {formatNumber(source.clicks)}
                  </td>
                  <td className="py-2.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="font-mono text-slate-600 dark:text-slate-300">
                        {source.share}%
                      </span>
                      <div className="w-12 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden hidden sm:block">
                        <div
                          className="bg-brand-600 h-full rounded-full"
                          style={{ width: `${source.share}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 text-right">
                    <span
                      className={`inline-flex items-center text-[11px] font-medium ${
                        isPositive ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {isPositive ? (
                        <ArrowUpRight className="w-3 h-3 mr-0.5" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 mr-0.5" />
                      )}
                      {source.change}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
        <Info className="w-3.5 h-3.5 shrink-0" />
        <span>
          Referrer headers may be hidden or scrubbed by modern privacy-first browsers or apps using HTTPS Strict Referrer policies.
        </span>
      </div>
    </Card>
  );
}
