import { CSSProperties, RefObject, useEffect, useState } from 'react';

/** Keep option lists outside clipping surfaces while retaining the trigger's theme. */
export function useSelectPopup(open: boolean, trigger: RefObject<HTMLElement>, list: RefObject<HTMLElement>) {
    const [style, setStyle] = useState<CSSProperties>({ visibility: 'hidden' });
    useEffect(() => {
        if (!open) return;
        const update = () => {
            const node = trigger.current;
            if (!node) return;
            const rect = node.getBoundingClientRect();
            const viewport = window.visualViewport;
            const viewportTop = viewport?.offsetTop || 0;
            const viewportLeft = viewport?.offsetLeft || 0;
            const height = viewport?.height || window.innerHeight;
            const width = viewport?.width || window.innerWidth;
            const below = viewportTop + height - rect.bottom - 14;
            const above = rect.top - viewportTop - 14;
            const flip = below < Math.min(list.current?.scrollHeight || 240, 240) && above > below;
            const popupWidth = Math.min(rect.width, Math.max(0, width - 16));
            const computed = window.getComputedStyle(node);
            const tokens: Record<string, string> = {};
            for (let index = 0; index < computed.length; index++) {
                const name = computed[index];
                if (name.startsWith('--angin-')) tokens[name] = computed.getPropertyValue(name);
            }
            const left = computed.direction === 'rtl' ? rect.right - popupWidth : rect.left;
            setStyle({ ...tokens, position: 'fixed', insetInline: 'auto', width: popupWidth,
                left: Math.max(viewportLeft + 8, Math.min(left, viewportLeft + width - popupWidth - 8)),
                top: flip ? 'auto' : rect.bottom + 6,
                bottom: flip ? window.innerHeight - rect.top + 6 : 'auto',
                maxHeight: Math.max(0, Math.min(320, flip ? above : below)),
                direction: computed.direction as CSSProperties['direction'],
                transformOrigin: flip ? 'bottom center' : 'top center' });
        };
        update();
        const scroll = (event: Event) => { if (!list.current?.contains(event.target as Node)) update(); };
        window.addEventListener('resize', update);
        window.addEventListener('scroll', scroll, true);
        window.visualViewport?.addEventListener('resize', update);
        window.visualViewport?.addEventListener('scroll', update);
        const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(update);
        if (trigger.current) observer?.observe(trigger.current);
        return () => {
            window.removeEventListener('resize', update);
            window.removeEventListener('scroll', scroll, true);
            window.visualViewport?.removeEventListener('resize', update);
            window.visualViewport?.removeEventListener('scroll', update);
            observer?.disconnect();
        };
    }, [open, trigger, list]);
    return style;
}
