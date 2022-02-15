import React, { HTMLAttributes, ReactNode } from 'react';
import { BaseProps } from '../types';
import { cx, dataTestId } from '../utils/cx';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, BaseProps {
    action?: ReactNode;
    description?: ReactNode;
    icon?: ReactNode;
    title: ReactNode;
}

export function EmptyState({ action, children, className, description, icon, testId, title, ...props }: EmptyStateProps) {
    return (
        <div {...props} {...dataTestId(testId)} className={cx('angin-empty-state', className)}>
            {icon && <div aria-hidden="true" className="angin-empty-state__icon">{icon}</div>}
            <h2 className="angin-empty-state__title">{title}</h2>
            {description && <div className="angin-empty-state__description">{description}</div>}
            {children && <div className="angin-empty-state__body">{children}</div>}
            {action && <div className="angin-empty-state__action">{action}</div>}
        </div>
    );
}
