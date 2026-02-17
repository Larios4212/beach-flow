import { create } from 'zustand';
import { BeachTable, DashboardStats, ZoneId } from '@/utils/types';
import { MOCK_TABLES, computeDashboardStats } from '@/services/mockData';

interface AppState {
  /* ── data ── */
  tables: BeachTable[];
  stats: DashboardStats;

  /* ── UI state ── */
  selectedTableId: string | null;
  zoneFilter: ZoneId | 'all';
  searchQuery: string;
  isSidebarOpen: boolean;

  /* ── actions ── */
  selectTable: (id: string | null) => void;
  setZoneFilter: (zone: ZoneId | 'all') => void;
  setSearchQuery: (q: string) => void;
  toggleSidebar: () => void;
  closeAccount: (tableId: string) => void;
  refreshStats: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  tables: MOCK_TABLES,
  stats: computeDashboardStats(MOCK_TABLES),

  selectedTableId: null,
  zoneFilter: 'all',
  searchQuery: '',
  isSidebarOpen: true,

  selectTable: (id) => set({ selectedTableId: id }),

  setZoneFilter: (zone) => set({ zoneFilter: zone }),

  setSearchQuery: (q) => set({ searchQuery: q }),

  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),

  closeAccount: (tableId) => {
    set((state) => {
      const tables = state.tables.map((t) =>
        t.id === tableId
          ? { ...t, status: 'free' as const, guests: 0, guestName: undefined, orders: [], totalSpent: 0, waiter: '', startTime: '', isPaid: true }
          : t,
      );
      return { tables, stats: computeDashboardStats(tables), selectedTableId: null };
    });
  },

  refreshStats: () => {
    const tables = get().tables;
    set({ stats: computeDashboardStats(tables) });
  },
}));
