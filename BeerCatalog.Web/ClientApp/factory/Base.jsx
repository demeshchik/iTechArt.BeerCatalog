/* eslint-disable react/prop-types,react/prefer-stateless-function,jsx-a11y/click-events-have-key-events */
import React from 'react';

export default class Base extends React.Component {
	render() {
		return (
			<div onClick={this.props.onClick}>
				This is base class which later will be wrapped to HOC
			</div>
		)
	}
}
