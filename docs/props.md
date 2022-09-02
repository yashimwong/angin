# Props and callbacks

[← Documentation](../README.md#documentation)

Angin components accept native React HTML props where they do not conflict with
a component-specific value. Avoid forwarding whole application data objects as
props: unsupported values become DOM attributes.

| Need | Prop or pattern |
| --- | --- |
| Extra classes | `className`; built-in classes are retained |
| Test selector | `testId`, rendered as `data-testid` |
| Native control ref | `ref` on base controls, pointed at the input/button/select |
| Visual field size | `controlSize="sm"`, `"md"`, or `"lg"` |
| Native text input width | Numeric `size` |
| Native select rows | Numeric `size` with optional `multiple` |
| Button appearance | `size`, `variant`, `fullWidth`, `loading` |
| Field feedback | `helperText` or overriding `error` |

Text controls receive React change events. Selection widgets receive their next
semantic value, so do not treat every `onChange` as a DOM event:

```tsx
<Input value={name} onChange={event => setName(event.currentTarget.value)} />
<Checkbox label="Enabled" checked={enabled}
          onChange={event => setEnabled(event.currentTarget.checked)} />
<Tabs id="settings" tabs={tabs} activeKey={active} onChange={setActive} />
<Calendar value={date} onChange={setDate} />
<Pagination page={page} pageCount={10} onChange={setPage} />
```

For controlled widgets, update the controlling prop in the callback. A callback
requests a change; it does not override the parent. For uncontrolled widgets,
use `defaultValue`, `defaultChecked`, `defaultActiveKey`, or `defaultOpen` as
appropriate. Defaults initialize state and are not reset instructions. Keep a
component controlled or uncontrolled throughout its lifetime.

Collection entries use stable string keys independent of their displayed labels.
Readonly collections are accepted by Select, Tabs, Accordion, Menu,
TabbedNavigation, Breadcrumbs, and Stepper. New arrays are fine; preserve stable
references for expensive application-derived content when practical.

`cx('button', enabled && 'enabled', { selected }, ['extra'])` joins conditional
classes, including readonly nested arrays. Falsy values are ignored. It does not
resolve conflicting utility classes or remove duplicate strings.

## Chart data and selection

Charts accept readonly data collections and forward refs/native HTML attributes to
their outer div. `onDatumSelect` receives `ChartDatum`, including `seriesId`,
`seriesName`, original `index`, numeric `x`/`y`, a display `label`, and optional
named `values`. Keyboard Enter/Space and pointer clicks invoke the callback.
Hovering only changes inspection. Aggregated candles and pie Other groups report
the first source index and aggregated values; see the [chart guides](charts.md).

`CandlestickChart.timeRange` is a controlled inclusive timestamp pair. Apply
`onTimeRangeChange` to update it; omitting the prop enables internal range state.
Chart `title` is a heading/name rather than the native HTML hover-title attribute.
Use `description` for units and context, and `showTable` for plotted data access.
