# Tabs

Tabs switch between related panels within one view. Choose TabbedNavigation when each item is a separate page destination.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { Tabs } from 'angin';

export function TabsExample() {
    return (<Tabs id="project-tabs" tabs={[
        { key: 'overview', label: 'Overview', content: 'Project overview' },
        { key: 'activity', label: 'Activity', content: 'Recent activity' },
    ]} />);
}
```

## Behavior and composition

Use defaultActiveKey for internal state, or activeKey with onChange for controlled state. Items have stable keys, labels, content, and optional disabled state.

## Accessibility notes

Arrow keys and Home/End move through enabled tabs. Supply a stable ID for deterministic panel relationships during SSR.

## Related guidance

Read the [full integration guide](../../docs/derived.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
