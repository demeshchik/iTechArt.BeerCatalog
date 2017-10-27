import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Tile from '../../components/Tile/Tile'

import * as styles from './styles.css'
import * as grid from  '../../grid.css'

//TODO: Fix logic for downloading faves from server (including current pagination)

export default class Fave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basePath: 'https://api.punkapi.com/v2/beers/',
            ids: JSON.parse(localStorage.getItem('faves')),
            page: 1,
            hasMore: true,
            results: []
        };

        this.onFaveHandler = this.onFaveHandler.bind(this);
        this.newResults = this.newResults.bind(this);
    }

    getBeers(query, page, callback) {
        let xhr = new XMLHttpRequest();
        let path = this.state.basePath + query;

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

    onFaveHandler(event) {
        let faves = typeof localStorage.getItem('faves') !== 'string' ? [] : JSON.parse(localStorage.getItem('faves'));

        faves.splice(faves.indexOf(event.id), 1);

        localStorage.setItem('faves', JSON.stringify(faves));

        this.setState({
            ids: faves
        }, () => {
            this.newResults(1);
        })
    }

    newResults(newPage) {
        this.getBeers('?ids=' + this.IDs(newPage), newPage, (data) => {
            this.setState({
                results: [...this.state.results, ...data],
                hasMore: data.length >= 9,
                page: newPage,
            })
        })
    }

    IDs(page) {
        let str = "";
        let startIndex = (page - 1) * 9;
        let accArray = this.state.ids.slice(startIndex, startIndex + 9);
        accArray.forEach((item) => {
            str += item + '|';
        });
        return str.substring(0, str.length - 1);
    }

    get Tiles() {
        let tiles = [];

        this.state.results.forEach((item, index) => {
            tiles.push(<Tile key={index}
                             faveHandler={this.onFaveHandler}
                             isFave={true}
                             tile={item} />)
        });

        return tiles;
    }

    render() {
        return (
            <div className={grid['cl-xl-offset-2'] + ' '  +  grid['cl-lg-offset-1'] + " " + grid['cl-xl-6'] + ' ' + grid['cl-lg-8'] + ' ' + grid['cl-sm-10']}>
                <div className={grid.container}>
                    <section className={styles.catalog__inner  + ' ' + grid.container}>
                        {this.Tiles}
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