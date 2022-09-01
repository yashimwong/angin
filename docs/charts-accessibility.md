# Chart accessibility

[← Charts](charts.md)

Give each chart a specific `title`, plus a `description` explaining the units,
period, and important context. The visible heading names the SVG; its description
is also included in SVG metadata. Root native ARIA attributes are forwarded,
and `aria-label` can override the SVG name. Charts do not allocate global IDs.

Interactive charts have one focusable inspection region. Tab reaches that region,
legend controls, financial range controls, and an optional data disclosure.
Static SVG marks do not create hundreds of tab stops.

| Key | Behavior inside the inspection region |
| --- | --- |
| Right / Down | Next plotted observation |
| Left / Up | Previous plotted observation |
| Home / End | First / last plotted observation |
| Escape | Dismiss inspection |
| Enter / Space | Call `onDatumSelect` when provided |

Navigation stops at either end. Keyboard changes are announced through a polite
live region; pointer inspection does not produce live announcements. Clicking or
tapping a position inspects its nearest plotted point. Mouse movement is
frame-coalesced. Custom tooltips are not required to read values.

`showTable` provides a native disclosure with a captioned table, row/column
headers, and 20-row pagination. It contains the rendered/aggregated observations;
it is not a raw-data export. The table remains useful when precise visual
comparison is difficult. Supply an application-level summary of important trends
and a complete raw table when the task requires all underlying observations.

Lines alternate solid/dashed strokes. Financial direction is encoded through
hollow/filled bodies as well as color. Legends, inspected values, and tables
provide names independent of color. Forced-colors rules improve mark and control
visibility; use inspection/the table where colors collapse to a shared system
color. Choose application palette values with suitable contrast for the theme.

There is no default chart animation, so reduced-motion preferences need no
special animation override. Empty/loading states use status semantics, loading
sets `aria-busy`, and controls use `type="button"` to avoid submitting forms.
Refs point to the outer div; use an explicit root `tabIndex` if the application
needs to focus that outer element rather than the built-in inspection region.

The automated checks cover semantics and DOM interactions under jsdom. They do
not establish compatibility with every screen reader or replace user testing.
