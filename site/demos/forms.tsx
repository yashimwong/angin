import React, { useState } from 'react';
import { Input, Textarea, Select, Checkbox, Radio, Switch } from '../../src';
export function InputDemo() {
    const [name, setName] = useState('Ada Lovelace');
    return <div className="demo-column"><Input id="docs-input-name" label="Full name" value={name} onChange={event => setName(event.currentTarget.value)} helperText="This appears on your profile." /><Input id="docs-input-email" label="Email address" placeholder="you@example.com" type="email" /><p className="demo-state" role="status">{name ? `Hello, ${name}.` : 'Enter your name.'}</p></div>;
}
export function TextareaDemo() {
    const [value, setValue] = useState('Building something thoughtful.');
    return <Textarea id="docs-bio" label="Short bio" value={value} rows={3} maxLength={160} onChange={event => setValue(event.currentTarget.value)} helperText={`${value.length} / 160 characters`} />;
}
export function SelectDemo() {
    const [value, setValue] = useState('weekly');
    return <Select id="docs-digest" label="Email digest" value={value} onChange={event => setValue(event.currentTarget.value)} options={[{ value: 'daily', label: 'Daily' }, { value: 'weekly', label: 'Weekly' }, { value: 'never', label: 'Never' }]} helperText="Choose how often you receive updates." />;
}
export function CheckboxDemo() {
    const [checked, setChecked] = useState(true);
    return <div className="demo-column"><Checkbox id="docs-updates" label="Product updates" description="Occasional news about the things you use." checked={checked} onChange={event => setChecked(event.currentTarget.checked)} /><Checkbox id="docs-disabled-choice" label="Managed by your organization" disabled checked readOnly /><p className="demo-state" role="status">{checked ? 'Updates enabled.' : 'Updates disabled.'}</p></div>;
}
export function RadioDemo() {
    const [value, setValue] = useState('monthly');
    return <fieldset style={{ border: 0, padding: 0, margin: 0 }}><legend style={{ marginBottom: 12, fontSize: 13 }}>Billing cycle</legend><div className="demo-column">{['monthly', 'yearly'].map(option => <Radio key={option} id={`docs-billing-${option}`} name="docs-billing" value={option} label={option === 'monthly' ? 'Monthly' : 'Yearly'} checked={value === option} onChange={event => setValue(event.currentTarget.value)} />)}</div></fieldset>;
}
export function SwitchDemo() {
    const [enabled, setEnabled] = useState(true);
    return <Switch id="docs-notifications" label="Notifications" description="Receive an update when your export is ready." checked={enabled} onChange={event => setEnabled(event.currentTarget.checked)} />;
}
