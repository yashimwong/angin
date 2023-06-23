# Breadcrumbs

Breadcrumbs show a short path through a hierarchy. The last item represents the current page.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { Breadcrumbs } from 'angin';

export function BreadcrumbsExample() {
    return (<Breadcrumbs items={[
        { key: 'workspace', label: 'Workspace', href: '/workspace' },
        { key: 'projects', label: 'Projects', href: '/workspace/projects' },
        { key: 'current', label: 'Project notes' },
    ]} />);
}
```

## Behavior and composition

Items have stable keys and labels. Earlier items can have href values and navigation callbacks; disabled items do not activate.

## Accessibility notes

Keep the trail concise and ordered from broadest to most specific. The component supplies a navigation label and current-page semantics.

## Related guidance

Read the [full integration guide](../../docs/derived.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
