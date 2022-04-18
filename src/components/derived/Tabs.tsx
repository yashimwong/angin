import React, { HTMLAttributes, ReactNode, useState } from 'react';
import { useDerivedId } from '../../utils/derivedId';
import { BaseProps } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

export interface Tab {
    content: ReactNode;
    disabled?: boolean;
    key: string;
    label: ReactNode;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>, BaseProps {
    tabs: Tab[];
    activeKey?: string;
    defaultActiveKey?: string;
    onChange?: (key: string) => void;
}

export function Tabs({ activeKey, className, defaultActiveKey, onChange, tabs, testId, ...props }: TabsProps) {
    const instanceId = useDerivedId('angin-tabs', props.id);
    const [uncontrolledKey, setUncontrolledKey] = useState(defaultActiveKey || tabs[0]?.key || '');
    const selectedKey = activeKey === undefined ? uncontrolledKey : activeKey;
    const selectedTab = tabs.find((tab) => tab.key === selectedKey) || tabs[0];

    const selectTab = (key: string) => {
        if (activeKey === undefined) {
            setUncontrolledKey(key);
        }
        onChange?.(key);
    };

    return (
        <div {...props} {...dataTestId(testId)} className={cx('angin-tabs', className)}>
            <div aria-label="Tabs" className="angin-tabs__list" role="tablist">
                {tabs.map((tab) => (
                    <button
                        aria-controls={`${instanceId}-panel-${tab.key}`}
                        aria-selected={tab.key === selectedTab?.key}
                        className={cx('angin-tabs__tab', tab.key === selectedTab?.key && 'angin-tabs__tab--active')}
                        disabled={tab.disabled}
                        id={`${instanceId}-tab-${tab.key}`}
                        key={tab.key}
                        onClick={() => selectTab(tab.key)}
                        role="tab"
                        tabIndex={tab.key === selectedTab?.key ? 0 : -1}
                        type="button"
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {selectedTab && (
                <div
                    aria-labelledby={`${instanceId}-tab-${selectedTab.key}`}
                    className="angin-tabs__panel"
                    id={`${instanceId}-panel-${selectedTab.key}`}
                    role="tabpanel"
                    tabIndex={0}
                >
                    {selectedTab.content}
                </div>
            )}
        </div>
    );
}
