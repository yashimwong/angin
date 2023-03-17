# Button

Use a button for an action within the current view. Use Link when the intent is navigation. The default type is `button`; opt into `submit` inside forms.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React, { useState } from 'react';
import { Button } from 'angin';

export function ButtonExample() {
    const [saved, setSaved] = useState(false);
    return (<Button type="button" variant="solid" onClick={() => setSaved(true)}>
        {saved ? 'Saved' : 'Save changes'}
    </Button>);
}
```

## Behavior and composition

Choose `solid`, `outline`, `ghost`, or `danger` for emphasis, and `sm`, `md`, or `lg` for size. `loading` disables the control and marks it busy. It does not run the asynchronous operation for you.

## Accessibility notes

Keep visible labels specific to the action. A disabled or loading button should have nearby context explaining what the user can do next.

## Related guidance

Read the [full integration guide](../../docs/controls.md#buttons) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
