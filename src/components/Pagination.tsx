import React, { HTMLAttributes } from 'react';
import { BaseProps } from '../types';
import { cx, dataTestId } from '../utils/cx';

export type PaginationItem = number | 'ellipsis';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'>, BaseProps {
    page: number;
    pageCount: number;
    onChange?: (page: number) => void;
    siblingCount?: number;
}

function pageItems(page: number, pageCount: number, siblingCount: number): PaginationItem[] {
    if (pageCount <= 1) {
        return pageCount === 1 ? [1] : [];
    }

    const visiblePages = siblingCount * 2 + 5;
    if (pageCount <= visiblePages) {
        return Array.from({ length: pageCount }, (_, index) => index + 1);
    }

    const firstPages = [1];
    const lastPages = [pageCount];
    const start = Math.max(2, page - siblingCount);
    const end = Math.min(pageCount - 1, page + siblingCount);
    const items: PaginationItem[] = [...firstPages];

    if (start > 2) {
        items.push('ellipsis');
    }
    for (let current = start; current <= end; current += 1) {
        items.push(current);
    }
    if (end < pageCount - 1) {
        items.push('ellipsis');
    }
    return [...items, ...lastPages];
}

export function Pagination({ className, onChange, page, pageCount, siblingCount = 1, testId, ...props }: PaginationProps) {
    const currentPage = pageCount > 0 ? Math.min(Math.max(page, 1), pageCount) : 0;
    const items = pageItems(currentPage, pageCount, Math.max(siblingCount, 0));
    const choosePage = (nextPage: number) => {
        if (nextPage !== currentPage && nextPage >= 1 && nextPage <= pageCount) {
            onChange?.(nextPage);
        }
    };

    return (
        <nav {...props} {...dataTestId(testId)} aria-label={props['aria-label'] || 'Pagination'} className={cx('angin-pagination', className)}>
            <button aria-label="Previous page" className="angin-pagination__control" disabled={currentPage <= 1} onClick={() => choosePage(currentPage - 1)} type="button">
                Previous
            </button>
            <ol className="angin-pagination__list">
                {items.map((item, index) => item === 'ellipsis' ? (
                    <li aria-hidden="true" className="angin-pagination__ellipsis" key={`ellipsis-${index}`}>…</li>
                ) : (
                    <li key={item}>
                        <button
                            aria-current={item === currentPage ? 'page' : undefined}
                            aria-label={`Page ${item}`}
                            className={cx('angin-pagination__page', item === currentPage && 'angin-pagination__page--active')}
                            onClick={() => choosePage(item)}
                            type="button"
                        >
                            {item}
                        </button>
                    </li>
                ))}
            </ol>
            <button aria-label="Next page" className="angin-pagination__control" disabled={currentPage === 0 || currentPage >= pageCount} onClick={() => choosePage(currentPage + 1)} type="button">
                Next
            </button>
        </nav>
    );
}
