# Accordion

Accordion progressively discloses sections. Keep titles descriptive so users can find the right panel before opening it.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { Accordion } from 'angin';

export function AccordionExample() {
    return (<Accordion id="project-help" items={[
        { key: 'install', title: 'How do I install it?', content: 'Install Angin and import the stylesheet.' },
        { key: 'theme', title: 'Can I change the theme?', content: 'Override the CSS custom properties.' },
    ]} defaultOpenKeys={['install']} />);
}
```

## Behavior and composition

Single-open mode is the default; multiple permits several panels. Use openKeys with onChange for controlled state, or defaultOpenKeys for initial internal state.

## Accessibility notes

Headers expose expanded state and keyboard navigation. Supply a stable ID and keep critical information available without requiring users to guess a section title.

## Related guidance

Read the [full integration guide](../../docs/derived.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
