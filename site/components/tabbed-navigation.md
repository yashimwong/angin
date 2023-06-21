# TabbedNavigation

TabbedNavigation represents destinations using real links. It is not a panel-switching tab widget.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { TabbedNavigation } from 'angin';

export function TabbedNavigationExample() {
    return (<TabbedNavigation items={[
        { key: 'overview', label: 'Overview', href: '/project' },
        { key: 'activity', label: 'Activity', href: '/project/activity' },
    ]} activeKey="overview" />);
}
```

## Behavior and composition

Choose horizontal or vertical orientation. Use activeKey to reflect the current route, and preserve the destination in each item’s href.

## Accessibility notes

Links keep native navigation behavior. Keep the active destination synchronized with your router rather than relying on styling alone.

## Related guidance

Read the [full integration guide](../../docs/derived.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
