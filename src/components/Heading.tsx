import React, { HTMLAttributes, ReactNode } from 'react';
import { BaseProps, Tone } from '../types';
import { cx, dataTestId } from '../utils/cx';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, BaseProps {
    children: ReactNode;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    tone?: Tone;
}

export function Heading({ children, className, level = 2, tone = 'neutral', testId, ...props }: HeadingProps) {
    const Component = `h${level}` as keyof JSX.IntrinsicElements;

    return (
        <Component className={cx('angin-heading', `angin-heading--${level}`, `angin-heading--${tone}`, className)} {...dataTestId(testId)} {...props}>
            {children}
        </Component>
    );
}
