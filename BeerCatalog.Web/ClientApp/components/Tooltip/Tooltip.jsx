import React from 'react';
import PropTypes from 'prop-types';

import './Tooltip.css';

//TODO: add possibility to custom stylization

export default class Tooltip extends React.Component {
	render() {
		return (
			<span className={"tooltip__container " + this.props.class}>
				<i className="material-icons tooltip__icon">{this.props.text}</i>
				<span className="tooltip__body">{this.props.tooltip}</span>
			</span>
		)
	}
}

Tooltip.defaultProps = {
	class: '',
};

Tooltip.propTypes = {
	text: PropTypes.string.isRequired,
	tooltip: PropTypes.string.isRequired,
	class: PropTypes.string,
};