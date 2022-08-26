import React, { CSSProperties, useState } from 'react';
import { Meta } from '@storybook/react';
import { AreaChart, BarChart, CandlestickChart, ChartDatum, DonutChart, HeatmapChart, LineChart, Sparkline } from '../src/components/charts';
import { revenue, trades, distribution, activity, date, currency } from './chartData';
export default { title: 'Charts/Dashboard' } as Meta;
export function Overview() {
    const [selected, setSelected] = useState<ChartDatum>();
    return <main className="angin-root" style={{ padding: 24, background: '#f8fafc', display: 'grid', gap: 20 }}>
        <header><h1>Business overview</h1><p>Sample data · keyboard and pointer inspection</p><p role="status">{selected ? `${selected.seriesName}: ${selected.y}` : 'Select a chart observation to inspect it here.'}</p></header>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            <AreaChart title="Revenue" series={revenue} formatY={currency} onDatumSelect={setSelected} showTable />
            <DonutChart title="Acquisition" data={distribution} centerLabel="100%" showTable />
            <BarChart title="Sales by region" series={revenue.map(entry => ({ ...entry, data: entry.data.slice(0, 5) }))} stacked />
        </div>
        <CandlestickChart title="ACME · daily candles" data={trades} formatX={date} formatY={value => value.toFixed(2)} onDatumSelect={setSelected} showTable />
        <HeatmapChart title="Activity by day" data={activity} showTable />
        <div style={{ maxWidth: 240 }}><h2>Latest trend</h2><Sparkline title="Latest revenue" data={revenue[0].data.map(point => point.y)} filled /></div>
    </main>;
}
export function DarkTheme() {
    const theme = { '--angin-chart-surface': '#0f172a', '--angin-chart-text': '#f1f5f9', '--angin-chart-muted': '#94a3b8', '--angin-chart-grid': '#334155', '--angin-chart-1': '#60a5fa', '--angin-chart-2': '#2dd4bf' } as CSSProperties;
    return <div style={{ ...theme, background: '#020617', padding: 24 }}><LineChart title="Revenue at night" series={revenue} showTable /></div>;
}
export function States() {
    return <div style={{ display: 'grid', gap: 20 }}><LineChart title="Loading revenue" series={[]} loading /><LineChart title="No observations" series={[]} emptyMessage="Your first observation will appear here." /></div>;
}
