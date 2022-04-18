import { useState } from 'react';

let nextId = 0;

/** React 17 fallback. Supply an explicit id for deterministic server hydration. */
export function useDerivedId(prefix: string, id?: string): string {
    const [generated] = useState(() => `${prefix}-${++nextId}`);
    return id || generated;
}
