import { useState } from 'react';

let nextControlId = 0;

/** Stable client-side fallback. Supply an explicit ID for server-rendered fields. */
export function useControlId(id: string | undefined, prefix = 'angin-control'): string {
    const [generatedId] = useState(() => `${prefix}-${++nextControlId}`);
    return id === undefined ? generatedId : id;
}
