# Stack

Stack arranges children with consistent spacing. It defaults to a vertical direction and a medium gap.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { Stack, Badge } from 'angin';

export function StackExample() {
    return (<Stack direction="row" gap="md" align="center" wrap="wrap">
        <Badge>Draft</Badge><Badge tone="success">Ready</Badge>
    </Stack>);
}
```

## Behavior and composition

Choose row or column direction, alignment, justification, and wrapping. Gap accepts a size token or a CSS gap value.

## Accessibility notes

Layout is not a semantic relationship by itself. Keep appropriate lists, headings, and form grouping inside the stack.

## Related guidance

Read the [full integration guide](../../docs/display.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
