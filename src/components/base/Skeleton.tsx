import React, { CSSProperties, HTMLAttributes } from 'react';
import { BaseProps } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
    circle?: boolean;
    height?: CSSProperties['height'];
    label?: string;
    width?: CSSProperties['width'];
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton({ circle = false, className, height, label, style, testId, width, ...props }: SkeletonProps, ref) {
    return (
        <div ref={ref}
            {...props}
            {...dataTestId(testId)}
            aria-label={label}
            className={cx('angin-skeleton', circle && 'angin-skeleton--circle', className)}
            role={label ? 'status' : undefined}
            style={{ ...style, height, width }}
        />
    );
});
