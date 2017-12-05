import React from 'react';
import PropTypes from 'prop-types';

export default class InfiniteScroll extends React.Component {
	constructor(props) {
		super(props);

		this.onScrollHandler = this.onScrollHandler.bind(this);
	}

	static get propTypes() {
		return {
			initialLoading: PropTypes.bool,
			hasMore: PropTypes.bool,
			children: PropTypes.arrayOf(PropTypes.element).isRequired,
			loadData: PropTypes.func.isRequired,
		}
	}
	static get defaultProps() {
		return {
			initialLoading: true,
			hasMore: true,
		}
	}

	componentWillMount() {
		if (this.props.initialLoading) {
			this.props.loadData();
		}
	}

	componentDidMount() {
		window.addEventListener('scroll', this.onScrollHandler);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScrollHandler);
	}

	onScrollHandler() {
		if (this.props.hasMore) {
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
				this.props.loadData();
			}
		} else {
			window.removeEventListener('scroll', this.onScrollHandler);
		}
	}

	render() {
		return (
			<div className="data-container">
				{this.props.children}
			</div>
		);
	}
}