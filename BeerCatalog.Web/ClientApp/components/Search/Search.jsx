import React from 'react';
import PropTypes from 'prop-types';

import Slider from '../Slider/Slider';

import { changeValueInQuery } from '../../utils/utils';

import '../../grid.css';
import './Search.css';

export default class Search extends React.PureComponent {
	constructor(props) {
		super(props);

		this.query = {
			beer_name: '',
			slidersQuery: '',
        };

		this.state = {
			isAdvanced: false,
		};

		this.onQueryHandler = this.onQueryHandler.bind(this);
		this.onSearchHandler = this.onSearchHandler.bind(this);
		this.onSliderHandler = this.onSliderHandler.bind(this);
	}

	static get propTypes() {
		return {
			onSearch: PropTypes.func.isRequired,
		}
	}

	onSearchHandler(event) {
		if (event.key === 'Enter' || event.button === 0) {
			this.setState({
				isAdvanced: true,
			});
			this.props.onSearch(this.Query);
		}
	}

	onSliderHandler(sliderEvent) {
		this.query.slidersQuery = changeValueInQuery(this.query.slidersQuery, sliderEvent.id, sliderEvent.value);
		this.props.onSearch(this.Query + this.query.slidersQuery);
	}

	onQueryHandler(event) {
		this.query.beer_name = event.target.value;
	}

	get Query() {
		return this.query.beer_name === '' ? '' : `&beer_name=${this.query.beer_name}`;
	}

	render() {
		return (
			<div className="search">
				<div className="search__basic">
					<input className="search__field cl-xl-3" type="search" onChange={this.onQueryHandler} onKeyPress={this.onSearchHandler} placeholder="Search beers..." />
					<i className="fa fa-search search__icon" aria-hidden="true" onClick={this.onSearchHandler} />
				</div>

                <div className={this.state.isAdvanced ? "search__advanced" : "disabled"}>
                    <h6 className="search__header">Filter results</h6>
					<Slider
						min="2"
						max="14"
						id="abv"
                        onChange={this.onSliderHandler}
                        nameStyle="cl-xl-5 search__name"
                        sliderStyle="cl-xl-5 search__slider"
						step="1"
						containerStyle="row flexible"
						name="Alcohol by volume"
					/>
					<Slider
						min="0"
						max="120"
						id="ibu"
                        onChange={this.onSliderHandler}
                        nameStyle="cl-xl-5 search__name"
                        sliderStyle="cl-xl-5 search__slider"
						step="1"
						containerStyle="row flexible"
						name="International bitterness units "
					/>
                    <Slider
                        min="4"
                        max="80"
                        id="cbe"
                        onChange={this.onSliderHandler}
                        nameStyle="cl-xl-5 search__name"
                        sliderStyle="cl-xl-5 search__slider"
						step="1"
						containerStyle="row flexible"
						name="Color by EBC"
					/>
				</div>
			</div>
		);
	}
}