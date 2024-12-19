import React, { ReactNode } from 'react';

export interface Choice {
    value: string;
    label: string;
    disabled?: boolean;
    group?: string;
}

/** Native option/optgroup children also have a deterministic server representation. */
export function collectChoices(children: ReactNode, group?: string, disabled = false): Choice[] {
    const choices: Choice[] = [];
    React.Children.forEach(children, child => {
        if (!React.isValidElement(child)) return;
        if (child.type === 'option') {
            const label = child.props.label ?? React.Children.toArray(child.props.children).join('');
            choices.push({ value: String(child.props.value ?? label), label: String(label),
                disabled: disabled || child.props.disabled, group });
        } else if (child.type === 'optgroup' || child.type === React.Fragment) {
            choices.push(...collectChoices(child.props.children, child.props.label ?? group,
                disabled || child.props.disabled));
        }
    });
    return choices;
}
