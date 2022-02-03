import React, { HTMLAttributes, ReactNode, useState } from 'react';
import { BaseProps } from '../types';
import { cx, dataTestId } from '../utils/cx';

export interface TabbedNavigationItem {
    disabled?: boolean;
    href?: string;
    key: string;
    label: ReactNode;
}

export interface TabbedNavigationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'>, BaseProps {
    activeKey?: string;
    defaultActiveKey?: string;
    items: TabbedNavigationItem[];
    onChange?: (key: string) => void;
    orientation?: 'horizontal' | 'vertical';
}

export function TabbedNavigation({
    activeKey,
    className,
    defaultActiveKey,
    items,
    onChange,
    orientation = 'horizontal',
    testId,
    ...props
}: TabbedNavigationProps) {
    const [uncontrolledKey, setUncontrolledKey] = useState(defaultActiveKey || items[0]?.key || '');
    const selectedKey = activeKey === undefined ? uncontrolledKey : activeKey;

    const chooseItem = (key: string) => {
        if (activeKey === undefined) {
            setUncontrolledKey(key);
        }
        onChange?.(key);
    };

    return (
        <nav {...props} {...dataTestId(testId)} aria-label={props['aria-label'] || 'Section navigation'} className={cx('angin-tabbed-navigation', `angin-tabbed-navigation--${orientation}`, className)}>
            {items.map((item) => {
                const selected = item.key === selectedKey;
                const sharedProps = {
                    'aria-current': selected ? 'page' as const : undefined,
                    className: cx('angin-tabbed-navigation__item', selected && 'angin-tabbed-navigation__item--active'),
                    onClick: (event: React.MouseEvent<HTMLElement>) => {
                        if (item.disabled) {
                            event.preventDefault();
                            return;
                        }
                        if (!item.href) {
                            event.preventDefault();
                        }
                        chooseItem(item.key);
                    },
                };

                return item.href ? (
                    <a {...sharedProps} aria-disabled={item.disabled || undefined} href={item.disabled ? undefined : item.href} key={item.key}>
                        {item.label}
                    </a>
                ) : (
                    <a {...sharedProps} aria-disabled={item.disabled || undefined} href="#" key={item.key}>
                        {item.label}
                    </a>
                );
            })}
        </nav>
    );
}
