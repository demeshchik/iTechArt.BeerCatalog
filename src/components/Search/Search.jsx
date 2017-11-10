import React from 'react'
import Utils from '../../utils/Utils'
import Slider from '../Slider/Slider'

import * as grid from '../../grid.css'
import * as styles from './search.css'

//TODO: Change visual style of sliders

export default class Search extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            slidersQuery: '',
            isAdvanced: false
        };

        this.queryChange = this.queryChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);
    }


    get Query() {
        return this.state.query === '' ? '' : '&beer_name=' + this.state.query;
    }

    onSearch(event) {
        if (event.key === 'Enter' || event.button === 0) {
            this.setState({
                isAdvanced: true
            });
            this.props.onSearch(this.Query)
        }
    }

    queryChange(event) {
        this.setState({
            query: event.target.value
        })
    }


    onSliderChange(sliderEvent) {
        let newSlidersQuery = Utils.changeValueInQuery(this.state.slidersQuery, sliderEvent.id, sliderEvent.value);

        this.setState({
            slidersQuery: newSlidersQuery
        }, () => {
            this.props.onSearch(this.Query + this.state.slidersQuery);
        })
    }

    render() {
        return (
            <div className={styles.search}>
                <div className={styles.search__basic}>
                    <input className={styles.search__field + ' ' + grid['cl-xl-3']} type="search" onChange={this.queryChange} onKeyPress={this.onSearch} placeholder="Search beers..." />
                    <i className={'fa fa-search ' + styles.search__icon} aria-hidden="true" onClick={this.onSearch}></i>
                </div>

                <div className={this.state.isAdvanced ? styles.search__advanced : styles.disabled}>
                    <h6>Filter results</h6>
                    <Slider min="2"
                            max="14"
                            id="abv"
                            onChange={this.onSliderChange}
                            step="1"
                            containerStyle={styles.search__slider}
                            name="Alcohol by volume" />

                    <Slider min="0"
                            max="120"
                            id="ibu"
                            onChange={this.onSliderChange}
                            step="1"
                            containerStyle={styles.search__slider}
                            name="International bitterness units " />

                    <Slider min="4"
                            max="80"
                            id="cbe"
                            onChange={this.onSliderChange}
                            step="1"
                            containerStyle={styles.search__slider}
                            name="Color by EBC" />
                </div>
            </div>
        )
    }
}