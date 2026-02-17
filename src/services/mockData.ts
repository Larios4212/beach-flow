import { BeachTable, DashboardStats, HourlyRevenuePoint, OrderItem, Waiter, ZoneRevenue } from '@/utils/types';

/* ────────────────────────── helpers ────────────────────────── */
function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hoursAgo(h: number, m = 0): string {
  const d = new Date();
  d.setHours(d.getHours() - h, d.getMinutes() - m);
  return d.toISOString();
}

/* ────────────────────────── waiters ────────────────────────── */
export const MOCK_WAITERS: Waiter[] = [
  { id: 'w1', name: 'Diego Ruiz', avatar: '', activeTables: 4, totalRevenue: 18_400 },
  { id: 'w2', name: 'Mariana Silva', avatar: '', activeTables: 3, totalRevenue: 24_100 },
  { id: 'w3', name: 'Carlos Herrera', avatar: '', activeTables: 3, totalRevenue: 15_700 },
  { id: 'w4', name: 'Paola Méndez', avatar: '', activeTables: 2, totalRevenue: 11_300 },
];

/* ────────────────────────── menus ────────────────────────── */
const DRINKS: Omit<OrderItem, 'id' | 'quantity'>[] = [
  { name: 'Margarita', price: 180, category: 'drink' },
  { name: 'Piña Colada', price: 200, category: 'drink' },
  { name: 'Michelada', price: 120, category: 'drink' },
  { name: 'Cerveza Artesanal', price: 90, category: 'drink' },
  { name: 'Agua de Coco', price: 80, category: 'drink' },
  { name: 'Mojito', price: 170, category: 'drink' },
  { name: 'Mezcal Sunset', price: 220, category: 'drink' },
  { name: 'Tequila Sunrise', price: 190, category: 'drink' },
];

const FOOD: Omit<OrderItem, 'id' | 'quantity'>[] = [
  { name: 'Ceviche Pacífico', price: 280, category: 'food' },
  { name: 'Tacos de Marlín', price: 240, category: 'food' },
  { name: 'Aguachile', price: 260, category: 'food' },
  { name: 'Nachos Supremos', price: 220, category: 'food' },
  { name: 'Tostadas de Atún', price: 300, category: 'food' },
  { name: 'Guacamole & Totopos', price: 160, category: 'food' },
  { name: 'Camarones al Coco', price: 340, category: 'food' },
  { name: 'Hamburguesa Club', price: 230, category: 'food' },
];

const BOTTLES: Omit<OrderItem, 'id' | 'quantity'>[] = [
  { name: 'Don Julio 70', price: 3_500, category: 'bottle' },
  { name: 'Moët & Chandon', price: 5_200, category: 'bottle' },
  { name: 'Grey Goose', price: 4_000, category: 'bottle' },
  { name: 'Buchanan\'s 18', price: 3_800, category: 'bottle' },
];

const HOOKAH: Omit<OrderItem, 'id' | 'quantity'>[] = [
  { name: 'Hookah Mango', price: 600, category: 'hookah' },
  { name: 'Hookah Mint', price: 600, category: 'hookah' },
  { name: 'Hookah Mix Tropical', price: 700, category: 'hookah' },
];

function generateOrders(count: number, includeBottle: boolean): OrderItem[] {
  const orders: OrderItem[] = [];
  let oid = 1;
  for (let i = 0; i < count; i++) {
    const pool = i === 0 && includeBottle ? BOTTLES : Math.random() > 0.4 ? DRINKS : FOOD;
    const item = pool[randomBetween(0, pool.length - 1)];
    orders.push({ ...item, id: `o${oid++}`, quantity: randomBetween(1, 3) });
  }
  if (Math.random() > 0.65) {
    const h = HOOKAH[randomBetween(0, HOOKAH.length - 1)];
    orders.push({ ...h, id: `o${oid++}`, quantity: 1 });
  }
  return orders;
}

function totalForOrders(orders: OrderItem[]): number {
  return orders.reduce((s, o) => s + o.price * o.quantity, 0);
}

/* ────────────────────────── tables ────────────────────────── */
const GUEST_NAMES = [
  'Familia Domínguez', 'Grupo Nayarit', 'Sarah & Friends', 'Mesa Rivera',
  'Bachelorette Party', 'Mesa VIP Rooftop', 'Carlos & Co.', 'Cumpleaños Luna',
  'Mesa Sunset', 'Grupo CDMX', 'The Johnson Party', 'Aniversario Pérez',
  'Mesa Playa', 'Amigos del Surf', 'Pareja Wilson', 'Empresa TechMX',
];

export const MOCK_TABLES: BeachTable[] = [
  /* ── SEA ZONE (first row at top) ── */
  { id: 't1', number: 1, zone: 'sea', status: 'occupied', x: 12, y: 10, guests: 4, guestName: GUEST_NAMES[0],
    orders: generateOrders(5, false), totalSpent: 0, minimumConsumption: 2500,
    waiter: 'Diego Ruiz', startTime: hoursAgo(1, 20), isPaid: false },
  { id: 't2', number: 2, zone: 'sea', status: 'free', x: 28, y: 8, guests: 0,
    orders: [], totalSpent: 0, minimumConsumption: 2500, waiter: '', startTime: '', isPaid: false },
  { id: 't3', number: 3, zone: 'sea', status: 'minimum-pending', x: 44, y: 12, guests: 2, guestName: GUEST_NAMES[2],
    orders: generateOrders(3, false), totalSpent: 0, minimumConsumption: 2500,
    waiter: 'Mariana Silva', startTime: hoursAgo(0, 45), isPaid: false },
  { id: 't4', number: 4, zone: 'sea', status: 'occupied', x: 60, y: 9, guests: 6, guestName: GUEST_NAMES[3],
    orders: generateOrders(8, false), totalSpent: 0, minimumConsumption: 2500,
    waiter: 'Carlos Herrera', startTime: hoursAgo(2, 10), isPaid: false },
  { id: 't5', number: 5, zone: 'sea', status: 'free', x: 76, y: 11, guests: 0,
    orders: [], totalSpent: 0, minimumConsumption: 2500, waiter: '', startTime: '', isPaid: false },
  { id: 't6', number: 6, zone: 'sea', status: 'closed', x: 90, y: 8, guests: 0,
    orders: [], totalSpent: 0, minimumConsumption: 2500, waiter: '', startTime: '', isPaid: false },

  /* ── SAND ZONE ── */
  { id: 't7', number: 7, zone: 'sand', status: 'occupied', x: 10, y: 30, guests: 3, guestName: GUEST_NAMES[4],
    orders: generateOrders(4, false), totalSpent: 0, minimumConsumption: 1500,
    waiter: 'Diego Ruiz', startTime: hoursAgo(0, 55), isPaid: false },
  { id: 't8', number: 8, zone: 'sand', status: 'free', x: 24, y: 33, guests: 0,
    orders: [], totalSpent: 0, minimumConsumption: 1500, waiter: '', startTime: '', isPaid: false },
  { id: 't9', number: 9, zone: 'sand', status: 'occupied', x: 38, y: 28, guests: 5, guestName: GUEST_NAMES[6],
    orders: generateOrders(6, false), totalSpent: 0, minimumConsumption: 1500,
    waiter: 'Mariana Silva', startTime: hoursAgo(1, 40), isPaid: false },
  { id: 't10', number: 10, zone: 'sand', status: 'minimum-pending', x: 53, y: 31, guests: 2, guestName: GUEST_NAMES[7],
    orders: generateOrders(2, false), totalSpent: 0, minimumConsumption: 1500,
    waiter: 'Paola Méndez', startTime: hoursAgo(0, 30), isPaid: false },
  { id: 't11', number: 11, zone: 'sand', status: 'free', x: 68, y: 29, guests: 0,
    orders: [], totalSpent: 0, minimumConsumption: 1500, waiter: '', startTime: '', isPaid: false },
  { id: 't12', number: 12, zone: 'sand', status: 'occupied', x: 82, y: 32, guests: 4, guestName: GUEST_NAMES[8],
    orders: generateOrders(5, true), totalSpent: 0, minimumConsumption: 1500,
    waiter: 'Carlos Herrera', startTime: hoursAgo(1, 5), isPaid: false },

  /* ── LOUNGE ZONE ── */
  { id: 't13', number: 13, zone: 'lounge', status: 'occupied', x: 12, y: 55, guests: 4, guestName: GUEST_NAMES[9],
    orders: generateOrders(7, true), totalSpent: 0, minimumConsumption: 4000,
    waiter: 'Mariana Silva', startTime: hoursAgo(2, 30), isPaid: false },
  { id: 't14', number: 14, zone: 'lounge', status: 'vip', x: 30, y: 52, guests: 8, guestName: GUEST_NAMES[10],
    orders: generateOrders(10, true), totalSpent: 0, minimumConsumption: 4000,
    waiter: 'Diego Ruiz', startTime: hoursAgo(3, 0), isPaid: false },
  { id: 't15', number: 15, zone: 'lounge', status: 'free', x: 48, y: 57, guests: 0,
    orders: [], totalSpent: 0, minimumConsumption: 4000, waiter: '', startTime: '', isPaid: false },
  { id: 't16', number: 16, zone: 'lounge', status: 'minimum-pending', x: 66, y: 54, guests: 3, guestName: GUEST_NAMES[11],
    orders: generateOrders(4, false), totalSpent: 0, minimumConsumption: 4000,
    waiter: 'Carlos Herrera', startTime: hoursAgo(1, 0), isPaid: false },
  { id: 't17', number: 17, zone: 'lounge', status: 'occupied', x: 84, y: 56, guests: 5, guestName: GUEST_NAMES[12],
    orders: generateOrders(6, true), totalSpent: 0, minimumConsumption: 4000,
    waiter: 'Paola Méndez', startTime: hoursAgo(1, 50), isPaid: false },

  /* ── VIP ZONE (bottom) ── */
  { id: 't18', number: 18, zone: 'vip', status: 'vip', x: 15, y: 78, guests: 10, guestName: GUEST_NAMES[13],
    orders: generateOrders(12, true), totalSpent: 0, minimumConsumption: 8000,
    waiter: 'Mariana Silva', startTime: hoursAgo(2, 45), isPaid: false },
  { id: 't19', number: 19, zone: 'vip', status: 'occupied', x: 38, y: 80, guests: 6, guestName: GUEST_NAMES[14],
    orders: generateOrders(8, true), totalSpent: 0, minimumConsumption: 8000,
    waiter: 'Diego Ruiz', startTime: hoursAgo(1, 30), isPaid: false },
  { id: 't20', number: 20, zone: 'vip', status: 'free', x: 60, y: 77, guests: 0,
    orders: [], totalSpent: 0, minimumConsumption: 8000, waiter: '', startTime: '', isPaid: false },
  { id: 't21', number: 21, zone: 'vip', status: 'vip', x: 82, y: 79, guests: 8, guestName: GUEST_NAMES[15],
    orders: generateOrders(14, true), totalSpent: 0, minimumConsumption: 8000,
    waiter: 'Carlos Herrera', startTime: hoursAgo(3, 20), isPaid: false },
];

// Hydrate totalSpent from orders
MOCK_TABLES.forEach((t) => {
  t.totalSpent = totalForOrders(t.orders);
});

/* ────────────────────── hourly revenue ────────────────────── */
export const MOCK_HOURLY_REVENUE: HourlyRevenuePoint[] = [
  { hour: '10 AM', revenue: 4_200 },
  { hour: '11 AM', revenue: 8_900 },
  { hour: '12 PM', revenue: 14_600 },
  { hour: '1 PM', revenue: 22_300 },
  { hour: '2 PM', revenue: 28_700 },
  { hour: '3 PM', revenue: 35_100 },
  { hour: '4 PM', revenue: 41_500 },
  { hour: '5 PM', revenue: 48_200 },
];

/* ────────────────────── zone revenue ────────────────────── */
export const MOCK_ZONE_REVENUE: ZoneRevenue[] = [
  { zone: 'sea', revenue: 12_400, tables: 6, occupancy: 50 },
  { zone: 'sand', revenue: 18_700, tables: 6, occupancy: 67 },
  { zone: 'lounge', revenue: 31_200, tables: 5, occupancy: 60 },
  { zone: 'vip', revenue: 52_800, tables: 4, occupancy: 75 },
];

/* ────────────────────── dashboard stats ────────────────────── */
export function computeDashboardStats(tables: BeachTable[]): DashboardStats {
  const activeTables = tables.filter((t) => t.status !== 'free' && t.status !== 'closed');
  const freeTables = tables.filter((t) => t.status === 'free');
  const totalRevenue = tables.reduce((s, t) => s + t.totalSpent, 0);
  const avgTicket = activeTables.length ? Math.round(totalRevenue / activeTables.length) : 0;
  const totalGuests = tables.reduce((s, t) => s + (t.guests || 0), 0);
  const pendingMinimum = tables.filter((t) => t.status === 'minimum-pending').length;

  return {
    totalRevenue,
    activeTables: activeTables.length,
    freeTables: freeTables.length,
    avgTicket,
    totalGuests,
    pendingMinimum,
    occupancyRate: Math.round((activeTables.length / tables.length) * 100),
  };
}
