import { useChartSize } from './internal/useChartSize';
import React, { useMemo } from 'react';
import { ChartProps, GraphEdge, GraphNode, InspectPoint } from './types';
import { ChartFrame } from './internal/ChartFrame';
import { colorAt } from './internal/colors';
import { finite } from './internal/numeric';
import { layoutGraph } from './internal/graph';
import { plot } from './internal/scales';
export interface GraphChartProps extends ChartProps { nodes: readonly GraphNode[]; edges: readonly GraphEdge[]; showLabels?: boolean }
/** Deterministic circular layout or caller-provided coordinates; no simulation loop. */
export const GraphChart = React.forwardRef<HTMLDivElement, GraphChartProps>(function GraphChart({ nodes, edges, showLabels = true, ...props }, ref) {
    const { width, height, ref: rootRef } = useChartSize(props.width, props.height, ref, 640, 360);
    const model = useMemo(() => {
        const layout = layoutGraph(nodes, edges, plot(width, height, false), props.maxPoints);
        const points: InspectPoint[] = layout.positions.map((position, i) => ({ x: position.x, y: position.y, color: position.node.color || colorAt(i, props.palette), datum: { seriesId: position.node.id, seriesName: position.node.label, index: position.index, x: finite(position.node.x) ? position.node.x : position.x, y: finite(position.node.y) ? position.node.y : position.y, label: position.node.label } }));
        return { ...layout, points };
    }, [nodes, edges, width, height, props.maxPoints, props.palette]);
    return <ChartFrame title="Network graph" showLegend={false} {...props} ref={rootRef} width={width} height={height} points={model.points}
        note={model.positions.length < nodes.length || model.links.length < edges.length ? `${model.positions.length} nodes and ${model.links.length} edges shown; duplicate nodes, invalid links, and budget overflow are omitted.` : undefined}>
        <g className="angin-chart__edges">{model.links.map((edge, i) => <line key={i} x1={edge.source.x} y1={edge.source.y} x2={edge.target.x} y2={edge.target.y} strokeWidth={edge.weight} />)}</g>
        {model.positions.map((position, i) => <g key={position.node.id} className="angin-chart__node"><circle cx={position.x} cy={position.y} r={position.radius} fill={model.points[i].color} />
            {showLabels && model.positions.length <= 40 && <text x={position.x} y={position.y + position.radius + 14} textAnchor="middle">{position.node.label.length > 20 ? position.node.label.slice(0, 18) + '…' : position.node.label}</text>}
        </g>)}
    </ChartFrame>;
});
