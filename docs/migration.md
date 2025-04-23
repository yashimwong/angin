# Migration notes

[← Documentation](../README.md#documentation)

Existing root imports continue to work. Prefer `angin/styles.css` over the
still-supported `angin/src/styles/index.css`. Public `angin/base/*` and
`angin/derived/*` paths avoid tying consumers to a build output format. Both
category barrels and root imports expose the same components.

Base components now forward DOM refs. Code using a ref can call `focus()` on a
native control without querying its wrapper. Tooltip's ref targets its wrapper.
Code that directly calls a component function should instead render it through
React; forwarded-ref components are React component objects.

Input, Textarea, and Select generate client IDs when omitted. Supply explicit
unique IDs for deterministic SSR. Description IDs are appended to existing
`aria-describedby` values and are omitted if no message exists. Tests that
expected a dangling description attribute should verify its target instead.
Tabs, Accordion, Menu, Modal, and Drawer now scope generated relationships per
instance; avoid depending on the old global hardcoded IDs.

Readonly item arrays can be passed directly to selection/navigation widgets.
Select still accepts native option children when `options` is omitted.
IconButton accepts `loading`, which disables interaction and marks it busy.
Tooltip exposes `onOpenChange`; controlled `open` parents apply its requests.

Calendar uses `defaultValue` for its initial visible month and supports
`weekStartsOn` plus translated navigation labels. Date limits are inclusive.
Pagination floors finite numeric values and rejects nonfinite counts. Progress
uses indeterminate mode for absent/nonfinite values and falls back to max=100
for invalid maxima. Toast only schedules positive, finite durations, and callback
identity changes no longer reset an active dismissal countdown.

Focus now enters Modal/Drawer on open and returns on close. Menu and tab/accordion
keyboard navigation skip disabled entries. If the application also manages
focus, coordinate those effects to avoid competing focus moves. Do not treat a
component's callback as proof that a controlled parent accepted the change.

## Chart components

The new `angin/charts` category adds 13 components without changing existing
component APIs or adding runtime dependencies. The full stylesheet includes chart
styles; chart-only applications can use `angin/styles/charts.css`. Root, category,
and direct imports all have declarations and tree-shaking checks.

Charts use readonly numeric data and explicit missing values, native SVG, stable
SSR output, container-aware sizing, keyboard inspection, and optional paginated
tables. Financial candles add OHLC aggregation, volume, and controlled/uncontrolled
time ranges. Review the [chart guide](charts.md) before mapping existing data:
rendering budgets intentionally reduce dense inputs, and tables reflect plotted
or aggregated observations. Raw-data export remains an application concern.

## Custom control appearance

Select now renders a combobox trigger and custom listbox. Remove CSS that relies
on a visible native select arrow. `className` and `style` decorate the trigger;
`ref`, `name`, `form`, `testId`, and validation remain on the hidden select adapter.
Its `focus()` redirects to the trigger. Use `getByRole('combobox')` in interaction
tests and native `option`/`optgroup` children for grouped choices. Numeric `size`
greater than one shows an inline custom list instead of a platform listbox.

Checkboxes and radios use custom marks with native checked state. Remove external
`appearance` or `accent-color` overrides that assume platform drawing. Motion and
radii are shared CSS tokens; reduced motion remains supported.
