# Controls

All controls forward a ref to their native interactive element. `Tooltip` forwards its ref to the wrapper span. Use refs for focus and native form integrations; `onChange` receives the original React change event.

## Buttons

`Button` defaults to `type="button"`; set `type="submit"` explicitly for submission. `loading` disables the button and sets `aria-busy`. `IconButton` requires `label` for its accessible name and also supports `loading`. An explicit `aria-busy` survives when loading is false.

```tsx
const saveRef = React.createRef<HTMLButtonElement>();
<Button ref={saveRef} type="submit" loading={saving}>Save</Button>
<IconButton icon={<SaveIcon />} label="Save changes" loading={saving} />
```

## Text fields and selects

`Input`, `Textarea`, and `Select` accept `label`, `helperText`, `error`, and `controlSize`. `className` styles the native control, and `testId` identifies it. An error takes precedence over helper text and marks the control invalid. Existing `aria-describedby` IDs are combined with the displayed message ID. Fields without a message do not reference a missing message.

These three fields generate stable client-side IDs when `id` is omitted. Supply explicit, unique IDs during server rendering so server and hydration markup agree. Explicit IDs also make external labels and message references predictable: a message for `id="email"` uses `email-description`.

```tsx
<Input id="email" label="Email" type="email" autoComplete="email"
       helperText="Use your work address" aria-describedby="privacy-note" />
<Textarea id="notes" label="Notes" rows={4} />
const options = [{ label: 'One', value: 'one' }] as const;
<Select id="choice" label="Choice" options={options} />
```

`Select` accepts readonly option collections. Each option supports `label`, `value`, and `disabled`. Supply children instead of `options` for custom `<option>` or `<optgroup>` markup. Native `multiple`, `size`, `value`, and `defaultValue` remain available.

## Checkboxes, radios, and switches

`Checkbox`, `Radio`, and `Switch` keep native checked/defaultChecked and event semantics. Their required `label` is rendered inside a wrapping label. `description` renders beneath the label; provide a unique `id` to link that description to the input. `Checkbox` additionally accepts `error`, which overrides its description and marks the input invalid. `className` styles the outer field; `testId` identifies the input.

Radio buttons use the same native `name` to form a group. Switches use a checkbox input with `role="switch"`; read `event.currentTarget.checked` in change handlers.

## Tooltips

`Tooltip` shows `content` on focus or hover. `defaultOpen` initializes uncontrolled visibility; `open` controls visibility. `onOpenChange` receives requested visibility changes, including Escape dismissal. In controlled mode, update `open` in response to the callback. `onKeyDown` runs before Escape handling and can prevent the default dismissal.

```tsx
<Tooltip content="Save your changes" open={helpOpen} onOpenChange={setHelpOpen}>
  <button aria-label="Save changes">Save</button>
</Tooltip>
```

Use a focusable child for keyboard access. For a single native element child, Tooltip merges its visible description onto the child while preserving that child’s ref, event handlers, and existing description IDs. The child still needs its own accessible name. Fragments, multiple children, and composite components retain the wrapper description as a fallback; ARIA descriptions do not inherit into descendants, so use a native element trigger when its focused element needs the tooltip description. `id` yields a predictable `${id}-tooltip` content ID, while `testId` yields `${testId}-content`. Supply unique explicit IDs for server rendering and repeated test IDs. Otherwise each tooltip generates a distinct stable client-side fallback ID. External wrapper `aria-describedby` references are preserved while the content is visible.
