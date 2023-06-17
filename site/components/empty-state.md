# EmptyState

An empty state explains why a view contains no content and offers a relevant next step. Use it for new accounts, filtered results, or missing data.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { EmptyState, Button } from 'angin';

export function EmptyStateExample() {
    return (<EmptyState title="No projects yet"
        description="Create your first project to get started."
        action={<Button>Create project</Button>} />);
}
```

## Behavior and composition

Title is required. Description, icon, and action are optional slots; children can add contextual content when needed.

## Accessibility notes

Make the action match the reason for emptiness. A filter with no matches may need a clear-filter control rather than a create action.

## Related guidance

Read the [full integration guide](../../docs/derived.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
