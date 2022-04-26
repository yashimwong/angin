import React, { HTMLAttributes, ReactNode, useEffect } from 'react';
import { useDerivedId } from '../../utils/derivedId';
import { BaseProps } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, BaseProps {
    children: ReactNode;
    footer?: ReactNode;
    onClose: () => void;
    open: boolean;
    title?: ReactNode;
    closeOnEscape?: boolean;
}

export function Modal({
    children,
    className,
    closeOnEscape = true,
    footer,
    onClose,
    open,
    testId,
    title,
    ...props
}: ModalProps) {
    const instanceId = useDerivedId('angin-modal', props.id);
    useEffect(() => {
        if (!open || !closeOnEscape) {
            return undefined;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [closeOnEscape, onClose, open]);

    if (!open) {
        return null;
    }

    const titleId = title !== undefined && title !== null ? `${instanceId}-title` : undefined;

    return (
        <div className="angin-modal__backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
            <div
                {...props}
                {...dataTestId(testId)}
                aria-labelledby={props['aria-labelledby'] || titleId}
                aria-modal="true"
                className={cx('angin-modal', className)}
                role="dialog"
            >
                <div className="angin-modal__header">
                    {title !== undefined && title !== null && <h2 className="angin-modal__title" id={titleId}>{title}</h2>}
                    <button aria-label="Close dialog" className="angin-modal__close" onClick={onClose} type="button">
                        ×
                    </button>
                </div>
                <div className="angin-modal__body">{children}</div>
                {footer && <div className="angin-modal__footer">{footer}</div>}
            </div>
        </div>
    );
}
