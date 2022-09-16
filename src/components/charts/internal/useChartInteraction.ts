import { useEffect, useRef, useState, KeyboardEvent, PointerEvent, MouseEvent } from 'react';
import { ChartDatum, InspectPoint } from '../types';

export function useChartInteraction(points: readonly InspectPoint[], width: number, height: number, enabled: boolean, onSelect?: (datum: ChartDatum) => void) {
    const [index, setIndex] = useState(-1);
    const [keyboard, setKeyboard] = useState(false);
    const frame = useRef<number | undefined>();
    const cancel = () => { if (frame.current !== undefined) cancelAnimationFrame(frame.current); frame.current = undefined; };
    useEffect(() => { setIndex(-1); return cancel; }, [points, enabled]);
    const active = enabled && index >= 0 ? points[Math.min(index, points.length - 1)] : undefined;
    const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
        if (!enabled || !points.length) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = (event.clientX - rect.left) / rect.width * width;
        const y = (event.clientY - rect.top) / rect.height * height;
        cancel();
        frame.current = requestAnimationFrame(() => {
            frame.current = undefined;
            let nearest = 0, distance = Infinity;
            for (let i = 0; i < points.length; i++) {
                const next = (points[i].x - x) ** 2 + (points[i].y - y) ** 2;
                if (next < distance) { distance = next; nearest = i; }
            }
            setKeyboard(false); setIndex(nearest);
        });
    };
    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (!enabled || !points.length || event.altKey || event.ctrlKey || event.metaKey) return;
        const last = points.length - 1;
        let next: number | undefined;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = Math.min(last, index + 1);
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = Math.max(0, index - 1);
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = last;
        if (event.key === 'Escape') next = -1;
        if ((event.key === 'Enter' || event.key === ' ') && active && onSelect) { event.preventDefault(); onSelect(active.datum); }
        if (next !== undefined) { event.preventDefault(); cancel(); setKeyboard(true); setIndex(next); }
    };
    return { active, keyboard, onPointerMove, onKeyDown,
        onFocus: () => { if (enabled) { setKeyboard(true); setIndex(current => current < 0 ? 0 : current); } },
        onBlur: () => { cancel(); setIndex(-1); },
        onPointerLeave: () => { cancel(); if (!keyboard) setIndex(-1); },
        onClick: (event: MouseEvent<SVGSVGElement>) => {
            if (!enabled || !points.length) return;
            cancel();
            const rect = event.currentTarget.getBoundingClientRect();
            let nearest = Math.max(0, index), distance = Infinity;
            if (rect.width && rect.height) {
                const x = (event.clientX - rect.left) / rect.width * width;
                const y = (event.clientY - rect.top) / rect.height * height;
                for (let i = 0; i < points.length; i++) {
                    const next = (points[i].x - x) ** 2 + (points[i].y - y) ** 2;
                    if (next < distance) { distance = next; nearest = i; }
                }
            }
            nearest = Math.min(nearest, points.length - 1);
            setKeyboard(false); setIndex(nearest); onSelect?.(points[nearest].datum);
        },
    };
}
