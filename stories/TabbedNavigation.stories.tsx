import React from 'react';
import { Meta, Story } from '@storybook/react';
import { TabbedNavigation, TabbedNavigationProps } from '../src/components/derived/TabbedNavigation';

export default { title: 'Components/TabbedNavigation', component: TabbedNavigation } as Meta;

export const Default: Story<TabbedNavigationProps> = (args) => <TabbedNavigation {...args} />;
Default.args = {
    items: [
        { key: 'overview', label: 'Overview' },
        { key: 'activity', label: 'Activity' },
        { key: 'settings', label: 'Settings' },
    ],
};
