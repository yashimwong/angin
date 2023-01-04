const paths = {
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    chevron: '<path d="m9 5 7 7-7 7"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
    moon: '<path d="M20 14a8 8 0 0 1-10-10 8 8 0 1 0 10 10Z"/>',
    book: '<path d="M12 5v15M3 4h5c2 0 4 1 4 2 0-1 2-2 4-2h5v15h-5c-2 0-4 1-4 2 0-1-2-2-4-2H3Z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    chart: '<path d="M4 4v16h16M7 14l4-5 4 3 5-7"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    github: '<path d="M9 19c-4 1-4-2-6-2m12 5v-4c0-1-.3-2-1-2 3 0 6-1 6-5a4 4 0 0 0-1-3 4 4 0 0 0 0-3s-1 0-3 1a11 11 0 0 0-6 0C8 5 7 5 7 5a4 4 0 0 0 0 3 4 4 0 0 0-1 3c0 4 3 5 6 5-.7 0-1 1-1 2v4"/>',
};
function icon(name, className = '') { return `<svg class="icon ${className}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`; }
function logo() { return '<svg class="brand-mark" width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M5 11h16c6 0 6-7 2-7-2 0-3 1-3 3M4 16h21M7 21h13c6 0 6 7 2 7-2 0-3-1-3-3" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>'; }
module.exports = { icon, logo };
