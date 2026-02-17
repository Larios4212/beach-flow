import type { Zone, ZoneId, TableStatus } from './types';

export const ZONES: Zone[] = [
  { id: 'sea', name: 'Oceanfront', emoji: '🌊', color: '#06b6d4', description: 'First row — feet in the water' },
  { id: 'sand', name: 'Beach', emoji: '🏖️', color: '#eab308', description: 'Classic beachside seating' },
  { id: 'lounge', name: 'Lounge', emoji: '🛋️', color: '#f97316', description: 'Shaded daybeds & sofas' },
  { id: 'vip', name: 'VIP Cabana', emoji: '👑', color: '#fbbf24', description: 'Premium private cabanas' },
];

export const ZONE_MAP: Record<ZoneId, Zone> = Object.fromEntries(
  ZONES.map((z) => [z.id, z])
) as Record<ZoneId, Zone>;

export const TABLE_STATUS_CONFIG: Record<
  TableStatus,
  { label: string; color: string; bgClass: string; textClass: string; badgeClass: string; dotClass: string }
> = {
  free: {
    label: 'Available',
    color: '#22c55e',
    bgClass: 'table-free',
    textClass: 'text-palm-400',
    badgeClass: 'badge-free',
    dotClass: 'bg-palm-400',
  },
  occupied: {
    label: 'Occupied',
    color: '#06b6d4',
    bgClass: 'table-occupied',
    textClass: 'text-ocean-400',
    badgeClass: 'badge-occupied',
    dotClass: 'bg-ocean-400',
  },
  'minimum-pending': {
    label: 'Min. Pending',
    color: '#f97316',
    bgClass: 'table-minimum-pending',
    textClass: 'text-coral-400',
    badgeClass: 'badge-pending',
    dotClass: 'bg-coral-400',
  },
  vip: {
    label: 'VIP',
    color: '#fbbf24',
    bgClass: 'table-vip',
    textClass: 'text-sand-400',
    badgeClass: 'badge-vip',
    dotClass: 'bg-sand-400',
  },
  closed: {
    label: 'Closed',
    color: '#64748b',
    bgClass: 'table-closed',
    textClass: 'text-slate-400',
    badgeClass: 'badge-closed',
    dotClass: 'bg-slate-400',
  },
};

export const MINIMUM_CONSUMPTION: Record<ZoneId, number> = {
  sea: 2500,
  sand: 1500,
  lounge: 4000,
  vip: 8000,
};

export const CHART_COLORS = {
  ocean: '#06b6d4',
  oceanLight: '#22d3ee',
  coral: '#f97316',
  palm: '#22c55e',
  sand: '#eab308',
  purple: '#8b5cf6',
  grid: '#1e293b',
  muted: '#475569',
};
