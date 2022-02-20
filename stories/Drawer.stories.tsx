import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button } from '../src/components/base/Button';
import { Drawer, DrawerProps } from '../src/components/derived/Drawer';

export default { title: 'Components/Drawer', component: Drawer } as Meta;

export const Default: Story<DrawerProps> = (args) => <Drawer {...args} />;
Default.args = { open: true, title: 'Filters', children: 'Choose a filter to narrow these results.' };
Default.argTypes = { onClose: { action: 'closed' } };

export const WithFooter: Story<DrawerProps> = (args) => <Drawer {...args} footer={<Button>Apply filters</Button>} />;
WithFooter.args = { open: true, title: 'Filters', children: 'The footer can hold a primary action.' };
