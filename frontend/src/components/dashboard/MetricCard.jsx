import React from 'react';
import Card from '../common/Card';
import { ArrowUpRight, ArrowDownRight, HelpCircle } from 'lucide-react';
import { formatNumber } from '../../utils/analyticsHelpers';

export default function MetricCard({
  title,
  value,
  previousValue,
  changePercent,
  isPositive = true,
  icon: Icon,
  tooltip,
  subtitle = 'vs. previous 30 days'
}) {
  return (
    <Card className="relative overflow-hidden group">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          {title}
          {tooltip && (
            <span title={tooltip} className="cursor-help text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <HelpCircle className="w-3.5 h-3.5" />
            </span>
          )}
        </span>

        {Icon && (
          <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors group-hover:bg-brand-50 group-hover:text-brand-600 dark:group-hover:bg-brand-950/60 dark:group-hover:text-brand-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {typeof value === 'number' ? formatNumber(value) : value}
        </h3>
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-xs">
        {changePercent !== undefined && (
          <span
            className={`inline-flex items-center font-semibold px-1.5 py-0.5 rounded ${
              isPositive
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3 h-3 mr-0.5" />
            )}
            {changePercent}
          </span>
        )}
        <span className="text-slate-500 dark:text-slate-400 truncate">
          {subtitle}
        </span>
      </div>
    </Card>
  );
}
