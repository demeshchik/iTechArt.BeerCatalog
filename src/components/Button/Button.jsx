/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

const Button = props => (
	<span className={props.buttonStyle}>
		<a onClick={props.onClick} className={props.linkStyle}>{props.title}</a>
	</span>
);

Button.defaultProps = {
	buttonStyle: '',
	title: '',
	linkStyle: '',
};

Button.propTypes = {
	buttonStyle: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	title: PropTypes.string,
	linkStyle: PropTypes.string,
};

export default Button;