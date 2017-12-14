/**
 * This file is part of form4react which is released under MIT license.
 *
 * The LICENSE file can be found in the root directory of this project.
 *
 * @flow
 */

import React, { Component } from 'react';
import type { FormData } from './form';
import './DisplayValues.css';
import { __forEach } from './form/Form-classes';

const sanitize = (str: string): string => {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

const htmlForObject = (o: { [string]: mixed }): string => {
    let result = '<p>{</p><div class="ml-3"><p>';
    let firstValue = true;
    __forEach(o, (value: mixed, key: string) => {
        if (value !== undefined) {
            if (!firstValue) {
                result += ',</p><p>';
            } else {
                firstValue = false;
            }
            result += `<span class="prop">${key}</span>: `;
            if (value === null) {
                result += '<span class="null">null</span>';
                return;
            }
            switch (typeof value) {
                case 'string':
                    result += `<span class="string">"${sanitize(value)}"</span>`;
                    return;
                case 'boolean':
                    result += `<span class="boolean">${String(value)}</span>`;
                    return;
                case 'number':
                    result += `<span class="number">${value}</span>`;
                    return;
                default:
                    result += sanitize(JSON.stringify(value));
            }
        }
    });
    result += '</p></div>}';
    return result;
};

export default class DisplayValues extends Component<{ data: FormData<Object> }> {
    render(): React$Node {
        return (
            <pre>
                <code dangerouslySetInnerHTML={{ __html: htmlForObject(this.props.data.values) }} />
            </pre>
        );
    }
}