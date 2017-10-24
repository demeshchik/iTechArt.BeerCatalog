import React from 'react'
import Slider from '../Slider/Slider'
import * as grid from '../grid.css'
import * as styles from './styles.css'

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdvanced: true
        };

        this.onSliderChange = this.onSliderChange.bind(this);
    }

    onSliderChange(event) {
        this.props.onSearch(event);
    }

    render() {
        return (
            <div className={styles.search}>
                <div className={styles.search__basic}>
                    <input className={styles.search__field + ' ' + grid['cl-xl-3']} type="search" placeholder="Search beers..." />
                    <i className={'fa fa-search ' + styles.search__icon} aria-hidden="true"></i>
                </div>

                <div className={this.state.isAdvanced ? styles.search__advanced : styles.disabled}>
                    <h6>Filter results</h6>
                    <Slider min="2"
                            max="14"
                            onChange={this.onSliderChange}
                            step="0.1"
                            containerStyle={styles.search__slider}
                            name="Alcohol by volume" />

                    <Slider min="0"
                            max="120"
                            onChange={this.onSliderChange}
                            step="1"
                            containerStyle={styles.search__slider}
                            name="International bitterness units " />

                    <Slider min="4"
                            max="80"
                            onChange={this.onSliderChange}
                            step="1"
                            containerStyle={styles.search__slider}
                            name="Color by EBC" />
                </div>
            </div>
        )
    }
}