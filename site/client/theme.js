export function initTheme(document, window) {
    const button = document.querySelector('[data-theme-toggle]');
    if (!button) return () => {};
    const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : { matches: false };
    let choice = 'system';
    try { const saved = window.localStorage.getItem('angin-docs-theme'); if (['light', 'dark', 'system'].includes(saved)) choice = saved; } catch (_) { /* Storage is optional. */ }
    function apply() {
        const theme = choice === 'system' ? media.matches ? 'dark' : 'light' : choice;
        document.documentElement.dataset.theme = theme;
        button.dataset.themeChoice = choice;
        const next = choice === 'system' ? 'light' : choice === 'light' ? 'dark' : 'system';
        button.setAttribute('aria-label', `Theme: ${choice}. Switch to ${next} theme.`);
        button.title = `Theme: ${choice}`;
    }
    const change = () => { choice = choice === 'system' ? 'light' : choice === 'light' ? 'dark' : 'system'; try { window.localStorage.setItem('angin-docs-theme', choice); } catch (_) { /* Keep the session choice. */ } apply(); };
    button.addEventListener('click', change);
    if (media.addEventListener) media.addEventListener('change', apply);
    else if (media.addListener) media.addListener(apply);
    apply();
    return () => { button.removeEventListener('click', change); if (media.removeEventListener) media.removeEventListener('change', apply); else if (media.removeListener) media.removeListener(apply); };
}
