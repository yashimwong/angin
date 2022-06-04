export const chartPalette: readonly string[] = [
    'var(--angin-chart-1, #2563eb)', 'var(--angin-chart-2, #0d9488)',
    'var(--angin-chart-3, #7c3aed)', 'var(--angin-chart-4, #d97706)',
    'var(--angin-chart-5, #db2777)', 'var(--angin-chart-6, #0284c7)',
];
export function colorAt(index: number, palette: readonly string[] = chartPalette): string {
    const colors = palette.length ? palette : chartPalette;
    return colors[index % colors.length];
}
