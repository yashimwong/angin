# Skeleton

Skeleton reserves space for content that is still loading. Width and height accept CSS dimensions, and circle produces a round placeholder.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { Skeleton, Stack } from 'angin';

export function SkeletonExample() {
    return (<Stack gap="sm" aria-busy="true">
        <Skeleton label="Loading project" width="60%" height={18} />
        <Skeleton width="100%" height={12} />
        <Skeleton width="80%" height={12} />
    </Stack>);
}
```

## Behavior and composition

Only labeled skeletons expose status semantics. Keep most shapes decorative, with one label or parent status for the whole loading region.

## Accessibility notes

Match the approximate final layout to reduce shifts. Replace placeholders with content and clear any parent busy state when loading ends.

## Related guidance

Read the [full integration guide](../../docs/display.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
