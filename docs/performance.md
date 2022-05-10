# Performance and package size

Angin has no non-peer runtime dependencies. The class-name helper joins strings,
conditional objects, and nested arrays locally. React remains external to the
library so the application can supply one shared copy.

Production JavaScript excludes tests and test helpers. Every full build removes
the previous `dist` first, preventing renamed components and deleted tests from
remaining in a release. CSS is explicitly side-effectful; JavaScript exports
are eligible for tree shaking. Native controls avoid extra wrapper state.

Calendar memoizes its month grid using primitive month-timestamp/week-start values,
so unrelated rerenders do not allocate another 42 dates. Date boundaries are
normalized once per render. Locale formatters are memoized. Toast retains its
running timeout when only the callback changes, and invokes the latest callback.

## Reproduce the measurements

```sh
npm run build
npm run check:bundle
npm run check:package
npm pack --dry-run --json --ignore-scripts
```

The bundle check uses installed webpack in production mode, exports only Button,
and externalizes React/ReactDOM. It reports raw and gzip bytes for both root and
direct imports. Both must stay below 1,600 gzip bytes, and the root import may
retain at most 200 raw bytes more than the direct import. These are regression
budgets, not claims about total application size or the CSS payload.

At baseline commit `78e9d0e`, a fresh build measured 1,881 raw / 926 gzip bytes for
the Button root import and 1,877 raw / 928 gzip bytes for the direct import. Its
clean npm package contained 303 files / 241,277 unpacked bytes, including 140
test-related files. A preexisting dirty `dist` was larger still; compare fresh
builds for reliable measurements. The current commands above report the final
size including all component changes, using the installed toolchain.

Avoid adding blanket `React.memo` wrappers without measuring a real parent
render pattern. Unstable object props or children often remove their benefit.
Keep expensive application transformations outside render or memoize them using
actual data dependencies. Native refs support focusing controls without storing
DOM nodes in React state.

## Final comparison

With the same installed toolchain after the component changes:

| Measurement | Baseline | Improved |
| --- | ---: | ---: |
| Button root import, raw bytes | 1,881 | 1,506 |
| Button root import, gzip bytes | 926 | 740 |
| Package unpacked bytes | 241,277 | 218,585 |
| Package files | 303 | 175 |
| Packaged test-related files | 140 | 0 |

The Button gzip reduction is 20.1%. Unpacked package bytes fall 9.4%, even
with the added APIs and accessibility behavior. This package measurement excludes
repository guides (which are not in the package file allowlist). Regenerate
measurements when changing code or tool versions; budgets intentionally allow
some headroom.
