import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useAnimatedCounter } from '@/hooks';

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  format?: (v: number) => string;
  accent?: string;               // tailwind text color
  trend?: { value: number; positive: boolean };
  compact?: boolean;
}

export default function StatCard({ label, value, icon: Icon, format, accent = 'text-ocean-400', trend, compact }: StatCardProps) {
  const animated = useAnimatedCounter(value);
  const display = format ? format(animated) : animated.toLocaleString();

  if (compact) {
    return (
      <div className="glass flex items-center gap-3 rounded-xl px-4 py-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-surface-700/80 ${accent}`}>
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs text-surface-400">{label}</p>
          <p className="text-base font-bold text-white">{display}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass group relative overflow-hidden rounded-2xl p-5"
    >
      {/* Accent glow */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-ocean-500/10 blur-2xl transition-all duration-500 group-hover:bg-ocean-500/20" />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-surface-400">{label}</p>
          <p className="mt-1 text-2xl font-bold text-white">{display}</p>
          {trend && (
            <span className={`mt-1 inline-flex items-center text-xs font-medium ${trend.positive ? 'text-palm-400' : 'text-coral-400'}`}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
          )}
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-surface-700/80 ${accent}`}>
          <Icon size={22} />
        </div>
      </div>
    </motion.div>
  );
}
