import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import InfiniteScroll from 'react-infinite-scroller'
import Utils from '../../utils/Utils'

import Search from '../../components/Search/Search'
import Tile from '../../components/Tile/Tile'

import * as Actions from '../../actions/Actions'

import * as styles from './styles.css'
import * as grid from  '../../grid.css'

//TODO: merge Catalog & Fave into the one component

class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queryPath: '',
            page: 0
        };

        this.newResults = this.newResults.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return this.props !== nextProps;
    }

    newResults(page, query) {
        let _query = page ? this.state.queryPath : query;
        let _page = page ? this.state.page + 1 : 1;

        this.setState({
            page: _page,
            queryPath: _query
        });

        this.props.actions.getBeers(_query, _page);
    }

    onFaveHandler(event) {
        let faves = typeof localStorage.getItem('faves') !== 'string' ? [] : JSON.parse(localStorage.getItem('faves'));

        event.value ?  faves.push(event.id) : faves.splice(faves.indexOf(event.id), 1);

        localStorage.setItem('faves', JSON.stringify(faves));
    }

    get Tiles() {
        let tiles = [];

        if (this.props.thumbnails && this.props.thumbnails.length > 0) {
            this.props.thumbnails.forEach((item, index) => {
                let isFave = Utils.checkItemInStorage('faves', item.id);
                tiles.push(<Tile key={index}
                                 faveHandler={this.onFaveHandler}
                                 isFave={isFave}
                                 tile={item} />)
            });
        }

        return tiles;
    }

    render() {
        return (
            this.props.error ?
                <span>{this.props.error}</span> :
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
                                hasMore={this.props.hasMore}
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

function mapStateToProps(state) {
    return {
        thumbnails: state.beers.thumbnails,
        hasMore: state.beers.hasMore,
        error: state.beers.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);