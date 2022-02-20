import React, { HTMLAttributes, ReactNode } from 'react';
import { BaseProps } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

export interface CardProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
    children: ReactNode;
    footer?: ReactNode;
    header?: ReactNode;
    interactive?: boolean;
}

export function Card({ children, className, footer, header, interactive = false, testId, ...props }: CardProps) {
    return (
        <section {...props} {...dataTestId(testId)} className={cx('angin-card', interactive && 'angin-card--interactive', className)}>
            {header && <header className="angin-card__header">{header}</header>}
            <div className="angin-card__body">{children}</div>
            {footer && <footer className="angin-card__footer">{footer}</footer>}
        </section>
    );
}
