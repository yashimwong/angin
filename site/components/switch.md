# Switch

A switch turns a named setting on or off. Its label should describe the setting, rather than changing between opposing actions.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React, { useState } from 'react';
import { Switch } from 'angin';

export function SwitchExample() {
    const [enabled, setEnabled] = useState(true);
    return (<Switch id="notifications" label="Notifications" checked={enabled}
        onChange={event => setEnabled(event.currentTarget.checked)}
        description="Receive a message when your export is ready." />);
}
```

## Behavior and composition

Switch preserves native checked/defaultChecked behavior and change events. The checked value is available at `event.currentTarget.checked`.

## Accessibility notes

Keep the visible label stable as the state changes. Use the description for scope or consequences and provide a stable ID to connect it.

## Related guidance

Read the [full integration guide](../../docs/controls.md#checkboxes-radios-and-switches) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
