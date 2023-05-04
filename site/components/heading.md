# Heading

Heading renders a real h1–h6 element. Choose the level to match the document structure, not merely the desired appearance.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { Heading } from 'angin';

export function HeadingExample() {
    return (<div>
        <Heading level={2}>Project overview</Heading>
        <Heading level={3}>Recent activity</Heading>
    </div>);
}
```

## Behavior and composition

The default level is 2. Tone and native heading attributes are supported, and the ref points to the actual heading.

## Accessibility notes

Keep a meaningful hierarchy with a clear page heading. Do not skip levels solely to reduce font size.

## Related guidance

Read the [full integration guide](../../docs/display.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
