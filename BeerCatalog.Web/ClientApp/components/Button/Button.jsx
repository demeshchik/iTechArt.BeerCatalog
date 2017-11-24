import React from 'react';
import PropTypes from 'prop-types';

const Button = props => (
	<button className={"btn " + props.class} onClick={props.onClick}>{props.title}</button>
);

Button.defaultProps = {
	class: '',
};

Button.propTypes = {
	class: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
};

export default Button;