const modules = {
    actions: () => import(/* webpackChunkName: "demo-actions" */ './actions.tsx'),
    forms: () => import(/* webpackChunkName: "demo-forms" */ './forms.tsx'),
    display: () => import(/* webpackChunkName: "demo-display" */ './display.tsx'),
    navigation: () => import(/* webpackChunkName: "demo-navigation" */ './navigation.tsx'),
    overlays: () => import(/* webpackChunkName: "demo-overlays" */ './overlays.tsx'),
    charts: () => import(/* webpackChunkName: "demo-charts" */ './charts.tsx'),
};
export const demoGroups = {
    actions: ['Button', 'IconButton', 'Link', 'Tooltip'],
    forms: ['Input', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Switch'],
    display: ['Text', 'Heading', 'Card', 'Stack', 'Divider', 'Avatar', 'Badge', 'Alert', 'Progress', 'Spinner', 'Skeleton', 'EmptyState'],
    navigation: ['Tabs', 'TabbedNavigation', 'Accordion', 'Calendar', 'Menu', 'Breadcrumbs', 'Pagination', 'Stepper'],
    overlays: ['Modal', 'Drawer', 'Toast'],
    charts: ['LineChart', 'AreaChart', 'BarChart', 'ScatterChart', 'BubbleChart', 'PieChart', 'DonutChart', 'RadarChart', 'RadialBarChart', 'HeatmapChart', 'GraphChart', 'CandlestickChart', 'Sparkline'],
};
export async function loadDemo(name) {
    const group = Object.keys(demoGroups).find(key => demoGroups[key].includes(name));
    if (!group) throw new Error(`Unknown component preview: ${name}`);
    const module = await modules[group]();
    if (!module[`${name}Demo`]) throw new Error(`Missing preview export: ${name}`);
    return module[`${name}Demo`];
}
