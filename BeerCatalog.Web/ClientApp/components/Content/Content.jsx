import React from 'react';
import PropTypes from 'prop-types';

import './Content.css';

export default class Content extends React.PureComponent {
    static get propTypes() {
        return {
            header: PropTypes.any,
            data: PropTypes.arrayOf(PropTypes.string),
            children: PropTypes.array,
            containerStyle: PropTypes.string,
            headerStyle: PropTypes.string,
            elementStyle: PropTypes.string,
        };
    }
    static get defaultProps() {
        return {
            header: '',
            data: [],
            children: [],
            containerStyle: '',
            headerStyle: 'content__header',
            elementStyle: 'content__item',
        };
    }

    get Content() {
        let data = [...this.props.data];

        data = data.map((item, index) => {
            return <div key={index} className={this.props.elementStyle}>
                {item}
            </div>
        });

        return data.length > 0 ? data : this.props.children;
    }

    render() {
        return (
            <div className={`content ${this.props.containerStyle}`}>
                {this.props.header.length !== 0
                    ? <h6 className={this.props.headerStyle}>{this.props.header}</h6>
                    : ''
                }
                {this.Content}
            </div>
        );
    }
}