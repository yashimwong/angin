import { layoutGraph } from './graph';
import { plot } from './scales';
it('deduplicates nodes, bounds edges, and ignores dangling or self links', () => {
    const nodes = Array.from({ length: 20 }, (_, i) => ({ id: String(i), label: String(i) }));
    const edges = [{ source: '0', target: '0' }, { source: '0', target: 'missing' }, ...Array.from({ length: 100 }, () => ({ source: '0', target: '1' }))];
    const result = layoutGraph([...nodes, nodes[0]], edges, plot(640, 320), 4);
    expect(result.positions).toHaveLength(4);
    expect(result.links).toHaveLength(16);
    expect(result.positions.every(point => Number.isFinite(point.x) && Number.isFinite(point.y))).toBe(true);
});
it('honors explicit positions and produces deterministic fallback layouts', () => {
    const nodes = [{ id: 'a', label: 'A', x: 0, y: 0 }, { id: 'b', label: 'B', x: 100, y: 100 }];
    const result = layoutGraph(nodes, [], plot(640, 320));
    expect(result.positions[0].x).toBeLessThan(result.positions[1].x);
    expect(result).toEqual(layoutGraph(nodes, [], plot(640, 320)));
});
