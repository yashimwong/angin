export const finite = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);
export const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));
export function positive(value: number | undefined, fallback: number): number {
    return finite(value) && value > 0 ? value : fallback;
}
export function budget(value: number | undefined, fallback = 1000): number {
    return Math.floor(clamp(positive(value, fallback), 4, 10000));
}
export function dimension(value: number | undefined, fallback: number): number {
    return clamp(positive(value, fallback), 120, 4096);
}
/** Bounded coordinate precision keeps path strings compact. */
export function coordinate(value: number): string {
    return finite(value) ? String(Math.round(value * 100) / 100) : '0';
}
