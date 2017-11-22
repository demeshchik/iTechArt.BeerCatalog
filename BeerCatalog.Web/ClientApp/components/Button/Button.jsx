import React from 'react';
import PropTypes from 'prop-types';

import '../../main.css';

const Button = props => (
	<button className="btn btn-white btn-simple btn-app" onClick={props.onClick}>{props.title}</button>
);

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
};

export default Button;