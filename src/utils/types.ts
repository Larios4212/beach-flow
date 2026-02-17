//  Table & Zone Types 
export type ZoneId = 'sea' | 'sand' | 'lounge' | 'vip';

export type TableStatus = 'free' | 'occupied' | 'minimum-pending' | 'vip' | 'closed';

export interface Zone {
  id: ZoneId;
  name: string;
  emoji: string;
  color: string;
  description: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: 'drink' | 'food' | 'bottle' | 'hookah' | 'other';
}

export interface BeachTable {
  id: string;
  number: number;
  zone: ZoneId;
  status: TableStatus;
  x: number;
  y: number;
  guests: number;
  guestName?: string;
  startTime: string;
  orders: OrderItem[];
  totalSpent: number;
  minimumConsumption: number;
  waiter: string;
  isPaid: boolean;
}

//  Dashboard Stats 
export interface DashboardStats {
  totalRevenue: number;
  activeTables: number;
  freeTables: number;
  avgTicket: number;
  totalGuests: number;
  pendingMinimum: number;
  occupancyRate: number;
}

export interface ZoneRevenue {
  zone: string;
  revenue: number;
  tables: number;
  occupancy: number;
}

//  Hourly Revenue 
export interface HourlyRevenuePoint {
  hour: string;
  revenue: number;
}

//  Waiter 
export interface Waiter {
  id: string;
  name: string;
  avatar: string;
  activeTables: number;
  totalRevenue: number;
}
