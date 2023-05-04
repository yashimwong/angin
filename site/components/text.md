# Text

Text provides consistent body typography while preserving a semantic HTML element. The default element is a paragraph.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { Text } from 'angin';

export function TextExample() {
    return (<div>
        <Text size="lg">A comfortable reading experience.</Text>
        <Text size="sm" tone="primary">Supporting information.</Text>
    </div>);
}
```

## Behavior and composition

Choose `size` and `tone` for visual emphasis, and `as` when a span or div better fits the content structure. Native attributes and refs target the rendered element.

## Accessibility notes

Use headings for section structure rather than enlarging body text. Avoid conveying critical information only through a tone color.

## Related guidance

Read the [full integration guide](../../docs/display.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
