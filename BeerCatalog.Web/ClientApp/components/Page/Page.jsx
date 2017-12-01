/* eslint-disable react/forbid-prop-types,react/no-array-index-key,react/jsx-indent-props*/
import React from 'react';
import PropTypes from 'prop-types';

import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import TileContainer from '../TileContainer/TileContainer';

export default class Page extends React.Component {
	get Tiles() {
		const data = [...this.props.data];
		const tiles = [];

		if (data && data.length > 0) {
			data.forEach((item, index) => {
				tiles.push(<TileContainer
                    key={index}
                    isFavorite={item.isFavorite}
				    tile={item.beer}
				/>);
			});
		}

		return tiles;
	}

    render() {
		const props = {
			hasMore: this.props.hasMore,
			initialLoading: true,
			loadData: this.props.loadData,
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