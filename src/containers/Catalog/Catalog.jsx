import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Search from '../../components/Search/Search'
import Tile from '../../components/Tile/Tile'

import * as styles from './styles.css'
import * as grid from  '../../grid.css'

//TODO: re-implement Catalog component
//TODO: fix newResults method (newPage param)
//TODO: merge Catalog & Fave into the one component

export default class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basePath: 'https://api.punkapi.com/v2/beers/',
            queryPath: '',
            page: 0,
            hasMore: true,
            results: []
        };

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

    newResults(query) {
        let _query = query || this.state.queryPath;
        let _page = query ? 1 : this.state.page;

        this.getBeers(_query, _page, (data) => {
            this.setState({
                page: query ? _page : _page + 1,
                results: [...this.state.results, ...data],
                hasMore: data.length >= 9,
                queryPath: _query
            })
        });
    }

    onFaveHandler(event) {
        let faves = typeof localStorage.getItem('faves') !== 'string' ? [] : JSON.parse(localStorage.getItem('faves'));

        event.value ?  faves.push(event.id) : faves.splice(faves.indexOf(event.id), 1);

        localStorage.setItem('faves', JSON.stringify(faves));
    }

    checkItemInStorage(storageName, item) {
        let storageArray = typeof localStorage.getItem(storageName) === 'string' ? JSON.parse(localStorage.getItem(storageName)) : [];

        return storageArray.indexOf(item) !== -1;
    }

    get Tiles() {
        let tiles = [];

        this.state.results.forEach((item, index) => {
            let isFave = this.checkItemInStorage('faves', item.id);
            tiles.push(<Tile key={index}
                             faveHandler={this.onFaveHandler}
                             isFave={isFave}
                             tile={item} />)
        });

        return tiles;
    }

    render() {
        return (
            <div className={grid['cl-xl-offset-2'] + ' '  +  grid['cl-lg-offset-1'] + " " + grid['cl-xl-6'] + ' ' + grid['cl-lg-8'] + ' ' + grid['cl-sm-10']}>
                <div className={grid.container}>
                    <section className={styles.catalog__search + ' ' + grid.container}>
                        <Search onSearch={this.newResults} />
                    </section>
                </div>

                <div className={grid.container}>
                    <section className={styles.catalog__inner  + ' ' + grid.container}>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.newResults}
                            hasMore={this.state.hasMore}
                            loader={<div>Loading ...</div>}
                        >
                            {this.Tiles}
                        </InfiniteScroll>
                    </section>
                </div>
            </div>
        )
    }
}