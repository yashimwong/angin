# IconButton

Use IconButton when the action is recognizable and space is limited. Supply the required `label`; the icon alone is not an accessible name.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React, { useState } from 'react';
import { IconButton } from 'angin';

export function IconButtonExample() {
    const [saved, setSaved] = useState(false);
    return (<IconButton icon={<span aria-hidden="true">☆</span>}
        label="Bookmark this page" onClick={() => setSaved(!saved)}
        aria-pressed={saved} />);
}
```

## Behavior and composition

IconButton accepts the same visual variants and sizes as Button. Its default variant is `ghost`. `loading` prevents activation and exposes busy state.

## Accessibility notes

For toggle actions, keep `aria-pressed` synchronized with state. Hide decorative icon text from assistive technology.

## Related guidance

Read the [full integration guide](../../docs/controls.md#buttons) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
