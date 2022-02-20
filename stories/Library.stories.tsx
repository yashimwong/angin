import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Badge } from '../src/components/base/Badge';
import { Button, ButtonProps } from '../src/components/base/Button';
import { Card } from '../src/components/base/Card';
import { Heading } from '../src/components/base/Heading';
import { Input } from '../src/components/base/Input';
import { Stack } from '../src/components/base/Stack';

export default {
    title: 'Library/Overview',
    component: Button,
} as Meta;

export const Buttons: Story<ButtonProps> = (args) => (
    <Stack direction="row" align="center" gap="md">
        <Button {...args}>Save changes</Button>
        <Button variant="outline">Preview</Button>
        <Button variant="ghost">Cancel</Button>
    </Stack>
);

Buttons.args = {
    size: 'md',
    variant: 'solid',
};

export const Form: Story = () => (
    <Card header={<Heading level={3}>Profile</Heading>}>
        <Stack gap="md">
            <Input id="story-name" label="Name" defaultValue="Ada Lovelace" helperText="This is shown publicly." />
            <Stack direction="row" align="center" gap="sm">
                <Badge tone="success">Verified</Badge>
                <Badge tone="neutral" outline>Member since 2022</Badge>
            </Stack>
        </Stack>
    </Card>
);
