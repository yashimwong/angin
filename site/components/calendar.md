# Calendar

Calendar selects a date and supports keyboard navigation between days and months. Date limits are inclusive.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React, { useState } from 'react';
import { Calendar } from 'angin';

export function CalendarExample() {
    const [date, setDate] = useState(new Date(2022, 8, 20));
    return (<Calendar id="booking-date" value={date} onChange={setDate}
        locale="en-US" weekStartsOn={1} />);
}
```

## Behavior and composition

Value/onChange control selection. Month/onMonthChange separately control the visible month; if you supply month, apply requested month changes. Local date boundaries are used.

## Accessibility notes

Set locale and weekStartsOn deliberately for your audience. Server and client timezone/date inputs must agree for deterministic initial markup.

## Related guidance

Read the [full integration guide](../../docs/derived.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
