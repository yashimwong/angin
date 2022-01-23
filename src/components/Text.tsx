import React, { HTMLAttributes, ReactNode } from 'react';
import { BaseProps, Size, Tone } from '../types';
import { cx, dataTestId } from '../utils/cx';

export type TextElement = 'p' | 'span' | 'div';

export interface TextProps extends HTMLAttributes<HTMLElement>, BaseProps {
    as?: TextElement;
    children: ReactNode;
    size?: Size;
    tone?: Tone;
}

export function Text({ as = 'p', children, className, size = 'md', tone = 'neutral', testId, ...props }: TextProps) {
    const Component = as;

    return (
        <Component className={cx('angin-text', `angin-text--${size}`, `angin-text--${tone}`, className)} {...dataTestId(testId)} {...props}>
            {children}
        </Component>
    );
}
