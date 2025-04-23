import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Badge } from '../src/components/base/Badge';
import { Button, ButtonProps } from '../src/components/base/Button';
import { Card } from '../src/components/base/Card';
import { Heading } from '../src/components/base/Heading';
import { Select } from '../src/components/base/Select';
import { Checkbox } from '../src/components/base/Checkbox';
import { Radio } from '../src/components/base/Radio';
import { Switch } from '../src/components/base/Switch';
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

export const SelectStates: Story = () => (
    <Stack gap="lg" style={{ maxWidth: 360 }}>
        <Select id="story-select" label="Workspace" defaultValue="design" helperText="Use arrows or type to find a workspace."
            options={[{ value: 'design', label: 'Design studio' }, { value: 'engineering', label: 'Engineering' }, { value: 'archived', label: 'Archived', disabled: true }]} />
        <Select id="story-select-error" label="Region" error="Choose an available region." defaultValue="">
            <option value="" disabled>Choose a region</option>
            <optgroup label="Asia Pacific"><option value="my">Malaysia</option><option value="sg">Singapore</option></optgroup>
        </Select>
        <Select id="story-select-multiple" label="Notify teams" multiple defaultValue={['design']}
            options={[{ value: 'design', label: 'Design' }, { value: 'engineering', label: 'Engineering' }, { value: 'support', label: 'Support' }]} />
        <Select id="story-select-disabled" label="Managed setting" disabled options={[{ value: 'managed', label: 'Managed by your organization' }]} />
    </Stack>
);

export const ChoiceStates: Story = () => (
    <Stack gap="lg">
        <Checkbox id="story-checkbox" label="Product updates" description="Occasional news about your workspace." defaultChecked />
        <Checkbox id="story-checkbox-disabled" label="Managed preference" disabled defaultChecked />
        <Radio id="story-radio-monthly" name="story-billing" label="Monthly billing" defaultChecked />
        <Radio id="story-radio-yearly" name="story-billing" label="Yearly billing" />
        <Switch id="story-switch" label="Desktop notifications" defaultChecked />
        <Switch id="story-switch-disabled" label="Managed notifications" disabled />
    </Stack>
);
