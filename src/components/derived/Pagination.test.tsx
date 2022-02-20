import React from 'react';
import { render } from '../../test/render';
import { Pagination } from './Pagination';

describe('Pagination', () => {
    it('marks the current page and emits adjacent page changes', () => {
        const onChange = jest.fn();
        const container = render(<Pagination onChange={onChange} page={3} pageCount={8} testId="pagination" />);
        const next = container.querySelector('[aria-label="Next page"]') as HTMLButtonElement;

        expect(container.querySelector('[aria-current="page"]')?.textContent).toBe('3');
        next.click();
        expect(onChange).toHaveBeenCalledWith(4);
        expect(container.querySelectorAll('.angin-pagination__ellipsis')).toHaveLength(1);
    });
});
