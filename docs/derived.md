# Derived components

Calendar accepts a controlled `value` and `month`, or initial `defaultValue`. Dates use local calendar days; minDate and maxDate include the entire boundary day. `locale` formats headings and date labels, `weekStartsOn` aligns the grid, and navigation labels can be translated independently. Memoized month grids survive unrelated renders.

Tabs select enabled entries with Left/Right, Home, and End. Accordion headings use Up/Down, Home, and End. Menu opens with Up/Down, focuses its first or last enabled item according to the opening arrow, navigates with arrows, and dismisses with Escape or an outside pointer press. Controlled components report requests through callbacks; parents apply the next state.

Modal and Drawer focus their first visible control, skip hidden and disabled controls, wrap Tab focus, and restore the previous element when closed. A nested Menu consumes Escape so dismissing the menu leaves its enclosing dialog open. Escape and backdrop presses request closure. Supply an accessible title or aria-label. Explicit aria-labelledby takes priority.

For server rendering on React 17, pass a stable, unique `id` to Tabs, Accordion, Menu, Modal, and Drawer. Generated instance IDs prevent client collisions but are process-local, so explicit IDs are required for deterministic server hydration.

Item collections accept readonly arrays. Pagination floors finite numeric values and clamps the page to its range; invalid page counts render no pages. Toast requires a positive finite duration to dismiss automatically. Callback changes preserve an active timeout; duration or open changes restart it.
