import { ChartFormatter, InspectPoint } from '../types';
export const formatNumber: ChartFormatter = value => {
    const absolute = Math.abs(value);
    const unit = absolute >= 1e12 ? 1e12 : absolute >= 1e9 ? 1e9 : absolute >= 1e6 ? 1e6 : absolute >= 1e3 ? 1e3 : 1;
    const suffix = unit === 1e12 ? 'T' : unit === 1e9 ? 'B' : unit === 1e6 ? 'M' : unit === 1e3 ? 'k' : '';
    return `${Number((value / unit).toPrecision(4))}${suffix}`;
};
export function pointLabel(point: InspectPoint, formatX: ChartFormatter, formatY: ChartFormatter): string {
    const datum = point.datum;
    const values = datum.values ? Object.entries(datum.values).map(([key, value]) => `${key}: ${formatY(value)}`).join(', ') : formatY(datum.y);
    return `${datum.seriesName}, ${datum.label || formatX(datum.x)}: ${values}`;
}
