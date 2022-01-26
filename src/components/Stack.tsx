import React, { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { BaseProps, Size } from '../types';
import { cx, dataTestId } from '../utils/cx';

export type StackDirection = 'row' | 'column';

export interface StackProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
    children: ReactNode;
    direction?: StackDirection;
    gap?: Size | CSSProperties['gap'];
    align?: CSSProperties['alignItems'];
    justify?: CSSProperties['justifyContent'];
    wrap?: CSSProperties['flexWrap'];
}

export function Stack({
    align,
    children,
    className,
    direction = 'column',
    gap = 'md',
    justify,
    style,
    testId,
    wrap,
    ...props
}: StackProps) {
    const gapClass = typeof gap === 'string' && ['sm', 'md', 'lg'].includes(gap) ? `angin-stack--gap-${gap}` : undefined;
    const inlineStyle = {
        ...style,
        ...(gapClass ? {} : { gap }),
        alignItems: align,
        flexWrap: wrap,
        justifyContent: justify,
    } as CSSProperties;

    return (
        <div
            {...props}
            {...dataTestId(testId)}
            className={cx('angin-stack', `angin-stack--${direction}`, gapClass, className)}
            style={inlineStyle}
        >
            {children}
        </div>
    );
}
