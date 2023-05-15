# Avatar

Avatar identifies a person with an image or initials. The required name supplies the accessible label and the initials fallback.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { Avatar, Stack } from 'angin';

export function AvatarExample() {
    return (<Stack direction="row" align="center">
        <Avatar name="Ada Lovelace" size="sm" />
        <Avatar name="Grace Hopper" />
        <Avatar name="Margaret Hamilton" size="lg" />
    </Stack>);
}
```

## Behavior and composition

Supply `src` when an image is available. Failed images fall back to initials; size controls the visual dimensions.

## Accessibility notes

Keep the name accurate even when the surrounding layout also shows it. Use nearby text when additional identity context is required.

## Related guidance

Read the [full integration guide](../../docs/display.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
