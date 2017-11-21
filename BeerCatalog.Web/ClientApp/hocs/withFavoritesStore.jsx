/* eslint-disable no-unused-vars,react/jsx-indent-props,react/prop-types,import/prefer-default-export,no-underscore-dangle,no-plusplus */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as favoritesActions from '../actions/favoritesActions';

import '../grid.css';

export function withFavoritesStore(WrappedComponent) {
    class HOCWrappedComponent extends React.Component {
		constructor(props) {
			super(props);

			this.page = 0;

			this.loadNewData = this.loadNewData.bind(this);
		}

        loadNewData() {
            this.page++;
            this.props.favoriteActions.loadFavorites(this.page);
        }

        render() {
            const newProps = {
                data: this.props.favorites.data,
                hasMore: this.props.favorites.hasMore,
                loadData: this.loadNewData,
            };

            return (
                <div className="container">
                    <section className="catalog__inner container">
                        <WrappedComponent {...this.props} {...newProps} />
                    </section>
                </div>
            );
        }
    }

    function mapStateToProps(state) {
        return {
            favorites: state.favorites,
        };
    }

    function mapDispatchToProps(dispatch) {
        return {
            favoriteActions: bindActionCreators(favoritesActions, dispatch),
        };
    }

    return connect(mapStateToProps, mapDispatchToProps)(HOCWrappedComponent);
}