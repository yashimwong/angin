# Input

Input pairs a native text input with a label, helper text, and validation feedback. Use native `name`, `type`, `required`, and autocomplete attributes.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React, { useState } from 'react';
import { Input } from 'angin';

export function InputExample() {
    const [name, setName] = useState('');
    return (<Input id="profile-name" name="name" label="Full name"
        value={name} onChange={event => setName(event.currentTarget.value)}
        autoComplete="name" helperText="Shown on your profile" required />);
}
```

## Behavior and composition

Use `controlSize` for visual sizing. Native numeric `size` still controls input width. An `error` replaces helper text and marks the field invalid; the app supplies validation logic.

## Accessibility notes

Give labeled controls stable unique IDs, especially for SSR. Refs target the input itself, so focus and form integrations do not need wrapper queries.

## Related guidance

Read the [full integration guide](../../docs/controls.md#text-fields-and-selects) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
