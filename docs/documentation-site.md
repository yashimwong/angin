# Documentation site

The documentation is a static site generated from this repository. It includes individual references for all 46 components, TypeScript-derived prop tables, 13 chart previews, guides, searchable navigation, and a configurable playground. The source is in `site/`; generated files live in the ignored `out/` directory.

## Build and serve

Use Node.js 22 or newer and install the locked dependencies:

```sh
npm ci --legacy-peer-deps
npm run build:docs
npm run docs
```

Open `http://127.0.0.1:4173`. The local server supports real 404 responses, correct MIME types, HEAD requests, and directory redirects. Set `PORT` to choose another local port. Rebuild after changing content; the server reads the latest files on every request.

## Author content

- Edit `docs/*.md` for shared guides. Register new guides in `site/catalog.js`.
- Edit `site/components/*.md` for component-specific examples and guidance. Mark complete TSX examples with `<!-- typecheck-example -->` so the consumer declaration check compiles them.
- Edit `site/demos/*.tsx` for interactive examples. These use the actual library components and run through strict TypeScript checks.
- Keep examples deterministic for static rendering: use explicit IDs, fixed dates, synthetic data, and controlled state.
- Change shared layouts in `site/build/` and styles in `site/styles/`. React prop tables are extracted from source during each build.

Raw HTML in Markdown is escaped. Use standard Markdown headings, tables, links, and fenced code blocks. Heading links are generated automatically. Relative links to registered guides become site links; source references point to GitHub.

## Progressive interaction

Every documentation page is generated as complete HTML. Reading, navigation, code examples, and the full search-page directory work without JavaScript. The site uses system fonts and has no external font or analytics requests.

The small initial script enables theme preferences, copy buttons, filtering, and keyboard search. Search loads its index only when used. Press Command/Ctrl K or `/` outside an input to search, then use arrow keys and Enter to navigate results. Escape closes search and restores focus.

Example previews start as static HTML. Select **Try it** to load React and that demo's component group. **Reset preview** restores its initial state. The playground generates bounded synthetic data locally; financial candles are examples, not live market data.

## Check changes

```sh
npm run check
```

This runs the library's behavior, declaration, SSR, bundle, and chart checks, then builds and validates the site. Documentation checks cover Markdown escaping, keyboard interaction, storage and clipboard fallbacks, search ranking, HTTP routing, links, anchors, metadata, unique IDs, and gzip transfer budgets. The generated report is `.site-cache/performance.json`. CI retains `out/` as a downloadable artifact.

The documentation checks do not launch a browser. DOM and HTTP tests cover behavior without making claims about visual or assistive-technology verification. For a release, evaluate responsive layouts and assistive technology in the consuming environment when that verification is requested.

## Performance budgets

The initial production build measures roughly 5 KB of JavaScript and 11 KB of CSS, gzipped. These figures describe transferred assets, not runtime memory or a browser performance score. React, ReactDOM, demo code, and the search index are deferred until their features are requested; activating a demo adds those downloads.

The build validator enforces these gzip limits:

| Resource | Maximum |
| --- | --- |
| Initial JavaScript | 8,000 bytes |
| Shared stylesheet | 14,000 bytes |
| Lazy search index | 65,000 bytes |
| Each HTML page | 60,000 bytes |

Content changes can alter measured sizes. Use the generated performance report for current values, and investigate regressions before increasing a budget. Theme initialization runs before the stylesheet to reduce theme flashing. Code highlighting runs at build time, search results are bounded, and the table of contents uses an observer instead of continuous scroll handlers.

## Deploy static files

Upload the contents of `out/` to a static host. The tracked `.openai/hosting.json` selects this output directory for the private Sites deployment. Source files and generated caches are not needed by the running site. The site requires no server runtime, database, or application credentials.

To build under a path prefix, set both values before building and use the same prefix for the local server:

```sh
DOCS_ORIGIN=https://example.com DOCS_BASE_PATH=/angin/ npm run build:docs
DOCS_BASE_PATH=/angin/ npm run docs
DOCS_ORIGIN=https://example.com DOCS_BASE_PATH=/angin/ node site/check.js
```

`DOCS_ORIGIN` must contain only an HTTP(S) origin. `DOCS_BASE_PATH` must begin and end with `/`. Canonical URLs, search links, assets, and the sitemap use these values. The `_headers` file expresses cache policy for hosts that support it; configure equivalent rules on other hosts. Hashed assets can be cached immutably while HTML and unversioned assets should revalidate.

Building or publishing this site does not publish the library to npm. Package releases remain a separate maintainer action.
