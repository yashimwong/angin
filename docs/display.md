# Display and layout components

Import display primitives from `angin`. Every display primitive accepts a React
ref to its root DOM element, native HTML attributes, `className`, `style`, and
`testId`. `Card` renders a `section`; `Text` defaults to `p` and supports `span`
and `div`. Choose the heading level for document structure rather than font size.

```tsx
import React from 'react';
import { Alert, Card, Heading, Progress, Stack, Text } from 'angin';

const cardRef = React.createRef<HTMLElement>();

<Card ref={cardRef} header={<Heading level={2}>Upload</Heading>}>
    <Stack gap="lg" align="stretch">
        <Text>Keep this window open until the upload completes.</Text>
        <Progress label="Uploading files" value={35} max={100} showValue />
        <Alert role="status" tone="success">Changes saved.</Alert>
    </Stack>
</Card>
```

`Alert` defaults to the assertive `alert` role. Use `role="status"` for routine
updates that should not interrupt an announcement. Supply `onDismiss` to show
a labelled dismiss button; removing the alert remains the parent's responsibility.

`Progress` clamps finite values to its range. Omit `value`, or pass a nonfinite
value, for indeterminate progress. Invalid maxima fall back to 100. A positive
fractional maximum is supported. String labels name the progressbar. For rich
labels, pass `aria-label` or `aria-labelledby` referencing your own stable ID;
these attributes are forwarded to the progressbar track.

```tsx
<Heading id="upload-title" level={3}>Uploading the archive</Heading>
<Progress label={<strong>Archive</strong>} aria-labelledby="upload-title" />
```

`Stack` defaults to a column with the `md` spacing token. Use `direction="row"`,
`wrap="wrap"`, and `gap={12}` for a wrapping row with a 12px gap. Gaps also accept
CSS lengths such as `"1rem"`. Explicit layout props override corresponding
`style` properties; omitted alignment, wrapping, and justification props retain
those style values.

`Avatar` uses up to two Unicode initials from `name`; failed images fall back to
those initials. Keep `name` descriptive because it also provides the accessible
name. `Spinner` defaults to a status named “Loading”; customize `label` when
multiple operations run simultaneously. Give `Skeleton` a `label` only when it
should announce a status, and use `width`, `height`, or `style` for dimensions.

`Card`'s `interactive` prop changes appearance. Add appropriate keyboard behavior
and semantics for your interaction, or put a native link/button inside the card.
`Divider` defaults to a horizontal separator and supports `orientation="vertical"`.
A string `label` supplies its accessible name; an explicit `aria-label` wins.
Numeric zero is valid content for alert titles, card slots, and divider labels.
