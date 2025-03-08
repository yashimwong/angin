import React, { useMemo, useState } from 'react';
import { AreaChart, BarChart, LineChart, Button, ButtonProps, Select, Checkbox } from '../../src';
export function PlaygroundDemo() {
    const [kind, setKind] = useState('line');
    const [count, setCount] = useState(200);
    const [grid, setGrid] = useState(true);
    const [variant, setVariant] = useState<ButtonProps['variant']>('solid');
    const [size, setSize] = useState<ButtonProps['size']>('md');
    const [clicked, setClicked] = useState(false);
    const series = useMemo(() => [{ id: 'signal', name: 'Signal', data: Array.from({ length: count }, (_, x) => ({ x, y: Math.round(50 + Math.sin(x / 12) * 24 + Math.cos(x / 5) * 7) })) }], [count]);
    const Chart = kind === 'area' ? AreaChart : kind === 'bar' ? BarChart : LineChart;
    const name = kind === 'area' ? 'AreaChart' : kind === 'bar' ? 'BarChart' : 'LineChart';
    const code = `import { ${name} } from 'angin/charts';\n\nconst series = [{ id: 'signal', name: 'Signal',\n  data: Array.from({ length: ${count} }, (_, x) => ({\n    x, y: Math.round(50 + Math.sin(x / 12) * 24 + Math.cos(x / 5) * 7)\n  }))\n}];\n\n<${name} title="Signal explorer" series={series}\n  maxPoints={600} showGrid={${grid}} showTable />`;
    return <div className="demo-column"><div className="playground-controls"><Select id="playground-chart" label="Chart type" value={kind} onChange={event => setKind(event.currentTarget.value)} options={[{ value: 'line', label: 'Line' }, { value: 'area', label: 'Area' }, { value: 'bar', label: 'Bar' }]} /><label>Observations: {count}<input type="range" min={20} max={5000} step={20} value={count} onChange={event => setCount(Number(event.currentTarget.value))} /></label><Checkbox id="playground-grid" label="Grid" checked={grid} onChange={event => setGrid(event.currentTarget.checked)} /></div>
        <Chart title="Signal explorer" series={series} maxPoints={600} showGrid={grid} height={280} showTable />
        <div className="code-block"><div className="code-toolbar"><span>tsx · current settings</span><button type="button" className="copy-button" data-copy>Copy</button></div><pre tabIndex={0}><code>{code}</code></pre><span className="sr-only" data-copy-status role="status" /></div>
        <div className="playground-controls"><Select id="playground-variant" label="Button variant" value={variant} onChange={event => setVariant(event.currentTarget.value as ButtonProps['variant'])}><option value="solid">Solid</option><option value="outline">Outline</option><option value="ghost">Ghost</option><option value="danger">Danger</option></Select><Select id="playground-size" label="Size" value={size} onChange={event => setSize(event.currentTarget.value as ButtonProps['size'])}><option value="sm">Small</option><option value="md">Medium</option><option value="lg">Large</option></Select></div>
        <div><Button variant={variant} size={size} onClick={() => setClicked(!clicked)}>{clicked ? 'Clicked' : 'Try this button'}</Button></div><p className="demo-state" role="status">{clicked ? 'The action ran in this preview.' : 'Adjust the controls and try the action.'}</p>
    </div>;
}
