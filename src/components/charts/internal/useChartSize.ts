import { ForwardedRef, useCallback, useEffect, useRef, useState } from 'react';
import { dimension } from './numeric';

/** Resize geometry, rather than shrinking axis text, when the container changes. */
export function useChartSize(requestedWidth: number | undefined, requestedHeight: number | undefined, forwardedRef: ForwardedRef<HTMLDivElement>, defaultWidth = 640, defaultHeight = 320, minimumHeight = 120) {
    const element = useRef<HTMLDivElement | null>(null);
    const [measuredWidth, setMeasuredWidth] = useState<number>();
    const ref = useCallback((node: HTMLDivElement | null) => {
        element.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
    }, [forwardedRef]);
    useEffect(() => {
        if (requestedWidth !== undefined || !element.current || typeof ResizeObserver === 'undefined') return;
        let frame: number | undefined;
        const observer = new ResizeObserver(entries => {
            const width = entries[0]?.contentRect.width;
            if (!width || !Number.isFinite(width)) return;
            if (frame !== undefined) cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                frame = undefined;
                setMeasuredWidth(previous => previous === Math.round(width) ? previous : Math.round(width));
            });
        });
        observer.observe(element.current);
        return () => { observer.disconnect(); if (frame !== undefined) cancelAnimationFrame(frame); };
    }, [requestedWidth]);
    return { ref, width: dimension(requestedWidth ?? measuredWidth, defaultWidth), height: dimension(requestedHeight, defaultHeight, minimumHeight) };
}
