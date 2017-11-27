import React from 'react';

import './Tooltip.css';

//TODO: add possibility to custom stylization

export default class Tooltip extends React.Component {
	render() {
		return (
			<span className="tooltip__container">
				{this.props.text}
				<span className="tooltip__body">{this.props.toolip}</span>
			</span>
		)
	}
}