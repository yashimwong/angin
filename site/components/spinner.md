# Spinner

Spinner is a compact ongoing-work indicator. It exposes a status role with a configurable accessible label.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { Spinner } from 'angin';

export function SpinnerExample() {
    return (<Spinner label="Loading project details" size="md" />);
}
```

## Behavior and composition

Choose sm, md, or lg. Use a single meaningful spinner for a region instead of announcing each decorative loading element.

## Accessibility notes

Set a label that identifies the operation. The visual indicator alone cannot explain a long wait, cancellation, or failure.

## Related guidance

Read the [full integration guide](../../docs/display.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
