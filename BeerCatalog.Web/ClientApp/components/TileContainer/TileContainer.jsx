/* eslint-disable react/jsx-indent-props,jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../Button/Button';

import { manageFavorites } from '../../actions/favoritesActions';

import '../../grid.css';
import '../../main.css';
import './Tile.css';

class TileContainer extends React.PureComponent {
	constructor(props) {
		super(props);

		this.favoriteAction = this.favoriteAction.bind(this);
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
						<Link className="btn btn-white btn-simple btn-app" to={"/beers/" + this.props.tile.id}>Open</Link>
						<Button
                            onClick={this.favoriteAction}
							class="btn-white btn-simple btn-app"
                            title={this.props.isFavorite ? 'remove favorite' : 'favorite'}
						/>
					</div>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
        manageFavorite: bindActionCreators(manageFavorites, dispatch),
	};
}

export default connect(null, mapDispatchToProps)(TileContainer);

TileContainer.propTypes = {
	isFavorite: PropTypes.bool.isRequired,
    manageFavorite: PropTypes.func.isRequired,
	tile: PropTypes.shape.isRequired,
};