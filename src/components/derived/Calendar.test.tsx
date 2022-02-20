import React from 'react';
import { render } from '../../test/render';
import { Calendar } from './Calendar';

describe('Calendar', () => {
    it('renders a month grid and reports selectable dates', () => {
        const onChange = jest.fn();
        const container = render(<Calendar month={new Date(2024, 0, 1)} onChange={onChange} testId="calendar" />);
        const day = container.querySelector('[data-date="2024-01-15"]') as HTMLButtonElement;

        expect(container.querySelector('.angin-calendar__month')?.textContent).toContain('2024');
        expect(container.querySelectorAll('[role="gridcell"]')).toHaveLength(42);
        day.click();
        expect(onChange).toHaveBeenCalledWith(new Date(2024, 0, 15));
    });

    it('disables dates outside the supplied range', () => {
        const container = render(
            <Calendar month={new Date(2024, 0, 1)} minDate={new Date(2024, 0, 10)} maxDate={new Date(2024, 0, 20)} />,
        );

        expect((container.querySelector('[data-date="2024-01-09"]') as HTMLButtonElement).disabled).toBe(true);
        expect((container.querySelector('[data-date="2024-01-15"]') as HTMLButtonElement).disabled).toBe(false);
    });
});
