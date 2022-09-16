import { HTMLAttributes, ReactNode } from 'react';
import { BaseProps } from '../../types';

export type ChartDomain = readonly [number, number];
export type ChartFormatter = (value: number) => string;
export interface ChartPoint { readonly x: number; readonly y: number | null; readonly label?: string; readonly size?: number }
export interface ChartSeries { readonly id: string; readonly name: string; readonly data: readonly ChartPoint[]; readonly color?: string }
export interface ChartSlice { readonly id: string; readonly label: string; readonly value: number; readonly color?: string }
export interface Candle { readonly time: number; readonly open: number; readonly high: number; readonly low: number; readonly close: number; readonly volume?: number }
export interface HeatmapCell { readonly x: string; readonly y: string; readonly value: number }
export interface GraphNode { readonly id: string; readonly label: string; readonly x?: number; readonly y?: number; readonly size?: number; readonly color?: string }
export interface GraphEdge { readonly source: string; readonly target: string; readonly weight?: number }
export interface ChartDatum {
    readonly seriesId: string;
    readonly seriesName: string;
    /** Index in the original series; aggregated candles use the first source index. */
    readonly index: number;
    readonly x: number;
    readonly y: number;
    readonly label: string;
    readonly values?: Readonly<Record<string, number>>;
}
export interface ChartProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title' | 'onSelect'>, BaseProps {
    title?: string;
    description?: string;
    /** SVG coordinate dimensions. Omit width to resize geometry with the container. */
    width?: number;
    height?: number;
    palette?: readonly string[];
    loading?: boolean;
    emptyMessage?: ReactNode;
    interactive?: boolean;
    showLegend?: boolean;
    showTable?: boolean;
    /** Maximum rendered points per series; financial data is aggregated to this budget. */
    maxPoints?: number;
    formatX?: ChartFormatter;
    formatY?: ChartFormatter;
    onDatumSelect?: (datum: ChartDatum) => void;
}
export interface CartesianChartProps extends ChartProps {
    series: readonly ChartSeries[];
    xDomain?: ChartDomain;
    yDomain?: ChartDomain;
    showGrid?: boolean;
    showAxes?: boolean;
}
export interface Plot { left: number; top: number; right: number; bottom: number; width: number; height: number }
export interface InspectPoint { x: number; y: number; color: string; datum: ChartDatum }
export interface LegendItem { id: string; label: string; color: string }
