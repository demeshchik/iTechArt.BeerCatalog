import React from 'react';
import PropTypes from 'prop-types';

import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import Tile from '../Tile/Tile';

export default class CatalogPage extends React.Component {
	static get propTypes(){
		return {
			manageFavorite: PropTypes.func.isRequired,
			data: PropTypes.array.isRequired,
			loadData: PropTypes.func.isRequired,
			hasMore: PropTypes.bool.isRequired,
		}
	};

	get Tiles() {
		const data = [...this.props.data];
		const tiles = [];

		if (data && data.length > 0) {
			data.forEach((item, index) => {
				tiles.push(<Tile
                    key={index}
					manageFavorite={this.props.manageFavorite}
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