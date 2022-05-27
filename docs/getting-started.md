# Getting started

[← Documentation](../README.md#documentation)

## Install

Install `angin` alongside your application's `react` and `react-dom`. Keep those
React packages on matching versions. This repository develops and tests with
React 17; package peer ranges also allow React 18 and 19.

## Load the stylesheet

Load `angin/styles.css` once from your application entry. If your framework
restricts global CSS to a root layout, load it there. Components never import
CSS from JavaScript, so server rendering and stylesheet ordering remain explicit.
Wrap the relevant application area in `className="angin-root"` for foundational
font and box-sizing rules.

## Build your first screen

<!-- typecheck-example -->
```tsx
import React from 'react';
import { Button, Card, Heading, Text } from 'angin';
import 'angin/styles.css';

export function Welcome() {
    return (
        <main className="angin-root">
            <Card header={<Heading level={1}>Welcome</Heading>}>
                <Text>Choose a project to begin.</Text>
                <Button onClick={() => console.log('Create project')}>Create project</Button>
            </Card>
        </main>
    );
}
```

## Use native form props

Start with native props: `name`, `required`, `disabled`, `autoComplete`, and
`onChange` work on form controls. `Button` defaults to `type="button"`; opt into
`type="submit"` for forms. `Input` uses `controlSize` for its visual size so the
native numeric `size` attribute remains available.

Use a unique `id` for labeled controls and composite widgets, especially in
server-rendered applications. `testId` creates `data-testid`; it is a testing
hook rather than an accessible label.

## Choose your imports

For a small integration, import a single component from `angin/base/Button` or
`angin/derived/Calendar`. See [imports](imports.md) for resolution details and
[styling](styling.md) for custom properties.
