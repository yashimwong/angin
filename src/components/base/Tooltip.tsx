import React, { forwardRef, HTMLAttributes, ReactNode, useState } from 'react';
import { BaseProps } from '../../types';
import { useControlId } from '../../utils/controlId';
import { cx, dataTestId } from '../../utils/cx';

export type TooltipPlacement = 'bottom' | 'left' | 'right' | 'top';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'content'>, BaseProps {
    children: ReactNode;
    content: ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    placement?: TooltipPlacement;
}

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(function Tooltip({
    children,
    className,
    content,
    defaultOpen = false,
    id,
    onBlur,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    open,
    placement = 'top',
    testId,
    ...props
}: TooltipProps, ref) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const visible = open === undefined ? uncontrolledOpen : open;
    const fallbackId = useControlId(undefined, 'angin-tooltip');
    const tooltipId = id ? `${id}-tooltip` : testId ? `${testId}-content` : `${fallbackId}-content`;
    const show = () => open === undefined && setUncontrolledOpen(true);
    const hide = () => open === undefined && setUncontrolledOpen(false);

    return (
        <span
            ref={ref}
            {...props}
            {...dataTestId(testId)}
            aria-describedby={[props['aria-describedby'], visible ? tooltipId : undefined].filter(Boolean).join(' ') || undefined}
            className={cx('angin-tooltip', className)}
            id={id}
            onBlur={(event) => {
                hide();
                onBlur?.(event);
            }}
            onFocus={(event) => {
                show();
                onFocus?.(event);
            }}
            onMouseEnter={(event) => {
                show();
                onMouseEnter?.(event);
            }}
            onMouseLeave={(event) => {
                hide();
                onMouseLeave?.(event);
            }}
        >
            {children}
            {visible && (
                <span className={cx('angin-tooltip__content', `angin-tooltip__content--${placement}`)} id={tooltipId} role="tooltip">
                    {content}
                </span>
            )}
        </span>
    );
});
