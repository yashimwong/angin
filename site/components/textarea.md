# Textarea

Use Textarea for multiple lines of input. Native `rows`, `maxLength`, `required`, and change events remain available.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React, { useState } from 'react';
import { Textarea } from 'angin';

export function TextareaExample() {
    const [bio, setBio] = useState('');
    return (<Textarea id="profile-bio" label="Short bio" rows={4}
        maxLength={160} value={bio}
        onChange={event => setBio(event.currentTarget.value)}
        helperText={`${bio.length} / 160 characters`} />);
}
```

## Behavior and composition

Provide `label` and optional `helperText` or `error`. `controlSize` changes visual sizing while native textarea dimensions remain explicit.

## Accessibility notes

Do not use placeholder text as the only label. Keep character limits and errors connected to the control through its stable ID.

## Related guidance

Read the [full integration guide](../../docs/controls.md#text-fields-and-selects) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
