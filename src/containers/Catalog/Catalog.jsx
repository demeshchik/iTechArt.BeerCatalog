import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll'
import Utils from '../../utils/Utils'
import Search from '../../components/Search/Search'
import Tile from '../../components/Tile/Tile'

import * as Actions from '../../actions/Actions'

import * as styles from './styles.css'
import * as grid from  '../../grid.css'

//TODO: splice into separate functions

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
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.setState({
                isFave: !this.state.isFave,
                page: 1
            }, () => {
                let actions = this.props.actions;
                this.state.isFave ? actions.loadFaves(this.state.page) : actions.loadBeers(this.state.queryPath, this.state.page);
            });

        }
    }

    shouldComponentUpdate(nextProps) {
        return this.props !== nextProps;
    }

    searchHandler(query) {

    }

    newResults() {
        this.setState({
            page: this.state.page + 1,
        }, () => {
            let actions = this.props.actions;
            this.state.isFave ? actions.loadFaves(this.state.page) : actions.loadBeers(this.state.queryPath, this.state.page);
        });

    }

    get Tiles() {
        let thumbnails = this.state.isFave ? this.props.faves : this.props.thumbnails;
        let tiles = [];

        if (thumbnails && thumbnails.length > 0) {
            thumbnails.forEach((item, index) => {
                let isFave = Utils.checkItemInStorage('faves', item.id);
                tiles.push(<Tile key={index}
                                 faveHandler={(event) => this.props.actions.manageFave(event.value, event.id)}
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
                                hasMore={this.props.hasMore}
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
        faves: state.beers.faves,
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