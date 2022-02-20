import React, { HTMLAttributes, ReactNode } from 'react';
import { BaseProps, Tone } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, BaseProps {
    children: ReactNode;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    tone?: Tone;
}

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export function Heading({ children, className, level = 2, tone = 'neutral', testId, ...props }: HeadingProps) {
    const Component = `h${level}` as HeadingTag;

    return (
        <Component className={cx('angin-heading', `angin-heading--${level}`, `angin-heading--${tone}`, className)} {...dataTestId(testId)} {...props}>
            {children}
        </Component>
    );
}
