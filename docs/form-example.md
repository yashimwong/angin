# A native form with async submission

[← Documentation](../README.md#documentation)

Keep field values in the browser when the application only needs them at submit
time. Give every field a `name` for FormData and an explicit `id` for labels/SSR.
The callback receives native form data; the submit button exposes loading state,
and failures remain visible rather than escaping an event handler.

<!-- typecheck-example -->
```tsx
import React, { FormEvent, useRef, useState } from 'react';
import { Alert, Button, Input, Select, Stack, Textarea } from 'angin';

const topics = [
    { value: 'support', label: 'Support' },
    { value: 'feedback', label: 'Feedback' },
] as const;

export function ContactForm({ onSend }: { onSend: (data: FormData) => Promise<void> }) {
    const email = useRef<HTMLInputElement>(null);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');
    const [sent, setSent] = useState(false);

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (sending) return;
        const data = new FormData(event.currentTarget);
        setSending(true);
        setError('');
        setSent(false);
        try {
            await onSend(data);
            setSent(true);
        } catch {
            setError('Could not send your message. Please try again.');
        } finally {
            setSending(false);
        }
    }

    return (
        <form className="angin-root" onSubmit={submit} aria-busy={sending}>
            <Stack gap="md">
                <Input ref={email} id="contact-email" name="email" type="email"
                       label="Email" required autoComplete="email" />
                <Select id="contact-topic" name="topic" label="Topic"
                        defaultValue="support" options={topics} />
                <Textarea id="contact-message" name="message" label="Message" required rows={5} />
                {error && <Alert tone="danger">{error}</Alert>}
                {sent && <Alert tone="success" role="status">Message sent.</Alert>}
                <Stack direction="row" gap="sm">
                    <Button type="submit" loading={sending}>Send message</Button>
                    <Button variant="ghost" onClick={() => email.current?.focus()}>Edit email</Button>
                </Stack>
            </Stack>
        </form>
    );
}
```

Import `angin/styles.css` at the application root. The fixed IDs assume a single
form instance; accept an ID prefix when rendering this form more than once.
Native required/email validation runs before submission. Server validation still
belongs in `onSend`; map field-specific failures to each control's `error` prop.
