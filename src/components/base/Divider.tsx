import React, { HTMLAttributes, ReactNode } from 'react';
import { BaseProps } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

export interface DividerProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
    label?: ReactNode;
    orientation?: 'horizontal' | 'vertical';
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(function Divider({ className, label, orientation = 'horizontal', testId, ...props }: DividerProps, ref) {
    return (
        <div ref={ref}
            {...props}
            {...dataTestId(testId)}
            aria-label={props['aria-label'] ?? (typeof label === 'string' ? label : undefined)}
            aria-orientation={orientation}
            className={cx('angin-divider', `angin-divider--${orientation}`, label != null && typeof label !== 'boolean' && 'angin-divider--labelled', className)}
            role="separator"
        >
            {label != null && typeof label !== 'boolean' && <span className="angin-divider__label">{label}</span>}
        </div>
    );
});
