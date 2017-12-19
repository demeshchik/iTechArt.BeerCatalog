/* eslint-disable prefer-destructuring */
import React from 'react';
import PropTypes from 'prop-types';

import Content from 'Components/Content/Content';
import Tooltip from 'Components/Tooltip/Tooltip';

import './ListItem.css';

export default class ListItem extends React.PureComponent {
    static get propTypes() {
        return {
            class: PropTypes.string,
            type: PropTypes.string,
            header: PropTypes.string,
            data: PropTypes.any.isRequired,
        };
    }
    static get defaultProps() {
        return {
            type: '',
            header: '',
            class: 'list-item',
        };
    }

    get ItemNode() {
        const type = this.props.type;
        switch (type) {
        case 'properties':
            return this.getPrettyProperty();
        case 'food':
            return <Content header={this.props.data} />;
        default:
            return <Content header={this.props.header} data={this.props.data} />;
        }
    }

    getPrettyProperty() {
        const { value, tooltip } = this.props.data;
        const styles = {
            textTransform: 'uppercase',
        };

        return (
            <Content containerStyle="property">
                <span style={styles}>{this.props.header}</span>
                <Tooltip
                    class="property__tooltip"
                    text="info_outline"
                    tooltip={tooltip}
                />
                <span className="label label-default property__value">{value}</span>
            </Content>
        );
    }

    render() {
        return (
            <li className={this.props.class}>
                {this.ItemNode}
            </li>
        );
    }
}