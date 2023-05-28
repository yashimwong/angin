# Progress

Progress describes completion of an ongoing task. Set value and max for a determinate operation, or omit value for an indeterminate one.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { Progress } from 'angin';

export function ProgressExample() {
    return (<Progress label="Upload progress" value={65} max={100} showValue />);
}
```

## Behavior and composition

Values are clamped to a valid range. Nonfinite values use the indeterminate state, and invalid maxima fall back to 100. `showValue` displays the percentage.

## Accessibility notes

Provide a descriptive label that identifies the operation. Keep application status text available when completion or errors need explanation.

## Related guidance

Read the [full integration guide](../../docs/display.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
