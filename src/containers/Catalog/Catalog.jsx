/* eslint-disable no-unused-expressions,react/no-array-index-key,react/jsx-indent-props,no-mixed-spaces-and-tabs,react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll';
import Utils from '../../utils/Utils';
import Search from '../../components/Search/Search';
import Tile from '../../components/Tile/Tile';

import * as beersActions from '../../actions/beerActions';
import * as favoritesActions from '../../actions/favoritesActions';

import * as styles from './catalog.css';
import * as grid from '../../grid.css';

class Catalog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			queryPath: '',
			page: 0,
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
				page: 1,
			}, () => {
				this.loadData();
			});
		}
	}

	// shouldComponentUpdate(nextProps) {
	//    return this.props !== nextProps;
	// }

	get Tiles() {
		const thumbnails = this.state.isFavorite ? this.props.favorites.data : this.props.beers.data;
		const tiles = [];

		if (thumbnails && thumbnails.length > 0) {
			thumbnails.forEach((item, index) => {
				const isFavorite = Utils.checkItemInStorage('favorites', item.id);
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
		this.state.isFavorite ? props.favoriteActions.loadFavorites(this.state.page) : props.beerActions.loadBeers(this.state.queryPath, this.state.page);
	}

	searchHandler(query) {
		this.setState({
			queryPath: query,
			page: 1,
		}, () => this.props.beerActions.loadBeers(query, 1));
	}

	newResults() {
		this.setState({
			page: this.state.page + 1,
		}, () => {
			this.loadData();
		});
	}

	render() {
		return (
			this.props.error ?
				<span>{this.props.error}</span> :
				<div className={`${grid['cl-xl-offset-2']} ${grid['cl-lg-offset-1']} ${grid['cl-xl-6']} ${grid['cl-lg-8']} ${grid['cl-sm-10']}`}>
					<div className={grid.container}>
						{this.state.isFavorite ?
							'' :
							<section className={`${styles.catalog__search} ${grid.container}`}>
								<Search onSearch={this.searchHandler} />
							</section>
						}
					</div>

					<div className={grid.container}>
						<section className={`${styles.catalog__inner} ${grid.container}`}>
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