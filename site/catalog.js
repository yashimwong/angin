const groups = [
    { name: 'Actions', items: ['Button', 'IconButton', 'Link', 'Tooltip'] },
    { name: 'Forms', items: ['Input', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Switch'] },
    { name: 'Layout & content', items: ['Text', 'Heading', 'Card', 'Stack', 'Divider', 'Avatar', 'Badge'] },
    { name: 'Feedback', items: ['Alert', 'Progress', 'Spinner', 'Skeleton', 'EmptyState', 'Toast'] },
    { name: 'Navigation', items: ['Tabs', 'TabbedNavigation', 'Accordion', 'Calendar', 'Menu', 'Breadcrumbs', 'Pagination', 'Stepper'] },
    { name: 'Overlays', items: ['Modal', 'Drawer'] },
    { name: 'Charts', items: ['LineChart', 'AreaChart', 'BarChart', 'ScatterChart', 'BubbleChart', 'PieChart', 'DonutChart', 'RadarChart', 'RadialBarChart', 'HeatmapChart', 'GraphChart', 'CandlestickChart', 'Sparkline'] },
];
const descriptions = {
    Button: 'A clear next action, with native button behavior.', IconButton: 'Compact actions with an explicit accessible name.', Link: 'Navigation with familiar anchor semantics.', Tooltip: 'Brief contextual help on hover and focus.',
    Input: 'A labeled text field with validation and native form props.', Textarea: 'Room for longer answers, with clear field feedback.', Select: 'Native selection with typed options and option groups.', Checkbox: 'Independent choices with explicit labels and feedback.', Radio: 'One choice from a named group of options.', Switch: 'A labeled on/off setting with native change events.',
    Text: 'Readable body copy with consistent typography.', Heading: 'Semantic headings with a deliberate visual hierarchy.', Card: 'A flexible surface for related content and actions.', Stack: 'Compose layouts with consistent alignment and spacing.', Divider: 'Separate related sections without adding visual noise.', Avatar: 'An image or initials that identify a person.', Badge: 'Short, scannable labels for status and metadata.',
    Alert: 'Contextual feedback that stays close to the task.', Progress: 'Determinate or indeterminate progress with accessible values.', Spinner: 'A compact indicator for ongoing work.', Skeleton: 'Reserve space while content is loading.', EmptyState: 'Explain an empty view and offer a useful next action.', Toast: 'Dismissible feedback for completed actions.',
    Tabs: 'Switch related panels with built-in keyboard navigation.', TabbedNavigation: 'Navigate between destinations using real links.', Accordion: 'Progressively disclose sections with keyboard controls.', Calendar: 'Choose a date with predictable keyboard navigation.', Menu: 'A focused list of actions with managed keyboard focus.', Breadcrumbs: 'Show the path back through a content hierarchy.', Pagination: 'Move through bounded pages of content.', Stepper: 'Make progress through a multi-step task visible.',
    Modal: 'A focused dialog with accessible naming and focus restoration.', Drawer: 'A side panel for contextual work without losing your place.',
    LineChart: 'Explore trends with gap-aware, bounded multi-series lines.', AreaChart: 'Compare trends using translucent zero-baseline areas.', BarChart: 'Compare categories with grouped, stacked, or horizontal bars.', ScatterChart: 'Inspect independent observations on numeric axes.', BubbleChart: 'Add a third variable through bounded bubble area.', PieChart: 'Show positive category proportions with exact-value inspection.', DonutChart: 'Summarize proportions around a central label.', RadarChart: 'Compare series across a small set of named dimensions.', RadialBarChart: 'Track multiple values against a shared target.', HeatmapChart: 'Reveal patterns across sparse categorical rows and columns.', GraphChart: 'Explore connections with a deterministic network layout.', CandlestickChart: 'Inspect OHLC prices, volume, and adjustable time ranges.', Sparkline: 'Add a compact, accessible trend to a card or table.',
};
const derived = new Set(['EmptyState', 'Toast', 'Tabs', 'TabbedNavigation', 'Accordion', 'Calendar', 'Menu', 'Breadcrumbs', 'Pagination', 'Stepper', 'Modal', 'Drawer']);
const slug = name => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const components = groups.flatMap(group => group.items.map(name => ({ name, group: group.name, slug: slug(name), description: descriptions[name], category: group.name === 'Charts' ? 'charts' : derived.has(name) ? 'derived' : 'base' })));
const guides = [
    ['getting-started', 'Getting started', 'Start here', 'Install Angin and build your first screen.'],
    ['imports', 'Imports & bundlers', 'Start here', 'Choose root, category, or direct component imports.'],
    ['props', 'Props & callbacks', 'Start here', 'Understand values, events, refs, and readonly data.'],
    ['styling', 'Styling & tokens', 'Foundations', 'Adapt colors, spacing, and typography to your product.'],
    ['accessibility', 'Accessibility', 'Foundations', 'Build usable interfaces with semantic controls.'],
    ['ssr', 'Server rendering', 'Foundations', 'Keep server and client output deterministic.'],
    ['controls', 'Controls', 'Components', 'Actions, fields, selection, and contextual help.'],
    ['display', 'Display & layout', 'Components', 'Compose content, identity, and feedback.'],
    ['derived', 'Composite components', 'Components', 'Navigation, dialogs, and richer interactions.'],
    ['charts', 'Charts overview', 'Charts', 'Choose from thirteen chart components.'],
    ['charts-cartesian', 'Cartesian charts', 'Charts', 'Lines, areas, bars, scatter, and bubbles.'],
    ['charts-financial', 'Financial candles', 'Charts', 'OHLC aggregation, volume, and controlled ranges.'],
    ['charts-polar', 'Polar charts', 'Charts', 'Pie, donut, radar, and radial values.'],
    ['charts-matrix-network', 'Heatmaps & graphs', 'Charts', 'Sparse matrices and deterministic networks.'],
    ['charts-accessibility', 'Chart accessibility', 'Charts', 'Keyboard inspection and table alternatives.'],
    ['charts-performance', 'Chart performance', 'Charts', 'Rendering budgets, reduction, and measurement.'],
    ['charts-theming', 'Chart themes', 'Charts', 'Responsive sizing and chart-specific tokens.'],
    ['form-example', 'Async form', 'Recipes', 'Compose a form with validation and submission feedback.'],
    ['dashboard-example', 'Dashboard', 'Recipes', 'Compose a controlled, paginated task view.'],
    ['performance', 'Performance', 'Engineering', 'Measure package size and production bundles.'],
    ['testing', 'Testing', 'Engineering', 'Validate behavior, declarations, and SSR.'],
    ['migration', 'Migration notes', 'Engineering', 'Adopt new APIs without losing existing behavior.'],
].map(([slug, title, group, description]) => ({ slug, title, group, description, source: `docs/${slug}.md`, path: `/docs/${slug}/` }));
module.exports = { groups, components, guides, slug };
