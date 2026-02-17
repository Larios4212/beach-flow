import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  DollarSign, Users, Armchair, TrendingUp, AlertTriangle,
  Percent, ChevronLeft, Filter,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Logo, StatCard } from '@/components/ui';
import { BeachMap } from '@/components/beach';
import { useAppStore } from '@/store/appStore';
import { ZONES, ZONE_MAP, TABLE_STATUS_CONFIG } from '@/utils/constants';
import { formatCurrency } from '@/utils/formatters';
import { MOCK_HOURLY_REVENUE, MOCK_ZONE_REVENUE } from '@/services/mockData';
import { ZoneId } from '@/utils/types';
import { useMediaQuery } from '@/hooks';

export default function DashboardPage() {
  const { stats, tables, zoneFilter, setZoneFilter, isSidebarOpen, toggleSidebar } = useAppStore();
  const isMobile = useMediaQuery('(max-width: 1024px)');

  /* Status summary counts */
  const statusCounts = tables.reduce(
    (acc, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-surface-900">
      {/* ── Top bar ── */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-surface-800 px-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-surface-400 transition hover:text-white">
            <ChevronLeft size={18} />
          </Link>
          <Logo size="sm" />
        </div>

        <div className="flex items-center gap-3">
          {/* Zone filter pills */}
          <div className="hidden items-center gap-1 rounded-xl border border-surface-700/60 bg-surface-800/60 p-1 md:flex">
            <button
              onClick={() => setZoneFilter('all')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                zoneFilter === 'all' ? 'bg-ocean-500/20 text-ocean-300' : 'text-surface-400 hover:text-white'
              }`}
            >
              Todas
            </button>
            {ZONES.map((z) => (
              <button
                key={z.id}
                onClick={() => setZoneFilter(z.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  zoneFilter === z.id ? 'bg-ocean-500/20 text-ocean-300' : 'text-surface-400 hover:text-white'
                }`}
              >
                {z.emoji} {z.name}
              </button>
            ))}
          </div>

          {/* Mobile filter toggle */}
          <button className="md:hidden rounded-lg border border-surface-700 p-2 text-surface-400" onClick={() => setZoneFilter('all')}>
            <Filter size={16} />
          </button>

          {/* Sidebar toggle */}
          <button
            onClick={toggleSidebar}
            className="rounded-lg border border-surface-700 bg-surface-800/60 px-3 py-1.5 text-xs font-medium text-surface-400 transition hover:text-white"
          >
            {isSidebarOpen ? 'Ocultar panel' : 'Mostrar panel'}
          </button>
        </div>
      </header>

      {/* ── Main content ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Beach Map — takes remaining space */}
        <main className="flex-1 p-4">
          <BeachMap />
        </main>

        {/* ── Side Metrics Panel ── */}
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isMobile ? '100%' : 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="shrink-0 overflow-y-auto border-l border-surface-800 bg-surface-900/95 p-4 scrollbar-thin"
          >
            {/* Stat cards */}
            <div className="mb-5 grid grid-cols-2 gap-3">
              <StatCard
                label="Revenue Total"
                value={stats.totalRevenue}
                icon={DollarSign}
                format={formatCurrency}
                accent="text-palm-400"
                compact
              />
              <StatCard label="Mesas Activas" value={stats.activeTables} icon={Armchair} accent="text-ocean-400" compact />
              <StatCard label="Mesas Libres" value={stats.freeTables} icon={Armchair} accent="text-surface-400" compact />
              <StatCard label="Ticket Promedio" value={stats.avgTicket} icon={TrendingUp} format={formatCurrency} accent="text-sand-400" compact />
              <StatCard label="Guests" value={stats.totalGuests} icon={Users} accent="text-ocean-300" compact />
              <StatCard label="Ocupación" value={stats.occupancyRate} icon={Percent} format={(v) => `${v}%`} accent="text-coral-400" compact />
            </div>

            {/* Pending minimum alert */}
            {stats.pendingMinimum > 0 && (
              <div className="mb-5 flex items-center gap-3 rounded-xl border border-coral-500/30 bg-coral-500/10 px-4 py-3">
                <AlertTriangle size={18} className="text-coral-400 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-coral-300">Consumo Pendiente</p>
                  <p className="text-xs text-coral-400/80">{stats.pendingMinimum} mesa(s) debajo del mínimo</p>
                </div>
              </div>
            )}

            {/* Revenue chart */}
            <div className="mb-5">
              <h3 className="mb-3 text-sm font-semibold text-surface-300">Revenue por Hora</h3>
              <div className="glass rounded-xl p-3">
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={MOCK_HOURLY_REVENUE}>
                    <defs>
                      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} width={40} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #334155', borderRadius: '12px', fontSize: '12px' }}
                      formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#22d3ee" strokeWidth={2} fill="url(#revenueGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue by zone */}
            <div className="mb-5">
              <h3 className="mb-3 text-sm font-semibold text-surface-300">Revenue por Zona</h3>
              <div className="space-y-2">
                {MOCK_ZONE_REVENUE.map((zr) => {
                  const zone = ZONE_MAP[zr.zone as ZoneId];
                  const maxRev = Math.max(...MOCK_ZONE_REVENUE.map((r) => r.revenue));
                  return (
                    <div key={zr.zone} className="glass rounded-xl px-4 py-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-surface-300">
                          {zone?.emoji} {zone?.name}
                        </span>
                        <span className="text-xs font-bold text-white">{formatCurrency(zr.revenue)}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-surface-700">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-ocean-500 to-ocean-400 transition-all duration-700"
                          style={{ width: `${(zr.revenue / maxRev) * 100}%` }}
                        />
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[10px] text-surface-500">
                        <span>{zr.tables} mesas</span>
                        <span>{zr.occupancy}% ocupación</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status legend */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-surface-300">Estado de Mesas</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(TABLE_STATUS_CONFIG).map(([key, cfg]) => (
                  <div key={key} className="flex items-center gap-2 rounded-lg bg-surface-800/60 px-3 py-2">
                    <span className={`h-3 w-3 rounded-full ${cfg.dotClass}`} />
                    <span className="text-xs text-surface-400">{cfg.label}</span>
                    <span className="ml-auto text-xs font-semibold text-white">{statusCounts[key] || 0}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        )}
      </div>
    </div>
  );
}
