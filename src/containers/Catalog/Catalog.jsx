import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll'
import Utils from '../../utils/Utils'
import Search from '../../components/Search/Search'
import Tile from '../../components/Tile/Tile'

import * as beerActions from '../../actions/beerActions'
import * as faveActions from '../../actions/faveActions'

import * as styles from './catalog.css'
import * as grid from  '../../grid.css'

class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queryPath: '',
            page: 0,
            isFave: false
        };

        this.searchHandler = this.searchHandler.bind(this);
        this.newResults = this.newResults.bind(this);
        this.loadData = this.loadData.bind(this);

    }

    loadData() {
        let props = this.props;
        this.state.isFave ? props.faveActions.loadFaves(this.state.page) : props.beerActions.loadBeers(this.state.queryPath, this.state.page);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.setState({
                isFave: !this.state.isFave,
                page: 1
            }, () => {
                this.loadData();
            });

        }
    }

    //shouldComponentUpdate(nextProps) {
    //    return this.props !== nextProps;
    //}

    searchHandler(query) {
        this.setState({
            queryPath: query,
            page: 1
        }, () => this.props.beerActions.loadBeers(query, 1));
    }

    newResults() {
        this.setState({
            page: this.state.page + 1,
        }, () => {
            this.loadData();
        });

    }

    get Tiles() {
        let thumbnails = this.state.isFave ? this.props.faves.data : this.props.beers.data;
        let tiles = [];

        if (thumbnails && thumbnails.length > 0) {
            thumbnails.forEach((item, index) => {
                let isFave = Utils.checkItemInStorage('faves', item.id);
                tiles.push(<Tile key={index}
                                 faveHandler={(event) => this.props.faveActions.manageFave(event.value, event.id)}
                                 isFave={isFave}
                                 tile={item} />)
            });
        }

        return tiles;
    }

    get HasMore() {
        return this.state.isFave ? this.props.faves.hasMore : this.props.beers.hasMore;
    }

    render() {
        return (
            this.props.error ?
                <span>{this.props.error}</span> :
                <div className={grid['cl-xl-offset-2'] + ' '  +  grid['cl-lg-offset-1'] + " " + grid['cl-xl-6'] + ' ' + grid['cl-lg-8'] + ' ' + grid['cl-sm-10']}>
                    <div className={grid.container}>
                        {this.state.isFave ?
                            '' :
                            <section className={styles.catalog__search + ' ' + grid.container}>
                                <Search onSearch={this.searchHandler} />
                            </section>
                        }
                    </div>

                    <div className={grid.container}>
                        <section className={styles.catalog__inner  + ' ' + grid.container}>
                            <InfiniteScroll
                                initialLoading={true}
                                loadData={this.newResults}
                                hasMore={this.HasMore}
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
        faves: state.faves,
        beers: state.beers,
        error: state.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        beerActions: bindActionCreators(beerActions, dispatch),
        faveActions: bindActionCreators(faveActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);