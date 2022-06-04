import { ChartDomain, ChartSeries, InspectPoint, Plot } from '../types';
import { colorAt } from './colors';
import { finite } from './numeric';
import { PathPoint } from './paths';
import { sample, sampleItems } from './sampling';
import { domain, extent, scale } from './scales';

export function prepareCartesian(series: readonly ChartSeries[], box: Plot, options: {
    xDomain?: ChartDomain; yDomain?: ChartDomain; maxPoints?: number; palette?: readonly string[]; independent?: boolean; includeZero?: boolean;
}) {
    function* values(axis: 'x' | 'y') {
        for (const entry of series) for (const point of entry.data) {
            if (finite(point.x) && finite(point.y)) yield point[axis] as number;
        }
    }
    const xDomain = domain(options.xDomain, extent(values('x')));
    const yDomain = domain(options.yDomain, extent(values('y'), options.includeZero));
    const x = scale(xDomain, [box.left, box.right]), y = scale(yDomain, [box.bottom, box.top]);
    const points: InspectPoint[] = [];
    const paths = series.map((entry, seriesIndex) => {
        const color = entry.color || colorAt(seriesIndex, options.palette);
        const sampled = options.independent ? sampleItems(entry.data.map((point, index) => ({ point, index })), options.maxPoints) : sample(entry.data, options.maxPoints);
        const path: PathPoint[] = sampled.map(({ point, index }) => {
            if (!finite(point.x) || !finite(point.y)) return null;
            const position = { x: x(point.x), y: y(point.y) };
            if (point.x >= xDomain[0] && point.x <= xDomain[1] && point.y >= yDomain[0] && point.y <= yDomain[1]) {
                points.push({ ...position, color, datum: { seriesId: entry.id, seriesName: entry.name, index, x: point.x, y: point.y, label: point.label || '', values: finite(point.size) ? { value: point.y, size: point.size } : undefined } });
            }
            return position;
        });
        return { id: entry.id, color, points: path };
    });
    return { paths, points, xDomain, yDomain, x, y, sourceCount: series.reduce((sum, entry) => sum + entry.data.length, 0) };
}
