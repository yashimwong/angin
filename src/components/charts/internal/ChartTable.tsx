import React, { useState } from 'react';
import { ChartFormatter, InspectPoint } from '../types';
export function ChartTable({ points, title, formatX, formatY }: { points: readonly InspectPoint[]; title: string; formatX: ChartFormatter; formatY: ChartFormatter }) {
    const [page, setPage] = useState(0);
    const pages = Math.max(1, Math.ceil(points.length / 20));
    const current = Math.min(page, pages - 1);
    return <div className="angin-chart__data">
        <table><caption>{title} — plotted data</caption><thead><tr><th scope="col">Series</th><th scope="col">Label</th><th scope="col">Value</th></tr></thead>
            <tbody>{points.slice(current * 20, current * 20 + 20).map((point, i) => <tr key={current * 20 + i}>
                <th scope="row">{point.datum.seriesName}</th><td>{point.datum.label || formatX(point.datum.x)}</td>
                <td>{point.datum.values ? Object.entries(point.datum.values).map(([key, value]) => `${key}: ${formatY(value)}`).join('; ') : formatY(point.datum.y)}</td>
            </tr>)}</tbody>
        </table>
        {pages > 1 && <nav aria-label="Chart data pages"><button type="button" disabled={!current} onClick={() => setPage(current - 1)}>Previous</button><span role="status">Page {current + 1} of {pages}</span><button type="button" disabled={current === pages - 1} onClick={() => setPage(current + 1)}>Next</button></nav>}
    </div>;
}
