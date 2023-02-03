export function normalize(value) { return String(value).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }
export function searchRecords(records, query, limit = 20) {
    const normalized = normalize(query), terms = normalized.split(' ').filter(Boolean);
    if (!terms.length) return [];
    return records.map(record => {
        const title = normalize(record.title), description = normalize(record.description), content = record.content;
        if (!terms.every(term => `${title} ${description} ${content}`.includes(term))) return null;
        const score = (title === normalized ? 100 : title.startsWith(normalized) ? 50 : 0) + terms.reduce((total, term) => total + (title.includes(term) ? 20 : 0) + (description.includes(term) ? 5 : 0) + (content.includes(term) ? 1 : 0), 0);
        return { record, score };
    }).filter(Boolean).sort((a, b) => b.score - a.score || a.record.title.localeCompare(b.record.title)).slice(0, limit).map(item => item.record);
}
function renderResults(document, list, records) {
    list.replaceChildren();
    for (const record of records) {
        const li = document.createElement('li'), link = document.createElement('a'), title = document.createElement('strong'), group = document.createElement('small'), description = document.createElement('p');
        link.href = record.url; title.textContent = record.title; group.textContent = record.group; description.textContent = record.description;
        link.append(group, title, description); li.append(link); list.append(li);
    }
}
export function initSearch(document, window) {
    const dialog = document.querySelector('#docs-search');
    if (!dialog) return () => {};
    const input = dialog.querySelector('[data-search-input]'), list = dialog.querySelector('[data-search-results]'), status = dialog.querySelector('[data-search-status]');
    const pageInput = document.querySelector('[data-page-search]');
    let previous, promise, timer, request = 0;
    const load = () => {
        if (!promise) promise = window.fetch(document.documentElement.dataset.searchIndex, { credentials: 'same-origin' }).then(response => { if (!response.ok) throw new Error('Search unavailable'); return response.json(); }).catch(error => { promise = undefined; throw error; });
        return promise;
    };
    async function run(field, results, announcement) {
        const sequence = ++request, query = field.value.trim();
        if (!query) { results.replaceChildren(); announcement.textContent = 'Type to search components and guides.'; return; }
        announcement.textContent = 'Searching…';
        try {
            const records = await load();
            if (sequence !== request) return;
            const matches = searchRecords(records, query);
            renderResults(document, results, matches);
            announcement.textContent = matches.length ? `${matches.length} result${matches.length === 1 ? '' : 's'} for “${query}”.` : `No results for “${query}”. Try a component name or a shorter phrase.`;
        } catch (_) { if (sequence === request) { results.replaceChildren(); announcement.textContent = 'Search could not load. Check your connection or browse the documentation index.'; } }
    }
    function schedule() { window.clearTimeout(timer); timer = window.setTimeout(() => run(input, list, status), 90); }
    function open() { previous = document.activeElement; if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', ''); input.focus(); input.select(); if (input.value) run(input, list, status); }
    function close() { window.clearTimeout(timer); request++; if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open'); previous?.focus(); }
    const click = event => { if (event.target.closest('[data-search-open]')) { event.preventDefault(); open(); } else if (event.target.closest('[data-search-close]')) close(); else if (event.target === dialog) close(); };
    const keyboard = event => {
        const editing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
        if ((event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) || event.key === '/' && !editing && !event.metaKey && !event.ctrlKey && !event.altKey) { event.preventDefault(); if (!dialog.open) open(); return; }
        if (!dialog.open) return;
        if (event.key === 'Escape') { event.preventDefault(); close(); return; }
        const links = [...list.querySelectorAll('a')];
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); const i = links.indexOf(document.activeElement); const next = event.key === 'ArrowDown' ? Math.min(links.length - 1, i + 1) : Math.max(0, i - 1); links[next]?.focus(); }
        if (event.key === 'Tab') {
            const focusable = [...dialog.querySelectorAll('input,button,a[href]')];
            const first = focusable[0], last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
    };
    const cancel = event => { event.preventDefault(); close(); };
    document.addEventListener('click', click); document.addEventListener('keydown', keyboard); input.addEventListener('input', schedule); dialog.addEventListener('cancel', cancel);
    const pageSearch = () => run(pageInput, document.querySelector('[data-page-results]'), document.querySelector('[data-page-status]'));
    if (pageInput) { pageInput.value = new URL(window.location.href).searchParams.get('q') || ''; pageInput.addEventListener('input', pageSearch); if (pageInput.value) pageSearch(); }
    return () => { request++; window.clearTimeout(timer); document.removeEventListener('click', click); document.removeEventListener('keydown', keyboard); input.removeEventListener('input', schedule); dialog.removeEventListener('cancel', cancel); pageInput?.removeEventListener('input', pageSearch); };
}
