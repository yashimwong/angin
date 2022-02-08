import classNames from 'classnames';

type ClassNamesArguments = Parameters<typeof classNames>;

export function cx(...values: ClassNamesArguments): string {
    return classNames(...values);
}

export function dataTestId(testId?: string): { 'data-testid'?: string } {
    return testId ? { 'data-testid': testId } : {};
}
