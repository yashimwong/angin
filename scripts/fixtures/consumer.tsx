import * as React from 'react';
import { Button, cx, Input } from 'angin';
import { Stack } from 'angin/base';
import { Button as DirectButton } from 'angin/base/Button';
import { Tabs } from 'angin/derived';
import { Pagination } from 'angin/derived/Pagination';
import { ClassValue } from 'angin/utils';

const classes: readonly ClassValue[] = ['sample', { selected: true }];
export const consumer = <Stack className={cx(classes)}>
    <Button type="submit">Save</Button>
    <DirectButton onClick={event => event.currentTarget.focus()}>Focus</DirectButton>
    <Input id="name" label="Name" onChange={event => console.log(event.currentTarget.value)} />
    <Tabs tabs={[{ key: 'a', label: 'A', content: 'Content' }]} />
    <Pagination page={1} pageCount={10} onChange={page => console.log(page)} />
</Stack>;
// @ts-expect-error misspelled native button type must be rejected
export const invalid = <Button type="summit">Invalid</Button>;

import { AreaChart, BarChart, BubbleChart, ChartDatum, ChartSeries, DonutChart, GraphChart, HeatmapChart, PieChart, RadarChart, RadialBarChart, ScatterChart, Sparkline } from 'angin/charts';
import { LineChart } from 'angin/charts/LineChart';
import { CandlestickChart, CandlestickChartProps } from 'angin/charts/CandlestickChart';
const chartSeries: readonly ChartSeries[] = [{ id: 'sales', name: 'Sales', data: [{ x: 0, y: 1 }, { x: 1, y: null }, { x: 2, y: 3, size: 20 }] }];
const chartRef = React.createRef<HTMLDivElement>();
const selectDatum = (datum: ChartDatum) => console.log(datum.seriesId, datum.index, datum.values);
const financial: CandlestickChartProps = { data: [{ time: 1, open: 10, high: 12, low: 9, close: 11, volume: 100 }], timeRange: [0, 2], onTimeRangeChange: range => console.log(range[0]) };
export const chartConsumer = <>
    <LineChart ref={chartRef} series={chartSeries} onDatumSelect={selectDatum} hidden={false} showTable interpolation="step" />
    <AreaChart series={chartSeries} />
    <BarChart series={chartSeries} stacked horizontal />
    <ScatterChart series={chartSeries} />
    <BubbleChart series={chartSeries} />
    <PieChart data={[{ id: 'a', label: 'A', value: 10 }]} />
    <DonutChart data={[{ id: 'a', label: 'A', value: 10 }]} centerLabel="10" />
    <RadarChart axes={['A', 'B', 'C']} series={chartSeries} max={100} />
    <RadialBarChart data={[{ id: 'a', label: 'A', value: 10 }]} />
    <HeatmapChart data={[{ x: 'Mon', y: 'AM', value: 10 }]} />
    <GraphChart nodes={[{ id: 'a', label: 'A' }]} edges={[]} />
    <CandlestickChart {...financial} />
    <Sparkline data={[1, null, 3]} height={48} />
</>;
// @ts-expect-error line values are numeric, not category strings
export const invalidChart = <LineChart series={[{ id: 'a', name: 'A', data: [{ x: 'Monday', y: 2 }] }]} />;
// @ts-expect-error candles require a closing value
export const invalidCandle = <CandlestickChart data={[{ time: 1, open: 10, high: 11, low: 9 }]} />;
// @ts-expect-error native refs must point at the chart's div
export const invalidChartRef = <Sparkline data={[1]} ref={React.createRef<SVGSVGElement>()} />;
