import React from 'react'
import Pagination from '../Pagination/TemPagination'
import Search from '../Search/Search'
import Tile from '../Tile/Tile'
import * as styles from './styles.css'
import * as grid from  '../grid.css'

//TODO: merge Catalog & Fave into the one component; Fix pagination logic

export default class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: 'https://api.punkapi.com/v2/beers/',
            page: 1,
            results: []
        };

        this.onSearchPerform = this.onSearchPerform.bind(this);
        this.getBeers = this.getBeers.bind(this);
    }

    getBeers(page) {
        let self = this;
        let xhr = new XMLHttpRequest();
        let path = this.state.path + 'per_page=9&page=' + this.state.page;

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

    onSearchPerform(path) {
        this.setState({
            path: this.state.path + path
        }, this.getBeers(1))
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
                        <Search onSearch={this.onSearchPerform} />
                    </section>
                </div>

                <div className={grid.container}>
                    <section className={styles.catalog__inner  + ' ' + grid.container + ' ' + grid['container-masonry-sm']}>
                        {tiles}
                    </section>
                </div>

                <div className={grid.container}>
                    <section className={styles.catalog__pagination + ' ' + grid.container}>
                        <Pagination pgBarStyle={styles.pagination}
                                    activePage={styles.pagination__item + ' ' + styles['pagination__item--active']}
                                    page={styles.pagination__item}
                                    onChangePage={this.nextResults} />
                    </section>
                </div>
            </div>
        )
    }
}