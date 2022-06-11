import React from 'react';
import { ChartFormatter, InspectPoint } from '../types';
import { pointLabel } from './format';
export function ChartTooltip({ point, keyboard, formatX, formatY }: { point?: InspectPoint; keyboard: boolean; formatX: ChartFormatter; formatY: ChartFormatter }) {
    return <div className="angin-chart__tooltip" role="status" aria-live={keyboard ? 'polite' : 'off'} aria-atomic="true">
        {point ? <><span aria-hidden="true" className="angin-chart__swatch" style={{ background: point.color }} />{pointLabel(point, formatX, formatY)}</> : <span className="angin-chart__hint">Hover, tap, or use arrow keys to inspect data</span>}
    </div>;
}
