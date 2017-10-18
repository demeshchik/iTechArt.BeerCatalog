import React from 'react'
import Tile from '../Tile/Tile'
import * as styles from './styles.css'
import * as grid from  '../grid.css'

export default class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            results: ""
        };

        this.prevResults = this.prevResults.bind(this);
        this.nextResults = this.nextResults.bind(this);
        this.getBeers = this.getBeers.bind(this);
    }

    getBeers(page) {
        let self = this;
        let xhr = new XMLHttpRequest();
        let path = 'https://api.punkapi.com/v2/beers/' + page;

        xhr.open('get', path, true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 400) {
                    alert(xhr.status + " " + xhr.statusText);
                } else {
                    self.setState({
                        page: page,
                        results: JSON.stringify(JSON.parse(xhr.responseText), null, 4)
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
        //this.getBeers(this.state.page);
    }

    render() {
        let tiles = [];

        for (let i = 0; i < 10; i++) {
            tiles.push(<Tile key={i} />)
        }

        return (
            <div className={grid['cl-md-offset-1'] + " " + grid['cl-md-8']}>

                <div className={grid.row}>
                    <section>
                        This is placeholder for search box
                    </section>
                </div>

                <div className={grid.row}>
                    <section className={styles.catalog_inner}>
                        {tiles}
                    </section>
                </div>

            </div>
        )
    }
}