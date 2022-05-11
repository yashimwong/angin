# Accessibility contracts

Components provide native semantics and keyboard behavior where possible. The
application still supplies meaningful labels, logical reading order, and content
that works with its chosen colors and interaction model.

| Component | Application responsibility |
| --- | --- |
| Input, Textarea, Select | Visible label or accessible name; unique IDs for SSR |
| Checkbox, Radio, Switch | Meaningful `label`; radio `name` shared within a group |
| IconButton | `label` describing the action rather than the icon shape |
| Tooltip | Focusable native child; child keeps its own accessible name |
| Progress | String label or explicit `aria-label`/`aria-labelledby` for rich labels |
| Modal, Drawer | Accessible title or `aria-label`; apply requested close state |
| Calendar | Appropriate locale and translated navigation labels |
| Heading | Level matching document structure |
| Card | Native link/button for actions; `interactive` only changes appearance |

Field errors set `aria-invalid`; message IDs are combined with caller-provided
`aria-describedby`. A hidden or absent helper must not become the only place
where a required instruction appears. `testId` has no accessibility meaning.

Tabs use Left/Right, Home, and End to select enabled entries. Accordion headers
use Up/Down, Home, and End for focus; Enter/Space activate the native button.
Menu opens with Up/Down, skips disabled items during arrow navigation, closes on
Escape/outside press, and requests closure on Tab. Modal and Drawer move focus
inside, wrap Tab, and restore the prior connected element after closing.
These components do not implement a complete overlay stack or make background
content inert; coordinate nested dialogs and page interaction in the application.

Tooltip connects its visible content to a single native trigger element. A
composite trigger that does not forward description attributes needs explicit
integration; descriptions on an ancestor do not name descendants. Do not place
interactive controls inside tooltip content.

Alert defaults to `role="alert"`. Use `role="status"` for routine updates and
avoid repeatedly mounting live regions. Spinner labels describe an operation;
unlabeled skeletons should remain decorative.

The stylesheet provides focus indicators and reduced-motion overrides. Preserve
focus visibility in custom themes. Unit tests cover DOM relationships and
keyboard event handling; they cannot prove screen-reader usability or visual
contrast. Review those in the consuming application's accessibility process.
