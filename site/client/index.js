import { initTheme } from './theme.js';
import { initNavigation } from './navigation.js';
import { initCopy } from './copy.js';
import { initSearch } from './search.js';
import { initToc } from './toc.js';
import { initDemos } from './demos.js';
const cleanups = [initTheme, initNavigation, initCopy, initSearch, initToc, initDemos].map(init => init(document, window));
window.addEventListener('pagehide', event => { if (!event.persisted) cleanups.forEach(cleanup => cleanup?.()); }, { once: true });
