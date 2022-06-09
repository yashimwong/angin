import { GraphEdge, GraphNode, Plot } from '../types';
import { budget, finite, positive, clamp } from './numeric';
import { extent, scale } from './scales';
import { polar, TAU } from './polar';
export function layoutGraph(nodes: readonly GraphNode[], edges: readonly GraphEdge[], box: Plot, maxPoints?: number) {
    const unique = new Map<string, GraphNode>();
    for (const node of nodes) if (!unique.has(node.id) && unique.size < budget(maxPoints, 500)) unique.set(node.id, node);
    const selected = Array.from(unique.values());
    const x = scale(extent(selected.map(node => node.x as number)), [box.left + 20, box.right - 20]);
    const y = scale(extent(selected.map(node => node.y as number)), [box.top + 20, box.bottom - 20]);
    const positions = selected.map((node, index) => ({ node, radius: clamp(positive(node.size, 7), 3, 18), ...(finite(node.x) && finite(node.y) ? { x: x(node.x), y: y(node.y) } : polar((box.left + box.right) / 2, (box.top + box.bottom) / 2, Math.max(0, Math.min(box.width, box.height) / 2 - 24), index / selected.length * TAU)) }));
    const lookup = new Map(positions.map(point => [point.node.id, point]));
    const links = [];
    for (const edge of edges) {
        const source = lookup.get(edge.source), target = lookup.get(edge.target);
        if (source && target && source !== target) links.push({ source, target, weight: clamp(positive(edge.weight, 1), 0.5, 6) });
        if (links.length >= budget(maxPoints, 500) * 4) break;
    }
    return { positions, links };
}
