# Drawer

Drawer keeps contextual work in a side panel while preserving the surrounding page. It uses dialog semantics and managed focus.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React, { useState } from 'react';
import { Drawer, Button } from 'angin';

export function DrawerExample() {
    const [open, setOpen] = useState(false);
    return (<div>
        <Button onClick={() => setOpen(true)}>Open settings</Button>
        <Drawer id="settings-panel" title="Workspace settings" open={open}
            onClose={() => setOpen(false)} placement="right">Your settings form goes here.</Drawer>
    </div>);
}
```

## Behavior and composition

Choose left or right placement. Open/onClose are controlled, and optional footer content can contain the final actions. Escape dismissal is enabled by default.

## Accessibility notes

Provide a title and a clear way to close the panel. Keep focusable content within the panel until it is dismissed, and avoid competing focus managers.

## Related guidance

Read the [full integration guide](../../docs/derived.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
