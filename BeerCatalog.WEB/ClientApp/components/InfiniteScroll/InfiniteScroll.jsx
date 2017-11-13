/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';

export default class InfiniteScroll extends React.Component {
	constructor(props) {
		super(props);

		this.handleOnScroll = this.handleOnScroll.bind(this);
	}

	componentWillMount() {
		if (this.props.initialLoading) { this.props.loadData(); }
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleOnScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleOnScroll);
	}

	handleOnScroll() {
		if (this.props.hasMore) {
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
				this.props.loadData();
			}
		} else { window.removeEventListener('scroll', this.handleOnScroll); }
	}

	render() {
		return (
			<div className="data-container">
				{this.props.children}
			</div>
		);
	}
}

InfiniteScroll.defaultProps = {
	initialLoading: true,
	hasMore: true,
};

InfiniteScroll.propTypes = {
	initialLoading: PropTypes.bool,
	hasMore: PropTypes.bool,
	children: PropTypes.arrayOf(PropTypes.element).isRequired,
	loadData: PropTypes.func.isRequired,
};