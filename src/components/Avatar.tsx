import React, { HTMLAttributes } from 'react';
import { BaseProps, Size } from '../types';
import { cx, dataTestId } from '../utils/cx';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement>, BaseProps {
    name: string;
    size?: Size;
    src?: string;
}

function initials(name: string): string {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();
}

export function Avatar({ className, name, size = 'md', src, testId, ...props }: AvatarProps) {
    return (
        <span {...props} {...dataTestId(testId)} aria-label={name} className={cx('angin-avatar', `angin-avatar--${size}`, className)} role="img">
            {src ? <img alt={name} className="angin-avatar__image" src={src} /> : initials(name)}
        </span>
    );
}
