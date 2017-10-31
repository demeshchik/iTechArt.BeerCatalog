import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import InfiniteScroll from 'react-infinite-scroller'
import Utils from '../../utils/Utils'

import Tile from '../../components/Tile/Tile'

import * as styles from './styles.css'
import * as grid from  '../../grid.css'

class Fave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ids: JSON.parse(localStorage.getItem('faves')),
            page: 1
        };

        this.onFaveHandler = this.onFaveHandler.bind(this);
        this.newResults = this.newResults.bind(this);
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
        this.setState({
            page: newPage,
        });

        this.props.actions.getBeers('?ids=' + Utils.IDs(this.state.ids, newPage), newPage);
    }

    get Tiles() {
        let tiles = [];

        if (this.props.thumbnails && this.props.thumbnails.length > 0) {
            this.props.thumbnails.forEach((item, index) => {
                tiles.push(<Tile key={index}
                                 faveHandler={this.onFaveHandler}
                                 isFave={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(Fave);