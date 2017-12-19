import React from 'react';
import PropTypes from 'prop-types';

import InfiniteScroll from 'Components/InfiniteScroll/InfiniteScroll';
import Tile from 'Components/Tile/Tile';

export default class CatalogPage extends React.Component {
    static get propTypes() {
        return {
            manageFavorite: PropTypes.func.isRequired,
            data: PropTypes.array.isRequired,
            loadData: PropTypes.func.isRequired,
            hasMore: PropTypes.bool.isRequired,
        };
    }

    get Tiles() {
        let data = [...this.props.data];

        if (data && data.length > 0) {
            data = data.map((item, index) => {
                return <Tile
                    key={index}
                    manageFavorite={this.props.manageFavorite}
                    isFavorite={item.isFavorite}
                    tile={item.beer}
                />
            });

            return data;
        }

        return [];
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
        );
    }
}