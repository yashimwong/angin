# Select

Select uses the native platform picker for a familiar, accessible choice control. Options accept readonly collections with value, label, and optional disabled state.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React, { useState } from 'react';
import { Select } from 'angin';

export function SelectExample() {
    const [frequency, setFrequency] = useState('weekly');
    return (<Select id="digest-frequency" label="Email digest" value={frequency}
        onChange={event => setFrequency(event.currentTarget.value)}
        options={[{ value: 'daily', label: 'Daily' },
                  { value: 'weekly', label: 'Weekly' }]} />);
}
```

## Behavior and composition

Omit `options` to supply native option children, including optgroups. Use `controlSize` for appearance; native numeric `size` and `multiple` still mean what they do in HTML.

## Accessibility notes

A native change event reports the selected value. Provide a connected label and avoid options whose meaning depends only on position or color.

## Related guidance

Read the [full integration guide](../../docs/controls.md#native-props-and-option-groups) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
