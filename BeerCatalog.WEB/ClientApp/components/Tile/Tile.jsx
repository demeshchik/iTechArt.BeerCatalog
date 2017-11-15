/* eslint-disable react/jsx-indent-props,no-undef,no-alert,class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import '../../grid.css';
import './Tile.css';

export default class Tile extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isFavorite: props.isFavorite,
		};

		this.favoriteAction = this.favoriteAction.bind(this);
	}

	componentWillReceiveProps(newProps) {
		if (newProps.isFavorite !== this.state.isFavorite) {
			this.setState({
				isFavorite: !this.state.isFavorite,
			});
		}
	}

	openAction() {
		alert('Open button pressed');
	}

	favoriteAction() {
		this.setState({
			isFavorite: !this.state.isFavorite,
		}, () => {
			this.props.favoriteHandler({ id: this.props.tile.id, value: this.state.isFavorite });
		});
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
							title={this.state.isFavorite ? 'remove favorite' : 'favorite'}
							linkStyle="tile__link"
							buttonStyle="tile__button"
						/>
					</div>
				</div>
			</div>
		);
	}
}

Tile.propTypes = {
	isFavorite: PropTypes.bool.isRequired,
	favoriteHandler: PropTypes.func.isRequired,
	tile: PropTypes.shape.isRequired,
};