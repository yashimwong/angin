# Select

Select uses a custom styled trigger, animated chevron, and option list with keyboard navigation. Options accept readonly collections with value, label, and optional disabled state.

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

Omit `options` to supply native option children, including optgroups. Use `controlSize` for appearance; numeric `size` greater than one displays an inline list, and `multiple` enables independent option toggles.

## Accessibility notes

Arrow keys move through enabled options; Home/End jump to the first/last. Typing searches by label. Enter or Space commits, Escape dismisses without selecting, and Tab moves focus onward. Multi-selection stays open after each toggle.

A hidden native select preserves form submission, validation, resets, and the native `onChange` event signature. Its forwarded ref redirects `focus()` to the visible trigger. `className` and `style` target the trigger; `testId` targets the form adapter. Popup lists inherit theme tokens and stay inside the viewport.

Provide a connected label and avoid options whose meaning depends only on position or color.

## Related guidance

Read the [full integration guide](../../docs/controls.md#native-props-and-option-groups) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
