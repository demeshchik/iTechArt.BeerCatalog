import React from 'react';
import PropTypes from 'prop-types';

import List from 'Components/List/List';

import 'AppRoot/grid.css';

export default class Features extends React.PureComponent {
    static get propTypes() {
        return {
            properties: PropTypes.object.isRequired,
            foods: PropTypes.object.isRequired,
        };
    }

    render() {
        return (
            <div className="features">
                <div className="beer-page__properties properties">
                    <div className="properties__section cl-xl-5 cl-xs">
                        <h5>Properties</h5>

                        <List class="cl-xl-8 cl-xs" name="properties" data={this.props.properties} />
                    </div>

                    <div className="properties__pairing pairing cl-xl-5 cl-xs">
                        <h5>Food Pairing</h5>

                        <List class="cl-xl-8 cl-xs" name="food" data={this.props.foods} />
                    </div>
                </div>
            </div>
        );
    }
}