# Radio

Use radios for one choice within a set of visible options. Give every radio in the group the same native `name`.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { Radio } from 'angin';

export function RadioExample() {
    return (<fieldset>
        <legend>Billing cycle</legend>
        <Radio id="billing-monthly" name="billing" value="monthly"
            label="Monthly" defaultChecked />
        <Radio id="billing-yearly" name="billing" value="yearly" label="Yearly" />
    </fieldset>);
}
```

## Behavior and composition

Each control accepts native checked/defaultChecked state and change events. Use distinct IDs and values for each option.

## Accessibility notes

Wrap a related set in a fieldset with a descriptive legend. Keep option labels clear and avoid using independent names that allow contradictory choices.

## Related guidance

Read the [full integration guide](../../docs/controls.md#checkboxes-radios-and-switches) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
