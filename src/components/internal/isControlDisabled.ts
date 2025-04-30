/** Includes fieldset inheritance and the first-legend exception for custom actions. */
export function isControlDisabled(control: HTMLSelectElement | null): boolean {
    if (!control || control.disabled) return true;
    for (let parent = control.parentElement; parent; parent = parent.parentElement) {
        if (parent.tagName !== 'FIELDSET' || !parent.hasAttribute('disabled')) continue;
        const legend = Array.from(parent.children).find(child => child.tagName === 'LEGEND');
        if (!legend?.contains(control)) return true;
    }
    return false;
}
