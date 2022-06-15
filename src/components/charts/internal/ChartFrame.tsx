import React, { ReactNode, useState } from 'react';
import { cx, dataTestId } from '../../../utils/cx';
import { ChartProps, InspectPoint, LegendItem } from '../types';
import { dimension } from './numeric';
import { formatNumber } from './format';
import { ChartLegend } from './ChartLegend';
import { ChartTable } from './ChartTable';
import { ChartTooltip } from './ChartTooltip';
import { useChartInteraction } from './useChartInteraction';
export interface ChartFrameProps extends ChartProps {
    children: ReactNode;
    points: readonly InspectPoint[];
    legend?: readonly LegendItem[];
    hidden?: ReadonlySet<string>;
    onToggle?: (id: string) => void;
    note?: string;
}
export const ChartFrame = React.forwardRef<HTMLDivElement, ChartFrameProps>(function ChartFrame({
    children, points, legend = [], hidden, onToggle, note, title = 'Chart', description,
    width: requestedWidth, height: requestedHeight, className, style, testId, loading = false,
    emptyMessage = 'No data to display', interactive = true, showLegend = true, showTable = false,
    formatX = formatNumber, formatY = formatNumber, onDatumSelect,
    palette: _palette, maxPoints: _maxPoints, ...props
}, ref) {
    const width = dimension(requestedWidth, 640), height = dimension(requestedHeight, 320);
    const interaction = useChartInteraction(points, width, height, interactive && !loading, onDatumSelect);
    const [tableOpen, setTableOpen] = useState(false);
    const hasData = points.length > 0;
    return <div {...props} {...dataTestId(testId)} ref={ref} className={cx('angin-chart', className)} style={style} aria-busy={loading || undefined}>
        <div className="angin-chart__header"><h3 className="angin-chart__title">{title}</h3>{description && <p className="angin-chart__description">{description}</p>}</div>
        {loading ? <div className="angin-chart__state" role="status" style={{ aspectRatio: `${width} / ${height}` }}>Loading chart…</div> : !hasData ? <div className="angin-chart__state" role="status" style={{ aspectRatio: `${width} / ${height}` }}>{emptyMessage}</div> : <>
            <div className="angin-chart__canvas" role="group" tabIndex={interactive ? 0 : undefined}
                aria-label={`${title}${interactive ? '. Use arrow keys to inspect, Home and End to jump, Escape to dismiss.' : ''}`}
                onKeyDown={interaction.onKeyDown} onFocus={interaction.onFocus} onBlur={interaction.onBlur}>
                <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={props['aria-label'] || title}
                    onPointerMove={interaction.onPointerMove} onPointerDown={interaction.onPointerMove} onPointerLeave={interaction.onPointerLeave} onClick={interaction.onClick}>
                    <title>{title}</title>{description && <desc>{description}</desc>}
                    {children}
                    {interaction.active && <circle className="angin-chart__active" cx={interaction.active.x} cy={interaction.active.y} r={5} fill={interaction.active.color} stroke="var(--angin-chart-surface, #fff)" strokeWidth={2} pointerEvents="none" />}
                </svg>
            </div>
            {interactive && <ChartTooltip point={interaction.active} keyboard={interaction.keyboard} formatX={formatX} formatY={formatY} />}
        </>}
        {note && <p className="angin-chart__note">{note}</p>}
        {showLegend && legend.length > 0 && <ChartLegend items={legend} hidden={hidden} onToggle={onToggle} />}
        {showTable && hasData && !loading && <details className="angin-chart__details" onToggle={event => setTableOpen(event.currentTarget.open)}><summary>View chart data</summary>
            {tableOpen && <ChartTable points={points} title={title} formatX={formatX} formatY={formatY} />}
        </details>}
    </div>;
});
