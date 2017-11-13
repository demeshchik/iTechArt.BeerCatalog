/* eslint-disable react/jsx-indent-props,no-undef,no-alert,class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import * as grid from '../../grid.css';
import * as styles from './tile.css';

//  TODO: re-edit this component => stateless component && deal with newProps{isFavorite}

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
			<div className={`${styles.tile} ${grid['cl-xl-3']} ${grid['cl-sm-5']} ${grid['cl-xs']}`}>
				<div className={styles.tile__header}>
					<img src={this.props.tile.image_url} alt={this.props.tile.name} className={grid['img-responsive']} />
				</div>
				<div className={styles.tile__content}>
					<h3 className={styles.tile__title}>{this.props.tile.name}</h3>
					<span className={styles.tile__tagline}>{this.props.tile.tagline}</span>
					<div className={`${styles.tile__buttons} ${grid['cl-xl-6']} ${grid['cl-lg-10']} ${grid['cl-xs']}`}>
						<Button
							onClick={this.openAction}
							title="open"
							linkStyle={styles.tile__link}
							buttonStyle={styles.tile__button}
						/>
						<Button
							onClick={this.favoriteAction}
							title={this.state.isFavorite ? 'remove favorite' : 'favorite'}
							linkStyle={styles.tile__link}
							buttonStyle={styles.tile__button}
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