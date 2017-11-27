/* eslint-disable react/forbid-prop-types,react/jsx-indent-props,indent,react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../Button/Button';
import Tooltip from '../Tooltip/Tooltip';
import List from '../List/List';
import ListItem from '../List/ListItem';
import Content from '../Content';

import { getArrayMash } from '../../utils/utils';

import { selectBeer } from '../../actions/beerActions';

import '../../grid.css';
import './BeerPage.css';

//TODO: fix logic of ingredients's getter

class BeerPage extends React.Component {

	componentWillMount() {
		const { beerActions, match} = this.props;
		beerActions(match.params.id);
	}

	get Properties() {
		return <Tooltip
			text={<i className="material-icons">info_outline</i>}
			toolip="Hello, man!"
		/>
	}

	get FoodPairings() {
		const foods = [ ...this.props.selectedBeer.beer.food_pairing ];
		let pairs = [];

		foods.forEach((food, index) => {
			pairs.push(<ListItem key={"food-component-" + index}><Content header={food}/></ListItem>);
		});

		return pairs;
	}

	get Method() {
		const method = { ...this.props.selectedBeer.beer.method };
		let mashes = getArrayMash(method.mash_temp);
		let fermentation = `Perfom at ${method.fermentation.temp.value} °C`;
		let twist = method.twist ? method.twist : '';

		return [
			<ListItem key={"method-component-mash"}><Content header="Mash" data={mashes}/></ListItem>,
			<ListItem key={"method-component-fermentation"}><Content header="Fermentation" data={[fermentation]}/></ListItem>,
			<ListItem key={"method-component-twist"}><Content header="Twist" data={[twist]}/></ListItem>,
		];
	}

	get Ingredients() {
		const method = { ...this.props.selectedBeer.beer.ingredients };
		let mashes = getArrayMash(method.mash_temp);
		let fermentation = `Perfom at ${method.fermentation.temp.value} °C`;
		let twist = method.twist ? method.twist : '';

		return [
			<ListItem key={"method-component-mash"}><Content header="Mash" data={mashes}/></ListItem>,
			<ListItem key={"method-component-fermentation"}><Content header="Fermentation" data={[fermentation]}/></ListItem>,
			<ListItem key={"method-component-twist"}><Content header="Twist" data={[twist]}/></ListItem>,
		];
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

					<div className="container">
						<div className="properties cl-xl-5">
							<h4>Properties</h4>

							<div>
								{this.Properties}
							</div>
						</div>

						<div className="food-pairing cl-xl-5">
							<h4>Food Pairing</h4>

							<List>
								{this.FoodPairings}
							</List>
						</div>
					</div>

					<div className="brewing">
						<h3>Brewing</h3>

						<div>{this.props.selectedBeer.beer.brewers_tips}</div>

						<div className="container">
							<div className="ingredients cl-xl-5">
								<h4>Ingredients</h4>


							</div>

							<div className="method cl-xl-5">
								<h4>Method</h4>

								<List>
									{this.Method}
								</List>
							</div>
						</div>
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