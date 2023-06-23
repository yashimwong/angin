# Pagination

Pagination requests a page within a bounded collection. Both page and pageCount are explicit, using one-based page numbers.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React, { useState } from 'react';
import { Pagination } from 'angin';

export function PaginationExample() {
    const [page, setPage] = useState(1);
    return (<Pagination page={page} pageCount={12} onChange={setPage} />);
}
```

## Behavior and composition

Apply onChange to the controlled page state and update the displayed items separately. siblingCount controls nearby page buttons. Nonfinite and out-of-range values are normalized.

## Accessibility notes

Keep the current page and result summary clear. When loading new data, communicate pending and empty states in the content region.

## Related guidance

Read the [full integration guide](../../docs/derived.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
