# Badge

Badges are short labels for state, category, or metadata. They do not behave as buttons by default.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { Badge, Stack } from 'angin';

export function BadgeExample() {
    return (<Stack direction="row" wrap="wrap">
        <Badge>Draft</Badge>
        <Badge tone="success">Published</Badge>
        <Badge tone="warning" outline>Needs review</Badge>
    </Stack>);
}
```

## Behavior and composition

Use tone, size, and outline to fit the visual hierarchy. Neutral tone and medium size are the defaults.

## Accessibility notes

Include readable text for every meaningful state. Color alone should never be the only distinction between statuses.

## Related guidance

Read the [full integration guide](../../docs/display.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
