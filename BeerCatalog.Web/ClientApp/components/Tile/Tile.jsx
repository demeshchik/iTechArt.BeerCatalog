/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import 'AppRoot/grid.css';
import 'AppRoot/main.css';
import './Tile.css';

export default class Tile extends React.PureComponent {
    constructor(props) {
        super(props);

        this.favoriteAction = this.favoriteAction.bind(this);
    }

    static get propTypes() {
        return {
            isFavorite: PropTypes.bool.isRequired,
            manageFavorite: PropTypes.func.isRequired,
            tile: PropTypes.object.isRequired,
        };
    }

    favoriteAction() {
        this.props.manageFavorite(!this.props.isFavorite, this.props.tile.id);
    }

    render() {
        return (
            <div className="tile cl-xl-3 cl-sm-5 cl-xs">
                <div className="tile__header">
                    <img src={this.props.tile.image_url} alt={this.props.tile.name} className="img-responsive" />
                </div>
                <div className="tile__content">
                    <h5 className="tile__title">{this.props.tile.name}</h5>
                    <span className="tile__tagline">{this.props.tile.tagline}</span>
                    <div className="tile__buttons">
                        <Link className="btn btn-white btn-simple btn-app" to={`/beers/${this.props.tile.id}`}>Open</Link>
                        <button className="btn btn-white btn-simple btn-app" onClick={this.favoriteAction}>{this.props.isFavorite ? 'remove favorite' : 'favorite'}</button>
                    </div>
                </div>
            </div>
        );
    }
}