/* eslint-disable no-unused-expressions,react/no-array-index-key,react/jsx-indent-props,no-mixed-spaces-and-tabs,react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll';
import { checkItemInStorage } from '../../utils/utils';
import Search from '../../components/Search/Search';
import Tile from '../../components/Tile/Tile';

import * as beersActions from '../../actions/beerActions';
import * as favoritesActions from '../../actions/favoritesActions';

import './Catalog.css';
import '../../grid.css';

class Catalog extends React.Component {
	constructor(props) {
        super(props);

        this.data = {
            queryPath: '',
			page: 0,
        };

		this.state = {
			isFavorite: false,
		};

		this.searchHandler = this.searchHandler.bind(this);
		this.newResults = this.newResults.bind(this);
		this.loadData = this.loadData.bind(this);
	}

	componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.setState({
                isFavorite: !this.state.isFavorite,
            });

            this.data.page = 1;
            this.loadData();
		}
	}

	get Tiles() {
		const thumbnails = this.state.isFavorite ? this.props.favorites.data : this.props.beers.data;
		const tiles = [];

		if (thumbnails && thumbnails.length > 0) {
			thumbnails.forEach((item, index) => {
				const isFavorite = checkItemInStorage('favorites', item.id);
				tiles.push(<Tile
					key={index}
					favoriteHandler={event => this.props.favoriteActions.manageFavorites(event.value, event.id)}
					isFavorite={isFavorite}
					tile={item}
				/>);
			});
		}

		return tiles;
	}

	get HasMore() {
		return this.state.isFavorite ? this.props.favorites.hasMore : this.props.beers.hasMore;
	}

	loadData() {
		const props = { ...this.props };
		this.state.isFavorite ? props.favoriteActions.loadFavorites(this.data.page) : props.beerActions.loadBeers(this.data.queryPath, this.data.page);
	}

    searchHandler(query) {
        this.data = { ...this.data, queryPath: query, page: 1 };
		this.props.beerActions.loadBeers(query, 1);
	}

    newResults() {
        this.data.page = this.data.page + 1;

		this.loadData();
	}

	render() {
		return (
			this.props.error ?
				<span>{this.props.error}</span> :
				<div className="cl-xl-offset-2 cl-lg-offset-1 cl-xl-6 cl-lg-8 cl-sm-10">
					<div className="container">
						{this.state.isFavorite ?
							'' :
							<section className="catalog__search container">
								<Search onSearch={this.searchHandler} />
							</section>
						}
					</div>

					<div className="container">
						<section className="catalog__inner container">
							<InfiniteScroll
  								initialLoading
								loadData={this.newResults}
								hasMore={this.HasMore}
							>
								{this.Tiles}
							</InfiniteScroll>
						</section>
					</div>
				</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		favorites: state.favorites,
		beers: state.beers,
		error: state.error,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		beerActions: bindActionCreators(beersActions, dispatch),
		favoriteActions: bindActionCreators(favoritesActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);

Catalog.defaultProps = {
	error: '',
};

Catalog.propTypes = {
	location: PropTypes.object.isRequired,
	favorites: PropTypes.object.isRequired,
	beers: PropTypes.object.isRequired,
	favoriteActions: PropTypes.object.isRequired,
	beerActions: PropTypes.object.isRequired,
	error: PropTypes.string,
};