# Checkbox

Checkbox represents an independent binary choice. Use multiple checkboxes when several options may be selected together.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React, { useState } from 'react';
import { Checkbox } from 'angin';

export function CheckboxExample() {
    const [enabled, setEnabled] = useState(false);
    return (<Checkbox id="product-updates" name="updates"
        label="Send product updates" checked={enabled}
        onChange={event => setEnabled(event.currentTarget.checked)}
        description="Occasional news about things you use." />);
}
```

## Behavior and composition

Native `checked`, `defaultChecked`, `required`, and form attributes are preserved. An error replaces the description and marks the input invalid.

## Accessibility notes

The required label wraps the control. Give it an ID to associate a description or error, and read `event.currentTarget.checked` in change handlers.

## Related guidance

Read the [full integration guide](../../docs/controls.md#checkboxes-radios-and-switches) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
