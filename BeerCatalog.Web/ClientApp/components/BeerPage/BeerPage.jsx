import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectBeer } from '../../actions/beerActions';

import '../../grid.css';
import './BeerPage.css';

class BeerPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.selectedBeer && this.props.selectedBeer.id !== nextProps.match.params.id)
			this.props.beerActions(nextProps.match.params.id);
	}

	render() {
		return (
			<div className="container">
				<div className="picture">
					In this block we'll see a picture of beer
				</div>
				<div className="wrapper">
					<div className="header">
						<span className="title">Title</span>
						<div className="tagline">Tagline</div>
						<button className="favorite">Favorite button</button>
					</div>
					<div className="description">
						Description!Very big description
					</div>
					<did className="properties">
						Table with props of beer, like ABV or GTA
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