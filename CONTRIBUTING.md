# Contributing

Install with `npm ci --legacy-peer-deps` using the committed lockfile. The legacy
peer option accommodates the existing Storybook toolchain. CI uses Node 22;
keep dependency updates separate from component behavior changes when possible.

Base components live under `src/components/base`; composites under
`src/components/derived`. Tests sit next to their implementation. Public exports
flow through category barrels and `src/index.ts`. Styles use the `angin-` prefix,
with shared values in `src/styles/tokens.css`.

Before changing a prop, inspect native React attributes for a collision. Preserve
native event signatures for native controls. Prefer optional props and readonly
input collections over forcing consumers to copy arrays. Forward refs to the
actual control when exposing focus/form APIs, and specify any wrapper ref in
documentation. Keep component IDs unique and allow deterministic caller IDs.

Choose a focused regression test that would fail before the fix. Test behavior,
including disabled states and caller handlers, rather than snapshots of markup
incidental to the implementation. Do not add tests solely to assert constants or
mirror one line of implementation. Pure documentation changes need link/example
review rather than a new test suite.

Run `npm run check`. Build and pack scripts clean `dist` automatically; never
commit generated JavaScript, npm tarballs, or Storybook output. `npm pack` builds
and verifies the tarball contents before packing. Inspect its dry run when
changing exports or package metadata. Publishing and pushing are separate actions.

Use concise commit subjects explaining the behavior being changed. Include the
problem, resulting behavior, relevant validation, and limitations in review
notes. Update the appropriate guide when a new API or accessibility contract is
introduced. Avoid broad formatting changes alongside a focused fix.

Browser-based verification is not a default requirement. The automated workflow
uses TypeScript, Jest/jsdom, Node SSR, package checks, and webpack bundle checks.

Chart components live in `src/components/charts`, with shared geometry and
interaction code in `internal`. Preserve original data indices during reduction,
avoid mutating caller arrays, and keep missing data distinct from zero. Financial
reduction must conserve OHLC extrema and volume. Add meaningful geometry or
interaction regressions when changing these contracts. Keep internal helpers out
of the public chart barrel. Update chart stories/guides and run the package,
consumer, SSR, chart-budget, and bundle checks when adding a chart export.
