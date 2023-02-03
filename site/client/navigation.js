export function initNavigation(document, window) {
    const navigation = document.querySelector('.mobile-navigation');
    const close = event => { if (event.target.closest('a') && navigation) navigation.open = false; };
    navigation?.addEventListener('click', close);
    const input = document.querySelector('[data-component-filter]');
    const cards = [...document.querySelectorAll('[data-component-card]')];
    const status = document.querySelector('[data-filter-status]');
    function filter() {
        const query = input.value.trim().toLowerCase(); let count = 0;
        for (const card of cards) { card.hidden = !card.dataset.componentCard.toLowerCase().includes(query); if (!card.hidden) count++; }
        for (const group of document.querySelectorAll('[data-component-group]')) group.hidden = ![...group.querySelectorAll('[data-component-card]')].some(card => !card.hidden);
        if (status) status.textContent = `${count} component${count === 1 ? '' : 's'}${query ? ' matching your filter' : ''}`;
        const url = new URL(window.location.href);
        if (query) url.searchParams.set('q', input.value); else url.searchParams.delete('q');
        window.history.replaceState(null, '', url);
    }
    if (input) { input.value = new URL(window.location.href).searchParams.get('q') || ''; input.addEventListener('input', filter); filter(); }
    const sidebar = document.querySelector('.sidebar');
    const active = sidebar?.querySelector('[aria-current="page"]');
    if (active) { const section = active.closest('details'); if (section) section.open = true; if (active.offsetTop > sidebar.clientHeight) sidebar.scrollTop = Math.max(0, active.offsetTop - sidebar.clientHeight / 2); }
    return () => { navigation?.removeEventListener('click', close); input?.removeEventListener('input', filter); };
}
