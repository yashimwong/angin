import { Candle, ChartSeries, ChartSlice, GraphEdge, GraphNode, HeatmapCell } from '../src/components/charts';
export const revenue: readonly ChartSeries[] = [
    { id: 'current', name: 'This period', data: Array.from({ length: 24 }, (_, x) => ({ x, y: Math.round(400 + x * 18 + Math.sin(x / 2) * 100) })) },
    { id: 'previous', name: 'Previous period', data: Array.from({ length: 24 }, (_, x) => ({ x, y: Math.round(320 + x * 12 + Math.cos(x / 3) * 70) })) },
];
export const distribution: readonly ChartSlice[] = [{ id: 'direct', label: 'Direct', value: 42 }, { id: 'search', label: 'Search', value: 32 }, { id: 'referral', label: 'Referral', value: 18 }, { id: 'social', label: 'Social', value: 8 }];
export const trades: readonly Candle[] = Array.from({ length: 180 }, (_, i) => {
    const open = 120 + i * 0.12 + Math.sin(i / 5) * 8;
    const close = open + Math.sin(i * 2) * 3;
    return { time: Date.UTC(2022, 0, i + 1), open, high: Math.max(open, close) + 2, low: Math.min(open, close) - 2, close, volume: Math.round(10000 + (Math.sin(i / 3) + 1) * 5000) };
});
export const activity: readonly HeatmapCell[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].flatMap((x, day) => ['Morning', 'Midday', 'Evening', 'Night'].map((y, hour) => ({ x, y, value: Math.round((Math.sin(day + hour) + 1) * 40) })));
export const nodes: readonly GraphNode[] = [{ id: 'api', label: 'API gateway' }, { id: 'auth', label: 'Identity' }, { id: 'orders', label: 'Orders' }, { id: 'payments', label: 'Payments' }, { id: 'db', label: 'Database' }, { id: 'events', label: 'Events' }];
export const edges: readonly GraphEdge[] = [{ source: 'api', target: 'auth' }, { source: 'api', target: 'orders' }, { source: 'orders', target: 'payments' }, { source: 'orders', target: 'db' }, { source: 'payments', target: 'events' }, { source: 'events', target: 'db' }];
export const currency = (value: number): string => `$${value.toFixed(0)}`;
export const date = (value: number): string => new Date(value).toISOString().slice(5, 10);
