export function initToc(document, window) {
    const links = [...document.querySelectorAll('.page-toc a[href^="#"]')];
    if (!links.length || !window.IntersectionObserver) return () => {};
    const headings = links.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
    const visible = new Set();
    function mark(id) { for (const link of links) { if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); } }
    const observer = new window.IntersectionObserver(entries => {
        for (const entry of entries) { if (entry.isIntersecting) visible.add(entry.target.id); else visible.delete(entry.target.id); }
        const active = headings.find(heading => visible.has(heading.id)); if (active) mark(active.id);
    }, { rootMargin: '-90px 0px -55% 0px', threshold: 0 });
    for (const heading of headings) observer.observe(heading);
    const click = event => { const link = event.target.closest('.page-toc a'); if (link) mark(link.hash.slice(1)); };
    document.addEventListener('click', click);
    return () => { observer.disconnect(); document.removeEventListener('click', click); };
}
