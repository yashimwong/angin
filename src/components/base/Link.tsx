import React, { AnchorHTMLAttributes, ReactNode } from 'react';
import { BaseProps } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, BaseProps {
    children: ReactNode;
    muted?: boolean;
}

export function Link({ children, className, muted = false, testId, ...props }: LinkProps) {
    return (
        <a className={cx('angin-link', muted && 'angin-link--muted', className)} {...dataTestId(testId)} {...props}>
            {children}
        </a>
    );
}
