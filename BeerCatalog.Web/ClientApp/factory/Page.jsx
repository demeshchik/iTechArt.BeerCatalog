/* eslint-disable react/forbid-prop-types,react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import InfiniteScroll from '../components/InfiniteScroll/InfiniteScroll';
import TileContainer from '../components/TileContainer/TileContainer';

import { checkItemInStorage } from '../utils/utils';

export default class Page extends React.Component {
    constructor(props) {
        super(props);

		this.data = {
			page: 0,
		};

		this.newResults = this.newResults.bind(this);
    }

	get Tiles() {
		const data = [...this.props.data];
		const tiles = [];

		if (data && data.length > 0) {
			data.forEach((item, index) => {
				const isFavorite = checkItemInStorage('favorites', item.id);
				tiles.push(<TileContainer
					  key={index}
					  isFavorite={isFavorite}
					  tile={item}
				/>);
			});
		}

		return tiles;
	}

	newResults() {
		this.data.page = this.data.page + 1;

		this.props.loadData(this.data.page);
	}

    render() {
		const props = {
			hasMore: this.props.hasMore,
			initialLoading: true,
			loadData: this.newResults,
		};

        return (
			<InfiniteScroll {...props}>
				{this.Tiles}
			</InfiniteScroll>
		)
    }
}

Page.propTypes = {
	data: PropTypes.array.isRequired,
	loadData: PropTypes.func.isRequired,
	hasMore: PropTypes.bool.isRequired,
};