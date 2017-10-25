import React from 'react'

//TODO: Fix logic for downloading faves from server

export default class Fave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ids: JSON.parse(localStorage.getItem('faves')),
            page: 1,
            totalCount: 9,
            results: []
        };

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

    newResults(newPage) {
        this.getBeers('&ids=' + this.IDs(newPage), newPage, (results) => {
            this.setState({
                results: results,
                page: newPage,
                totalCount: results.length
            })
        })
    }

    componentDidMount() {
        this.getBeers('&ids=' + this.IDs(this.state.page), this.state.page, (results) => {
            this.setState({
                results: results,
                totalCount: results.length
            })
        })
    }

    IDs(page) {
        let str = "";
        let accArray = this.state.ids.slice(page * 9, 9);
        accArray.forEach((item) => {
            str += item + '|';
        });
        return str.substring(0, str.length - 1);
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