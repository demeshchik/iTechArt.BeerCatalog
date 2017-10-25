import React from 'react'
import Pagination from '../Pagination/TempPagination'
import Search from '../Search/Search'
import Tile from '../Tile/Tile'
import * as styles from './styles.css'
import * as grid from  '../grid.css'

//TODO: merge Catalog & Fave into the one component; Fix pagination logic; Create preloader for downloading beers

export default class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basePath: 'https://api.punkapi.com/v2/beers/',
            queryPath: '',
            page: 1,
            totalCount: 9,
            results: []
        };

        this.onSearchPerform = this.onSearchPerform.bind(this);
        this.getBeers = this.getBeers.bind(this);
        this.newResults = this.newResults.bind(this);
    }

    getBeers(query, page, callback) {
        let xhr = new XMLHttpRequest();
        let path = this.state.basePath + '?per_page=9&page=' + page + query;

        xhr.open('get', path, true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 400) {
                    alert(xhr.status + " " + xhr.statusText);
                } else {
                    callback(JSON.parse(xhr.responseText));
                }
            }
        }
    }

    onSearchPerform(query) {
        this.getBeers(query, 1, (results) => {
            this.setState({
                page: 1,
                totalCount: results.length,
                results: results,
                queryPath: query,
            })
        })
    }

    newResults(newPage) {
        this.getBeers(this.state.queryPath, newPage, (results) => {
            this.setState({
                results: results,
                page: newPage,
                totalCount: results.length
            })
        });
    }

    componentDidMount() {
        this.getBeers(this.state.queryPath, this.state.page, (results) => {
            this.setState({
                results: results,
            })
        });
    }

    get Pagination() {
        return {
            current_page: this.state.page,
            total_count: this.state.totalCount,
            max_per_page: 9,
        };
    }

    get Tiles() {
        let tiles = [];

        this.state.results.forEach((item, index) => {
            tiles.push(<Tile key={index} tile={item} />)
        });

        return tiles;
    }

    render() {
        return (
            <div className={grid['cl-xl-offset-2'] + ' '  +  grid['cl-lg-offset-1'] + " " + grid['cl-xl-6'] + ' ' + grid['cl-lg-8'] + ' ' + grid['cl-sm-10']}>
                <div className={grid.container}>
                    <section className={styles.catalog__search + ' ' + grid.container}>
                        <Search onSearch={this.onSearchPerform} />
                    </section>
                </div>

                <div className={grid.container}>
                    <section className={styles.catalog__inner  + ' ' + grid.container + ' ' + grid['container-masonry-sm']}>
                        {this.Tiles}
                    </section>
                </div>

                <div className={grid.container}>
                    <section className={styles.catalog__pagination + ' ' + grid.container}>
                        <Pagination pagination={this.Pagination}
                                    onPageRequest={this.newResults} />
                    </section>
                </div>
            </div>
        )
    }
}