# Menu

Menu groups related actions behind a trigger. Supply stable item keys and clear action labels.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { Menu } from 'angin';

export function MenuExample() {
    return (<Menu id="project-actions" label="Project actions" items={[
        { key: 'rename', label: 'Rename' },
        { key: 'duplicate', label: 'Duplicate' },
    ]} onSelect={key => console.log(key)} />);
}
```

## Behavior and composition

The menu can manage its own state or accept open/onOpenChange. onSelect receives the selected semantic key, rather than a DOM event.

## Accessibility notes

Arrow keys, Home/End, and Escape support keyboard use and disabled items are skipped. Provide a stable ID for connected trigger/menu semantics.

## Related guidance

Read the [full integration guide](../../docs/derived.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
