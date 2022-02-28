export type ClassValue = string | number | boolean | null | undefined | ClassMap | readonly ClassValue[];
export interface ClassMap { [className: string]: unknown; }

/** Join conditional class names without importing a runtime dependency. */
export function cx(...values: readonly ClassValue[]): string {
    let result = '';
    const append = (value: ClassValue): void => {
        if (!value) return;
        if (typeof value === 'string' || typeof value === 'number') {
            result += (result ? ' ' : '') + value;
        } else if (Array.isArray(value)) {
            for (const item of value) append(item);
        } else if (typeof value === 'object') {
            const mapping = value as ClassMap;
            if (typeof mapping.toString === 'function' && mapping.toString !== Object.prototype.toString) {
                append(mapping.toString());
            } else {
                for (const key in mapping) {
                    if (Object.prototype.hasOwnProperty.call(mapping, key) && mapping[key]) append(key);
                }
            }
        }
    };
    for (const value of values) append(value);
    return result;
}

export function dataTestId(testId?: string): { 'data-testid'?: string } {
    return testId ? { 'data-testid': testId } : {};
}
