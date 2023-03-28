# Tooltip

Tooltips add brief supporting information on hover or focus. The trigger must remain understandable without the tooltip.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { Tooltip } from 'angin';

export function TooltipExample() {
    return (<Tooltip id="save-help" content="Save the current draft">
        <button type="button">Save draft</button>
    </Tooltip>);
}
```

## Behavior and composition

Use one native, focusable element as the child. Tooltip merges its description with the trigger’s existing ARIA attributes and supports controlled `open` / `onOpenChange` state.

## Accessibility notes

Escape dismisses the tooltip. Keep its contents informational; interactive links and buttons belong in a different pattern. Supply a stable ID when server rendering.

## Related guidance

Read the [full integration guide](../../docs/controls.md#tooltips) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
