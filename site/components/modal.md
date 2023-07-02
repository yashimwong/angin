# Modal

Modal creates a focused dialog for a bounded task. It manages focus on open and restores it to the trigger on close.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React, { useState } from 'react';
import { Modal, Button } from 'angin';

export function ModalExample() {
    const [open, setOpen] = useState(false);
    return (<div>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Modal id="confirm-dialog" title="Create a project" open={open}
            onClose={() => setOpen(false)}>Add your project details here.</Modal>
    </div>);
}
```

## Behavior and composition

Open is controlled and onClose requests dismissal. Escape closes by default; closeOnEscape can change that policy. The footer accepts application actions.

## Accessibility notes

Give the dialog a meaningful title or explicit accessible name. Coordinate any application-level focus behavior with the component’s focus management.

## Related guidance

Read the [full integration guide](../../docs/derived.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
