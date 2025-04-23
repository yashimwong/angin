# Styling Angin

[← Documentation](../README.md#documentation)

Load the stylesheet once in the application's entry point:

```ts
import 'angin/src/styles/index.css';
```

The entry stylesheet imports `tokens.css`, `foundation.css`, and `components.css`
in that order. Place your overrides after this import. Component selectors use
an `angin-` prefix, while theme values are CSS custom properties declared on
`:root`. Override variables on a container to scope a theme to one subtree:

```css
.product-panel {
    --angin-color-primary-600: #6d28d9;
    --angin-color-primary-500: #7c3aed;
    --angin-radius-md: 0.75rem;
    --angin-space-4: 1.25rem;
}
```

Wrap an application or region in `className="angin-root"` to apply the foundation:
font family, line height, border-box sizing, form font inheritance, and keyboard
focus styling. Components still have their own classes outside this wrapper;
standalone interactive controls and loaders retain focus and reduced-motion
behavior. Foundation styling is intentionally scoped instead of resetting every
HTML element on the page.

Use a component's `className` for reusable adjustments and `style` for values
computed by the application. Layout props on `Stack` override matching inline
properties only when supplied. `Skeleton` dimension props override matching
inline dimensions only when supplied. Avoid replacing component class strings;
consumer classes are merged with Angin's variant classes.

```tsx
<Stack className="results" gap="1.5rem" wrap="wrap" direction="row">
    <Card className="result">A long result title</Card>
</Stack>
```

```css
.result {
    flex: 1 1 18rem;
}
```

Long text in cards, headings, alerts, and paragraphs can wrap inside narrow flex
layouts. Avatars, spinners, and alert dismiss buttons retain their dimensions.
For truncated content, provide your own overflow and accessible naming behavior.

The `prefers-reduced-motion: reduce` media query stops spinner, skeleton, and
progress animations even outside a root wrapper. Indeterminate progress retains
a visible static bar. Within `angin-root`, transitions and other animations are
also shortened. Do not use movement alone to communicate an operation's state;
retain a visible label or the component's status name.

Keyboard focus uses `--angin-color-primary-500` for component outlines and
`--angin-focus-ring` for the foundation ring. When changing a theme, keep both
indicators distinguishable from adjacent backgrounds. Check appearance in your
application's real layout, including narrow widths and large text sizes.

## Charts

The main stylesheet includes `charts.css`; chart-only consumers can import
`angin/styles/charts.css`. Charts use the shared typography, spacing, border,
and focus tokens plus inheritable `--angin-chart-*` properties for surfaces,
axis text, categorical colors, and candle direction. No animation is enabled by
default. See [chart themes](charts-theming.md) for a complete dark-theme example
and sizing behavior. Application classes and inline styles remain supported.

## Control appearance and motion

Select popups, checkbox marks, radio dots, switch tracks, and disclosure chevrons
are drawn by the library. Checkboxes and radios keep their native inputs and form
behavior. Selected, disabled, invalid, hover, and keyboard focus states share the
same palette and radii. High contrast mode preserves visible selection marks.

Motion uses `--angin-duration-fast` (140ms), `--angin-duration-normal` (220ms),
`--angin-duration-slow` (320ms), `--angin-ease-out`, and `--angin-ease-standard`.
Override these properties on your themed container to adjust the pace. Dialogs,
drawers, menus, and toasts animate on entry; dismissal remains immediate. Reduced
motion shortens transitions and entrances both inside and outside `angin-root`.

Select popups render outside clipping containers, or inside their enclosing
dialog, and copy the trigger's resolved `--angin-*` properties. Set popup theme
values through these tokens instead of relying on an ancestor CSS selector.
