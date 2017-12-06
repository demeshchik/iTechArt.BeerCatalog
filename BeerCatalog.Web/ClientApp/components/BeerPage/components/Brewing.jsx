import React from 'react';
import PropTypes from 'prop-types';

import List from '../../List/List';

import 'AppRoot/grid.css';

export default class Brewing extends React.PureComponent {
	static get propTypes() {
		return {
			tips: PropTypes.string.isRequired,
			ingredients: PropTypes.object.isRequired,
			method: PropTypes.object.isRequired,
		}
	}

	render() {
		return (
			<div className="brewing">
				<h3>Brewing</h3>

				<div>{this.props.tips}</div>

				<div className="container">
					<div className="ingredients cl-xl-5 cl-xs">
						<h5>Ingredients</h5>

						<List class="cl-xl-8 cl-xs" name="ingredients" data={this.props.ingredients} />
					</div>

					<div className="method cl-xl-5 cl-xs">
						<h5>Method</h5>

						<List class="cl-xl-8 cl-xs" name="method" data={this.props.method} />
					</div>
				</div>
			</div>
		);
	}
}