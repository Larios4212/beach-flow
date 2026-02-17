import { useAppStore } from '@/store/appStore';
import { ZONES } from '@/utils/constants';
import WaveAnimation from './WaveAnimation';
import TableMarker from './TableMarker';
import TableDetailModal from './TableDetailModal';
import { motion } from 'framer-motion';

export default function BeachMap() {
  const { tables, selectedTableId, selectTable, zoneFilter } = useAppStore();

  const filteredTables = zoneFilter === 'all' ? tables : tables.filter((t) => t.zone === zoneFilter);
  const selectedTable = tables.find((t) => t.id === selectedTableId);

  /* Zone boundary lines (approximate y%) */
  const zoneBoundaries = [
    { y: 22, label: ZONES[0].emoji + ' ' + ZONES[0].name, color: 'border-ocean-500/20' },  // sea bottom
    { y: 42, label: ZONES[1].emoji + ' ' + ZONES[1].name, color: 'border-sand-500/20' },    // sand bottom
    { y: 66, label: ZONES[2].emoji + ' ' + ZONES[2].name, color: 'border-palm-500/20' },    // lounge bottom
    { y: 90, label: ZONES[3].emoji + ' ' + ZONES[3].name, color: 'border-coral-500/20' },   // vip bottom
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-surface-700/50 bg-surface-900/80">
      {/* Wave animation at top */}
      <WaveAnimation />

      {/* Zone dividers */}
      {zoneBoundaries.map((z, i) => (
        <div
          key={i}
          className={`absolute inset-x-0 border-t ${z.color}`}
          style={{ top: `${z.y}%` }}
        >
          <span className="absolute right-3 -top-3 text-[10px] font-medium tracking-wider text-surface-500/60 uppercase">
            {z.label}
          </span>
        </div>
      ))}

      {/* Zone background bands */}
      <div className="absolute inset-x-0 top-0 h-[22%] bg-ocean-500/[0.04]" />
      <div className="absolute inset-x-0 top-[22%] h-[20%] bg-sand-500/[0.03]" />
      <div className="absolute inset-x-0 top-[42%] h-[24%] bg-palm-500/[0.03]" />
      <div className="absolute inset-x-0 top-[66%] h-[24%] bg-gradient-to-b from-coral-500/[0.04] to-coral-500/[0.08]" />

      {/* Table markers */}
      <motion.div className="absolute inset-0" layout>
        {filteredTables.map((t) => (
          <TableMarker key={t.id} table={t} onClick={() => selectTable(t.id)} />
        ))}
      </motion.div>

      {/* Detail modal */}
      {selectedTable && <TableDetailModal table={selectedTable} />}
    </div>
  );
}
