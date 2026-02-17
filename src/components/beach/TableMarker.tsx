import { motion } from 'framer-motion';
import { BeachTable as TBeachTable } from '@/utils/types';
import { TABLE_STATUS_CONFIG } from '@/utils/constants';
import { formatCurrency, percentage } from '@/utils/formatters';
import { useElapsedTime } from '@/hooks';

interface Props {
  table: TBeachTable;
  onClick: () => void;
}

export default function TableMarker({ table, onClick }: Props) {
  const config = TABLE_STATUS_CONFIG[table.status];
  const elapsed = useElapsedTime(table.startTime || undefined);
  const pct = percentage(table.totalSpent, table.minimumConsumption);
  const isFree = table.status === 'free';
  const isClosed = table.status === 'closed';

  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300, delay: table.number * 0.03 }}
      whileHover={{ scale: 1.12, zIndex: 50 }}
      whileTap={{ scale: 0.95 }}
      className="group absolute flex flex-col items-center"
      style={{ left: `${table.x}%`, top: `${table.y}%`, transform: 'translate(-50%,-50%)' }}
    >
      {/* Main circle */}
      <div
        className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 shadow-lg transition-all
          ${config.bgClass} ${config.textClass} border-current/30
          ${!isFree && !isClosed ? 'ring-2 ring-current/20 ring-offset-2 ring-offset-surface-900' : ''}
        `}
      >
        <span className="text-sm font-bold">{table.number}</span>

        {/* Pulse for VIP */}
        {table.status === 'vip' && (
          <span className="absolute inset-0 animate-pulse-soft rounded-full border-2 border-sand-400/40" />
        )}

        {/* Status dot */}
        <span className={`absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-surface-900 ${config.dotClass}`} />
      </div>

      {/* Info below circle — only for occupied tables */}
      {!isFree && !isClosed && (
        <div className="mt-1 flex flex-col items-center opacity-90 transition-opacity group-hover:opacity-100">
          <span className="text-[10px] font-semibold text-white">
            {formatCurrency(table.totalSpent)}
          </span>

          {/* Mini consumption bar */}
          <div className="mt-0.5 h-1 w-10 overflow-hidden rounded-full bg-surface-700/80">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                pct >= 100 ? 'bg-palm-400' : pct >= 60 ? 'bg-ocean-400' : 'bg-coral-400'
              }`}
              style={{ width: `${Math.min(pct, 100)}%` }}
            />
          </div>

          {elapsed && <span className="mt-0.5 text-[9px] text-surface-400">{elapsed}</span>}
        </div>
      )}

      {/* Tooltip on hover */}
      <div className="pointer-events-none absolute -top-20 left-1/2 z-50 w-44 -translate-x-1/2 scale-90 rounded-xl border border-surface-600/50 bg-surface-800/95 px-3 py-2 opacity-0 shadow-xl backdrop-blur-sm transition-all group-hover:scale-100 group-hover:opacity-100">
        <p className="truncate text-xs font-bold text-white">
          Mesa {table.number} · {config.label}
        </p>
        {table.guestName && <p className="truncate text-[10px] text-surface-400">{table.guestName}</p>}
        {!isFree && !isClosed && (
          <div className="mt-1 flex items-center justify-between text-[10px]">
            <span className="text-surface-400">Consumo</span>
            <span className={`font-semibold ${pct >= 100 ? 'text-palm-400' : 'text-coral-400'}`}>
              {formatCurrency(table.totalSpent)} / {formatCurrency(table.minimumConsumption)}
            </span>
          </div>
        )}
      </div>
    </motion.button>
  );
}
