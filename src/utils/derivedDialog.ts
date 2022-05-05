import { useEffect, useRef } from 'react';

function isVisible(element: HTMLElement): boolean {
    if (element.closest('[hidden], [aria-hidden="true"]')) return false;
    for (let ancestor: HTMLElement | null = element; ancestor; ancestor = ancestor.parentElement) {
        const style = window.getComputedStyle(ancestor);
        if (style.display === 'none' || style.visibility === 'hidden' || style.visibility === 'collapse') return false;
    }
    return true;
}

/** Contain dialog focus without relying on layout measurements (also works in jsdom). */
export function useDerivedDialog(open: boolean, closeOnEscape: boolean, onClose: () => void) {
    const dialogRef = useRef<HTMLElement | null>(null);
    useEffect(() => {
        if (!open) return undefined;
        const previous = document.activeElement as HTMLElement | null;
        const dialog = dialogRef.current;
        const focusable = () =>
            Array.from(
                dialog?.querySelectorAll<HTMLElement>(
                    'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]',
                ) || [],
            ).filter(
                (element) =>
                    element.tabIndex >= 0 && !element.matches('input[type="hidden"], :disabled') && isVisible(element),
            );
        (focusable()[0] || dialog)?.focus();
        const trap = (event: KeyboardEvent) => {
            if (event.key !== 'Tab' || event.defaultPrevented) return;
            const elements = focusable();
            const first = elements[0];
            const last = elements[elements.length - 1];
            if (!first) {
                event.preventDefault();
                dialog?.focus();
            } else if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        dialog?.addEventListener('keydown', trap);
        return () => {
            dialog?.removeEventListener('keydown', trap);
            if (previous?.isConnected) previous.focus();
        };
    }, [open]);
    useEffect(() => {
        if (!open || !closeOnEscape) return undefined;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && !event.defaultPrevented) onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [closeOnEscape, onClose, open]);
    return dialogRef;
}
