import React from 'react';
import { LegendItem } from '../types';
export function ChartLegend({ items, hidden, onToggle }: { items: readonly LegendItem[]; hidden?: ReadonlySet<string>; onToggle?: (id: string) => void }) {
    return <ul className="angin-chart__legend" aria-label="Chart legend">{items.map(item => <li key={item.id}>
        {onToggle ? <button type="button" className="angin-chart__legend-button" aria-pressed={!hidden?.has(item.id)} onClick={() => onToggle(item.id)}>
            <span className="angin-chart__swatch" aria-hidden="true" style={{ background: item.color }} />{item.label}
        </button> : <span><span className="angin-chart__swatch" aria-hidden="true" style={{ background: item.color }} />{item.label}</span>}
    </li>)}</ul>;
}
