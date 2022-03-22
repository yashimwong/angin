import React from 'react';
import { render } from '../../test/render';
import { Select } from './Select';

describe('Select', () => {
    it('renders data-driven options and forwards the selected value', () => {
        const container = render(
            <Select
                id="country"
                label="Country"
                options={[
                    { label: 'Malaysia', value: 'my' },
                    { label: 'Singapore', value: 'sg' },
                ]}
                defaultValue="sg"
            />,
        );
        const select = container.querySelector('select') as HTMLSelectElement;

        expect(select.value).toBe('sg');
        expect(select.options).toHaveLength(2);
        expect(select.options[0].textContent).toBe('Malaysia');
    });
});

 it('Select forwards its native element ref', () => {
    const ref = React.createRef<HTMLSelectElement>();
    const container = render(<Select ref={ref}  />);
    expect(ref.current).toBe(container.querySelector('select'));
 });

it('Select references only rendered descriptions and preserves external descriptions', () => {
    const empty = render(<Select id="empty"  />);
    expect(empty.querySelector('select')?.hasAttribute('aria-describedby')).toBe(false);
    const container = render(<Select id="field"  helperText="Details" aria-describedby="external" />);
    expect(container.querySelector('select')?.getAttribute('aria-describedby')).toBe('external field-description');
});

it('Select generates stable distinct IDs for labels without explicit IDs', () => {
    const container = render(<><Select label="First" helperText="Help" /><Select label="Second" /></>);
    const controls = container.querySelectorAll('select');
    const labels = container.querySelectorAll('label');
    expect(labels[0].htmlFor).toBe(controls[0].id);
    expect(controls[0].id).not.toBe(controls[1].id);
    expect(controls[0].getAttribute('aria-describedby')).toBe(`${controls[0].id}-description`);
});
