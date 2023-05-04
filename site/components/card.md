# Card

Card groups related content in a section, with optional header and footer slots. It does not impose an application layout.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { Card, Button, Text } from 'angin';

export function CardExample() {
    return (<Card header="Project notes" footer={<Button variant="outline">Open project</Button>}>
        <Text>Keep related content and actions together.</Text>
    </Card>);
}
```

## Behavior and composition

The `interactive` option adds visual treatment; it does not turn the entire card into a button or add keyboard activation. Compose native controls for real actions.

## Accessibility notes

Use a meaningful heading in the header for independently meaningful sections. The forwarded ref points to the outer section element.

## Related guidance

Read the [full integration guide](../../docs/display.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
