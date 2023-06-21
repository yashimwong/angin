# Toast

Toast provides dismissible feedback about a completed action. The application controls where it is placed and whether it is open.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React, { useState } from 'react';
import { Toast, Button } from 'angin';

export function ToastExample() {
    const [open, setOpen] = useState(true);
    return (<div>
        <Button onClick={() => setOpen(true)}>Show notification</Button>
        <Toast title="Changes saved" tone="success" open={open}
            onClose={() => setOpen(false)}>Your workspace is up to date.</Toast>
    </div>);
}
```

## Behavior and composition

A positive finite duration requests automatic dismissal through onClose. Callback changes do not restart an active timer. Omit duration for a persistent notification.

## Accessibility notes

Do not use a brief toast as the only place for critical instructions or unresolved errors. Keep a dismiss control and an appropriate accessible close label.

## Related guidance

Read the [full integration guide](../../docs/derived.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
