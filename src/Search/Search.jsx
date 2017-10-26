import React from 'react'
import Slider from '../Slider/Slider'
import * as grid from '../grid.css'
import * as styles from './styles.css'

//TODO: Change visual style of sliders

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            slidersQuery: '',
            isAdvanced: false
        };

        this.onSearch = this.onSearch.bind(this);
        this.changeValueInQuery = this.changeValueInQuery.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);
    }

    onSearch(event) {
        if (event.key === 'Enter') {
            let query = event.target.value === '' ? '' : '&beer_name=' + event.target.value;
            this.setState({
                query: query,
                isAdvanced: true
            }, () => {
                this.props.onSearch(this.state.query)
            });
        }
    }

    changeValueInQuery(id, newValue) {
        let checker = false;
        let idReg = new RegExp(id, 'i');
        let paramsArray = this.state.slidersQuery.split('&');
        let paramsString = "";

        paramsArray.forEach(function (item) {
            if (item.search(idReg) !== -1) {
                checker = true;
                item = item.replace(/\d+/, newValue);
            }
            item = item.padStart(item.length + 1, "&");
            paramsString += item;
        });

        let finalString = checker ? paramsString : paramsString + `&${id}_gt=${newValue}`;
        return finalString.substring(1);
    }

    onSliderChange(sliderEvent) {
        let newSlidersQuery = this.changeValueInQuery(sliderEvent.id, sliderEvent.value);
        this.setState({
            slidersQuery: newSlidersQuery
        }, () => {
            this.props.onSearch(this.state.query + this.state.slidersQuery);
        })
    }

    render() {
        return (
            <div className={styles.search}>
                <div className={styles.search__basic}>
                    <input className={styles.search__field + ' ' + grid['cl-xl-3']} type="search" onKeyPress={this.onSearch} placeholder="Search beers..." />
                    <i className={'fa fa-search ' + styles.search__icon} aria-hidden="true"></i>
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