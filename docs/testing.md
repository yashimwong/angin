# Testing and validation

[← Documentation](../README.md#documentation)

Run `npm run check` before proposing a change. It combines complementary checks:

| Command | What it proves |
| --- | --- |
| `npm run typecheck` | Source and test TypeScript agree |
| `npm run check:stories` | Chart examples agree with their component APIs |
| `npm test` | DOM behavior under Jest/jsdom, without a browser |
| `npm run build` | Fresh CommonJS, ES modules, and declarations emit |
| `npm run check:package` | Public artifacts exist; tests/stale paths do not ship |
| `npm run check:types` | A consumer resolves root/category/deep imports and declarations |
| `npm run check:ssr` | Every component renders without browser globals |
| `npm run check:bundle` | Button and chart import budgets and root/direct tree shaking hold |
| `npm run check:charts` | Large-series rendering budgets and finite financial geometry hold |

The package, consumer, SSR, bundle, and chart-budget checks expect an up-to-date build. `npm run check` orders them for
you. Use `npm test -- --runTestsByPath src/components/base/Input.test.tsx` for a
focused change, then the full check for integration. Jest runs serially to keep
shared DOM and timer state predictable.

Tests live beside components and render via `src/test/render.tsx`. Wrap React
updates and effects with `act` from `react-dom/test-utils`. Verify user-visible
outcomes: focused element, native event values, connected ARIA references,
controlled state requests, and cleanup on unmount. Restore fake timers and
spies to avoid coupling tests to execution order.

A type test should catch invalid inputs as well as accept valid props. Consumer
fixtures use `@ts-expect-error` for intentional invalid values, so an unexpectedly
permissive declaration fails validation. DOM tests do not substitute for checking
the generated `.d.ts` files through installed package paths.

Bundle measurements externalize React and omit CSS; package size is a different
measurement. Report tool versions and compare fresh builds. Storybook can be
built separately with `npm run build-storybook`, but no browser-based testing is
part of the default check workflow.

Chart tests additionally cover gap handling, signed stacks, source-index retention,
OHLC/volume conservation, controlled range requests, bounded mark counts, lazy
data tables, keyboard navigation, pointer frame cleanup, and responsive observer
cleanup. Run `npm test -- --testPathPattern=charts` for the chart suite. The chart
test helper wraps React updates in `act` and unmounts every fixture.
