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

it('opens the default selected month', () => {
    const c = render(<Calendar defaultValue={new Date(2001, 3, 12)} />);
    expect(c.querySelector('.angin-calendar__month')?.textContent).toBe('April 2001');
});

it('includes a boundary date regardless of its time', () => {
    const c = render(
        <Calendar
            month={new Date(2001, 3, 1)}
            minDate={new Date(2001, 3, 12, 18)}
            maxDate={new Date(2001, 3, 12, 19)}
        />,
    );
    expect((c.querySelector('[data-date="2001-04-12"]') as HTMLButtonElement).disabled).toBe(false);
});

it('localizes weekday headings', () => {
    const c = render(<Calendar locale="fr-FR" />);
    expect(c.querySelector('.angin-calendar__weekdays')?.textContent).toContain('lun.');
});

it('supports a Monday week start', () => {
    const c = render(<Calendar month={new Date(2023, 0, 1)} weekStartsOn={1} />);
    expect(c.querySelector('.angin-calendar__weekdays span')?.textContent).toBe('Mon');
    expect(c.querySelector('[data-date]')?.getAttribute('data-date')).toBe('2022-12-26');
});
