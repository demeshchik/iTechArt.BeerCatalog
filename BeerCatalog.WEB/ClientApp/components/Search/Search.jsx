/* eslint-disable react/jsx-indent-props */
import React from 'react';
import PropTypes from 'prop-types';

import Utils from '../../utils/Utils';
import Slider from '../Slider/Slider';

import * as grid from '../../grid.css';
import * as styles from './search.css';

//  TODO: Change visual style of sliders

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

		this.queryChange = this.queryChange.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onSliderChange = this.onSliderChange.bind(this);
	}

	onSearch(event) {
		if (event.key === 'Enter' || event.button === 0) {
			this.setState({
				isAdvanced: true,
			});
			this.props.onSearch(this.Query);
		}
	}

	onSliderChange(sliderEvent) {
		this.query.slidersQuery = Utils.changeValueInQuery(this.query.slidersQuery, sliderEvent.id, sliderEvent.value);
		this.props.onSearch(this.Query + this.query.slidersQuery);
	}

	get Query() {
		return this.query.beer_name === '' ? '' : `&beer_name=${this.query.beer_name}`;
	}

	queryChange(event) {
		this.query.beer_name = event.target.value;
	}

	render() {
		return (
			<div className={styles.search}>
				<div className={styles.search__basic}>
					<input className={`${styles.search__field} ${grid['cl-xl-3']}`} type="search" onChange={this.queryChange} onKeyPress={this.onSearch} placeholder="Search beers..." />
					<i className={`fa fa-search ${styles.search__icon}`} aria-hidden="true" onClick={this.onSearch} />
				</div>

				<div className={this.state.isAdvanced ? styles.search__advanced : styles.disabled}>
					<h6>Filter results</h6>
					<Slider
						min="2"
						max="14"
						id="abv"
                        onChange={this.onSliderChange}
                        nameStyle={`${grid['cl-xl-5']} ${styles.search__name}`}
                        sliderStyle={`${grid['cl-xl-5']} ${styles.search__slider}`}
						step="1"
						containerStyle={grid.row}
						name="Alcohol by volume"
					/>
					<Slider
						min="0"
						max="120"
						id="ibu"
                        onChange={this.onSliderChange}
                        nameStyle={`${grid['cl-xl-5']} ${styles.search__name}`}
                        sliderStyle={`${grid['cl-xl-5']} ${styles.search__slider}`}
						step="1"
						containerStyle={grid.row}
						name="International bitterness units "
					/>
					<Slider
						min="4"
						max="80"
						id="cbe"
                        onChange={this.onSliderChange}
                        nameStyle={`${grid['cl-xl-5']} ${styles.search__name}`}
                        sliderStyle={`${grid['cl-xl-5']} ${styles.search__slider}`}
						step="1"
						containerStyle={grid.row}
						name="Color by EBC"
					/>
				</div>
			</div>
		);
	}
}

Search.propTypes = {
	onSearch: PropTypes.func.isRequired,
};