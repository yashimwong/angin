# Server rendering

[← Documentation](../README.md#documentation)

Components can render without `window` or `document`. Dialog focus management,
Menu listeners, and Toast timeouts run in effects, after the client mounts.
The package does not inject styles; import the stylesheet through your framework.

This library supports React 17. Its generated IDs are stable within a mounted
client instance but use process-local counters rather than React 18's `useId`.
**Pass a unique, deterministic `id` to Input, Textarea, Select, Tooltip, Tabs,
Accordion, Menu, Modal, and Drawer when rendering on the server.** Explicit IDs
also prevent changes caused by different server request order or client roots.
Do not derive these IDs from random values, wall-clock time, or array positions
that change during hydration.

```tsx
<Input id="profile-email" label="Email" helperText="Work address" />
<Tabs id="profile-tabs" tabs={tabs} />
<Modal id="profile-dialog" title="Edit profile" open={open} onClose={close}>
    <Input id="profile-dialog-name" label="Name" />
</Modal>
```

Calendar uses local calendar dates. Provide the same `month`, selection, and
`locale` on server and client, and keep their time zones consistent. Avoid
parsing a date-only ISO string if you intend local midnight; use
`new Date(year, monthIndex, day)`. Today highlighting can still differ around
midnight or between time zones, so an application needing deterministic
cross-time-zone output should mount the calendar on the client.

Keep controlled initial state equal on server and client. Read browser-only
preferences after mounting. Render the same open/closed state for dialogs and
menus during hydration; opening one after mount allows its focus effect to run.

`npm run check:ssr` renders every exported component in plain Node with explicit
IDs, compares repeated output, and checks CommonJS/native Node ESM imports.
This catches browser globals used during render and unstable explicit IDs; it
does not replace hydration testing in the consuming framework.

## Charts

Every chart server-renders deterministic SVG without `window`, canvas, random
layout, generated global IDs, or browser measurements. Supply stable titles and
use deterministic numeric/time formatters (for example an explicit timezone) to
avoid application-driven hydration differences. Network fallback positions are
circular and deterministic. Financial timestamps are numeric and caller-owned.

With width omitted, a ResizeObserver starts after mount and updates geometry to
the container's content width. Server output uses fallback dimensions; explicit
width/height can fix those dimensions. Environments without ResizeObserver keep
SVG scaling. Optional data tables mount only when their disclosure is opened.
Repeated chart SSR is included in `npm run check:ssr`.
