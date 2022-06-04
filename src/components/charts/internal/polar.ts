import { coordinate as c, clamp } from './numeric';
export const TAU = Math.PI * 2;
export function polar(cx: number, cy: number, radius: number, angle: number): { x: number; y: number } {
    return { x: cx + Math.cos(angle - Math.PI / 2) * radius, y: cy + Math.sin(angle - Math.PI / 2) * radius };
}
export function arcPath(cx: number, cy: number, outer: number, inner: number, start: number, end: number): string {
    const span = clamp(end - start, 0, TAU);
    if (!span || !outer) return '';
    // Two arcs also handle a complete circle without an SVG degeneracy.
    const mid = start + span / 2;
    const a = polar(cx, cy, outer, start), b = polar(cx, cy, outer, mid), d = polar(cx, cy, outer, start + span);
    const radius = clamp(inner, 0, outer);
    let path = `M${c(a.x)},${c(a.y)}A${c(outer)},${c(outer)} 0 0 1 ${c(b.x)},${c(b.y)}A${c(outer)},${c(outer)} 0 0 1 ${c(d.x)},${c(d.y)}`;
    if (radius) {
        const e = polar(cx, cy, radius, start + span), f = polar(cx, cy, radius, mid), g = polar(cx, cy, radius, start);
        path += `L${c(e.x)},${c(e.y)}A${c(radius)},${c(radius)} 0 0 0 ${c(f.x)},${c(f.y)}A${c(radius)},${c(radius)} 0 0 0 ${c(g.x)},${c(g.y)}`;
    } else path += `L${c(cx)},${c(cy)}`;
    return path + 'Z';
}
