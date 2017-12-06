import React from 'react';
import PropType from 'prop-types';

import ListItem from '../ListItem/ListItem';

import './List.css';

export default class List extends React.PureComponent {
    static get propTypes() {
        return {
            class: PropType.string,
            name: PropType.string,
            data: PropType.object.isRequired,
        };
    }
    static get defaultProps() {
        return {
            class: '',
            name: '',
        };
    }

    get Nodes() {
        const array = [];
        const targetObject = this.props.data;
        const component = this.props.name;

        Object.keys(targetObject).forEach((key) => {
            const content = <ListItem
                                key={`${component}-component-${key}`}
                                header={key}
                                type={component}
                                data={targetObject[key]} />;

            array.push(content);
        });

        return array;
    }

    render() {
        return (
            <ul className={`list ${this.props.class}`}>
                {this.Nodes}
            </ul>
        );
    }
}