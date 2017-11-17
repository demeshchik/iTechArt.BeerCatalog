/* eslint-disable no-unused-vars,react/jsx-indent-props,react/no-array-index-key,import/prefer-default-export,react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkItemInStorage } from '../utils/utils';

import Search from '../components/Search/Search';
import TileContainer from '../components/TileContainer/TileContainer';

import loadBeers from '../actions/beerActions';

import '../components/CatalogContainer/Catalog.css';
import '../grid.css';

export function beersHOC(WrappedComponent) {
    class HOCWrappedComponent extends React.Component {
        constructor(props) {
            super(props);

			this.data = {
				queryPath: '',
				page: 0,
			};

			this.searchHandler = this.searchHandler.bind(this);
            this.newResults = this.newResults.bind(this);
            this.loadData = this.loadData.bind(this);
        }

        get HasMore() {
			return this.props.beers.hasMore;
        }

        get Tiles() {
			const thumbnails = this.props.beers.data;
			const tiles = [];

			if (thumbnails && thumbnails.length > 0) {
				thumbnails.forEach((item, index) => {
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

            this.loadData();
        }

        loadData() {
			this.props.beerActions(this.data.queryPath, this.data.page);
        }

		searchHandler(query) {
			this.data = { ...this.data, queryPath: query, page: 1 };
			this.props.beerActions(query, 1);
		}

        render() {
            const newProps = {
                data: this.Tiles,
                hasMore: this.HasMore,
                initialLoading: true,
                loadData: this.newResults,
            };

			return (
				this.props.error ?
                    <span>{this.props.error}</span> :
                    <div className="cl-xl-offset-2 cl-lg-offset-1 cl-xl-6 cl-lg-8 cl-sm-10">
                        <div className="container">
                            <section className="catalog__search container">
                                <Search onSearch={this.searchHandler} />
                            </section>
                        </div>

                        <div className="container">
                            <section className="catalog__inner container">
                                <WrappedComponent {...this.props} {...newProps} />
                            </section>
                        </div>
                    </div>
			);
        }
    }

    function mapStateToProps(state) {
        return {
			beers: state.beers,
			error: state.error,
        };
    }

    function mapDispatchToProps(dispatch) {
        return {
			beerActions: bindActionCreators(loadBeers, dispatch),
        };
    }

    return connect(mapStateToProps, mapDispatchToProps)(HOCWrappedComponent);
}