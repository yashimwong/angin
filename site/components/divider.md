# Divider

Divider introduces a visual and semantic separator between related sections. A label can explain the transition.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { Divider, Text } from 'angin';

export function DividerExample() {
    return (<div>
        <Text>Account details</Text>
        <Divider label="Preferences" />
        <Text>Choose how you work.</Text>
    </div>);
}
```

## Behavior and composition

Horizontal is the default orientation. Vertical dividers need an appropriate parent layout and height to produce the intended separation.

## Accessibility notes

A string label is used as an accessible name. Avoid replacing meaningful headings with separators.

## Related guidance

Read the [full integration guide](../../docs/display.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
