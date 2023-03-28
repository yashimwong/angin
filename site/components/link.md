# Link

Use Link for navigation. It preserves native anchor attributes, so browser history, keyboard activation, and opening in another tab continue to work.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { Link } from 'angin';

export function LinkExample() {
    return (<Link href="/projects">Browse projects</Link>);
}
```

## Behavior and composition

Pass real destinations through `href`. Use Button for operations that do not navigate. External destinations can use native `target` and `rel` props.

## Accessibility notes

Write link text that makes sense outside the surrounding sentence. An icon-only link needs an explicit accessible name.

## Related guidance

Read the [full integration guide](../../docs/display.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
