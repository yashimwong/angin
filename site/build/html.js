function escape(value = '') {
    return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}
function json(value) { return JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026'); }
function text(node) { return node.value || (node.children || []).map(text).join(''); }
function slug(value) { return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-') || 'section'; }
function uniqueSlug(value, seen) {
    const base = slug(value); let result = base, count = 1;
    while (seen.has(result)) result = `${base}-${count++}`;
    seen.add(result); return result;
}
function safeUrl(value) {
    const url = String(value).trim();
    return /^(?:https?:|mailto:|tel:)/i.test(url) || !/^[\s\S]*?:/.test(url) && !/^\/\//.test(url) ? url : '#';
}
module.exports = { escape, json, text, slug, uniqueSlug, safeUrl };
