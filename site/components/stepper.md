# Stepper

Stepper makes progress through a multi-step task visible. The active step uses a zero-based index.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React, { useState } from 'react';
import { Stepper } from 'angin';

export function StepperExample() {
    const [step, setStep] = useState(0);
    return (<Stepper activeStep={step} onStepChange={setStep} steps={[
        { key: 'details', label: 'Details' },
        { key: 'members', label: 'Members' },
        { key: 'review', label: 'Review' },
    ]} />);
}
```

## Behavior and composition

Use activeStep/onStepChange for controlled state or defaultActiveStep for internal state. Descriptions, disabled steps, and vertical orientation support longer workflows.

## Accessibility notes

A step indicator does not validate or submit a form. Keep navigation permissions, validation errors, and the active content region under application control.

## Related guidance

Read the [full integration guide](../../docs/derived.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
