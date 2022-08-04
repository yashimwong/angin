import React from 'react';
import { mount, focus, key, openTable, series, candles, slices } from '../../test/charts';
import { LineChart, AreaChart, BarChart, ScatterChart, BubbleChart, PieChart, DonutChart, RadarChart, RadialBarChart, HeatmapChart, GraphChart, CandlestickChart, Sparkline } from './index';
const charts = [
    <LineChart series={series} />, <AreaChart series={series} />, <BarChart series={series} />, <ScatterChart series={series} />, <BubbleChart series={series} />,
    <PieChart data={slices} />, <DonutChart data={slices} />, <RadarChart axes={['A', 'B', 'C']} series={series} />, <RadialBarChart data={slices} />,
    <HeatmapChart data={[{ x: 'Mon', y: 'AM', value: 5 }]} />, <GraphChart nodes={[{ id: 'a', label: 'A' }]} edges={[]} />, <CandlestickChart data={candles} />, <Sparkline data={[1, 2, 3]} interactive />,
];
it.each(charts.map((element, index) => [index, element] as const))('names and keyboard-inspects chart %i with a data alternative', (_index, element) => {
    const container = mount(React.cloneElement(element, { title: 'Quarterly results', description: 'Values by period', showTable: true }));
    expect(container.querySelector('svg')?.getAttribute('aria-label')).toBe('Quarterly results');
    expect(container.querySelector('desc')?.textContent).toBe('Values by period');
    const canvas = container.querySelector('[tabindex="0"]')!;
    focus(canvas); key(canvas, 'Home');
    expect(container.querySelector('[aria-live="polite"]')?.textContent).not.toContain('Hover');
    openTable(container);
    expect(container.querySelector('caption')?.textContent).toContain('Quarterly results');
    expect(container.querySelectorAll('tbody tr').length).toBeGreaterThan(0);
    for (const button of Array.from(container.querySelectorAll('button'))) expect(button.type).toBe('button');
});
