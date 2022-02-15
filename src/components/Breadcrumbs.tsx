import React, { HTMLAttributes, ReactNode } from 'react';
import { BaseProps } from '../types';
import { cx, dataTestId } from '../utils/cx';

export interface BreadcrumbItem {
    disabled?: boolean;
    href?: string;
    key: string;
    label: ReactNode;
}

export interface BreadcrumbsProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'>, BaseProps {
    items: BreadcrumbItem[];
    onNavigate?: (key: string) => void;
}

export function Breadcrumbs({ className, items, onNavigate, testId, ...props }: BreadcrumbsProps) {
    return (
        <nav {...props} {...dataTestId(testId)} aria-label={props['aria-label'] || 'Breadcrumb'} className={cx('angin-breadcrumbs', className)}>
            <ol className="angin-breadcrumbs__list">
                {items.map((item, index) => {
                    const current = index === items.length - 1;
                    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
                        if (item.disabled || !item.href) {
                            event.preventDefault();
                        }
                        if (!item.disabled) {
                            onNavigate?.(item.key);
                        }
                    };

                    return (
                        <li className={cx('angin-breadcrumbs__item', current && 'angin-breadcrumbs__item--current')} key={item.key}>
                            {current ? (
                                <span aria-current="page" className="angin-breadcrumbs__current">{item.label}</span>
                            ) : (
                                <>
                                    <a
                                        aria-disabled={item.disabled || undefined}
                                        className="angin-breadcrumbs__link"
                                        href={item.disabled ? undefined : item.href || '#'}
                                        onClick={handleClick}
                                    >
                                        {item.label}
                                    </a>
                                    <span aria-hidden="true" className="angin-breadcrumbs__separator">/</span>
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
