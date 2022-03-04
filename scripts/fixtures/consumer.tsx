import * as React from 'react';
import { Button, cx, Input } from 'angin';
import { Stack } from 'angin/base';
import { Button as DirectButton } from 'angin/base/Button';
import { Tabs } from 'angin/derived';
import { Pagination } from 'angin/derived/Pagination';
import { ClassValue } from 'angin/utils';

const classes: readonly ClassValue[] = ['sample', { selected: true }];
export const consumer = <Stack className={cx(classes)}>
    <Button type="submit">Save</Button>
    <DirectButton onClick={event => event.currentTarget.focus()}>Focus</DirectButton>
    <Input id="name" label="Name" onChange={event => console.log(event.currentTarget.value)} />
    <Tabs tabs={[{ key: 'a', label: 'A', content: 'Content' }]} />
    <Pagination page={1} pageCount={10} onChange={page => console.log(page)} />
</Stack>;
// @ts-expect-error misspelled native button type must be rejected
export const invalid = <Button type="summit">Invalid</Button>;
