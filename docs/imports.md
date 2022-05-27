# Imports and bundlers

[← Documentation](../README.md#documentation)

The root barrel is convenient and tree shakeable in a production bundler:

```tsx
import { Button, Calendar, cx } from 'angin';
import type { ButtonProps, CalendarProps, ClassValue } from 'angin';
import 'angin/styles.css';
```

Category and per-component entries are available when you want explicit imports:

```tsx
import { Input, Stack } from 'angin/base';
import { Button } from 'angin/base/Button';
import { Calendar } from 'angin/derived/Calendar';
import { cx } from 'angin/utils';
```

Paths are case sensitive and omit JavaScript extensions. Each public entry has
TypeScript declarations. `typesVersions` supports the repository's TypeScript
4.5 Node resolution, while export conditions supply declarations to resolvers
that understand conditional package exports.

Browser bundlers receive the ES module build. Node receives CommonJS through the
`node` condition, including when called from native ESM; this avoids relying on
Node to resolve the bundler build's extensionless imports. In Node ESM, the
default export is the package object:

```js
import Angin from 'angin';
const { Button } = Angin;
```

CommonJS callers can use `require('angin')` or `require('angin/base/Button')`.
Legacy `angin/dist/...` and `angin/src/styles/...` imports remain available, but
prefer the public aliases. The ESM build is intended for bundlers; do not execute
its individual `.js` files directly in Node.

JavaScript is marked side-effect-free. CSS is explicitly retained as a side
effect, so unused JavaScript can be removed without discarding your imported
styles. Keep React external when building another library on top of Angin.

`angin/styles.css` imports tokens, foundation, and all component rules. Individual
stylesheets are available under `angin/styles/tokens.css`,
`angin/styles/foundation.css`, and `angin/styles/components.css`. Import them in
that order when managing layers yourself; there are no per-component CSS files.
