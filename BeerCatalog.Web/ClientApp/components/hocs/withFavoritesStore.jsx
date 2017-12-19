import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as favoritesActions from 'AppRoot/actions/favoritesActions';

import 'AppRoot/grid.css';

export function withFavoritesStore(WrappedComponent) {
    class HOCWrappedComponent extends React.Component {
        constructor(props) {
            super(props);

            this.page = 0;

            this.loadNewData = this.loadNewData.bind(this);
        }

        static get propTypes() {
            return {
                favoriteActions: PropTypes.object.isRequired,
                favorites: PropTypes.object.isRequired,
            };
        }

        loadNewData() {
            this.page++;
            this.props.favoriteActions.loadFavorites(this.page);
        }

        render() {
            const newProps = {
                manageFavorite: this.props.favoriteActions.manageFavorites,
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