/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

//TODO: check logic of conditional rendering

export default class Content extends React.Component {
	get Content() {
		let array = [];

		this.props.data.forEach((item, index) => {
			array.push(<div key={index}>{item}</div>);
		});

		return array;
	}

	render() {
		return (
			<div>
				<h6>{this.props.header}</h6>
				{this.Content}
			</div>
		)
	}
}

Content.defaultProps = {
	data: [],
};

Content.propTypes = {
	header: PropTypes.string.isRequired,
	data: PropTypes.arrayOf(PropTypes.string),
};