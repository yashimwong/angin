import classNames, { ArgumentArray } from 'classnames';

export function cx(...values: ArgumentArray): string {
    return classNames(...values);
}

export function dataTestId(testId?: string): { 'data-testid'?: string } {
    return testId ? { 'data-testid': testId } : {};
}
