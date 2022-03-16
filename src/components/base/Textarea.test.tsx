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
