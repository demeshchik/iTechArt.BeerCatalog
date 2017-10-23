import React from 'react'
import Search from '../Search/Search'
import Tile from '../Tile/Tile'
import * as styles from './styles.css'
import * as grid from  '../grid.css'

export default class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            results: []
        };

        this.prevResults = this.prevResults.bind(this);
        this.nextResults = this.nextResults.bind(this);
        this.getBeers = this.getBeers.bind(this);
    }

    getBeers(page) {
        let self = this;
        let xhr = new XMLHttpRequest();
        let path = 'https://api.punkapi.com/v2/beers/?page=' + page + '&per_page=9';

        xhr.open('get', path, true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 400) {
                    alert(xhr.status + " " + xhr.statusText);
                } else {
                    self.setState({
                        page: page,
                        results: JSON.parse(xhr.responseText)
                    })
                }
            }
        }
    }

    prevResults() {
        this.getBeers(this.state.page - 1);
    }

    nextResults() {
        this.getBeers(this.state.page + 1);
    }

    componentDidMount() {
        this.getBeers(this.state.page);
    }

    render() {
        let tiles = [];

        this.state.results.forEach((item, index) => {
            tiles.push(<Tile key={index} tile={item} />)
        });

        return (
            <div className={grid['cl-xl-offset-2'] + ' '  +  grid['cl-lg-offset-1'] + " " + grid['cl-xl-6'] + ' ' + grid['cl-lg-8'] + ' ' + grid['cl-sm-10']}>

                <div className={grid.container}>
                    <section className={styles.catalog__search + ' ' + grid.container}>
                        <Search />
                    </section>
                </div>

                <div className={grid.container}>
                    <section className={styles.catalog__inner  + ' ' + grid.container + ' ' + grid['container-masonry-sm']}>
                        {tiles}
                    </section>
                </div>

            </div>
        )
    }
}