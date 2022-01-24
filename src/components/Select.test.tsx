import React from 'react';
import { render } from '../test/render';
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
