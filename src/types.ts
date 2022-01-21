import { HTMLAttributes, ReactNode } from 'react';

export type Size = 'sm' | 'md' | 'lg';
export type Tone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

export interface BaseProps {
    className?: string;
    testId?: string;
}

export interface SurfaceProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
    children?: ReactNode;
}
