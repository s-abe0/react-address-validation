import React, { Component } from 'react';
import { getSuggestions } from '../service/SmartyStreets';
import AsyncSelect from 'react-select/async';

export default class DropDownSelect extends Component {
    state = { inputValue: '' };

    handleInputChange = (newValue) => {
        this.setState({ newValue });
        return newValue;
    };

    loadOptions = (inputValue, callback) => {
        if(!inputValue) {
            callback([]);
            return;
        };

        getSuggestions(inputValue, (result) => {
            callback(result.map(address => {
                return {
                    value: address.text,
                    label: address.text
                };
            }));
        });
    }

    render() {
        return (
            <div className="input">
                <AsyncSelect
                    loadOptions={this.loadOptions}
                    defaultOptions
                    onInputChange={this.handleInputChange}
                />
            </div>
        );
    }
}
