import React from 'react';
import { useApp } from '../context/AppContext';
import MetricCard from '../components/dashboard/MetricCard';
import ClicksChart from '../components/dashboard/ClicksChart';
import DeviceChart from '../components/dashboard/DeviceChart';
import GeographicAnalytics from '../components/dashboard/GeographicAnalytics';
import TrafficSources from '../components/dashboard/TrafficSources';
import RecentLinksTable from '../components/dashboard/RecentLinksTable';
import Button from '../components/common/Button';
import {
  MousePointerClick,
  Users,
  Link as LinkIcon,
  Activity,
  Calendar,
  TrendingUp,
  Plus,
  Zap,
  Sparkles
} from 'lucide-react';
import { formatNumber } from '../utils/analyticsHelpers';

export default function DashboardPage() {
  const { user, links, setIsCreateModalOpen, simulateClick } = useApp();

  // Aggregate metrics from links
  const totalClicks = links.reduce((sum, l) => sum + (l.clicks || 0), 0);
  const totalUnique = links.reduce((sum, l) => sum + (l.uniqueVisitors || 0), 0);
  const totalLinks = links.length;
  const activeLinks = links.filter(l => l.status === 'active').length;
  const clicksToday = links.reduce((sum, l) => sum + (l.clicksToday || 0), 0);
  const avgDaily = Math.round(totalClicks / 30);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner / Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Welcome back, {user.name.split(' ')[0]}! 👋
            </h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Here's how your short links and visitor analytics are performing across all channels.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="md"
            icon={Zap}
            onClick={() => simulateClick(links[0]?.id)}
            title="Simulate a real-time incoming visitor click"
          >
            Live Simulator
          </Button>

          <Button
            variant="electric"
            size="md"
            icon={Plus}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create New Link
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid (6 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <MetricCard
          title="Total Clicks"
          value={totalClicks}
          changePercent="+18.4%"
          isPositive={true}
          icon={MousePointerClick}
          tooltip="Total recorded link redirections"
        />

        <MetricCard
          title="Unique Visitors"
          value={totalUnique}
          changePercent="+14.2%"
          isPositive={true}
          icon={Users}
          tooltip="Deduplicated visitor IP & browser fingerprints"
        />

        <MetricCard
          title="Total Links"
          value={totalLinks}
          changePercent="+4"
          isPositive={true}
          icon={LinkIcon}
          tooltip="Cumulative links created in account"
          subtitle="All-time created"
        />

        <MetricCard
          title="Active Links"
          value={activeLinks}
          changePercent="100%"
          isPositive={true}
          icon={Activity}
          tooltip="Currently resolving active links"
          subtitle="Non-expired"
        />

        <MetricCard
          title="Clicks Today"
          value={clicksToday}
          changePercent="+32%"
          isPositive={true}
          icon={Calendar}
          tooltip="Recorded events in current UTC day"
          subtitle="vs. yesterday"
        />

        <MetricCard
          title="Avg Daily Clicks"
          value={avgDaily}
          changePercent="+8.1%"
          isPositive={true}
          icon={TrendingUp}
          tooltip="Calculated over selected 30-day window"
          subtitle="Rolling 30 days"
        />
      </div>

      {/* Main Click Trend Chart */}
      <ClicksChart
        title="Overall Click Performance"
        subtitle="Aggregated clicks and unique visitor trends across all shortened URLs"
      />

      {/* Technology Devices & Geographic Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <DeviceChart />
        </div>
        <div className="lg:col-span-7">
          <GeographicAnalytics />
        </div>
      </div>

      {/* Traffic Sources & Referrers */}
      <TrafficSources />

      {/* Recent Links Table */}
      <RecentLinksTable limit={5} />
    </div>
  );
}
