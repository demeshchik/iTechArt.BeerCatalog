/* eslint-disable react/forbid-prop-types,react/jsx-indent-props,indent */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../Button/Button';
import List from '../List/List';
import ListItem from '../List/ListItem';

import { selectBeer } from '../../actions/beerActions';

import '../../grid.css';
import './BeerPage.css';

class BeerPage extends React.Component {
	constructor(props) {
		super(props);
	}

	get Components(){
		let selectedBeer = this.props.selectedBeer.beer;
		return selectedBeer ? (
			<List>
				<ListItem>
					<span>{selectedBeer.abv}</span>
				</ListItem>
				<ListItem>
					<span>{selectedBeer.ibu}</span>
				</ListItem>
			</List>
			) :
			''
	}

	componentWillMount() {
		const { beerActions, match} = this.props;
		beerActions(match.params.id);
	}

	render() {
		return (
			!this.props.selectedBeer.beer ?
			<span>Loading...</span> :
			<div className="cl-xl-8 cl-xs cl-xl-offset-1 cl-lg-offset-1">
				<div>
					<div className="header">
						<h2 className="beer-page__title">{this.props.selectedBeer.beer.name}</h2>
						<div className="tagline">{this.props.selectedBeer.beer.tagline}</div>
						<Button onClick={() => alert("Hello")}
								title="Add to Favorite"
								class="btn-info"
						/>
					</div>
					<div className="description">
						{this.props.selectedBeer.beer.description}
					</div>
					<did className="properties">
						Like.. You know, this place for components, like.. Idk, fuck it
						{this.Components}
					</did>
					<did className="proposals">
						Table with food proposals, like pizza or chips
					</did>
					<div className="brewing">
						In this section we'll see all info about brewing process
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		selectedBeer: state.beers.selectedBeer,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		beerActions: bindActionCreators(selectBeer, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BeerPage);

BeerPage.propTypes = {
	beerActions: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
	selectedBeer: PropTypes.object.isRequired,
};