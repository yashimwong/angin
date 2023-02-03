export async function copyText(text, document, window) {
    if (window.navigator.clipboard?.writeText) { try { await window.navigator.clipboard.writeText(text); return true; } catch (_) { /* Try the legacy path on non-secure previews. */ } }
    const previous = document.activeElement, field = document.createElement('textarea');
    field.value = text; field.style.position = 'fixed'; field.style.left = '-9999px'; field.setAttribute('aria-hidden', 'true');
    document.body.append(field); field.select();
    let copied = false;
    try { copied = typeof document.execCommand === 'function' && document.execCommand('copy'); } catch (_) { copied = false; }
    field.remove(); previous?.focus(); return copied;
}
export function initCopy(document, window) {
    const timers = new Set();
    const click = async event => {
        const button = event.target.closest('[data-copy]');
        if (!button || button.disabled) return;
        const block = button.closest('.code-block'), code = block?.querySelector('code'), status = block?.querySelector('[data-copy-status]');
        if (!code) return;
        button.disabled = true;
        const success = await copyText(code.textContent, document, window);
        if (!document.contains(button)) return;
        button.disabled = false; button.textContent = success ? 'Copied' : 'Select code';
        if (status) status.textContent = success ? 'Code copied to clipboard.' : 'Clipboard unavailable. Select and copy the code below.';
        if (!success) { const range = document.createRange(); range.selectNodeContents(code); const selection = window.getSelection(); selection?.removeAllRanges(); selection?.addRange(range); block.querySelector('pre')?.focus(); }
        const timer = window.setTimeout(() => { button.textContent = 'Copy'; timers.delete(timer); }, 2200); timers.add(timer);
    };
    document.addEventListener('click', click);
    return () => { document.removeEventListener('click', click); for (const timer of timers) window.clearTimeout(timer); };
}
