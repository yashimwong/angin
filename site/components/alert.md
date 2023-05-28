# Alert

Alert presents contextual feedback near the task. Optional title and dismiss behavior support both short and more detailed messages.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { Alert } from 'angin';

export function AlertExample() {
    return (<Alert title="Export ready" tone="success">
        Your file is available in the workspace.
    </Alert>);
}
```

## Behavior and composition

Use `onDismiss` to render a dismiss control; the parent decides whether to remove the alert. `dismissLabel` can localize its accessible name.

## Accessibility notes

The default role is alert. For nonurgent informational feedback, choose an appropriate native role such as status. Avoid repeated urgent announcements during routine updates.

## Related guidance

Read the [full integration guide](../../docs/display.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
