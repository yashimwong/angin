import React from 'react';

/** Shared strokes keep control affordances consistent across fonts and platforms. */
export function ControlIcon({ kind = 'chevron', className }: {
    kind?: 'chevron' | 'close' | 'check';
    className?: string;
}) {
    return <svg className={className} aria-hidden="true" focusable="false" width="16" height="16"
        viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75"
        strokeLinecap="round" strokeLinejoin="round">
        <path d={kind === 'close' ? 'M4 4l8 8M12 4l-8 8' : kind === 'check' ? 'M3 8l3 3 7-7' : 'M4 6l4 4 4-4'} />
    </svg>;
}
