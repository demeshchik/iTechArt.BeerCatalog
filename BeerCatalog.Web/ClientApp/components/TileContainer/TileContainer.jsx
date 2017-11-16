/* eslint-disable react/jsx-indent-props,no-undef,no-alert,class-methods-use-this,react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../Button/Button';

import * as favoritesActions from '../../actions/favoritesActions';

import '../../grid.css';
import './Tile.css';

class TileContainer extends React.PureComponent {
	constructor(props) {
		super(props);

		this.favoriteAction = this.favoriteAction.bind(this);
	}

	openAction() {
		alert('Open button pressed');
	}

	favoriteAction() {
        this.props.favoriteActions.manageFavorites(!this.props.isFavorite, this.props.tile.id);
	}

	render() {
		return (
			<div className="tile cl-xl-3 cl-sm-5 cl-xs">
				<div className="tile__header">
					<img src={this.props.tile.image_url} alt={this.props.tile.name} className="img-responsive" />
				</div>
				<div className="tile__content">
					<h3 className="tile__title">{this.props.tile.name}</h3>
					<span className="tile__tagline">{this.props.tile.tagline}</span>
					<div className="tile__buttons cl-xl-6 cl-lg-10 cl-xs">
						<Button
							onClick={this.openAction}
							title="open"
                            linkStyle="tile__link"
                            buttonStyle="tile__button"
						/>
						<Button
							onClick={this.favoriteAction}
							title={this.props.isFavorite ? 'remove favorite' : 'favorite'}
							linkStyle="tile__link"
							buttonStyle="tile__button"
						/>
					</div>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		favoriteActions: bindActionCreators(favoritesActions, dispatch),
	};
}

export default connect(null, mapDispatchToProps)(TileContainer);

TileContainer.propTypes = {
	isFavorite: PropTypes.bool.isRequired,
	favoriteActions: PropTypes.object.isRequired,
	tile: PropTypes.shape.isRequired,
};