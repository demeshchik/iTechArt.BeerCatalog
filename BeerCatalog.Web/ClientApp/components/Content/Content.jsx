/* eslint-disable react/no-array-index-key,react/forbid-prop-types,react/jsx-indent-props,react/jsx-closing-tag-location */
import React from 'react';
import PropTypes from 'prop-types';

import './Content.css';

export default class Content extends React.Component {
	get Content() {
		let array = [];

		this.props.data.forEach((item, index) => {
			array.push(
				<div key={index}
					 className={this.props.elementStyle}
				>
					{item}
				</div>
			);
		});

		return array.length > 0 ? array : this.props.children;
	}

	render() {
		return (
			<div className={"content " + this.props.containerStyle}>
				{this.props.header.length !== 0 ?
					<h6 className={this.props.headerStyle}>{this.props.header}</h6> :
					''
				}
				{this.Content}
			</div>
		)
	}
}

Content.defaultProps = {
	header: '',
	data: [],
	children: [],
	containerStyle: '',
	headerStyle: 'content__header',
	elementStyle: 'content__item',
};

Content.propTypes = {
	header: PropTypes.string,
	data: PropTypes.arrayOf(PropTypes.string),
	children: PropTypes.array,
	containerStyle: PropTypes.string,
	headerStyle: PropTypes.string,
	elementStyle: PropTypes.string,
};