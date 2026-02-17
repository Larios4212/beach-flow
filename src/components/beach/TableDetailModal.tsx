import { BeachTable } from '@/utils/types';
import { TABLE_STATUS_CONFIG } from '@/utils/constants';
import { formatCurrency, percentage } from '@/utils/formatters';
import { useAppStore } from '@/store/appStore';
import { Clock, Users, Utensils, DollarSign, CreditCard, X } from 'lucide-react';
import { useElapsedTime } from '@/hooks';
import { Modal } from '@/components/ui';

interface Props {
  table: BeachTable;
}

export default function TableDetailModal({ table }: Props) {
  const { selectTable, closeAccount } = useAppStore();
  const config = TABLE_STATUS_CONFIG[table.status];
  const elapsed = useElapsedTime(table.startTime || undefined);
  const pct = percentage(table.totalSpent, table.minimumConsumption);
  const isFree = table.status === 'free';
  const isClosed = table.status === 'closed';

  return (
    <Modal open onClose={() => selectTable(null)} title={`Mesa ${table.number}`} maxWidth="max-w-md">
      {/* Status badge */}
      <div className="mb-4 flex items-center gap-2">
        <span className={`badge ${config.badgeClass}`}>{config.label}</span>
        {table.guestName && <span className="text-sm text-surface-300">{table.guestName}</span>}
      </div>

      {/* Quick stats row */}
      {!isFree && !isClosed && (
        <div className="mb-4 grid grid-cols-3 gap-3">
          <div className="glass rounded-xl px-3 py-2 text-center">
            <Users size={14} className="mx-auto mb-1 text-ocean-400" />
            <p className="text-xs text-surface-400">Guests</p>
            <p className="text-sm font-bold text-white">{table.guests}</p>
          </div>
          <div className="glass rounded-xl px-3 py-2 text-center">
            <Clock size={14} className="mx-auto mb-1 text-sand-400" />
            <p className="text-xs text-surface-400">Time</p>
            <p className="text-sm font-bold text-white">{elapsed || '—'}</p>
          </div>
          <div className="glass rounded-xl px-3 py-2 text-center">
            <Utensils size={14} className="mx-auto mb-1 text-palm-400" />
            <p className="text-xs text-surface-400">Waiter</p>
            <p className="truncate text-sm font-bold text-white">{table.waiter || '—'}</p>
          </div>
        </div>
      )}

      {/* Consumption progress */}
      {!isFree && !isClosed && (
        <div className="mb-4">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-surface-400">Consumo mínimo</span>
            <span className={`font-semibold ${pct >= 100 ? 'text-palm-400' : 'text-coral-400'}`}>
              {formatCurrency(table.totalSpent)} / {formatCurrency(table.minimumConsumption)}
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-surface-700">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                pct >= 100 ? 'bg-gradient-to-r from-palm-500 to-palm-400' : pct >= 60 ? 'bg-gradient-to-r from-ocean-500 to-ocean-400' : 'bg-gradient-to-r from-coral-500 to-coral-400'
              }`}
              style={{ width: `${Math.min(pct, 100)}%` }}
            />
          </div>
          <p className="mt-1 text-right text-[11px] text-surface-500">{pct}% alcanzado</p>
        </div>
      )}

      {/* Orders list */}
      {table.orders.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-semibold text-surface-300">Órdenes</h3>
          <div className="max-h-48 space-y-1 overflow-y-auto pr-1 scrollbar-thin">
            {table.orders.map((o) => (
              <div key={o.id} className="flex items-center justify-between rounded-lg bg-surface-800/60 px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs">
                    {o.category === 'drink' ? '🍹' : o.category === 'food' ? '🍽️' : o.category === 'bottle' ? '🍾' : o.category === 'hookah' ? '💨' : '📦'}
                  </span>
                  <span className="text-sm text-white">{o.name}</span>
                  {o.quantity > 1 && <span className="text-xs text-surface-500">×{o.quantity}</span>}
                </div>
                <span className="text-sm font-medium text-surface-300">{formatCurrency(o.price * o.quantity)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Total & Actions */}
      {!isFree && !isClosed && (
        <div className="flex items-center justify-between border-t border-surface-700 pt-4">
          <div>
            <p className="text-xs text-surface-400">Total</p>
            <p className="text-xl font-bold text-white flex items-center gap-1.5">
              <DollarSign size={18} className="text-palm-400" />
              {formatCurrency(table.totalSpent)}
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => selectTable(null)} className="rounded-xl border border-surface-600 px-4 py-2.5 text-sm font-medium text-surface-300 transition hover:bg-surface-700">
              <X size={16} className="mr-1 inline" /> Cerrar
            </button>
            <button
              onClick={() => closeAccount(table.id)}
              className="btn-primary flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold"
            >
              <CreditCard size={16} /> Cobrar cuenta
            </button>
          </div>
        </div>
      )}

      {/* Free / Closed state */}
      {(isFree || isClosed) && (
        <div className="py-8 text-center">
          <p className="text-surface-400">{isFree ? 'Mesa disponible' : 'Mesa cerrada por hoy'}</p>
        </div>
      )}
    </Modal>
  );
}
