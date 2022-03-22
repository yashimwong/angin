import React from 'react';
import { render } from '../../test/render';
import { Textarea } from './Textarea';

describe('Textarea', () => {
    it('renders a labelled multiline control with helper text', () => {
        const container = render(<Textarea id="notes" label="Notes" helperText="Keep it brief" rows={4} />);
        const textarea = container.querySelector('textarea');

        expect(textarea?.getAttribute('aria-describedby')).toBe('notes-description');
        expect(textarea?.getAttribute('rows')).toBe('4');
        expect(container.querySelector('.angin-field__message')?.textContent).toBe('Keep it brief');
    });
});

 it('Textarea forwards its native element ref', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    const container = render(<Textarea ref={ref}  />);
    expect(ref.current).toBe(container.querySelector('textarea'));
 });

it('Textarea references only rendered descriptions and preserves external descriptions', () => {
    const empty = render(<Textarea id="empty"  />);
    expect(empty.querySelector('textarea')?.hasAttribute('aria-describedby')).toBe(false);
    const container = render(<Textarea id="field"  helperText="Details" aria-describedby="external" />);
    expect(container.querySelector('textarea')?.getAttribute('aria-describedby')).toBe('external field-description');
});

it('Textarea generates stable distinct IDs for labels without explicit IDs', () => {
    const container = render(<><Textarea label="First" helperText="Help" /><Textarea label="Second" /></>);
    const controls = container.querySelectorAll('textarea');
    const labels = container.querySelectorAll('label');
    expect(labels[0].htmlFor).toBe(controls[0].id);
    expect(controls[0].id).not.toBe(controls[1].id);
    expect(controls[0].getAttribute('aria-describedby')).toBe(`${controls[0].id}-description`);
});
