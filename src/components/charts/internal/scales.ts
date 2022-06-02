import { ChartDomain, Plot } from '../types';
import { clamp, finite } from './numeric';

export function extent(values: Iterable<number>, includeZero = false): ChartDomain {
    let low = includeZero ? 0 : Infinity;
    let high = includeZero ? 0 : -Infinity;
    for (const value of values) if (finite(value)) { low = Math.min(low, value); high = Math.max(high, value); }
    if (!finite(low) || !finite(high)) return [0, 1];
    if (low === high) {
        const padding = Math.abs(low) * 0.05 || 1;
        return [finite(low - padding) ? low - padding : low, finite(high + padding) ? high + padding : high];
    }
    return [low, high];
}
export function domain(requested: ChartDomain | undefined, fallback: ChartDomain): ChartDomain {
    return requested && finite(requested[0]) && finite(requested[1]) && requested[0] < requested[1] ? requested : fallback;
}
export function scale(input: ChartDomain, output: ChartDomain): (value: number) => number {
    const [low, high] = input;
    // Halving avoids overflow when the finite endpoints have opposite signs.
    const span = high / 2 - low / 2;
    return value => {
        const ratio = span ? clamp((value / 2 - low / 2) / span, 0, 1) : 0.5;
        return output[0] * (1 - ratio) + output[1] * ratio;
    };
}
export function ticks(input: ChartDomain, count = 5): number[] {
    const size = finite(count) ? Math.round(clamp(count, 2, 12)) : 5;
    return Array.from({ length: size }, (_, i) => input[0] * (1 - i / (size - 1)) + input[1] * i / (size - 1));
}
export function plot(width: number, height: number, axes = true): Plot {
    const left = axes ? Math.min(64, width * 0.2) : 8;
    const bottom = height - (axes ? 36 : 8);
    return { left, top: 16, right: width - 20, bottom, width: width - 20 - left, height: bottom - 16 };
}
