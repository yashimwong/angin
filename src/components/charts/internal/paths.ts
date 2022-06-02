import { coordinate as c } from './numeric';
export type PathPoint = { x: number; y: number } | null;
export type Interpolation = 'linear' | 'step';
export function linePath(points: readonly PathPoint[], interpolation: Interpolation = 'linear'): string {
    let open = false;
    return points.map(point => {
        if (!point) { open = false; return ''; }
        const command = !open ? `M${c(point.x)},${c(point.y)}` : interpolation === 'step' ? `H${c(point.x)}V${c(point.y)}` : `L${c(point.x)},${c(point.y)}`;
        open = true;
        return command;
    }).join('');
}
export function areaPath(points: readonly PathPoint[], baseline: number, interpolation: Interpolation = 'linear'): string {
    const paths: string[] = [];
    let segment: Exclude<PathPoint, null>[] = [];
    const flush = () => {
        if (!segment.length) return;
        paths.push(`${linePath(segment, interpolation)}L${c(segment[segment.length - 1].x)},${c(baseline)}L${c(segment[0].x)},${c(baseline)}Z`);
        segment = [];
    };
    for (const point of points) { if (point) segment.push(point); else flush(); }
    flush();
    return paths.join('');
}
