import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../Button/Button';
import Tooltip from '../Tooltip/Tooltip';
import List from '../List/List';
import ListItem from '../ListItem/ListItem';
import Content from '../Content/Content';

import { getArrayMash, getArrayIngredients } from '../../utils/utils';

import { selectBeer } from '../../actions/beerActions';
import { manageFavorites } from '../../actions/favoritesActions';

import '../../grid.css';
import './BeerPage.css';

class BeerPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isFavorite: false,
		};

		this.changeFavoriteValue = this.changeFavoriteValue.bind(this);
	}

	static get propTypes() {
		return {
			beerActions: PropTypes.func.isRequired,
			match: PropTypes.object.isRequired,
			selectedBeer: PropTypes.object.isRequired,
			manageFavorites: PropTypes.func.isRequired,
		}
	}

	componentWillMount() {
		const { beerActions, match} = this.props;
		beerActions(match.params.id);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.selectedBeer.isFavorite !== nextProps.selectedBeer.isFavorite) {
			this.setState({
				isFavorite: nextProps.selectedBeer.isFavorite,
			})
		}
	}

	get Properties() {
		const beer = { ...this.props.selectedBeer.beer };

		return [
			this.getPrettyProperty("ABV", "Alcohol by volume", beer.abv),
			this.getPrettyProperty("IBU", "International bitterness units", beer.ibu),
			this.getPrettyProperty("EBC", "Color by EBC", beer.ebc),
		];
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
		let prettyMethod = {
			mash: getArrayMash(method.mash_temp),
			fermentation: [`Perfom at ${method.fermentation.temp.value} °C`],
			twist: [method.twist ? method.twist : ''],
		};

		return this.getContentArray("method", prettyMethod);
	}

	get Ingredients() {
		const ingredients = { ...this.props.selectedBeer.beer.ingredients };
		let prettyIngredients = getArrayIngredients(ingredients);

		return this.getContentArray("ingredient", prettyIngredients);
	}

	getPrettyProperty(property, tooltip, value) {
		return (
			<ListItem key={"property-component-" + property}>
				<Content containerStyle="property">
					{property}
					<Tooltip
						class="property__tooltip"
						text="info_outline"
						tooltip={tooltip}
					/>
					<span className="label label-default property__value">{value}</span>
				</Content>
			</ListItem>
		);
	}

	getContentArray(component, targetObject) {
		let array = [];

		Object.keys(targetObject).forEach(key => {
			let content = <ListItem key={component + "-component-" + key}><Content header={key} data={targetObject[key]}/></ListItem>;
			array.push(content);
		});

		return array;
	}

	changeFavoriteValue() {
		const beer = this.props.selectedBeer;

        this.props.manageFavorites(!beer.isFavorite, beer.beer.id);

        this.setState({
            isFavorite: !this.state.isFavorite,
        })
	}

	render() {
		return (
			!this.props.selectedBeer.beer ?
			<span>Loading...</span> :
			<div className="cl-xl-7 cl-sm-10 cl-xs cl-xl-offset-1 cl-lg-offset-1">
				<div className="beer-page">
					<div className="beer-page__picture">
						<img className="img-responsive" src={this.props.selectedBeer.beer.image_url} alt={this.props.selectedBeer.beer.name} />
					</div>

					<div className="beer-page__header">
						<h2 className="beer-page__title">{this.props.selectedBeer.beer.name}</h2>
						<div className="beer-page__tagline">{this.props.selectedBeer.beer.tagline}</div>
						<Button onClick={this.changeFavoriteValue}
								title={this.state.isFavorite ? 'remove favorite' : 'add to favorite'}
								class="btn-info"
						/>
					</div>

					<div className="beer-page__description description">
						{this.props.selectedBeer.beer.description}
					</div>

					<div className="beer-page__properties properties">
						<div className="properties__section cl-xl-5 cl-xs">
							<h5>Properties</h5>

							<List class="cl-xl-8 cl-xs">
								{this.Properties}
							</List>
						</div>

						<div className="properties__pairing pairing cl-xl-5 cl-xs">
							<h5>Food Pairing</h5>

							<List class="cl-xl-8 cl-xs">
								{this.FoodPairings}
							</List>
						</div>
					</div>

					<div className="brewing">
						<h3>Brewing</h3>

						<div>{this.props.selectedBeer.beer.brewers_tips}</div>

						<div className="container">
							<div className="ingredients cl-xl-5 cl-xs">
								<h5>Ingredients</h5>

								<List class="cl-xl-8 cl-xs">
									{this.Ingredients}
								</List>
							</div>

							<div className="method cl-xl-5 cl-xs">
								<h5>Method</h5>

								<List class="cl-xl-8 cl-xs">
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
		manageFavorites: bindActionCreators(manageFavorites, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BeerPage);