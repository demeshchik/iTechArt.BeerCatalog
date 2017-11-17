/* eslint-disable no-unused-vars,react/jsx-indent-props,react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as favoritesActions from '../actions/favoritesActions';

import '../components/CatalogContainer/Catalog.css';
import '../grid.css';

export function favoritesHOC(WrappedComponent) {
    class HOCWrappedComponent extends React.Component {
        render() {
            const newProps = {
                data: this.props.favorites.data,
                hasMore: this.props.favorites.hasMore,
                loadData: this.props.favoriteActions.loadFavorites,
            };
            return (<WrappedComponent {...this.props} {...newProps} />);
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