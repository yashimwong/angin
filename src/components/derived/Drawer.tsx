import { ControlIcon } from '../internal/ControlIcon';
import { useDerivedDialog } from '../../utils/derivedDialog';
import React, { HTMLAttributes, ReactNode } from 'react';
import { useDerivedId } from '../../utils/derivedId';
import { BaseProps } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, BaseProps {
    children: ReactNode;
    closeOnEscape?: boolean;
    footer?: ReactNode;
    onClose: () => void;
    open: boolean;
    placement?: 'left' | 'right';
    title?: ReactNode;
}

export function Drawer({
    children,
    className,
    closeOnEscape = true,
    footer,
    onClose,
    open,
    placement = 'right',
    testId,
    title,
    ...props
}: DrawerProps) {
    const dialogRef = useDerivedDialog(open, closeOnEscape, onClose);
    const instanceId = useDerivedId('angin-drawer', props.id);
    const hasTitle = title != null && typeof title !== 'boolean';

    if (!open) {
        return null;
    }

    return (
        <div
            className="angin-drawer__backdrop"
            onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
            <aside
                {...props}
                {...dataTestId(testId)}
                aria-labelledby={props['aria-labelledby'] || (hasTitle ? `${instanceId}-title` : undefined)}
                aria-modal="true"
                ref={(element) => {
                    dialogRef.current = element;
                }}
                tabIndex={-1}
                className={cx('angin-drawer', `angin-drawer--${placement}`, className)}
                role="dialog"
            >
                <header className="angin-drawer__header">
                    {hasTitle && (
                        <h2 className="angin-drawer__title" id={`${instanceId}-title`}>
                            {title}
                        </h2>
                    )}
                    <button aria-label="Close drawer" className="angin-drawer__close" onClick={onClose} type="button">
                        <ControlIcon kind="close" />
                    </button>
                </header>
                <div className="angin-drawer__body">{children}</div>
                {footer && <footer className="angin-drawer__footer">{footer}</footer>}
            </aside>
        </div>
    );
}
