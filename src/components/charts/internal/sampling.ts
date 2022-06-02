import { ChartPoint } from '../types';
import { budget, finite } from './numeric';
export interface IndexedPoint { point: ChartPoint; index: number }

/** O(n) min/max buckets retain extrema, endpoints and a gap per bucket. */
export function sample(points: readonly ChartPoint[], requested = 1000): IndexedPoint[] {
    const limit = budget(requested);
    if (points.length <= limit) return points.map((point, index) => ({ point, index }));
    const indices = new Set<number>([0, points.length - 1]);
    const buckets = Math.max(1, Math.floor((limit - 2) / 3));
    for (let bucket = 0; bucket < buckets; bucket++) {
        const start = 1 + Math.floor(bucket * (points.length - 2) / buckets);
        const end = 1 + Math.floor((bucket + 1) * (points.length - 2) / buckets);
        let min = -1, max = -1, gap = -1;
        for (let i = start; i < end; i++) {
            const y = points[i].y;
            if (!finite(y) || !finite(points[i].x)) { if (gap < 0) gap = i; continue; }
            if (min < 0 || y < (points[min].y as number)) min = i;
            if (max < 0 || y > (points[max].y as number)) max = i;
        }
        for (const i of [min, max, gap]) if (i >= 0) indices.add(i);
    }
    // A limit of four leaves only two interior slots.
    const selected = Array.from(indices).sort((a, b) => a - b);
    if (selected.length > limit) selected.splice(limit - 1, selected.length - limit);
    return selected.map(index => ({ point: points[index], index }));
}
/** Evenly sample independent marks without introducing a recency bias. */
export function sampleItems<T>(items: readonly T[], requested = 1000): T[] {
    const limit = budget(requested);
    if (items.length <= limit) return items.slice();
    return Array.from({ length: limit }, (_, i) => items[Math.round(i * (items.length - 1) / (limit - 1))]);
}
