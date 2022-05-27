# Composite components

[← Documentation](../README.md#documentation)

Composite components combine primitives into common interactions. Controlled
props belong to the parent: callbacks request a new value, and the parent applies
it. Collections accept readonly arrays with stable string keys.

## Tabs and accordion

Use Tabs to switch between panels. Use Accordion when sections should expand
and collapse in place.

<!-- typecheck-example -->
```tsx
import React, { useState } from 'react';
import { Tabs } from 'angin';

const tabs = [
    { key: 'profile', label: 'Profile', content: <p>Your profile settings.</p> },
    { key: 'security', label: 'Security', content: <p>Your security settings.</p> },
] as const;

export function SettingsTabs() {
    const [active, setActive] = useState('profile');
    return <Tabs id="settings-tabs" tabs={tabs} activeKey={active} onChange={setActive} />;
}
```

| Component | Controlled props | Uncontrolled default | Keyboard |
| --- | --- | --- | --- |
| Tabs | `activeKey`, `onChange(key)` | `defaultActiveKey` | Left/Right, Home, End select enabled tabs |
| Accordion | `openKeys`, `onChange(keys)` | `defaultOpenKeys` | Up/Down, Home, End move focus; Enter/Space toggle |

Accordion items have `key`, `title`, and `content`. Set `multiple` to allow more
than one open section. Either component's items may be `disabled`.

## Calendar

`value` controls the selected date; `month` independently controls the visible
month. Without `month`, navigation keeps its own state. `defaultValue` initializes
both the uncontrolled selection and its visible month.

<!-- typecheck-example -->
```tsx
import React, { useState } from 'react';
import { Calendar } from 'angin';

export function BookingCalendar() {
    const [date, setDate] = useState(new Date(2022, 5, 15));
    return (
        <Calendar
            value={date}
            onChange={setDate}
            minDate={new Date(2022, 5, 1)}
            maxDate={new Date(2022, 5, 30)}
            locale="en-GB"
            weekStartsOn={1}
        />
    );
}
```

The example deliberately uses a fixed month. Replace its dates with your booking
window. JavaScript month indices are zero-based: `5` means June.

| Prop | Purpose |
| --- | --- |
| `minDate`, `maxDate` | Inclusive limits, compared as local calendar days |
| `locale` | Format the month heading, weekdays, and date labels |
| `weekStartsOn` | `0` (Sunday, default) through `6` (Saturday) |
| `previousMonthLabel`, `nextMonthLabel` | Translate navigation button names |
| `onMonthChange(month)` | Receive month navigation requests |

Memoized month grids survive unrelated renders. Server and client date/time-zone
handling must agree; see [SSR](ssr.md).

## Modal and drawer

Both use `open` and `onClose`. The callback requests dismissal; the component
remains open until the parent updates its prop.

<!-- typecheck-example -->
```tsx
import React, { useState } from 'react';
import { Button, Modal } from 'angin';

export function DetailsDialog() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)}>View details</Button>
            <Modal id="details-dialog" title="Project details" open={open}
                   onClose={() => setOpen(false)}>
                <p>This workspace belongs to your team.</p>
            </Modal>
        </>
    );
}
```

On opening, focus moves to the first visible control. Tab wraps within the dialog;
closing restores the previously focused, still-connected element. Hidden and
disabled controls are skipped.

Escape and backdrop presses request closure. `closeOnEscape={false}` disables
Escape dismissal. A nested Menu consumes Escape so its enclosing dialog stays
open. Supply a `title` or `aria-label`; explicit `aria-labelledby` takes priority.
These components do not provide a complete overlay stack or make the background
inert. Coordinate multiple dialogs in your application.

## Menu

Use Menu for a compact list of actions. `onSelect` receives the selected item's
key; use `open` and `onOpenChange` when visibility must be controlled externally.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { Menu } from 'angin';

export function ProjectMenu({ onAction }: { onAction: (key: string) => void }) {
    return (
        <Menu id="project-actions" label="Project actions" onSelect={onAction}
              items={[
                  { key: 'rename', label: 'Rename' },
                  { key: 'archive', label: 'Archive' },
              ]} />
    );
}
```

Up/Down on the trigger opens the menu and focuses its last/first enabled item,
respectively. Inside, arrows move focus and Home/End jump to the first/last item.
Escape, an outside pointer press, or Tab requests closure.

## Pagination

`page` is one-based. Supply `pageCount` and apply requested pages in `onChange`.
Pagination renders controls; your application fetches data or slices its array.
See the [paginated dashboard example](dashboard-example.md).

Finite numbers are floored and the page is clamped to the valid range. Invalid
page counts render no numbered pages. `siblingCount` controls the neighboring
pages displayed around the current page.

## Toast and empty states

Toast uses `open` and `onClose` for visibility. Set a positive finite `duration`
in **milliseconds** and provide `onClose` for automatic dismissal. Update `open`
in the callback. Omit `duration` for a persistent notification.

Changing only the callback does not reset the active timeout; changing duration
or visibility does. Use `closeLabel` to name or translate the dismiss button.

EmptyState requires a `title` and can include `description`, `icon`, and `action`.
Use it when a collection is empty or a screen needs a clear next step.

## Navigation and steps

| Component | Use it for | Key props |
| --- | --- | --- |
| Breadcrumbs | Location within a hierarchy | `items`, `onNavigate` |
| TabbedNavigation | Navigation links with an active section | `items`, `activeKey`, `onChange`, `orientation` |
| Stepper | A sequence with a current step | `steps`, `activeStep`, `onStepChange`, `orientation` |

Navigation items use `key`, `label`, and optional `href`/`disabled`. Stepper items
use `key`, `label`, optional `description`/`disabled`; `activeStep` is zero-based.

## IDs and server rendering

Pass a stable, unique `id` to Tabs, Accordion, Menu, Modal, and Drawer for SSR.
Their fallback IDs are stable within a client instance but process-local, so
explicit IDs are required for deterministic hydration.
