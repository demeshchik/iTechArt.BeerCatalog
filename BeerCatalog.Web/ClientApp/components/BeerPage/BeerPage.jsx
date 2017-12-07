import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectBeer } from 'AppRoot/actions/beerActions';
import { manageFavorites } from 'AppRoot/actions/favoritesActions';

import Brewing from './components/Brewing';
import Features from './components/Features';

import Mappers from 'AppRoot/utils/mappers';

import 'AppRoot/grid.css';
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
        };
    }

    componentWillMount() {
        const { beerActions, match } = this.props;
        beerActions(match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedBeer.isFavorite !== nextProps.selectedBeer.isFavorite) {
            this.setState({
                isFavorite: nextProps.selectedBeer.isFavorite,
            });
        }
    }

    get Properties() {
        const beer = { ...this.props.selectedBeer.beer };

        return Mappers.properties(beer);
    }

    get FoodPairings() {
        const foodPairing = [...this.props.selectedBeer.beer.food_pairing];

        return Mappers.food(foodPairing);
    }

    get Method() {
        const method = { ...this.props.selectedBeer.beer.method };

        return Mappers.method(method);
    }

    get Ingredients() {
        const ingredients = { ...this.props.selectedBeer.beer.ingredients };

        return Mappers.ingredients(ingredients);
    }

    changeFavoriteValue() {
        const beer = this.props.selectedBeer;

        this.props.manageFavorites(!beer.isFavorite, beer.beer.id);

        this.setState({
            isFavorite: !this.state.isFavorite,
        });
    }

    render() {
        return (
            !this.props.selectedBeer.beer
                ? <span>Loading...</span>
                : <div className="cl-xl-7 cl-sm-10 cl-xs cl-xl-offset-1 cl-lg-offset-1">
                    <div className="beer-page">
                        <div className="beer-page__picture">
                            <img className="img-responsive" src={this.props.selectedBeer.beer.image_url} alt={this.props.selectedBeer.beer.name} />
                        </div>

                        <div className="beer-page__header">
                            <h2 className="beer-page__title">{this.props.selectedBeer.beer.name}</h2>
                            <div className="beer-page__tagline">{this.props.selectedBeer.beer.tagline}</div>
                            <button className="btn btn-info" onClick={this.changeFavoriteValue}>{this.state.isFavorite ? 'remove favorite' : 'add to favorite'}</button>
                        </div>

                        <div className="beer-page__description description">
                            {this.props.selectedBeer.beer.description}
                        </div>

                        <Features
                            properties={this.Properties}
                            foods={this.FoodPairings}
                        />

                        <Brewing
                            tips={this.props.selectedBeer.beer.brewers_tips}
                            ingredients={this.Ingredients}
                            method={this.Method}
                        />
                    </div>
                </div>
        );
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